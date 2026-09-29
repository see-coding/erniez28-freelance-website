# Deployment: erniez28.de

Die Website wird mit Astro als statische Seite gebaut. Auf dem Webserver ist keine Node-Runtime nötig.

## Build

```sh
npm ci
npm run build
```

Das Ergebnis liegt in `dist/`. Der **komplette Inhalt** von `dist/` gehört ins Document-Root der Domain, inklusive der versteckten Datei `.htaccess`.

## Apache (.htaccess)

`public/.htaccess` wird beim Build automatisch nach `dist/` kopiert. Sie enthält:

- die Route `/vq-link` für den ViveQode-QR-Code (Startseite mit Hinweis),
- `ErrorDocument 404 /404.html`,
- Kompression, Cache-Regeln (gehashte Assets in `/_astro/` ein Jahr, HTML immer frisch) und Sicherheitsheader.

## Nach dem Upload prüfen

| URL | Erwartung |
|---|---|
| `/` | Startseite mit Loader, Terminal-Hero und Projektbrief-Link |
| `/leistungen/` und vier Unterseiten | inkl. `/leistungen/shopware-wartung/` |
| `/portfolio/` | drei Fallstudien |
| `/whoami/` | Ernies Quest (scrollbares Pixel-Spiel) |
| `/journal/` | drei Fachartikel |
| `/projekt-besprechen/` | Projektbrief; Rückmeldebitte braucht die Lead-API |
| `/vq-link` | Startseite mit ViveQode-Hinweis |
| `/gibt-es-nicht` | eigene 404-Seite mit Status 404 |
| `/sitemap.xml`, `/robots.txt` | vorhanden |

## Lead-API (optional, separat)

Die Rückmeldebitte im Projektbrief sendet an `https://api.erniez28.de/api/anfrage` (siehe `.env.example`). Der Dienst liegt in `services/lead-api/` und läuft getrennt auf dem VPS (siehe dortige README). Ohne API bleiben E-Mail und Cal.com-Buchung als Kontaktwege nutzbar.

## Vor dem Livegang

- Datenschutzerklärung um Hosting-Anbieter und Speicherfristen ergänzen (`src/pages/datenschutz.astro`), danach `noindex` dort entfernen.
- Vorschaubild für Social Media (1200 × 630) unter `public/images/` ablegen und im Layout eintragen.
- DNS umstellen, danach Search Console einrichten und die Sitemap einreichen.
