# Deployment: erniez28.de auf dem Webhosting-Server

Die Website ist rein statisch — kein Build-Step, keine Server-Runtime nötig.
Es genügt, die Dateien per FTP/SFTP in das Document-Root der Domain hochzuladen.

## 1. Upload-Checkliste

Diese Dateien und Ordner hochladen:

```
index.html            → in das Document-Root (z.B. /htdocs/, /httpdocs/, /www/)
assets/               → komplett als Ordner mit allen Inhalten
.htaccess             → in das Document-Root (falls der Hoster Apache nutzt)
```

**Wichtig:** Die alte Demo-Seite (`erniez28.dc.html`, `support.js`) vorher
entfernen oder umbenennen, damit sie nicht versehentlich als Startseite greift.

## 2. /vq-link einrichten

Das ViveQode-Modal öffnet sich nur, wenn die URL `/vq-link` lautet.
Dafür muss der Server bei diesem Pfad die `index.html` ausliefern
**ohne Weiterleitung** (die URL muss erhalten bleiben).

- **Apache-Hoster** (z.B. IONOS, Strato, All-Inkl): liegt an der beigelegten
  `.htaccess` — nichts weiter zu tun.
- **Eigener Nginx-VHost**: die beigelegte `nginx-erniez28.conf` als Vorlage
  verwenden (`location = /vq-link { try_files /index.html =404; }`).

## 3. Nach dem Upload testen

| Test | Erwartung |
|---|---|
| `https://erniez28.de` | Neue Seite mit Terminal-Hero lädt |
| `https://erniez28.de/vq-link` | Seite lädt, ViveQode-Modal öffnet nach ~1 s |
| Modal schließen, Seite neu laden | Modal kommt nicht erneut (sessionStorage) |
| `https://erniez28.de/assets/g1.jpg` | Bild lädt direkt |
| Zertifikat-Links | Coursera-Verify-Seiten öffnen |
| Mobil (DevTools → iPhone) | Layout stapelt sauber, kein horizontales Scrollen |

## 4. Troubleshooting

- **404 auf /vq-link**: Rewrite-Regel greift nicht → Hoster-Support fragen,
  ob mod_rewrite aktiv ist (Apache) oder Nginx-Regel ergänzen.
- **Modal öffnet nicht**: Browser-Konsole prüfen (`F12`). Pfad muss exakt
  `/vq-link` oder `/vq-link/` sein; sessionStorage ggf. leeren.
- **Alte Seite sichtbar**: Browser-Cache leeren (Strg+Shift+R) und prüfen,
  ob `index.html` wirklich im Root liegt.
