export interface Service {
  slug: string;
  title: string;
  nav: string;
  icon: 'flag' | 'bot' | 'channels' | 'plug' | 'compass';
  metaTitle: string;
  metaDescription: string;
  short: string;
  h1: string;
  intro: string;
  problemTitle: string;
  problems: string[];
  doTitle: string;
  doItems: { title: string; text: string }[];
  outcomes: string[];
  products: string[];
  faq: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: 'implementazione-zendesk',
    title: 'Implementazione Zendesk',
    nav: 'Implementazione Zendesk',
    icon: 'flag',
    metaTitle: 'Implementazione Zendesk: consulenza e configurazione',
    metaDescription:
      'Implementiamo Zendesk partendo dai vostri processi: canali, flussi, automazioni, Help Center e migrazione dati. Primi risultati in 2–4 settimane.',
    short:
      'Dall’analisi dei processi al go-live: un ambiente Zendesk configurato sul vostro modo di lavorare, non un’installazione standard.',
    h1: 'Implementazione Zendesk, costruita sui vostri processi',
    intro:
      'Attivare una licenza richiede pochi minuti. Avere un customer service che funziona richiede di decidere come entra una richiesta, chi la prende in carico, quando sale di livello e cosa si misura. È il lavoro che facciamo insieme a voi.',
    problemTitle: 'Da dove si parte di solito',
    problems: [
      'Richieste gestite da caselle email condivise, fogli di calcolo o strumenti diversi per ogni canale.',
      'Nessuno storico unico del cliente: ogni operatore riparte da zero.',
      'Risposte diverse da una persona all’altra, senza standard.',
      'Nessun numero su volumi, tempi di risposta e motivi di contatto.',
    ],
    doTitle: 'Che cosa configuriamo',
    doItems: [
      {
        title: 'Canali e ticketing',
        text: 'Email, form, chat, messaggistica e telefono confluiscono in un unico spazio di lavoro, con campi e viste pensati per i vostri casi.',
      },
      {
        title: 'Flussi e automazioni',
        text: 'Macro, trigger, automazioni e SLA. Se servono, flussi su più livelli di supporto e gestione multi-brand.',
      },
      {
        title: 'Help Center',
        text: 'Una knowledge base ordinata, che riduce i ticket e che l’agente AI può usare come fonte.',
      },
      {
        title: 'Migrazione dati',
        text: 'Portiamo in Zendesk ticket, utenti e articoli da altri helpdesk o da sistemi interni.',
      },
      {
        title: 'Reportistica',
        text: 'Dashboard su volumi, tempi e motivi di contatto, per avere finalmente numeri da portare in direzione.',
      },
    ],
    outcomes: [
      'Tutte le richieste in un unico sistema',
      'Tempi di risposta più rapidi',
      'Meno attività manuali ripetitive',
      'Visibilità completa su processi e performance',
    ],
    products: ['Zendesk Suite', 'Ticketing', 'Help Center', 'Analytics'],
    faq: [
      {
        q: 'Quanto dura un progetto di implementazione?',
        a: 'Dipende dal numero di canali e integrazioni. La fase iniziale è pensata per essere rapida: i primi benefici arrivano di norma in 2–4 settimane, l’ottimizzazione completa in 2–3 mesi.',
      },
      {
        q: 'Vendete anche le licenze Zendesk?',
        a: 'Sì. Come partner Zendesk possiamo proporre un pacchetto unico con licenze e servizi di configurazione, così non dovete gestire separatamente strumento e implementazione.',
      },
      {
        q: 'Possiamo partire in piccolo?',
        a: 'Sì, ed è spesso la scelta migliore. Si parte dai canali principali e dalle prime automazioni, evitando complessità inutili, e si estende il sistema quando il team è a suo agio.',
      },
    ],
  },
  {
    slug: 'agenti-ai',
    title: 'Agenti AI e chatbot',
    nav: 'Agenti AI',
    icon: 'bot',
    metaTitle: 'Agenti AI per il customer service con Zendesk',
    metaDescription:
      'Configuriamo gli agenti AI di Zendesk sulle vostre domande più frequenti, collegati a knowledge base e gestionale. Meno ticket ripetitivi per il team.',
    short:
      'Un agente AI che risponde da solo alle domande ricorrenti, perché ha contenuti ordinati e accesso ai dati giusti.',
    h1: 'Agenti AI che risolvono le richieste, non le rimandano',
    intro:
      'La maggior parte del volume di un customer service è fatta delle stesse domande. Un agente AI può gestirle in autonomia, a qualsiasi ora, ma solo se è stato preparato: contenuti chiari, regole di passaggio all’operatore e collegamento ai sistemi che contengono le risposte.',
    problemTitle: 'Perché molti chatbot deludono',
    problems: [
      'Sono collegati a una knowledge base incompleta o contraddittoria.',
      'Non vedono lo stato dell’ordine, della spedizione o del conto: sanno solo dire “contatta l’assistenza”.',
      'Non passano la conversazione all’operatore al momento giusto.',
      'Nessuno controlla la qualità delle risposte dopo il lancio.',
    ],
    doTitle: 'Come lo mettiamo a terra',
    doItems: [
      {
        title: 'Analisi dei motivi di contatto',
        text: 'Individuiamo le domande che pesano di più sul volume e che si prestano a essere automatizzate.',
      },
      {
        title: 'Contenuti e knowledge base',
        text: 'Riordiniamo e completiamo gli articoli che l’agente userà come fonte.',
      },
      {
        title: 'Collegamento ai vostri dati',
        text: 'Integriamo l’agente con e-commerce, gestionale o sistemi interni, così risponde con informazioni reali.',
      },
      {
        title: 'Passaggio all’operatore',
        text: 'Definiamo quando e come la conversazione passa a una persona, con tutto il contesto.',
      },
      {
        title: 'Copilot per il team',
        text: 'Suggerimenti di risposta, riepiloghi e lettura del tono del messaggio per rendere più veloci anche gli operatori.',
      },
    ],
    outcomes: [
      'Meno ticket gestiti a mano',
      'Risposte immediate, anche fuori orario',
      'Operatori liberi per i casi complessi',
      'Volumi che crescono senza dover assumere in proporzione',
    ],
    products: ['AI Agents', 'Copilot', 'Help Center', 'Quality Assurance'],
    faq: [
      {
        q: 'L’agente AI sostituisce gli operatori?',
        a: 'No. Toglie al team le domande ripetitive e lascia alle persone i casi che richiedono giudizio. Quando non sa rispondere, passa la conversazione a un operatore con lo storico completo.',
      },
      {
        q: 'Su quali canali funziona?',
        a: 'Sui canali di messaggistica gestiti da Zendesk, come la chat sul sito e WhatsApp, e sulle email. La scelta dei canali si fa in fase di analisi.',
      },
      {
        q: 'Come si controlla quello che risponde l’AI?',
        a: 'Si definiscono in anticipo le fonti che può usare e i casi in cui deve passare la mano. Dopo il lancio le conversazioni si rivedono con gli strumenti di controllo qualità, per correggere contenuti e regole.',
      },
    ],
  },
  {
    slug: 'omnicanalita',
    title: 'Customer service omnicanale',
    nav: 'Omnicanalità',
    icon: 'channels',
    metaTitle: 'Customer service omnicanale con Zendesk',
    metaDescription:
      'Email, WhatsApp, chat, social e telefono in un unico ambiente Zendesk, con lo storico completo di ogni cliente. Scopri come lo configuriamo.',
    short:
      'Email, WhatsApp, chat, social e telefono diventano ticket nello stesso ambiente, con un solo storico per cliente.',
    h1: 'Tutti i canali in un solo posto, un solo storico per cliente',
    intro:
      'I clienti scrivono dove è più comodo per loro. Se ogni canale ha il suo strumento, il team perde tempo a cercare informazioni e il cliente deve ripetersi. Con l’omnicanalità ogni conversazione diventa un ticket nello stesso ambiente, e sullo stesso contatto si può passare da un canale all’altro.',
    problemTitle: 'I segnali che i canali sono scollegati',
    problems: [
      'Lo stesso cliente scrive via email e su WhatsApp e riceve due risposte diverse.',
      'Le telefonate restano fuori dal sistema e non si misurano.',
      'Per ricostruire un caso bisogna aprire tre strumenti.',
      'Alcuni canali non vengono presidiati perché nessuno riesce a seguirli.',
    ],
    doTitle: 'Che cosa attiviamo',
    doItems: [
      {
        title: 'Messaggistica e WhatsApp',
        text: 'Conversazioni continue, che il cliente può riprendere quando vuole, gestite dallo stesso spazio di lavoro.',
      },
      {
        title: 'Chat sul sito e nell’app',
        text: 'Widget configurato sul vostro brand, con agente AI in prima linea se serve.',
      },
      {
        title: 'Telefono',
        text: 'Le chiamate entrano in Zendesk come ticket, con registrazione, code e reportistica.',
      },
      {
        title: 'Social',
        text: 'Messaggi e commenti dai canali social trattati con le stesse regole degli altri canali.',
      },
      {
        title: 'Instradamento',
        text: 'Ogni richiesta arriva al gruppo o alla persona giusta in base a canale, lingua, brand e priorità.',
      },
    ],
    outcomes: [
      'Uno storico unico per ogni cliente',
      'Nessuna richiesta persa tra un canale e l’altro',
      'Risposte coerenti su tutti i canali',
      'Numeri confrontabili per canale',
    ],
    products: ['Messaggistica', 'Voice', 'Ticketing', 'Analytics'],
    faq: [
      {
        q: 'Dobbiamo attivare tutti i canali subito?',
        a: 'No. Di solito si parte dai canali con più volume e si aggiungono gli altri quando il team ha preso confidenza con il sistema.',
      },
      {
        q: 'Gestiamo più marchi. Si possono tenere separati?',
        a: 'Sì. Zendesk permette una gestione multi-brand: ogni marchio ha i suoi canali e il suo Help Center, mentre il team lavora da un unico ambiente.',
      },
    ],
  },
  {
    slug: 'integrazioni',
    title: 'Integrazioni e sviluppo custom',
    nav: 'Integrazioni',
    icon: 'plug',
    metaTitle: 'Integrazioni Zendesk con gestionali, CRM ed e-commerce',
    metaDescription:
      'Colleghiamo Zendesk a gestionali, CRM ed e-commerce con app del Marketplace o sviluppo su misura tramite API. Dati del cliente dentro il ticket.',
    short:
      'Zendesk collegato a gestionale, CRM ed e-commerce: l’operatore e l’agente AI vedono i dati senza cambiare schermata.',
    h1: 'Zendesk collegato ai sistemi che usate già',
    intro:
      'Un ticket è utile quando accanto alla domanda c’è la risposta: l’ordine, la spedizione, il contratto, il conto. Colleghiamo Zendesk ai vostri sistemi usando le app del Marketplace quando esistono e codice su misura quando servono.',
    problemTitle: 'Che cosa succede senza integrazioni',
    problems: [
      'L’operatore copia dati a mano da un gestionale all’altro.',
      'L’agente AI non può rispondere su ordini o pratiche perché non li vede.',
      'Integrazioni fatte in casa che nessuno sa più mantenere.',
      'Dubbi su dove passano i dati dei clienti e su chi può vederli.',
    ],
    doTitle: 'Come lavoriamo',
    doItems: [
      {
        title: 'Marketplace Zendesk',
        text: 'Selezioniamo e configuriamo le app già disponibili per e-commerce, CRM e strumenti di lavoro.',
      },
      {
        title: 'Sviluppo custom',
        text: 'Il nostro team di sviluppo realizza integrazioni e app su misura tramite le API di Zendesk.',
      },
      {
        title: 'Dati nel ticket',
        text: 'Le informazioni del cliente compaiono nella barra laterale dell’operatore, aggiornate in tempo reale.',
      },
      {
        title: 'Azioni automatiche',
        text: 'Trigger e webhook che aggiornano i vostri sistemi quando cambia lo stato di una richiesta.',
      },
    ],
    outcomes: [
      'Meno passaggi tra sistemi diversi',
      'Risposte basate su dati reali',
      'Integrazioni documentate e manutenibili',
      'Un solo punto di accesso per l’operatore',
    ],
    products: ['Marketplace', 'API e webhook', 'App su misura'],
    faq: [
      {
        q: 'Con quali sistemi si può integrare Zendesk?',
        a: 'Con la maggior parte dei sistemi che espongono API: piattaforme e-commerce, CRM, gestionali e software interni. In fase di analisi verifichiamo insieme la fattibilità tecnica.',
      },
      {
        q: 'Chi mantiene le integrazioni dopo il rilascio?',
        a: 'Consegniamo la documentazione e, se lo desiderate, restiamo a disposizione con un servizio di manutenzione e supporto.',
      },
    ],
  },
  {
    slug: 'formazione-e-supporto',
    title: 'Formazione e supporto',
    nav: 'Formazione e supporto',
    icon: 'compass',
    metaTitle: 'Formazione Zendesk e supporto post go-live',
    metaDescription:
      'Formazione pratica su Zendesk per operatori e amministratori, supporto dopo il go-live e manutenzione continuativa dell’ambiente.',
    short:
      'Formazione pratica sul vostro ambiente e supporto dopo il lancio, per rendere il team autonomo.',
    h1: 'Un team autonomo, non dipendente dal consulente',
    intro:
      'Cambiare strumento preoccupa chi lo usa ogni giorno. Per questo la formazione fa parte di ogni nostro progetto: sessioni pratiche sul vostro ambiente, con i vostri casi, e affiancamento nelle prime settimane.',
    problemTitle: 'Le resistenze più comuni',
    problems: [
      '“Siamo abituati a lavorare in un certo modo.”',
      'I nuovi assunti impiegano settimane a diventare operativi.',
      'Dopo il lancio nessuno sa come modificare una regola o una vista.',
      'L’ambiente cresce nel tempo senza che nessuno lo riordini.',
    ],
    doTitle: 'Che cosa offriamo',
    doItems: [
      {
        title: 'Formazione operatori',
        text: 'Sessioni interattive sull’uso quotidiano: ticket, macro, viste, canali.',
      },
      {
        title: 'Formazione amministratori',
        text: 'Come modificare flussi, automazioni e report senza dover chiedere aiuto.',
      },
      {
        title: 'Supporto post go-live',
        text: 'Affiancamento operativo nelle prime fasi di utilizzo, per risolvere i dubbi sul campo.',
      },
      {
        title: 'Manutenzione',
        text: 'Interventi continuativi su ambienti già attivi: revisione, pulizia, nuove funzionalità.',
      },
      {
        title: 'Check-up dell’ambiente',
        text: 'Per chi usa già Zendesk: che cosa non state sfruttando e quanto si potrebbe automatizzare.',
      },
    ],
    outcomes: [
      'Team operativo fin dai primi giorni',
      'Meno dipendenza da consulenti esterni',
      'Ambiente ordinato nel tempo',
      'Adozione reale dello strumento',
    ],
    products: ['Zendesk Suite', 'Copilot', 'Workforce Management'],
    faq: [
      {
        q: 'La formazione è in presenza o da remoto?',
        a: 'Si può svolgere in entrambe le modalità. La definiamo insieme in base alla dimensione del team e alle sedi.',
      },
      {
        q: 'Offrite formazione anche a chi non ha fatto il progetto con voi?',
        a: 'Sì. Formiamo anche team che usano già Zendesk, partendo da un check-up dell’ambiente esistente.',
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
