// Scena 3D della hero: una montagna low-poly. I canali di contatto partono sparsi alla base
// e i loro sentieri convergono in vetta, dove c'è la bandiera. Geometria tutta procedurale.
import {
  AdditiveBlending,
  BufferAttribute,
  CanvasTexture,
  CatmullRomCurve3,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  Fog,
  Group,
  HemisphereLight,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Points,
  PointsMaterial,
  BufferGeometry,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';

const BG = 0x14242e;

// --- Terreno -------------------------------------------------------------

const PEAKS = [
  { x: 0.4, z: -0.6, h: 4.3, r: 4.8, p: 1.55 },
  { x: -3.5, z: -1.9, h: 2.5, r: 3.5, p: 1.4 },
  { x: 3.9, z: -2.3, h: 2.15, r: 3.3, p: 1.4 },
  { x: -6.2, z: -3.1, h: 1.7, r: 3.1, p: 1.3 },
  { x: 6.6, z: -3.3, h: 1.55, r: 3.1, p: 1.3 },
];

function hash(x: number, z: number) {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function noise(x: number, z: number) {
  const xi = Math.floor(x);
  const zi = Math.floor(z);
  const xf = x - xi;
  const zf = z - zi;
  const u = xf * xf * (3 - 2 * xf);
  const v = zf * zf * (3 - 2 * zf);
  const a = hash(xi, zi);
  const b = hash(xi + 1, zi);
  const c = hash(xi, zi + 1);
  const d = hash(xi + 1, zi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x: number, z: number) {
  return noise(x, z) * 0.55 + noise(x * 2.1, z * 2.1) * 0.3 + noise(x * 4.3, z * 4.3) * 0.15;
}

function height(x: number, z: number) {
  let top = 0;
  let sum = 0;
  for (const p of PEAKS) {
    const d = Math.hypot(x - p.x, (z - p.z) * 1.15);
    const v = p.h * Math.pow(Math.max(0, 1 - d / p.r), p.p);
    top = Math.max(top, v);
    sum += v;
  }
  let h = top + (sum - top) * 0.22;
  h += (fbm(x * 0.85 + 3, z * 0.85 + 7) - 0.5) * 0.75 * Math.min(1, Math.max(0.12, h / 1.4));
  return Math.max(0, h);
}

const SUMMIT = new Vector3(PEAKS[0].x, 0, PEAKS[0].z);
SUMMIT.y = height(SUMMIT.x, SUMMIT.z);

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function buildTerrain() {
  const geo = new PlaneGeometry(20, 13, 92, 60);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position as BufferAttribute;
  const colors = new Float32Array(pos.count * 4);

  const deep = new Color(0x1b3442);
  const mid = new Color(0x3f667c);
  const high = new Color(0x9db5c1);
  const snow = new Color(0xf5f8f9);
  const c = new Color();

  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let z = pos.getZ(i);
    x += (hash(x * 3.1, z * 1.7) - 0.5) * 0.14;
    z += (hash(x * 1.3, z * 4.9) - 0.5) * 0.14;
    const y = height(x, z);
    pos.setXYZ(i, x, y, z);

    const t = y / SUMMIT.y;
    const snowLine = 0.62 + (hash(x * 7, z * 7) - 0.5) * 0.12;
    if (t > snowLine) c.copy(high).lerp(snow, smooth(snowLine, snowLine + 0.14, t));
    else if (t > 0.28) c.copy(mid).lerp(high, smooth(0.28, snowLine, t));
    else c.copy(deep).lerp(mid, smooth(0, 0.28, t));

    // dissolvenza ai bordi, così il terreno si fonde con lo sfondo
    const edge = Math.max(Math.abs(x) / 10, Math.abs(z + 0.5) / 6.5);
    const alpha = 1 - smooth(0.72, 1, edge);
    colors.set([c.r, c.g, c.b, alpha], i * 4);
  }
  geo.setAttribute('color', new BufferAttribute(colors, 4));
  geo.computeVertexNormals();

  return new Mesh(
    geo,
    new MeshStandardMaterial({
      vertexColors: true,
      flatShading: true,
      roughness: 0.92,
      metalness: 0.02,
      transparent: true,
    }),
  );
}

// --- Sentieri ------------------------------------------------------------

interface Trail {
  curve: CatmullRomCurve3;
  mesh: Mesh<TubeGeometry, MeshBasicMaterial>;
  start: Vector3;
  node: Mesh;
  halo: Sprite;
  heat: number; // 0..1, sale al passaggio del mouse
}

const TUBE_SEG = 140;
const TUBE_RAD = 6;

function buildTrail(x0: number, z0: number, side: number): CatmullRomCurve3 {
  const pts: Vector3[] = [];
  const N = 26;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const bend = Math.sin(t * Math.PI) * side * 0.85 + Math.sin(t * Math.PI * 3.2) * 0.2 * (1 - t);
    const x = x0 + (SUMMIT.x - x0) * t + bend;
    const z = z0 + (SUMMIT.z - z0) * t + Math.sin(t * Math.PI * 2.4) * 0.22 * (1 - t);
    pts.push(new Vector3(x, height(x, z) + 0.07, z));
  }
  pts[N].copy(SUMMIT).y += 0.07;
  return new CatmullRomCurve3(pts, false, 'catmullrom', 0.4);
}

function glowTexture(inner: string, outer: string) {
  const size = 128;
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const ctx = cv.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner);
  g.addColorStop(0.35, outer);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new CanvasTexture(cv);
}

// --- Avvio ---------------------------------------------------------------

export function initHeroScene(root: HTMLElement): (() => void) | null {
  const canvas = root.querySelector<HTMLCanvasElement>('canvas');
  const chips = [...root.querySelectorAll<HTMLElement>('[data-channel]')];
  const summitChip = root.querySelector<HTMLElement>('[data-summit]');
  if (!canvas) return null;

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(BG, 0);

  const scene = new Scene();
  scene.fog = new Fog(BG, 8, 22);

  const camera = new PerspectiveCamera(35, 1, 0.1, 80);
  const world = new Group();
  scene.add(world);

  scene.add(new HemisphereLight(0xd6e6ef, 0x0c1820, 1.05));
  const sun = new DirectionalLight(0xffffff, 2.4);
  sun.position.set(-5, 7, 4);
  scene.add(sun);
  const summitLight = new PointLight(0xff4a66, 3.5, 4, 2);
  summitLight.position.copy(SUMMIT).add(new Vector3(0, 0.7, 0.4));
  world.add(summitLight);

  world.add(buildTerrain());

  // Canali alla base
  const channelSpots: [number, number, number][] = [
    [-3.0, 2.6, -0.5],
    [-1.5, 3.3, 0.4],
    [0.4, 3.6, -0.3],
    [2.3, 3.3, -0.4],
    [3.8, 2.6, 0.5],
  ];
  const haloTex = glowTexture('rgba(255,255,255,0.95)', 'rgba(189,204,212,0.35)');
  const nodeGeo = new SphereGeometry(0.085, 16, 16);
  const trails: Trail[] = channelSpots.slice(0, Math.max(chips.length, 1)).map(([x, z, side]) => {
    const curve = buildTrail(x, z, side);
    const mesh = new Mesh(
      new TubeGeometry(curve, TUBE_SEG, 0.022, TUBE_RAD, false),
      new MeshBasicMaterial({ color: 0xbdccd4, transparent: true, opacity: 0.4, fog: false }),
    );
    mesh.geometry.setDrawRange(0, 0);
    world.add(mesh);

    const start = curve.getPointAt(0);
    const node = new Mesh(nodeGeo, new MeshBasicMaterial({ color: 0xffffff, fog: false }));
    node.position.copy(start);
    world.add(node);
    const halo = new Sprite(
      new SpriteMaterial({ map: haloTex, blending: AdditiveBlending, depthWrite: false, transparent: true, fog: false }),
    );
    halo.scale.setScalar(0.7);
    halo.position.copy(start);
    world.add(halo);
    return { curve, mesh, start, node, halo, heat: 0 };
  });

  // "Richieste" che risalgono i sentieri
  const PER_TRAIL = 4;
  const tickets = new InstancedMesh(
    new SphereGeometry(0.05, 10, 10),
    new MeshBasicMaterial({ color: 0xffffff, fog: false }),
    trails.length * PER_TRAIL,
  );
  tickets.frustumCulled = false;
  world.add(tickets);
  const m4 = new Matrix4();
  const p3 = new Vector3();
  const cStart = new Color(0xffffff);
  const cEnd = new Color(0xff5a74);
  const cTmp = new Color();

  // Campi lungo la via centrale
  const tentGeo = new ConeGeometry(0.11, 0.16, 4);
  const tentMat = new MeshStandardMaterial({ color: 0xf3ead9, flatShading: true, emissive: 0x6b5a3a, emissiveIntensity: 0.35 });
  const mid = trails[Math.floor(trails.length / 2)];
  for (const t of [0.32, 0.56, 0.78]) {
    const tent = new Mesh(tentGeo, tentMat);
    const at = mid.curve.getPointAt(t);
    tent.position.set(at.x + 0.22, height(at.x + 0.22, at.z) + 0.08, at.z);
    tent.rotation.y = Math.PI / 4;
    world.add(tent);
  }

  // Bandiera in vetta
  const pole = new Mesh(
    new CylinderGeometry(0.014, 0.014, 0.95, 6),
    new MeshStandardMaterial({ color: 0xe9eef1, roughness: 0.5 }),
  );
  pole.position.copy(SUMMIT).y += 0.45;
  world.add(pole);
  const flagGeo = new PlaneGeometry(0.62, 0.36, 12, 6);
  flagGeo.translate(0.31, 0, 0);
  const flagBase = (flagGeo.attributes.position.array as Float32Array).slice();
  const flag = new Mesh(
    flagGeo,
    new MeshStandardMaterial({ color: 0xc8142f, side: DoubleSide, roughness: 0.7, emissive: 0x5a0514, emissiveIntensity: 0.6 }),
  );
  flag.position.copy(SUMMIT).y += 0.74;
  world.add(flag);
  const summitGlow = new Sprite(
    new SpriteMaterial({
      map: glowTexture('rgba(255,120,140,0.9)', 'rgba(200,20,47,0.28)'),
      blending: AdditiveBlending,
      depthWrite: false,
      transparent: true,
      fog: false,
    }),
  );
  summitGlow.scale.setScalar(2.6);
  summitGlow.position.copy(SUMMIT).y += 0.55;
  world.add(summitGlow);

  // Neve leggera
  const FLAKES = 260;
  const flakePos = new Float32Array(FLAKES * 3);
  for (let i = 0; i < FLAKES; i++) {
    flakePos[i * 3] = (hash(i, 1) - 0.5) * 18;
    flakePos[i * 3 + 1] = hash(i, 2) * 7;
    flakePos[i * 3 + 2] = (hash(i, 3) - 0.5) * 10;
  }
  const flakeGeo = new BufferGeometry();
  flakeGeo.setAttribute('position', new BufferAttribute(flakePos, 3));
  const flakes = new Points(
    flakeGeo,
    new PointsMaterial({ color: 0xffffff, size: 0.035, transparent: true, opacity: 0.55, depthWrite: false }),
  );
  world.add(flakes);

  // --- Interazione -------------------------------------------------------

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const onPointer = (e: PointerEvent) => {
    const r = root.getBoundingClientRect();
    pointer.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    pointer.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  let hovered = -1;
  chips.forEach((chip, i) => {
    chip.addEventListener('pointerenter', () => (hovered = i));
    chip.addEventListener('pointerleave', () => hovered === i && (hovered = -1));
  });

  let scroll = 0;
  const onScroll = () => {
    const r = root.getBoundingClientRect();
    scroll = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height * 0.9)));
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  let w = 0;
  let h = 0;
  let camDist = 10;
  const resize = () => {
    w = root.clientWidth;
    h = root.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // tengo la base della montagna dentro l'inquadratura anche su schermi stretti
    const span = camera.aspect < 1.5 ? 9.6 : 13.2;
    camDist = Math.max(9.2, span / (2 * Math.tan((camera.fov * Math.PI) / 360) * camera.aspect));
    camera.updateProjectionMatrix();
    const fog = scene.fog as Fog;
    fog.near = camDist - 1.5;
    fog.far = camDist + 10;
  };
  const ro = new ResizeObserver(resize);
  ro.observe(root);
  resize();

  let visible = true;
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.01 });
  io.observe(root);

  const place = (el: HTMLElement | null, v: Vector3, lift: number) => {
    if (!el) return;
    p3.copy(v);
    p3.y += lift;
    world.localToWorld(p3).project(camera);
    const x = (p3.x * 0.5 + 0.5) * w;
    const y = (-p3.y * 0.5 + 0.5) * h;
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -100%)`;
  };

  const target = new Vector3();
  const start = performance.now();
  let last = start;
  let raf = 0;
  let scrollEase = 0;

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (!visible || document.hidden || !w) return;
    const time = Math.max(0, (now - start) / 1000);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;
    scrollEase += (scroll - scrollEase) * 0.08;

    world.rotation.y = pointer.x * 0.22 + Math.sin(time * 0.15) * 0.03;
    world.rotation.x = pointer.y * 0.04;
    sun.position.set(-5 + pointer.x * 4, 7 - pointer.y * 1.5, 4);

    // la camera sale verso la vetta con lo scroll
    const dist = camDist - scrollEase * 3.2;
    camera.position.set(0.3 + pointer.x * 0.35, 2.5 + scrollEase * 2.4 - pointer.y * 0.2, dist);
    target.set(0.3, 1.65 + scrollEase * 1.7, 0);
    camera.lookAt(target);

    // i sentieri si disegnano dalla base alla vetta
    const intro = smooth(0.3, 3.2, time);
    trails.forEach((trail, i) => {
      const delay = i * 0.06;
      const drawn = Math.min(1, Math.max(0, intro * (1 + delay) - delay));
      trail.mesh.geometry.setDrawRange(0, Math.floor(drawn * TUBE_SEG) * TUBE_RAD * 6);

      trail.heat += ((hovered === i ? 1 : 0) - trail.heat) * 0.12;
      const dim = hovered >= 0 && hovered !== i ? 0.55 : 1;
      trail.mesh.material.opacity = (0.4 + trail.heat * 0.6) * dim;
      trail.mesh.material.color.setHex(0xbdccd4).lerp(cStart, trail.heat);

      const bob = Math.sin(time * 1.3 + i * 1.7) * 0.06;
      trail.node.position.y = trail.start.y + bob;
      trail.halo.position.y = trail.start.y + bob;
      trail.halo.scale.setScalar(0.7 + trail.heat * 0.5 + Math.sin(time * 2 + i) * 0.05);
      place(chips[i], trail.node.position, 0.34);

      for (let k = 0; k < PER_TRAIL; k++) {
        const speed = 0.085 + trail.heat * 0.05;
        const t = (time * speed + k / PER_TRAIL + i * 0.13) % 1;
        const idx = i * PER_TRAIL + k;
        if (t > drawn) {
          m4.makeScale(0, 0, 0);
        } else {
          trail.curve.getPointAt(t, p3);
          const s = (0.75 + trail.heat * 0.5) * (1 - smooth(0.92, 1, t)) * smooth(0, 0.04, t);
          m4.makeScale(s, s, s).setPosition(p3);
        }
        tickets.setMatrixAt(idx, m4);
        tickets.setColorAt(idx, cTmp.copy(cStart).lerp(cEnd, smooth(0.55, 1, t)));
      }
    });
    tickets.instanceMatrix.needsUpdate = true;
    if (tickets.instanceColor) tickets.instanceColor.needsUpdate = true;

    // bandiera al vento
    const fp = flagGeo.attributes.position as BufferAttribute;
    for (let i = 0; i < fp.count; i++) {
      const x = flagBase[i * 3];
      const y = flagBase[i * 3 + 1];
      fp.setZ(i, Math.sin(x * 9 - time * 5 + y * 3) * 0.06 * (x / 0.62));
    }
    fp.needsUpdate = true;
    flagGeo.computeVertexNormals();
    summitGlow.scale.setScalar(2.4 + Math.sin(time * 1.6) * 0.25 + intro * 0.4);
    summitGlow.material.opacity = 0.35 + intro * 0.65;
    place(summitChip, SUMMIT, 1.15);
    if (summitChip) summitChip.style.opacity = String(smooth(2.6, 3.6, time));

    // neve
    const fl = flakeGeo.attributes.position as BufferAttribute;
    for (let i = 0; i < FLAKES; i++) {
      let y = fl.getY(i) - dt * (0.12 + hash(i, 9) * 0.18);
      if (y < 0) y = 7;
      fl.setY(i, y);
      fl.setX(i, fl.getX(i) + Math.sin(time * 0.6 + i) * dt * 0.05);
    }
    fl.needsUpdate = true;

    renderer.render(scene, camera);
    if (!root.classList.contains('is-live')) root.classList.add('is-live');
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('scroll', onScroll);
    renderer.dispose();
  };
}
