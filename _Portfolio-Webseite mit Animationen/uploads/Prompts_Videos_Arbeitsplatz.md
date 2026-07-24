# Prompts für Videos: Erniez28 Developer/Freelancer Website

Diese zwei Prompts ergänzen `Prompts_Vorschaubilder_Arbeitsplatz.md` und sind für **Higgsfield** (oder vergleichbare Video-Generatoren wie Runway, Kling, Luma) gedacht. Sie erzeugen die zwei fehlenden Video-Assets der Website:

- `assets/hero.mp4` — Hero-Hintergrund, bewegt sich vor dem ersten Scroll
- `assets/middle.mp4` — Mittelstück der Gallery-Band, vertikal

## Wichtigster Workflow-Hinweis: Image-to-Video

**Nicht Text-to-Video verwenden.** Lade stattdessen die bereits generierten Standbilder als Start-Frame hoch — so bleiben Szene, Materialien, Licht und Farbwelt exakt identisch mit dem Rest der Seite:

| Video | Start-Frame (hochladen) | Datei |
|---|---|---|
| `hero.mp4` | Hero-Kampagnenbild | `assets/g3.jpg` |
| `middle.mp4` | Makro-Materialbild | `assets/g2.jpg` |

## Video-Gesetze (gelten für beide Assets)

- Kamera-Bewegung ist auf **eine Achse** gesperrt, kein Drift, kein zufälliger Zoom
- **Konstante Geschwindigkeit**, keine Beschleunigung, keine Speed-Ramps
- Die beiden Videos müssen sich wie **Geschwister** anfühlen: gleiche Szene, gleiches Licht, gleiche Farbwelt — nur Bewegung und Bildausschnitt unterscheiden sich
- **Loop statt Transformation:** erstes und letztes Frame sollen übereinstimmen
- Konsistenz schlägt Spektakel
- Keine Menschen, kein lesbarer Text, keine Logos, kein Morphing, kein Neon

## Technische Einstellungen

| Parameter | hero.mp4 | middle.mp4 |
|---|---|---|
| Modus | Image-to-Video | Image-to-Video |
| Seitenverhältnis | **16:9** (Vollbild-Hero) | **3:4** oder 9:16 vertikal (wird per `object-fit: cover` beschnitten) |
| Dauer | 6–10 Sekunden | 5–8 Sekunden |
| Motion Strength | niedrigster Wert / "subtle" | niedrig / "subtle" |
| Kamera | static / locked | slide (lateral), falls wählbar |

---

## Video 1 – hero.mp4 (Ambient Loop, statische Kamera)

**Gedanke:** Der Hero darf nicht zoomen oder fahren — er soll ruhig atmen. Die Bewegung kommt ausschließlich aus dem Licht: Monitor-Glühen, Lampen-Flackern, eine kleine grüne Status-LED (das Signatur-Grün der Seite). Kamera bleibt komplett starr, damit das Video nahtlos loopt.

```text
Animate this exact scene into a seamless ambient loop. The camera is completely static and locked: no pan, no tilt, no zoom, no drift. Only subtle in-scene motion: the dark monitor's soft glow breathes very gently, the warm amber desk lamp flickers almost imperceptibly, a tiny green status LED blinks slowly on the desk hardware, faint dust particles drift slowly through the lamp light. Constant, calm, meditative pacing. Lighting, materials, colors and composition must remain identical to the source image: charcoal and near-black room, walnut desk, muted amber light pool, restrained monitor glow. Duration: 8 seconds, designed to loop seamlessly, last frame matches first frame. Ultra-realistic, cinematic, premium.

Avoid: camera movement, object morphing, shape changes, people, readable text, logos, screen interfaces, code, light strobing, color shifts, warping wood or metal, new objects appearing.
```

**Alternative (nur falls gewünscht):** Statt Loop eine einmalige, sehr langsame Kamerafahrt auf den Monitor (das Intro aus dem Designkonzept). Dann konstante Geschwindigkeit, 8–10 s, und in der Website das letzte Frame einfrieren lassen (`loop` entfernen). Prompt-Zusatz: `Very slow, constant-speed camera push-in toward the central monitor, locked strictly to the forward axis, no pan, no tilt, no acceleration.`

---

## Video 2 – middle.mp4 (Lateraler Gleiter, Makro-Welt)

**Gedanke:** Das Geschwister-Video zum Hero: gleiche Nacht, gleiche Materialien, aber andere Bewegung und anderer Ausschnitt. Ein langsamer, gleichmäßiger Gleitflug über Walnussmaserung, Metallkante und Papierskizze — passend zu `g2.jpg`, das direkt daneben hängt. Vertikal, weil die Gallery-Band 3:4-Kacheln nutzt.

```text
Animate this exact macro scene into a slow, constant lateral camera slide, locked strictly to the horizontal axis at perfectly steady velocity: no acceleration, no deceleration, no vertical drift, no zoom, no rotation. The camera glides across the walnut wood grain, the brushed metal edge and the paper sketch, revealing the material textures in one continuous, even motion. The warm amber highlight travels softly across the surfaces; a subtle moss-green reflection may appear once at the metal edge. Depth of field stays shallow and stable; focus does not hunt or shift. Duration: 6 seconds, constant speed throughout, final frame should visually match the first frame so the loop cut is nearly invisible. Ultra-realistic macro cinematography, premium material study, same color world as the source image: charcoal, walnut brown, muted amber, deep shadow.

Avoid: object morphing, warping textures, new objects appearing, people, hands, readable text, logos, camera shake, speed ramps, rotation, lens breathing, color shifts.
```

**Falls der Loop-Schnitt sichtbar ist:** In `index.html` im `<video>`-Tag das `loop`-Attribut belassen und die Geschwindigkeit im Generator reduzieren — oder per kleinem JS auf Ping-Pong (vor/zurück) umstellen. Einfachste Lösung: im Generator "seamless loop" wählen, falls angeboten.

---

## Ablehnungs-Kriterien (vor dem Einbinden prüfen)

Ein Asset wird ersetzt, wenn:

- der Monitor plötzlich Inhalte, Text oder UI zeigt
- Holz, Metall oder Papier sich verformen oder "schwimmen" (typisches Video-Morphing)
- die Kamera zittert, driftet oder ungewollt zoomt
- Menschen, Hände, Logos oder lesbarer Text auftauchen
- die Farbwelt von Espresso/Amber/Moos-Grün abweicht
- das Video nach 2 Sekunden wie KI aussieht

Nach erfolgreicher Generierung: Dateien als `assets/hero.mp4` und `assets/middle.mp4` speichern — die Pfade stehen bereits in `index.html`, es ist keine Code-Änderung nötig.
