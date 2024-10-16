# Iron Dice Roller

Iron Dice Roller ist eine Webanwendung für Tabletop-Rollenspiele, insbesondere für solche, die einen W6 (6-seitigen Würfel) und zwei W10 (10-seitige Würfel) für Aktions- und Herausforderungsauflösungen verwenden. Diese App ist speziell auf das Ironsworn-RPG-System zugeschnitten, kann aber für ähnliche Spielmechaniken angepasst werden.

## Inhaltsverzeichnis

1. [Einführung](#einführung)
2. [Funktionen](#funktionen)
3. [Funktionsweise](#funktionsweise)
4. [Ordnerstruktur](#ordnerstruktur)
5. [Einrichtung und Verwendung](#einrichtung-und-verwendung)
6. [Mitwirken](#mitwirken)
7. [Lizenz](#lizenz)

## Einführung

In Ironsworn sind Würfelwürfe das Herzstück des Aktionsauflösungssystems. Das Spiel verwendet eine einzigartige Kombination aus einem W6 und zwei W10, um das Ergebnis von Spieleraktionen und Herausforderungen zu bestimmen. Hier ist eine kurze Erklärung, wie die Würfelmechanik funktioniert:

Ironsworn verwendet einen W6 (genannt Aktionswürfel) und zwei W10 (genannt Herausforderungswürfel) für alle Würfe. Der Aktionswürfel repräsentiert die Anstrengung und Fähigkeit Ihres Charakters, während die Herausforderungswürfel die Schwierigkeit der Aufgabe darstellen.

Wenn Sie eine Aktion versuchen, würfeln Sie alle drei Würfel gleichzeitig. Sie addieren Ihren relevanten Wert und eventuelle Boni zum Ergebnis des Aktionswürfels. Dann vergleichen Sie diese Summe mit jedem der Herausforderungswürfel:

- Wenn Ihr Aktionswürfelergebnis beide Herausforderungswürfel übertrifft, erzielen Sie einen starken Treffer (vollen Erfolg).
- Wenn Ihr Aktionswürfelergebnis nur einen Herausforderungswürfel übertrifft, erhalten Sie einen schwachen Treffer (teilweisen Erfolg).
- Wenn Ihr Aktionswürfelergebnis kleiner als beide Herausforderungswürfel ist, ist es ein Fehlschlag (Misserfolg).

Zusätzlich gilt: Wenn beide Herausforderungswürfel die gleiche Zahl zeigen, wird dies als Übereinstimmung betrachtet, was das Ergebnis (zum Guten oder Schlechten) Ihres starken Treffers oder Fehlschlags dramatisch verbessern kann.

Der Iron Dice Roller vereinfacht diesen Prozess, indem er die Würfe und Berechnungen automatisiert und es den Spielern ermöglicht, sich auf die Erzählung und die Aktionen ihrer Charaktere zu konzentrieren.

## Funktionen

- Umschalten zwischen "Aktion" und "Herausforderung" Modi
- Einstellbarer Modifikatorwert für Charakterwerte und Boni
- Optionale Themeneingabe für jeden Wurf zur Verfolgung von Aktionen
- Animierter Würfelwurf mit realistischen, sich überlappenden Soundeffekten
- Ergebnisanzeige mit Erfolgstyp, Modifikator und einzelnen Würfelergebnissen
- Dunkelmodus-Umschaltung für angenehmes Betrachten in dunkleren Umgebungen
- Ergebnishistorie mit erweiterbarer/zusammenklappbarer Ansicht
- Funktion zum Löschen der Ergebnisse
- Seitenleiste für Einstellungen und zusätzliche Funktionen
- Responsives Design für verschiedene Bildschirmgrößen
- Lokaler Speicher für dauerhafte Ergebnisse und Einstellungen

## Funktionsweise

1. Wählen Sie zwischen Aktions- oder Herausforderungsmodus.
2. Stellen Sie Ihren Modifikator ein (repräsentiert die Werte und Boni Ihres Charakters).
3. (Optional) Geben Sie ein Thema für den Wurf ein.
4. Klicken Sie auf den "Würfeln" Button, um den Würfelwurf durchzuführen.
5. Die App animiert den Würfelwurf mit Soundeffekten.
6. Die Ergebnisse werden angezeigt und zeigen den Erfolgstyp, die Würfelwerte und eventuelle epische Ergebnisse.
7. Der Wurf wird in Ihrer Historie gespeichert, die nach Bedarf erweitert oder zusammengeklappt werden kann.

## Ordnerstruktur

```
iron-dice-roller/
│
├── index.html
├── css/
│   ├── main.css
│   ├── cards.css
│   ├── inputs.css
│   ├── results.css
│   ├── animations.css
│   ├── side-panel.css
│   ├── responsive.css
│   └── dark-mode.css
│
├── js/
│   ├── config.js
│   ├── storageManager.js
│   ├── diceRoller.js
│   ├── uiManager.js
│   └── script.js
│
├── assets/
│   ├── header_text.png
│   ├── roll.mp3
│   ├── d6.png
│   ├── d10.png
│   ├── vollerErfolg.png
│   ├── Teilerforg.png
│   ├── Fehlschlag.png
│   ├── episch.png
│   ├── arrow_down.png
│   └── arrow_up.png
```

### Erklärung der Ordnerstruktur:

- `index.html`: Die Haupt-HTML-Datei, die die Webanwendung strukturiert.
- `css/`: Enthält alle Stylesheet-Dateien für das Styling der App:
  - `main.css`: Allgemeine Stile und Layout
  - `cards.css`: Stile für Eingabe- und Ergebniskarten
  - `inputs.css`: Stile für Eingabeelemente
  - `results.css`: Stile für die Ergebnisanzeige
  - `animations.css`: Definiert Würfelwurf-Animationen
  - `side-panel.css`: Stile für die Seitenleiste
  - `responsive.css`: Media Queries für Responsivität
  - `dark-mode.css`: Spezifische Stile für den Dunkelmodus
- `js/`: Enthält alle JavaScript-Dateien für die App-Funktionalität:
  - `config.js`: Anfängliche Konfigurationseinstellungen
  - `storageManager.js`: Handhabt lokale Speicheroperationen
  - `diceRoller.js`: Verwaltet Würfellogik und Animationen
  - `uiManager.js`: Handhabt UI-Interaktionen und Updates
  - `script.js`: Haupt-Skriptdatei, die die App initialisiert
- `assets/`: Enthält alle in der App verwendeten Bild- und Tondateien

## Einrichtung und Verwendung

1. Klonen Sie das Repository oder laden Sie den Quellcode herunter.
2. Öffnen Sie die `index.html` Datei in einem modernen Webbrowser.
3. Die App sollte sofort geladen und einsatzbereit sein.
4. Passen Sie den Modifikator an, wählen Sie den Aktions- oder Herausforderungsmodus und beginnen Sie zu würfeln!

Hinweis: Diese App verwendet den lokalen Speicher, um Ihre Wurf-Historie und Einstellungen zu speichern. Löschen Sie Ihre Browserdaten, wenn Sie alles auf die Standardeinstellungen zurücksetzen möchten.

## Mitwirken

Beiträge zum Iron Dice Roller sind willkommen! Bitte zögern Sie nicht, Pull-Requests einzureichen, Issues zu erstellen oder die Anwendung weiterzuempfehlen.

## Lizenz

[MIT-Lizenz](LICENSE)
