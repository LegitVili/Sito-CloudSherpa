// Dati generali del sito. I campi vuoti non vengono mostrati: compilarli quando disponibili.
export const site = {
  name: 'CloudSherpa',
  url: 'https://cloudsherpa.it',
  locale: 'it',
  tagline: 'Partner Zendesk per customer service e agenti AI',
  description:
    'CloudSherpa è partner Zendesk in Italia: implementiamo Zendesk, agenti AI e customer service omnicanale, con integrazioni e formazione. Richiedi un audit gratuito.',
  // Indirizzo, email e telefono ripresi dalla pagina contatti del sito attuale: da verificare.
  // Ragione sociale, P.IVA e LinkedIn da completare.
  company: {
    legalName: '',
    vat: '',
    address: 'Via Cino del Duca, 5',
    city: '20122 Milano',
    email: 'sales@cloudsherpa.it',
    phone: '+39 06 94501180',
    linkedin: '',
  },
  privacyPolicyUrl: 'https://www.iubenda.com/privacy-policy/16297443',
};

export const cta = {
  primary: { label: 'Richiedi l’audit gratuito', href: '/audit-gratuito/' },
  secondary: { label: 'Prenota una demo', href: '/contatti/?richiesta=demo' },
};

export const nav = [
  {
    label: 'Servizi',
    href: '/servizi/',
    children: 'services' as const,
  },
  {
    label: 'Soluzioni',
    href: '/soluzioni/',
    children: 'solutions' as const,
  },
  { label: 'Come operiamo', href: '/come-operiamo/' },
  { label: 'Casi studio', href: '/casi-studio/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Chi siamo', href: '/chi-siamo/' },
];

export const phases = [
  {
    n: '01',
    camp: 'Campo base',
    title: 'Analisi',
    text: 'Partiamo da come lavorate oggi: canali, volumi, motivi di contatto, strumenti. Vi mostriamo cosa può fare Zendesk nel vostro caso, non una demo generica.',
    output: 'Mappa dei processi attuali e disegno di quelli futuri',
  },
  {
    n: '02',
    camp: 'Campo 1',
    title: 'Configurazione',
    text: 'Attiviamo i canali, costruiamo campi, viste, macro, trigger e flussi. Colleghiamo l’agente AI all’Help Center e Zendesk ai vostri gestionali.',
    output: 'Ambiente Zendesk pronto, provato su casi reali',
  },
  {
    n: '03',
    camp: 'Campo 2',
    title: 'Formazione',
    text: 'Sessioni pratiche sul vostro ambiente, per operatori e amministratori. L’obiettivo è rendervi autonomi, non dipendenti da noi.',
    output: 'Team in grado di usare e modificare il sistema',
  },
  {
    n: '04',
    camp: 'Vetta',
    title: 'Go-live e supporto',
    text: 'Vi affianchiamo nelle prime settimane di utilizzo, correggiamo quello che emerge dall’uso reale e pianifichiamo i passi successivi.',
    output: 'Sistema in produzione e piano di evoluzione',
  },
];

export const faqHome = [
  {
    q: 'Che cosa fa CloudSherpa?',
    a: 'Organizziamo e ottimizziamo il customer service delle aziende con Zendesk e soluzioni AI. Analizziamo i processi esistenti, configuriamo la piattaforma, la integriamo con i vostri sistemi e formiamo il team che la userà.',
  },
  {
    q: 'Perché rivolgersi a un partner invece di attivare Zendesk da soli?',
    a: 'Zendesk non dà risultati appena acceso. Un agente AI collegato a una knowledge base disordinata, o senza accesso ai dati del gestionale, risponde male. Noi ci occupiamo della messa a terra: processi, integrazioni, contenuti e formazione.',
  },
  {
    q: 'In quanto tempo si vedono i primi risultati?',
    a: 'I primi benefici arrivano di norma entro 2–4 settimane dall’avvio. L’ottimizzazione completa richiede in genere 2–3 mesi, a seconda del numero di canali e delle integrazioni.',
  },
  {
    q: 'Usiamo già Zendesk. Potete aiutarci lo stesso?',
    a: 'Sì. Molte aziende usano solo una parte di quello che pagano. Facciamo un check-up dell’ambiente, vi diciamo cosa non state sfruttando e quante richieste potreste automatizzare con AI Agents e Copilot.',
  },
  {
    q: 'Usiamo un altro helpdesk. È possibile migrare?',
    a: 'Sì. Ci occupiamo della migrazione di ticket, utenti e contenuti da altri strumenti, come Freshdesk, Zoho Desk, Intercom o Salesforce Service Cloud, e della riconfigurazione dei flussi in Zendesk.',
  },
  {
    q: 'In che cosa consiste l’audit gratuito?',
    a: 'Analizziamo il vostro customer journey attuale: da dove arrivano le richieste, come vengono gestite e dove si perde tempo. Ricevete un quadro chiaro delle inefficienze e delle priorità, senza impegno di acquisto.',
  },
];
