// Ernies Quest: Lebenslauf als Jump'n'Run. Quelle: Ernies handschriftliche Story (assets/erniez-story).
// Jede Welt hat eine eigene Palette. Die Grafik "wächst" mit: Game Boy → Windows 95 → … → heute.

const gbFigure = { o: '#0f380f', c: '#0f380f', r: '#8bac0f', s: '#8bac0f', g: '#0f380f', e: '#0f380f', b: '#306230', j: '#306230', n: '#0f380f', p: '#0f380f', h: '#0f380f', t: '#306230', l: '#8bac0f' }
const vgaFigure = { o: '#000000', c: '#aa0000', r: '#ffffff', s: '#ffaa55', g: '#000000', e: '#000000', b: '#555555', j: '#aaaaaa', n: '#aa0000', p: '#0000aa', h: '#000000', t: '#0000aa', l: '#ffffff' }
const modernFigure = { o: '#141010', c: '#1e1e22', r: '#c8202a', s: '#d9a27e', g: '#2a1e18', e: '#1a1a1a', b: '#8d8883', j: '#b8b2a8', n: '#8a1c1c', p: '#2a2c3a', h: '#111111', t: '#2f6fd0', l: '#f0f0f0' }

export const worlds = [
  {
    id: 'kinderzimmer', name: 'Kinderzimmer', years: '1983–1995', sprite: 'kid',
    palette: { bg: '#9bbc0f', bg2: '#8bac0f', ground: '#306230', 1: '#0f380f', 2: '#306230', 3: '#8bac0f', 4: '#d6eca0', a: '#0f380f', ink: '#0f380f' },
    figure: gbFigure, pattern: 'dots',
  },
  {
    id: 'windows', name: 'Windows & Internet', years: '1996–2000', sprite: 'kid',
    palette: { bg: '#008080', bg2: '#006a6a', ground: '#c0c0c0', 1: '#000000', 2: '#808080', 3: '#c0c0c0', 4: '#ffffff', a: '#000080', ink: '#ffffff' },
    figure: vgaFigure, pattern: 'icons',
  },
  {
    id: 'backstube', name: 'Backstube', years: '2001–2004', sprite: 'ernie',
    palette: { bg: '#2b1a10', bg2: '#3a2416', ground: '#6b3e1f', 1: '#1c120c', 2: '#6b3e1f', 3: '#c77d3a', 4: '#f3e2c3', a: '#ff8a3d', ink: '#f3e2c3' },
    figure: { ...modernFigure, b: '#5b4a3c' }, pattern: 'tiles',
  },
  {
    id: 'baustelle', name: 'Baustelle & Werkstatt', years: '2005–2010', sprite: 'ernie',
    palette: { bg: '#23262b', bg2: '#2d3137', ground: '#4a4f57', 1: '#121418', 2: '#4a4f57', 3: '#9aa1aa', 4: '#e8e2d0', a: '#f2c230', ink: '#e8e2d0' },
    figure: { ...modernFigure, b: '#6a625a' }, pattern: 'bricks',
  },
  {
    id: 'hoersaal', name: 'Hörsaal & Helpdesk', years: '2011–2017', sprite: 'ernie',
    palette: { bg: '#1f3a2e', bg2: '#244536', ground: '#2f5a45', 1: '#0f1f18', 2: '#2f5a45', 3: '#8fb8a0', 4: '#eef3e8', a: '#d9c36b', ink: '#eef3e8' },
    figure: { ...modernFigure, b: '#7a746e' }, pattern: 'chalk',
  },
  {
    id: 'agentur', name: 'Agenturen & Shops', years: '2017–2023', sprite: 'ernie',
    palette: { bg: '#15182b', bg2: '#1c2040', ground: '#2c3160', 1: '#0b0d1a', 2: '#2c3160', 3: '#6b73c9', 4: '#e6e8ff', a: '#ff4fa3', ink: '#e6e8ff' },
    figure: modernFigure, pattern: 'skyline',
  },
  {
    id: 'erniez28', name: 'erniez28', years: '2024–heute', sprite: 'ernie',
    palette: { bg: '#1a1614', bg2: '#221c19', ground: '#3a302a', 1: '#0f0c0a', 2: '#3a302a', 3: '#8a7a6d', 4: '#efe6dc', a: '#e8603c', ink: '#efe6dc' },
    figure: modernFigure, pattern: 'code',
  },
]

export const stations = [
  { world: 'kinderzimmer', year: '1983', title: 'Spawn-Punkt', prop: 'bottle', loot: 'Startausrüstung',
    text: 'Ich bin 1983 geboren. Im selben Jahr wurde das Internet auf TCP/IP umgestellt und das Domain Name System erfunden. Zufall? Ich nenne es Timing.' },
  { world: 'kinderzimmer', year: '1986', title: 'Atari 2600', prop: 'tv', loot: 'Joystick',
    text: 'Pünktlich zu meiner Geburt hatte mein Vater einen Atari 2600 angeschafft. Mit drei Jahren habe ich zum ersten Mal Pac-Man die Pillen fressen lassen. Da fing es an.' },
  { world: 'kinderzimmer', year: '1990', title: 'Game Boy', prop: 'gameboy', loot: 'Game Boy',
    text: 'Meine Eltern hatten das Geheimrezept gefunden, mich ruhig zu bekommen: ein Game Boy zu Weihnachten, direkt im Erscheinungsjahr.' },
  { world: 'kinderzimmer', year: '1992', title: 'Super Nintendo', prop: 'snes', loot: 'SNES-Controller',
    text: 'Kaum war ich an den Handheld gewöhnt, stand ein Super Nintendo im Zimmer. Es folgten sehr viele Stunden mit Mario und Yoshi.' },
  { world: 'kinderzimmer', year: '1994', title: 'Der erste eigene PC', prop: 'pcDos', loot: 'DOS-Kenntnisse',
    text: 'Mit zehn bekam ich meinen ersten Computer, einen 386er aus einer Apotheke, die neue Rechner angeschafft hatte. Weiße Schrift auf Schwarz, DOS-Befehle pauken. Ein Junge wollte mir Jahre später nicht glauben, dass ich einen PC ohne Windows hatte. Der sei dann ja wohl kaputt gewesen.' },

  { world: 'windows', year: '1996', title: 'Pentium 133 & Windows 95', prop: 'pcWin', loot: 'Englisch',
    text: 'Mein Vater kaufte einen Pentium mit 133 MHz. Englisch habe ich gelernt, weil ich verstehen wollte, was Beavis und Butt-Head im Spiel erzählen. Seitdem bin ich der PC-Support für die ganze Verwandtschaft. Das hat sich bis heute nicht geändert.' },
  { world: 'windows', year: '1997', title: 'Schülerpraktikum', prop: 'floppy', loot: 'Diskette',
    text: 'Bei der Leidenschaft blieb keine Wahl: Schülerpraktikum in der Softwareentwicklung. Merk Dir das, es taucht später noch mal auf.' },
  { world: 'windows', year: '1998', title: 'CD-Brenner & erste Hacks', prop: 'cd', loot: 'Rohling',
    text: 'Mit dem CD-Brenner kam die Musik, mit dem frühen Internet das Rumprobieren. Damit ich bei PC-Problemen in der Familie nicht mehr hinfahren musste, hatte ich mir einen Fernzugang eingerichtet. Heute heißt so etwas TeamViewer. Nebenbei gab es Klingeltöne und Logos für die Handys von Bekannten, gegen Taschengeld.' },
  { world: 'windows', year: '2000', title: 'Internet & Abi, Teil 1', prop: 'globe', loot: 'Modem',
    text: 'Die Apokalypse zur Jahrtausendwende fiel aus. Dafür hatte jetzt jeder einen PC, ich sogar einen eigenen im Zimmer. Nach dem Sommer fing ich mit dem Fachabitur an.' },

  { world: 'backstube', year: '2001', title: 'Bäckerlehre', prop: 'oven', loot: 'Brotschieber',
    text: 'Das Abi habe ich abgebrochen, ein Job in der IT war damals nicht realistisch. Also der Rat der Erwachsenen: Mach erst mal eine Ausbildung. Die Bäckerei lag drei Minuten Fußweg von zu Hause. Und der Job hat mir tatsächlich Spaß gemacht.' },
  { world: 'backstube', year: '2004', title: 'Gesellenbrief', prop: 'bread', loot: 'Gesellenbrief',
    text: 'Gesellenbrief in der Tasche. Ein Konditor zeigte mir, wie man HTML-Seiten baut, meine ersten Webseiten entstanden abends zu Hause. Tagsüber: Möbel schleppen, Werkzeugmacherei, dann eine Elektrofirma.' },

  { world: 'baustelle', year: '2005', title: 'Mit Opa Haase auf dem Bau', prop: 'ladder', loot: 'Kabeltrommel',
    text: 'Altbausanierung mit Opa Haase, WDR 4 im Keller. Alle hatten mich vor ihm gewarnt, wir wurden ein Dream-Team. Danach holte mich der Chef in die Werkstatt: Regeln, Messen, Steuern.' },
  { world: 'baustelle', year: '2008', title: 'Abi, Teil 2', prop: 'gradcap', loot: 'Hochschulreife',
    text: 'In der Werkstatt merkte ich, dass ich dort nicht alt werde. Meine Chefs haben mich unterstützt: Abitur auf dem zweiten Bildungsweg, nebenher weiter in Teilzeit bei den Elektrikern. Ziel: doch noch mit Computern arbeiten.' },

  { world: 'hoersaal', year: '2011', title: 'Studium & Helpdesk', prop: 'books', loot: 'Headset',
    text: 'Wirtschaftsinformatik an der Fachhochschule, dazu ein IT-Job an der FernUniversität in Hagen. Wir waren quasi die Konkurrenz zum internen Helpdesk. Sechs Jahre lang Fehler eingrenzen und Menschen helfen, deren Rechner andere Pläne hatten.' },
  { world: 'hoersaal', year: '2013', title: 'IT-SEE Service', prop: 'shopSign', loot: 'Gewerbeschein',
    text: 'Nebenher melde ich mein erstes Gewerbe an: IT-SEE Service. Websites, Technik, Support für Kunden aus der Region.' },
  { world: 'hoersaal', year: '2015', title: 'Studium beendet', prop: 'door', loot: 'Erfahrung',
    text: 'Das Studium habe ich ohne Abschluss beendet. Das Wissen ist geblieben, der Job an der Uni lief bis 2017 weiter.' },

  { world: 'agentur', year: '2017', title: 'Webentwickler', prop: 'monitors', loot: '360°-Viewer',
    text: 'Im Vorstellungsgespräch wurde ich gefragt, was ich in meinem Schulpraktikum gemacht habe. Antwort: Softwareentwicklung. Eingestellt. In der Agentur ging es um Websites, Automatisierung, Kataloge, WordPress, TYPO3, E-Commerce und einen eigenen 360°-Packshot-Viewer.' },
  { world: 'agentur', year: '2020', title: 'PHP 5.3 bis 8', prop: 'barrel', loot: 'Legacy-Code',
    text: 'Ein paar Monate Debugging interner Anwendungen in der Mineralölbranche, PHP von Version 5.3 bis 8. Parallel wird aus IT-SEE die SEE Service Group, mit neuer Gewerbeanmeldung.' },
  { world: 'agentur', year: '2021', title: 'E-Commerce, ganz konkret', prop: 'cart', loot: '50+ Shops',
    text: 'Softwareentwicklung und stellvertretende Leitung E-Commerce. Magento, Shopware 5 und 6, Shopify, WooCommerce. Über 50 Kundensysteme, Support, Projektplanung und viele direkte Gespräche mit Kunden.' },
  { world: 'agentur', year: '2022', title: 'Leitung Web', prop: 'crown', loot: 'Verantwortung',
    text: 'Full-Stack-Entwickler und Leitung der Web-Abteilung. Unter anderem betreue ich den Onlineshop einer großen Bäckerei. Der gelernte Bäcker kümmert sich um den Bäcker-Shop. Manche Kreise schließen sich.' },

  { world: 'erniez28', year: '2024', title: 'Eigener Shop-Betrieb', prop: 'shirt', loot: 'Live-Shop',
    text: 'Mit Freunden baue ich AintLikeYou Clothing auf, einen Streetwear-Shop auf Shopware 6. Eigenes Theme, eigene Plugins und echter Betrieb mit allem, was dazugehört.' },
  { world: 'erniez28', year: '2025', title: 'Neuer Skill-Tree: Security', prop: 'shield', loot: '2 Zertifikate',
    text: 'Weiterbildung Cybersecurity, dazu die Google-Zertifikate IT Support und Cybersecurity. Seitdem schaue ich bei jedem Shop auch auf CVEs, Rechte und Angriffsflächen.' },
  { world: 'erniez28', year: '2025', title: 'Eigenes Plugin', prop: 'plugin', loot: 'Plugin v1.4.0',
    text: 'Mein Plugin LandingPage Show/Hide Switch geht live, inzwischen in Version 1.4.0. Cache-sicher, sauber neu installierbar und mit den Pflichtangaben nach EU-GPSR.' },
  { world: 'erniez28', year: '2026', title: 'erniez28', prop: 'laptop', loot: 'open_for_projects',
    text: 'Heute entwickle ich Shopware für Agenturen und Shopbetreiber, remote im ganzen DACH-Raum. Die Neugier vom 386er ist geblieben. Die Werkzeuge für die Fehlersuche sind besser geworden.' },
]
