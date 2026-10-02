// Zentrale Inhalte für erniez28.de. Verfügbarkeit hier pflegen (erscheint im Hero-Terminal und im Header).
export const site = {
  name: 'Sascha „Ernie“ Ernst',
  url: 'https://erniez28.de',
  email: 'kontakt@erniez28.de',
  cal: 'https://cal.erniez28.de/ernie/erstgespraech',
  linkedin: 'https://www.linkedin.com/in/sascha-ernst',
  github: 'https://github.com/see-coding',
  capacity: 'freie Kapazität ab sofort',
  openForProjects: true,
}

export const facts = [
  { value: 10, suffix: '+', label: 'Jahre E-Commerce-Praxis' },
  { value: 50, suffix: '+', label: 'betreute Kundensysteme' },
  { value: 6.7, decimals: 1, label: 'aktuelle Shopware-Version im Einsatz' },
  { value: 100, suffix: ' %', label: 'remote im DACH-Raum' },
]

export const services = [
  {
    id: 'plugins', glyph: '{ }', title: 'Plugin-Entwicklung',
    text: 'Wenn Shopware etwas nicht kann, baue ich es dazu. Über Events, eigene Entities im DAL und Erweiterungen der Administration, damit das nächste Update nichts kaputt macht.',
    chips: ['Symfony', 'DAL', 'Vue-Admin', 'CMS-Elemente'],
    cmd: 'bin/console plugin:create ErniezFeature', href: '/leistungen/shopware-plugin-entwicklung/',
  },
  {
    id: 'storefront', glyph: '</>', title: 'Storefront & Themes',
    text: 'Themes mit Twig, SCSS und eigenen JS-Plugins. Sauber vererbt statt kopiert, damit das nächste Update keine Templates bricht.',
    chips: ['Twig 3', 'SCSS / BEM', 'JS-Plugins', 'Barrierearm'],
    cmd: 'bin/console theme:compile', href: '/leistungen/shopware-storefront/',
  },
  {
    id: 'update', glyph: '↑', title: 'Update & Migration',
    text: 'Update auf Shopware 6.7 mit Testumgebung und Rückweg. Und wenn ein Update schon schiefgegangen ist, hole ich den Shop aus Wartungsmodus und 500er zurück.',
    chips: ['6.5 / 6.6 → 6.7', 'Plugin-Check', 'Theme-Check', 'Shopware 5 → 6'],
    cmd: 'bin/console system:update:prepare', href: '/leistungen/shopware-update/',
  },
  {
    id: 'schnittstellen', glyph: '⇄', title: 'Schnittstellen',
    text: 'Shopware spricht mit ERP, Warenwirtschaft oder Print-on-Demand. Mit Token-Auth, Validierung und einem Log, in dem man nachlesen kann, was wirklich passiert ist.',
    chips: ['Admin-API', 'Webhooks', 'ERP', 'Python'],
    cmd: 'curl -X POST /api/_action/sync', href: '/leistungen/shopware-schnittstellen/',
  },
  {
    id: 'wartung', glyph: '↻', title: 'Wartung & Support',
    text: 'Updates, Backups, Monitoring, Security-Checks und Performance. Ein fester Ansprechpartner mit Reaktionszeit, auch wenn es brennt. Ab 150 € im Monat.',
    chips: ['Updates', 'Monitoring', 'CVE-Checks', 'Performance'],
    cmd: 'composer audit --locked', href: '/leistungen/shopware-wartung/',
  },
]

export const cases = [
  {
    id: 'landingpage-plugin', slug: 'landingpage-plugin',
    label: 'Eigenentwicklung · Shopware 6 · v1.4.0 produktiv',
    title: 'Landingpages ohne Header, Footer und Ärger',
    problem: 'Landingpages sollten ohne Header und Footer laufen. Blendet man den Header aus, bleibt ein weißer Spalt von 70 bis 170 Pixeln, weil das Theme feste Abstände setzt. Beim Neuinstallieren brach das Plugin mit SQL-Fehler 1062 ab. Und ohne Footer fehlen Pflichtangaben.',
    fix: 'Ein Event Subscriber liest die Einstellungen cache-sicher aus, ohne überflüssige ESI-Subrequests. Custom-Field-Sets werden vorher gesucht und vorhandene IDs weiterverwendet, dadurch läuft jede Installation sauber durch. Eigene CMS-Elemente liefern Impressum, Widerruf und GPSR-Herstellerangaben als Pop-up.',
    tags: ['PHP 8.2', 'Symfony 6', 'DAL', 'HTTP-Cache / ESI', 'Vue-Admin'],
    file: 'src/Service/CustomFieldInstaller.php',
    diff: [
      ['del', "$setRepo->create([$customFieldSet], $context);"],
      ['del', '// SQLSTATE[23000]: 1062 Duplicate entry'],
      ['add', '$existing = $setRepo->search('],
      ['add', "    (new Criteria())->addFilter(new EqualsFilter('name', self::SET_NAME)),"],
      ['add', '    $context'],
      ['add', ')->first();'],
      ['add', "$set['id'] = $existing?->getId() ?? Uuid::randomHex();"],
      ['add', '$setRepo->upsert([$set], $context);'],
    ],
  },
  {
    id: 'theme-67', slug: 'shopware-67-theme-migration',
    label: 'Streetwear-Shop · Shopware 6.7 · Theme',
    title: 'Update auf 6.7 ohne Template-Crash',
    problem: 'Nach dem Update auf Shopware 6.7 warf die Storefront Twig-Fehler. Shopware hatte alte Template-Pfade entfernt, das Child-Theme erweiterte aber noch die alten Dateien.',
    fix: 'Alle Child-Templates auf die neuen Pfade umgestellt und veraltete Blöcke entfernt. Dazu kamen ein Navigationsmenü, das wie ein Garagentor herunterfährt, und eine Vollbild-Suche. Beides als Storefront-JS-Plugin, mit Escape zum Schließen und sauberem Fokus.',
    tags: ['Shopware 6.7', 'Twig 3', 'SCSS / BEM', 'Vanilla JS'],
    file: 'views/storefront/component/buy-widget/buy-widget.html.twig',
    link: { href: 'https://aintlikeyouclothing.com', label: 'aintlikeyouclothing.com' },
    diff: [
      ['del', "{% sw_extends '@Storefront/storefront/page/product-detail/buy-widget.html.twig' %}"],
      ['add', "{% sw_extends '@Storefront/storefront/component/buy-widget/buy-widget.html.twig' %}"],
      ['ctx', ''],
      ['ctx', '// GarageDoorNavPlugin.js'],
      ['add', "document.addEventListener('keydown', (event) => {"],
      ['add', "    if (event.key === 'Escape') this.closeAll();"],
      ['add', '});'],
    ],
  },
  {
    id: 'recovery', slug: 'shopware-update-recovery',
    label: 'Betrieb · Recovery · DDEV',
    title: 'Wenn das Update schiefgeht',
    problem: 'Updates scheitern an inkompatiblen Plugins, abgebrochenen Composer-Läufen oder kaputten Migrationen. Dann hängt der Shop im Wartungsmodus oder zeigt nur noch einen 500er.',
    fix: 'Ein Restore-Skript spielt Live-Backups reproduzierbar in eine lokale DDEV-Umgebung ein, setzt die Domains per SQL um und fährt danach Refresh, Indexierung und Theme-Build. So lässt sich der Fehler lokal nachstellen, ohne den Live-Shop anzufassen.',
    tags: ['Bash', 'SQL', 'DDEV', 'bin/console'],
    file: 'scripts/restore-from-backup.sh',
    diff: [
      ['del', 'HTTP/1.1 503 Service Unavailable'],
      ['add', "sed -e '/^CREATE DATABASE/d' -e '/^USE `/d' \"$SQL_FILE\" > import.sql"],
      ['add', 'ddev import-db --file=import.sql'],
      ['add', "ddev mysql -e \"UPDATE sales_channel_domain SET url='https://$LOCAL_DOMAIN'"],
      ['add', "    WHERE id = UNHEX('$PRIMARY_DOMAIN_ID');\""],
      ['add', 'ddev exec bin/console plugin:refresh'],
      ['add', 'ddev exec bin/console dal:refresh:index'],
      ['add', 'ddev exec bin/console theme:compile'],
    ],
  },
]

// Momentum-Log: neueste Einträge oben. Typen: shipped, wip, cert, plugin, theme, learn, side
export const momentum = [
  {
    date: '2026-09', tag: 'shipped', title: 'erniez28.de neu gebaut',
    diff: [['ctx', 'Astro · statisches HTML · 0 Tracker'], ['add', 'Lebenslauf als Jump’n’Run unter /whoami'], ['add', 'Schriften und Bilder selbst gehostet']],
    link: { href: '/whoami/', label: 'Ernies Quest spielen' },
  },
  {
    date: '2026-09', tag: 'wip', title: 'Shirtigo-Connector für eine Print-on-Demand-Zentrale',
    diff: [['ctx', 'Next.js · MySQL · REST'], ['add', 'Aufträge per Knopfdruck an die Produktion übergeben'], ['add', 'Status und Versand zurück in die Zentrale']],
  },
  {
    date: '2025-12', tag: 'cert', title: 'Google Cybersecurity Professional Certificate',
    diff: [['ctx', '9 Kurse · SIEM, IDS, Linux, SQL, Python'], ['add', 'Security-Blick auf jedes Shop-Projekt']],
    link: { href: 'https://coursera.org/verify/professional-cert/HCHP1KRB0IHY', label: 'verify HCHP1KRB0IHY' },
  },
  {
    date: '2025-10', tag: 'learn', title: 'Weiterbildung Cybersecurity abgeschlossen',
    diff: [['ctx', 'Feb bis Okt 2025'], ['add', 'IT-Infrastruktur, Web-Architektur, Linux'], ['add', 'strukturierte Fehleranalyse und Debugging']],
  },
  {
    date: '2025-08', tag: 'cert', title: 'Google IT Support Professional Certificate',
    diff: [['ctx', 'Netzwerke, Betriebssysteme, Systemadministration'], ['add', 'solides Fundament unter dem Dev-Stack']],
    link: { href: 'https://coursera.org/verify/professional-cert/N65BH8UF9K73', label: 'verify N65BH8UF9K73' },
  },
  {
    date: '2025', tag: 'theme', title: 'Storefront-Theme auf Shopware 6.7 migriert',
    diff: [['del', 'veraltete Template-Pfade'], ['add', 'Garagentor-Navigation und Vollbild-Suche'], ['add', 'responsives Listing mit CSS Grid']],
  },
  {
    date: '2025-06', tag: 'side', title: 'OTN · One-Time-Note',
    diff: [['ctx', 'Eigenprojekt'], ['add', 'AES-256-GCM komplett im Browser'], ['add', 'Schlüssel nur im URL-Fragment, der Server sieht nie Klartext']],
  },
  {
    date: '2025-05', tag: 'plugin', title: 'LandingPage Show/Hide Switch veröffentlicht',
    diff: [['ctx', 'eigenes Shopware-6-Plugin, heute v1.4.0'], ['add', 'Header, Footer und Top-Button je Seite steuerbar'], ['add', 'cache-sicher und sauber neu installierbar']],
  },
  {
    date: '2024-02', tag: 'shipped', title: 'Streetwear-Shop auf Shopware 6 aufgebaut',
    diff: [['ctx', 'Mitarbeit, technische Verantwortung'], ['add', 'Zahlung, Versand und Bestellprozess integriert'], ['add', 'Backup-Restore-Skript für reproduzierbare Entwicklung']],
    link: { href: 'https://aintlikeyouclothing.com', label: 'aintlikeyouclothing.com' },
  },
]

export const process = [
  { step: '01', title: 'Erstgespräch', text: '30 Minuten, kostenlos. Du erzählst, worum es geht. Ich sage Dir ehrlich, ob ich der Richtige dafür bin.' },
  { step: '02', title: 'Einschätzung', text: 'Ich schaue mir Code, Shop oder Ticket an und schätze Aufwand und Risiken. Abgerechnet wird nach Aufwand oder zum Festpreis.' },
  { step: '03', title: 'Umsetzung', text: 'In Deinem Workflow mit Git, Tickets und Staging. Für Agenturen auch als Subunternehmer unter Eurem Namen.' },
  { step: '04', title: 'Übergabe & Betrieb', text: 'Doku und eine saubere Übergabe. Wenn Du willst, kümmere ich mich danach um Updates und Wartung.' },
]

export const faq = [
  { q: 'Shopware-Agentur oder Freelancer: Was passt besser?', a: 'Eine Agentur lohnt sich, wenn Du Design, Marketing, Entwicklung und Projektleitung aus einer Hand brauchst. Geht es um Entwicklung, also ein Plugin, ein Update oder eine Schnittstelle, bist Du mit einem Freelancer oft schneller und günstiger, weil Du direkt mit dem sprichst, der den Code schreibt. Und wenn Du selbst eine Agentur bist, verstärke ich Dein Team.' },
  { q: 'Arbeitest Du auch als Subunternehmer für Agenturen?', a: 'Ja. Ich arbeite mich in Euren Workflow ein, nutze Eure Repos und Tickets und trete auf Wunsch unter Eurem Namen auf. Deine Kunden bleiben Deine Kunden.' },
  { q: 'Mit welchen Shopware-Versionen arbeitest Du?', a: 'Schwerpunkt ist Shopware 6 bis zur aktuellen Version 6.7. Erfahrung mit Shopware 5 habe ich auch, ebenso mit Magento, Shopify und WooCommerce.' },
  { q: 'Was kostet eine Zusammenarbeit?', a: 'Das hängt vom Projekt ab. Nach dem Erstgespräch bekommst Du eine Einschätzung und ein Angebot nach Aufwand oder zum Festpreis. Wartungspakete beginnen bei 150 € im Monat.' },
  { q: 'Hilfst Du auch, wenn der Shop gerade nicht läuft?', a: 'Ja. Für Wartungskunden gilt: Steht der Shop oder der Checkout, reagiere ich werktags innerhalb von 4 Stunden, bei allem anderen innerhalb von 24 Stunden. Wenn Du noch kein Kunde bist, schreib mir trotzdem. Ich helfe, sobald es meine Kapazität erlaubt.' },
  { q: 'Was ist in der Wartung enthalten?', a: 'Shopware- und Plugin-Updates, die ich vorher auf einer Testumgebung prüfe, tägliche Backups, Monitoring, regelmäßige Sicherheits-Checks und ein festes Stundenkontingent für kleine Anpassungen. Ab 150 € im Monat, monatlich kündbar.' },
  { q: 'Wie schnell kannst Du starten?', a: `Meine aktuelle Verfügbarkeit steht oben im Terminal. Ein Erstgespräch kannst Du direkt im Kalender buchen.` },
  { q: 'Arbeitest Du nur remote?', a: 'Ja, zu 100 %. Ich sitze in Hagen (NRW) und arbeite für Kunden in Deutschland, Österreich und der Schweiz.' },
]
