export interface Solution {
  slug: string;
  title: string;
  nav: string;
  metaTitle: string;
  metaDescription: string;
  short: string;
  h1: string;
  intro: string;
  requests: string[];
  pains: string[];
  setup: { title: string; text: string; href: string }[];
  promise: string;
  caseStudy?: { label: string; href: string };
  who: string[];
  faq: { q: string; a: string }[];
}

export const solutions: Solution[] = [
  {
    slug: 'betting-gaming',
    title: 'Betting e gaming',
    nav: 'Betting e gaming',
    metaTitle: 'Zendesk per betting e gaming: customer service 24/7',
    metaDescription:
      'Customer service per operatori di betting e gaming: agenti AI su prelievi, bonus e verifica documenti, gestione multi-brand e tracciabilità dei reclami.',
    short:
      'Assistenza 24/7 su più brand: agenti AI per prelievi, bonus e verifica documenti, con tracciabilità completa.',
    h1: 'Customer service per betting e gaming, su più brand e a ogni ora',
    intro:
      'Volumi alti, assistenza continua e domande che si ripetono: conti, prelievi, verifica documenti, bonus. È un contesto in cui automazione e centralizzazione danno risultati visibili in poche settimane.',
    requests: ['Verifica documenti', 'Prelievi e pagamenti', 'Bonus e promozioni', 'Accesso al conto', 'Reclami'],
    pains: [
      'Assistenza 24/7 e multilingua difficile da coprire con il solo team.',
      'Più brand gestiti con strumenti e regole diverse.',
      'Reclami da tracciare in modo rigoroso.',
      'Picchi di contatti in corrispondenza degli eventi.',
    ],
    setup: [
      {
        title: 'Agenti AI sulle domande ricorrenti',
        text: 'Prelievi, bonus e stato della verifica gestiti in autonomia, con passaggio all’operatore quando serve.',
        href: '/servizi/agenti-ai/',
      },
      {
        title: 'Omnicanalità multi-brand',
        text: 'Ogni marchio con i suoi canali e il suo Help Center, un solo ambiente di lavoro per il team.',
        href: '/servizi/omnicanalita/',
      },
      {
        title: 'Flussi su più livelli',
        text: 'Primo, secondo e terzo livello di supporto con regole chiare di escalation e dashboard di controllo.',
        href: '/servizi/implementazione-zendesk/',
      },
    ],
    promise: 'Un agente AI che gestisce le richieste su prelievi e bonus, con il team concentrato sui casi delicati.',
    caseStudy: { label: 'Leggi il caso Lottomatica', href: '/casi-studio/lottomatica/' },
    who: ['Concessionari online e fisici', 'Operatori con licenza europea', 'Gruppi multi-brand'],
    faq: [
      {
        q: 'Zendesk è adatto a un settore regolamentato come il gioco?',
        a: 'Sì. La tracciabilità di ogni conversazione, i permessi per ruolo e i flussi di escalation aiutano a gestire reclami e controlli in modo ordinato. I requisiti specifici si definiscono in fase di analisi con i vostri referenti compliance.',
      },
      {
        q: 'Si possono gestire più marchi dallo stesso ambiente?',
        a: 'Sì. È uno dei punti di forza della piattaforma: canali, Help Center e regole distinte per brand, con operatori e report condivisi.',
      },
    ],
  },
  {
    slug: 'retail-ecommerce',
    title: 'Retail ed e-commerce',
    nav: 'Retail ed e-commerce',
    metaTitle: 'Zendesk per e-commerce e retail: ordini, resi e WhatsApp',
    metaDescription:
      'Customer service per e-commerce, retail e brand: agenti AI su ordini e resi, WhatsApp e social in un unico ambiente, integrazione con lo store.',
    short:
      '“Dov’è il mio ordine?” e “come faccio il reso?” gestite dall’AI, con WhatsApp e social nello stesso ambiente.',
    h1: 'Customer service per e-commerce e retail, anche nei picchi',
    intro:
      'Ordini, resi, cambi e rimborsi sono la maggior parte delle richieste di uno store online, e si concentrano nei momenti peggiori: saldi, Black Friday, Natale. Sono anche le domande che un agente AI gestisce meglio, se vede i dati dell’ordine.',
    requests: ['Dov’è il mio ordine', 'Resi e cambi', 'Rimborsi', 'Problemi di consegna', 'Informazioni sui prodotti'],
    pains: [
      'Arretrato di ticket durante i picchi stagionali.',
      'Richieste sparse tra email, WhatsApp e social.',
      'Operatori che copiano dati tra lo store e l’helpdesk.',
      'Ogni aumento di volume costringe ad aggiungere persone.',
    ],
    setup: [
      {
        title: 'Agenti AI su ordini e resi',
        text: 'L’agente legge lo stato dell’ordine dallo store e risponde da solo, a qualsiasi ora.',
        href: '/servizi/agenti-ai/',
      },
      {
        title: 'WhatsApp e social',
        text: 'I canali che i vostri clienti usano davvero, gestiti insieme a email e chat.',
        href: '/servizi/omnicanalita/',
      },
      {
        title: 'Integrazione con lo store',
        text: 'Collegamento con le principali piattaforme e-commerce e con il gestionale: i dati dell’ordine dentro il ticket.',
        href: '/servizi/integrazioni/',
      },
    ],
    promise: 'Togliamo al vostro team le domande su ordini e resi, così può occuparsi dei clienti che hanno davvero bisogno di una persona.',
    who: ['E-commerce D2C (moda, casa, food, beauty)', 'Distributori e grossisti', 'Brand di largo consumo'],
    faq: [
      {
        q: 'Con quali piattaforme e-commerce si integra?',
        a: 'Zendesk dispone di integrazioni per le piattaforme più diffuse, come Shopify, Magento, WooCommerce e PrestaShop. Per gli store su misura lavoriamo tramite API.',
      },
      {
        q: 'Abbiamo un team piccolo. Ha senso per noi?',
        a: 'Sì. È proprio nei team piccoli che automatizzare le domande ripetitive fa più differenza. Si può partire con pochi operatori e i canali principali.',
      },
    ],
  },
  {
    slug: 'trasporti-logistica',
    title: 'Trasporti e logistica',
    nav: 'Trasporti e logistica',
    metaTitle: 'Zendesk per trasporti e logistica: tracking e reclami',
    metaDescription:
      'Customer service per corrieri, logistica e trasporto persone: tracking gestito dall’AI in chat e al telefono, reclami e consegne fallite in un unico sistema.',
    short:
      'Tracking, consegne fallite e reclami: le richieste più automatizzabili, gestite in chat e al telefono.',
    h1: 'Customer service per trasporti e logistica, dal tracking ai reclami',
    intro:
      '“Dov’è la mia spedizione?” è la domanda più frequente e la più semplice da automatizzare. Liberare il team dal tracking significa avere tempo per consegne fallite, danni e smarrimenti, dove serve davvero una persona.',
    requests: ['Tracking', 'Consegne fallite', 'Danni e smarrimenti', 'Orari e tratte', 'Rimborsi'],
    pains: [
      'Molte richieste identiche, soprattutto al telefono.',
      'Clienti sia aziende sia privati, con esigenze diverse.',
      'Reclami che passano tra più reparti senza un responsabile chiaro.',
      'Clienti in più lingue e su più fusi orari.',
    ],
    setup: [
      {
        title: 'Agenti AI sul tracking',
        text: 'L’agente interroga i vostri sistemi e comunica lo stato della spedizione senza intervento umano.',
        href: '/servizi/agenti-ai/',
      },
      {
        title: 'Telefono dentro Zendesk',
        text: 'Le chiamate diventano ticket misurabili, con code, registrazioni e report.',
        href: '/servizi/omnicanalita/',
      },
      {
        title: 'Integrazione con i sistemi operativi',
        text: 'Collegamento a gestionali di spedizione e magazzino per avere i dati della pratica nel ticket.',
        href: '/servizi/integrazioni/',
      },
    ],
    promise: 'Il tracking gestito dall’AI, in chat e al telefono, e il team concentrato sui casi che contano.',
    who: ['Corrieri e spedizionieri', 'Operatori 3PL e logistica e-commerce', 'Trasporto persone'],
    faq: [
      {
        q: 'L’agente AI può leggere lo stato di una spedizione?',
        a: 'Sì, se i vostri sistemi espongono il dato tramite API. In fase di analisi verifichiamo quali informazioni sono disponibili e come collegarle.',
      },
      {
        q: 'Gestite anche il canale telefonico?',
        a: 'Sì. Con Zendesk le telefonate entrano nello stesso ambiente degli altri canali, così si misurano e si gestiscono con le stesse regole.',
      },
    ],
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
