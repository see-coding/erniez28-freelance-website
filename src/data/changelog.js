// Changelog-Einträge — reverse-chronologisch, neueste zuerst.
// Neuer Eintrag = neues Objekt oben einfügen. Typ bestimmt Farbe.

export const TAGS = {
  cert:    { color: 'var(--green)',  bg: 'var(--green-a12)' },
  shipped: { color: 'var(--accent)', bg: 'var(--accent-a12)' },
  plugin:  { color: 'var(--amber)',  bg: 'oklch(0.72 0.12 75 / 0.14)' },
  insight: { color: 'var(--lilac)',  bg: 'oklch(0.72 0.08 310 / 0.13)' },
}

export const changelogEntries = [
  {
    date: '2025-12-15',
    tag: 'cert',
    title: 'Google Cybersecurity Professional Certificate',
    diff: [
      ['ctx', '8 Kurse · SIEM, IDS, Linux, SQL, Python für Security'],
      ['add', 'neuer Skill-Tree: defensive security & threat detection'],
      ['add', 'sicherheitsbewusstes Denken in jedes Projekt integriert'],
    ],
    link: 'https://coursera.org/verify/professional-cert/HCHP1KRB0IHY',
    linkLabel: 'verify HCHP1KRB0IHY',
  },
  {
    date: '2025-11-20',
    tag: 'shipped',
    title: 'AintLikeYouClothing — Shopware-6-Shop im Live-Betrieb',
    diff: [
      ['ctx', 'Shopware 6 · individuelle Erweiterungen & Backend-Funktionen'],
      ['add', 'Zahlungs-, Versand- & Bestellprozess-Integration'],
      ['add', 'laufende Performance-Optimierung im Live-Betrieb'],
      ['del', 'legacy-Bottlenecks im Checkout entfernt'],
    ],
    link: 'https://aintlikeyouclothing.com',
    linkLabel: 'aintlikeyouclothing.com',
  },
  {
    date: '2025-10-02',
    tag: 'shipped',
    title: 'Shopware-PlentyONE Connector: sichere Middleware live',
    diff: [
      ['ctx', 'Python · PostgreSQL · REST-API mit Token-Auth'],
      ['add', 'Middleware-Dashboard für stabile Datensynchronisation'],
      ['add', 'auf Skalierbarkeit & Ausfallsicherheit ausgelegt'],
    ],
    link: null,
    linkLabel: null,
  },
  {
    date: '2025-08-06',
    tag: 'cert',
    title: 'Google IT Support Professional Certificate',
    diff: [
      ['ctx', 'Netzwerke, Betriebssysteme, Systemadministration, Security-Grundlagen'],
      ['add', 'solides Infrastruktur-Fundament unter dem Dev-Stack'],
    ],
    link: 'https://coursera.org/verify/professional-cert/N65BH8UF9K73',
    linkLabel: 'verify N65BH8UF9K73',
  },
  {
    date: '2025-06-30',
    tag: 'insight',
    title: 'OTN — One-Time-Note (Eigenprojekt, Technik-Showcase)',
    diff: [
      ['ctx', 'selbstzerstörende Ende-zu-Ende-verschlüsselte Notizen'],
      ['add', 'AES-256-GCM vollständig im Browser'],
      ['add', 'Schlüssel lebt nur im URL-Fragment — Server sieht nie Klartext'],
      ['ctx', 'kein Kundenprojekt — reines Eigenprojekt'],
    ],
    link: null,
    linkLabel: null,
  },
  {
    date: '2025-05-14',
    tag: 'plugin',
    title: 'SW6-Plugin „Landingpage Visibility Switch" veröffentlicht',
    diff: [
      ['ctx', 'eigenständige Shopware-6-Erweiterung'],
      ['add', 'Header / Footer / ToTop-Button je Seite steuerbar'],
      ['add', 'saubere Konfigurationslogik im Admin'],
    ],
    link: null,
    linkLabel: null,
  },
]
