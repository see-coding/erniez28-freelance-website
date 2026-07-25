# Auftrag an Hermes: erniez28.de Website-Build (Zwei-Spuren-Plan)

> Diese Datei ist die verbindliche Bauanleitung. Bitte alle vier Quell-Dateien im `uploads/`-Ordner vollständig lesen, bevor irgendetwas geschrieben wird.
>
> **Umsetzender Agent:** Hermes-Profil `frontend-developer` (LLM: Kimi3). Ausführung erfolgt durch diesen Agenten; Ernie gibt frei und reviewt.
>
> **⭐ Oberste Regel (schlägt alles andere in dieser Datei):** Usability und die klare Darstellung der Information haben höchste Priorität. Jeder kreative Effekt, jede Design-Spinnerei ist diesem Ziel untergeordnet. Content wird **immer** vollständig responsiv dargestellt und muss auf allen Devices (Desktop, Tablet, Smartphone) perfekt funktionieren – wenn ein Effekt das gefährdet, hat der Effekt zu weichen.
>
> **🎨 Kreative Freiheit:** Ernies Design-Ideen (z. B. das ViveQode-Poster über dem Monitor) sind Wunsch-Richtungen, keine starren Vorgaben. Wenn eine Idee technisch unverhältnismäßig aufwändig oder für die Usability schädlich ist, darf und soll Kimi eigenständig das bestmögliche Konzept wählen, das die Intention einfängt, ohne sie 1:1 zu erzwingen. Ähnlich-aber-solide schlägt originalgetreu-aber-fragil. Im Zweifel: die einfachere, robustere Lösung, und die Abweichung kurz in der Rückmeldung an Ernie begründen.
>
> **🖼️ Referenzbilder:** Ernie liefert 1–2 Vorschaubilder nach, die seine Designidee grob skizzieren. Sobald vorhanden, liegen sie im Projektordner (voraussichtlich `uploads/`) und dienen als Orientierung – ebenfalls als Richtung, nicht als pixelgenaue Vorgabe.

## 0. Ausgangslage & Entscheidung

Es gibt zwei sehr unterschiedliche Konzepte im Projekt:

- **Spur A (Lean-Version):** einfache, schnelle One-Pager-Seite im Terminal-/Git-Log-Stil. Bereits als Entwurf vorhanden (`erniez28.dc.html`).
- **Spur B (Web-OS-Vision):** vollständiges Browser-Betriebssystem als Portfolio (Desktop, Dock, Fenster, Apps), basierend auf dem bestehenden SEE-gOS-Projekt.

**Ernies Entscheidung:** Beide Spuren laufen **parallel**. Spur A hat Priorität und geht zuerst live (Akquise braucht jetzt eine Seite). Spur B läuft im Hintergrund weiter, ohne Deadline und ohne Spur A oder die Akquise-Zeitblöcke zu blockieren.

**Wichtigste Leitplanke:** Spur B ersetzt Spur A niemals automatisch. Ein Wechsel passiert erst nach explizitem Review und Freigabe durch Ernie.

---

## 1. Quell-Dateien und ihre Rolle

| Datei | Rolle |
|---|---|
| `uploads/About-Ernie.md` | Persönliche Bio-Erzählung – Quelle für Kurz-Bio (Spur A) und volle Werdegangs-Timeline (Spur B) |
| `uploads/erniez28-creative-brief.md` | Design-Grundlage Spur A: Farb-Tokens, Typografie, Struktur, Referenzen-Feed-Konzept |
| `uploads/Entwicklerbriefing_Persoenliche_OS_Webseite.md` | Vollständige Spezifikation für Spur B (Desktop-Metapher, Apps, technischer Aufbau) |
| `erniez28.dc.html` + `support.js` | Bestehender Entwurf, Ausgangspunkt für Spur A |
| `IDEA.md` | Enthält die genaue Spezifikation für das QR-Code-Feature – siehe Abschnitt 3 unten, unbedingt beachten |

**Nicht als Inhaltsquelle verwenden:** `.thumbnail`, `README.md` (nur Repo-Titel, keine Design-/Content-Vorgabe).

---

## 2. SPUR A (PRIORITÄT) – Lean-Version fertigstellen & live schalten

### Schritt 1: Bestandsaufnahme

- `erniez28.dc.html` komplett lesen (318 Zeilen), `support.js` prüfen.
- Der Entwurf nutzt ein Templating-Format (`x-dc`, `{{ }}`, `sc-for`, `style-hover`). Selbst klären: Ist das direkt deploybar, oder muss es in reines, abhängigkeitsfreies HTML/CSS/JS übersetzt werden? Ziel: eine Datei (oder ein kleines Set), die auf jedem normalen Webserver ohne Sonderlaufzeit läuft.

### Schritt 2: Platzhalter durch echte Inhalte ersetzen

- `{{ stack }}` → Shopware 6, PHP, Twig, Docker, n8n, React, Python
- Changelog-Einträge (echte Daten, neueste zuerst):
  - `2025-12-15  [cert]     Google Cybersecurity Professional Certificate`
  - `2025-10-xx  [shipped]  Shopware-PlentyONE-Connector: sichere Middleware live`
  - `2025-08-06  [cert]     Google IT Support Professional Certificate`
  - `2025-05-xx  [plugin]   SW6-Plugin "Landingpage Visibility Switch" veröffentlicht`
- Zertifikat-Verify-Links: Coursera-Verify-URLs aus dem Karriereprofil ergänzen
- Kurz-Bio-Abschnitt: 3–4 Sätze, destilliert aus `About-Ernie.md` (autodidaktischer Weg, Umwege über Bäcker/Elektriker, seit 2013 selbstständig, Leidenschaft Technik). **Nicht** die volle "Pixelkrieger"-Erzählung hier verwenden – die gehört später zu Spur B.
- Kontakt: E-Mail, GitHub (`see-coding`), LinkedIn, Terminbuchung (Platzhalter-Link, bis Cal.com eingerichtet ist)

### Schritt 3: QR-Code-Feature (Spezifikation aus `IDEA.md` – bitte genau so umsetzen)

- Route **`/vq-link`** liefert dieselbe Startseite aus wie `/`.
- Beim Laden prüft JS: `window.location.pathname === '/vq-link'`.
- Falls ja: Ein Modal öffnet sich automatisch, mit einem Werbehinweis zu Ernies Projekt **ViveQode** (Dynamic-QR-Code- & Smart-Links-Plattform) und einem Link zu `https://viveqode.com`.
- Modal-Verhalten: einmal pro Sitzung anzeigen (sessionStorage-Flag setzen, kein erneutes Aufpoppen bei Navigation innerhalb derselben Sitzung), schließbar über X-Button, Klick außerhalb und Escape-Taste.
- Modal-Design: im gleichen Look wie der Rest der Seite (Espresso-Hintergrund, Amber-Akzent, Moos-Grün als Detail – Tokens aus `erniez28-creative-brief.md` übernehmen).
- Auf `/` selbst (normaler Besuch ohne diesen Pfad) darf das Modal **nicht** erscheinen.
- Nach der technischen Umsetzung: ein QR-Code-Bild erzeugen, das auf `https://erniez28.de/vq-link` zeigt (ein einfacher QR-Generator reicht, kein neues Tool nötig).

> **Kreative Vision für später (Spur B / WebOS):** In der Lean-Version (jetzt) ist es ein klassisches Modal. Sobald das WebOS steht, soll dieses ViveQode-Werbe-Element in die Desktop-Metapher eingebettet werden – z. B. als ViveQode-Werbeposter, das über dem dargestellten Monitor/Bildschirm hängt, oder als Werbe-Einblendung auf dem simulierten Bildschirm der Seite. Kimi soll das Modal in Spur A so kapseln (eigene Komponente/Funktion, klar benannt), dass die spätere Umwandlung in die Poster-/Screen-Variante leicht möglich ist, ohne alles neu zu bauen.

### Schritt 4: Qualitätscheck vor dem Go-Live

- Responsive bis Mobile getestet
- `prefers-reduced-motion` wird respektiert (Animationen dann reduziert/deaktiviert)
- Sichtbarer Tastatur-Fokus auf allen interaktiven Elementen
- Ladezeit klein halten – keine schweren Animationsbibliotheken, Performance ist Teil des Pitches

### Schritt 5: Deployment

- Zieldomain: `erniez28.de`
- Bestehende VPS-Infrastruktur nutzen (Docker + Traefik, gleiche Routing-Logik wie `zentrale.erniez28.de` / `n8n.erniez28.de`): neuen Traefik-Host-Eintrag für `erniez28.de` (root + `www`) anlegen, einfacher Nginx- oder statischer Container reicht.
- Nach dem Deployment kurz prüfen: Seite lädt korrekt, `/vq-link`-Route funktioniert und zeigt das Modal, Zertifikat-Links funktionieren, mobile Ansicht ist sauber.

### Ergebnis Spur A

Kurzer Statusbericht an Ernie: was geändert wurde, wo die Seite live ist, was noch offen ist (z. B. Cal.com-Integration, falls noch nicht eingerichtet).

---

## 3. SPUR B (HINTERGRUND, KEINE DEADLINE) – Web-OS-Vision

### Leitplanken

- Läuft **niemals** in den für Akquise reservierten Zeitblöcken (siehe Wochenstruktur-Notiz im Obsidian-Vault) – nur im Samstags-/Experimentier-Block oder wenn Ernie es explizit freigibt.
- Ersetzt Spur A nicht automatisch – erst nach Review und Freigabe durch Ernie.
- Als eigenständiges Projekt in Hermes' eigenem Kanban-System anlegen, mit Meilensteinen statt einem großen Blocking-Task.
- Richtwert: max. 3–4 Stunden pro Woche investieren, außerhalb des Samstags-Blocks nur nach Rücksprache. Ernie kann diesen Wert jederzeit anpassen.

### Empfohlene Meilenstein-Reihenfolge

1. **SEE-gOS-Codebase sichten:** was ist wiederverwendbar (Fensterverwaltung, Dock, Taskleiste, Theme-System, Glassmorphism-Grundstil) vs. was muss neu/vereinfacht werden (voller Login-Zwang entfällt für öffentliche Inhalte – siehe Abschnitt 5 & 17 im Entwicklerbriefing).
2. **App-Registry definieren:** Über mich, Werdegang (Timeline aus `About-Ernie.md`), Projekte/Case-Studies, Leistungen, Skills, Kontakt, Terminal (als Easter Egg, siehe Abschnitt 7.2 im Briefing).
3. **Mobile-Fallback-Konzept umsetzen:** Vollbild-Sheets statt frei verschiebbarer Fenster auf Smartphones (Abschnitt 14 im Briefing).
4. **SEO-fähiges Rendering wählen:** Next.js (im Briefing empfohlen) – jede App/Route bekommt eigene URL und eigene Metadaten (Abschnitt 16).
5. **Barrierefreiheits-Pass:** vollständige Tastaturbedienung, sichtbare Fokuszustände, Escape-Handling (Abschnitt 15).
6. **Inhalte einpflegen:** volle Werdegangs-Timeline aus `About-Ernie.md` (die "Pixelkrieger"-Erzählung passt hier perfekt zur Level-Up-/Skill-Tree-Metapher), Projekte aus `erniez28-creative-brief.md`.
7. **Staging-Deployment:** auf separater Subdomain (z. B. `os.erniez28.de` oder `beta.erniez28.de`) – **nicht** auf die Hauptdomain, bis Ernie es ausdrücklich freigibt.

### Fortschritts-Kommunikation

Nach jedem abgeschlossenen Meilenstein: eine kurze Notiz (kein aufwändiger Bericht) – was fertig ist, was als Nächstes ansteht.

---

## 4. Generelle Rückmeldung an Ernie

Nach Abschluss von Spur A und nach jedem Spur-B-Meilenstein: kurze, klare Zusammenfassung – was wurde gebaut, wo liegt/läuft es, welche Entscheidungen wurden getroffen, was ist offen.
