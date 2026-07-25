// Referenzen / Portfolio-Cards.
// Bild kommt später in /public/assets/, Fallback ist ein Placeholder-Panel.
export const projects = [
  {
    id: 'alyc',
    title: 'AintLikeYouClothing',
    kind: 'Kundenprojekt · Shopware 6',
    description:
      'Individuelle Erweiterungen und Backend-Funktionen für einen Live-Shop. Zahlungs-, Versand- und Bestellprozess-Integration, laufende Performance-Optimierung im Betrieb.',
    tech: ['Shopware 6', 'PHP', 'Twig'],
    image: './assets/ref-alyc.jpg',
    link: 'https://aintlikeyouclothing.com',
    linkLabel: 'Shop ansehen',
  },
  {
    id: 'plentyone',
    title: 'Shopware-PlentyONE Connector',
    kind: 'Kundenprojekt · Middleware',
    description:
      'Sichere Middleware zwischen Shopware 6 und PlentyONE. REST-API mit Token-Auth, Python und PostgreSQL — ausgelegt auf Stabilität und Skalierbarkeit.',
    tech: ['Python', 'PostgreSQL', 'REST'],
    image: './assets/ref-plentyone.jpg',
    link: null,
    linkLabel: null,
  },
  {
    id: 'otn',
    title: 'OTN — One-Time-Note',
    kind: 'Eigenprojekt · Technik-Showcase',
    description:
      'Selbstzerstörende, Ende-zu-Ende-verschlüsselte Notizen. AES-256-GCM komplett im Browser, der Schlüssel lebt nur im URL-Fragment.',
    tech: ['JavaScript', 'WebCrypto', 'AES-256-GCM'],
    image: './assets/ref-otn.jpg',
    link: null,
    linkLabel: null,
  },
  {
    id: 'visibility-switch',
    title: 'Landingpage Visibility Switch',
    kind: 'Eigenes Plugin · Shopware 6',
    description:
      'Eigenständige Erweiterung zur Steuerung von Header, Footer und ToTop-Button je Seite — inklusive sauberer Konfigurationslogik im Admin.',
    tech: ['Shopware 6', 'Plugin', 'Admin'],
    image: './assets/ref-plugin.jpg',
    link: null,
    linkLabel: null,
  },
  {
    id: 'viveqode',
    title: 'ViveQode',
    kind: 'Eigenes Produkt · SaaS',
    description:
      'Plattform für dynamische QR-Codes und Smart Links. Erstellung, Verwaltung und Tracking in Echtzeit — mit Analytics und API-Zugang.',
    tech: ['SaaS', 'QR', 'Analytics'],
    image: './assets/ref-viveqode.jpg',
    link: 'https://viveqode.com',
    linkLabel: 'viveqode.com',
  },
]
