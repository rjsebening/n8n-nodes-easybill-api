# n8n-nodes-easybill-api

![n8n](https://img.shields.io/badge/n8n-1.113.0+-brightgreen)
![Version](https://img.shields.io/badge/version-0.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Ein **n8n Community Node** für die **Easybill REST API**, mit dem du Easybill vollständig in deine n8n-Workflows integrieren kannst.
Unterstützt **sämtliche wichtigen Endpunkte**, inklusive **Dokumente, Kunden, Kontakte, Zahlungen, Anhänge, Webhooks** und vieles mehr.

Basiert auf der **Easybill API 1.99.0**.

---

## 🆕 Neu

**API 1.99.0**

* Neue Kunden-Operation: **SEPA-Mandat übertragen** an den angebundenen Payment-Provider
* Dokument: **Advanced Data Fields** (EN16931 Business Terms / BT-Felder)
* Dokument: **Payment-Link**-Optionen (aktiviert + Sprache)
* Neue Dateiformate **ZUGFeRD 2.4 / 2.5** (EN16931 und Extended)
* SEPA Payment: **Debitor Address Line 2**

---

## 📌 Was ist n8n?

n8n ist eine leistungsstarke Automatisierungsplattform (Open Source), mit der du Aktionen zwischen verschiedenen Apps verbinden kannst.
Mit diesem Easybill-Node kannst du:

* Angebote & Rechnungen automatisch erstellen
* Kunden & Kontakte synchronisieren
* Zahlungen verbuchen und SEPA-Zahlungen verwalten
* Projekte, Aufgaben und Zeiterfassung pflegen
* Rabatte, Positionen und Lagerbestände steuern
* Dokumenten-PDFs oder JPGs abrufen
* Webhooks für Echtzeit-Events nutzen — vom Trigger automatisch angelegt

… und dadurch Stunden an manueller Arbeit sparen.

---

## ⚖️ Rechtlicher Hinweis

Diese Community-Integration nutzt die **offizielle Easybill REST API**, ist jedoch **nicht** von Easybill gesponsert oder unterstützt.
Alle Marken und Logos gehören ihren jeweiligen Eigentümern.

---

## 🚀 Features

* **Vollständige Abdeckung der Easybill REST API** — alle 104 Endpunkte aus allen 21 API-Bereichen
* **22 Ressourcen**: Dokumente, Kunden, Kontakte, Projekte, Aufgaben, SEPA-Zahlungen, Rabatte, Positionen, Lager, Zeiterfassung und mehr
* **Webhook Trigger Node**, der den Webhook selbstständig in Easybill anlegt — und wieder entfernt
* **API-Call Resource** als Rückfalloption für jeden künftigen Endpunkt
* **Bearer- und Basic-Authentifizierung** werden unterstützt
* Saubere TypeScript-Implementierung nach n8n-Konventionen

---

## 📋 Unterstützte Ressourcen & Operationen

**Der Node deckt die Easybill REST API vollständig ab — jeder Endpunkt jedes API-Bereichs ist implementiert.**
Gruppiert nach den Bereichen (Tags) der API, mit den Operationsnamen wie sie in der n8n-Oberfläche erscheinen.

### 🧾 Dokument (Document)

`Create` · `Get` · `Get Many` · `Update` · `Delete` · `Send` · `Finish` · `Cancel` · `Convert` · `Get PDF` · `Get JPG` · `Download`

Versand per **E-Mail, Fax oder Post**. Umwandlung zwischen Dokumenttypen (z. B. Angebot → Rechnung). Unterstützt **ZUGFeRD 1 / 2.2 / 2.4 / 2.5** und **XRechnung 2.1–3.0**, dazu EN16931-Zusatzfelder (BT) und Payment-Links.

### 📄 Dokument-Version (Document Version)

`Get` · `Get Many` · `Download Item`

### 💸 Dokument-Zahlung (Document Payment)

`Create` · `Get` · `Get Many` · `Delete`

### 👤 Kunde (Customer)

`Create` · `Get` · `Get Many` · `Update` · `Delete` · `Transfer SEPA Mandate`

`Transfer SEPA Mandate` übergibt das gespeicherte SEPA-Mandat an den angebundenen Payment-Provider (z. B. Mollie).

### 🧑‍💼 Kontakt (Contact)

`Create` · `Get` · `Get Many` · `Update` · `Delete`

### 👥 Kundengruppe (Customer Group)

`Create` · `Get` · `Get Many` · `Update` · `Delete`

### 📁 Projekt (Project)

`Create` · `Get` · `Get Many` · `Update` · `Delete`

### ✅ Aufgabe (Task)

`Create` · `Get` · `Get Many` · `Update` · `Delete`

Projekte und Aufgaben lassen sich vollständig verwalten und miteinander verknüpfen.

### ⏱️ Zeiterfassung (Time Tracking)

`Create` · `Get` · `Get Many` · `Update` · `Delete`

### 🏦 SEPA-Zahlung (SEPA Payment)

`Create` · `Get` · `Get Many` · `Update` · `Delete`

Verwaltung von SEPA-Lastschriften und -Überweisungen inklusive Gläubiger-/Schuldnerdaten, Mandatsreferenz und Verwendungszweck.

### 🏷️ Rabatt-Position (Discount Position)

`Create` · `Get` · `Get Many` · `Update` · `Delete`

### 🏷️ Rabatt-Positionsgruppe (Discount Position Group)

`Create` · `Get` · `Get Many` · `Update` · `Delete`

Rabatte verwalten auf beiden Ebenen, die die API anbietet: pro **Position** und pro **Positionsgruppe**.

### 📦 Position

`Create` · `Get` · `Get Many` · `Update` · `Delete`

### 📦 Positionsgruppe (Position Group)

`Create` · `Get` · `Get Many` · `Update` · `Delete`

### 📊 Lagerbestand (Stock)

`Create` · `Get` · `Get Many`

### 🔢 Seriennummer (Serial Number)

`Create` · `Get` · `Get Many` · `Delete`

### 📎 Anhang (Attachment)

`Create` · `Get` · `Get Many` · `Update` · `Delete` · `Get Content`

### 📬 Postfach (Post Box)

`Get` · `Get Many` · `Delete`

### 📝 Textvorlage (Text Template)

`Create` · `Get` · `Get Many` · `Update` · `Delete`

### 🖨️ PDF-Vorlage (PDF Template)

`Get Many`

### 🔑 Login

`Get` · `Get Many`

### 🪝 WebHook

`Create` · `Get` · `Get Many` · `Update` · `Delete`

Webhooks manuell verwalten — oder den **Easybill Trigger** die Arbeit machen lassen (siehe unten).

### 🛠️ API Call

`Custom Call` — beliebige Requests an jeden Easybill-Endpunkt (`GET`, `POST`, `PUT`, `DELETE`), als Rückfalloption für alles, was die API künftig ergänzt.

---

## 🎣 Easybill Trigger — Webhooks ohne Konfigurationsaufwand

Der **Easybill Trigger** liefert Echtzeit-Automatisierungen, ohne dass du die Easybill-Einstellungen überhaupt öffnen musst.

### Kein manuelles Webhook-Setup

Event auswählen, Workflow aktivieren — fertig. Den Rest übernimmt der Node über die Easybill-API:

1. **Beim Aktivieren** legt er den Webhook in deinem Easybill-Konto an, gerichtet auf deine n8n-Webhook-URL
2. **Beim Deaktivieren** löscht er ihn wieder — es bleiben keine verwaisten Einträge im Konto zurück
3. Ein **Signatur-Secret** wird automatisch erzeugt und mitregistriert, damit eingehende Payloads verifiziert werden können

Du kopierst nie eine URL von Hand in Easybill und musst hinterher nichts aufräumen.

### Unterstützte Events (19)

| Bereich | Events |
|---|---|
| **Kontakt** | `contact.create` · `contact.update` · `contact.delete` |
| **Kunde** | `customer.create` · `customer.update` · `customer.delete` |
| **Dokument** | `document.create` · `document.update` · `document.completed` · `document.deleted` |
| **Zahlung** | `document.payment_add` · `document.payment_delete` |
| **Position** | `position.create` · `position.update` · `position.delete` |
| **Postfach** | `postbox.create` · `postbox.update` · `postbox.sent` · `postbox.delete` |

> Du willst Webhooks selbst verwalten? Die Ressource **WebHook** im Haupt-Node bietet vollständiges CRUD.

---

## 💡 Beispiele für Anwendungsfälle

### 📄 Automatische Angebotserstellung nach Formular

1. Formular ausfüllen →
2. Daten per n8n empfangen →
3. Easybill-Dokument automatisch erstellen →
4. PDF speichern oder per E-Mail versenden.

### 👥 Synchronisation von CRM zu Easybill

Synchronisiere Kunden automatisch aus Tools wie:

* Airtable
* HubSpot
* Pipedrive
* Close CRM
* Umsatz.io
* SalesSuite.com

### 💰 Zahlungsmatching

Wenn eine Zahlung eingeht:

* API-Event → n8n Trigger
* Dokument automatisch „bezahlt“ markieren
* E-Mail & interne Automatisierung starten

### 📦 Onboarding Automation

Kunde abgeschlossen → Sofort:

* Rechnung erstellen
* Willkommensdokument senden
* Kundenordner anlegen
* Slack/Teams Nachricht senden

---

## 🛠️ Installation

### Option 1: Installation über Community Nodes (Empfohlen)

1. Öffne deine n8n-Instanz
2. Gehe zu **Settings → Community Nodes**
3. Installiere:
   `n8n-nodes-easybill-api` oder
   `@rjsebening/n8n-nodes-easybill-api`
4. Starte n8n neu

---

### Option 2: Manuelle Installation

#### A) Scoped

```bash
npm i @rjsebening/n8n-nodes-easybill-api
```

#### B) Unscoped

```bash
npm install n8n-nodes-easybill-api
```

Danach:

```bash
npm start
```

---

### Option 3: Docker

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -e N8N_CUSTOM_EXTENSIONS="/data/custom" \
  -v ~/.n8n:/data \
  docker.n8n.io/n8nio/n8n
```

---

## 🔐 Authentifizierung einrichten

### 1. Easybill API Key erzeugen

1. Logge dich in Easybill ein
2. Gehe zu **Mein Account → REST API**
3. API-Key generieren
4. Kopieren

### 2. In n8n hinterlegen

1. In n8n → **Credentials**
2. „Easybill API“ auswählen
3. Felder ausfüllen:

* **API Key**
* **Base URL**: `https://api.easybill.de/rest/v1`

4. Verbindung testen & speichern

---

## 📖 Usage Beispiele

### Beispiel: Dokument erstellen

```
1. Easybill Node hinzufügen
2. Resource: Document
3. Operation: Create
4. Felder wie customer_id, items usw. ausfüllen
5. Workflow ausführen
```

### Beispiel: Easybill Trigger nutzen

```
1. Easybill Trigger Node hinzufügen
2. Event auswählen (z. B. contact.update)
3. Workflow aktivieren
4. Easybill sendet Events direkt an n8n
```

---

## 🔧 API Referenz

Diese Node basiert vollständig auf der offiziellen Easybill REST API.

**Base URL:**
`https://api.easybill.de/rest/v1`

**Authentifizierung:**
HTTP Header → `Authorization: Bearer <API_KEY>`

Offizielle API-Dokumentation:
➡ [https://api.easybill.de/rest/v1/](https://api.easybill.de/rest/v1/)

---

## 🤝 Contributing

Beiträge sind willkommen!

### Entwicklungsumgebung

```bash
git clone https://github.com/rjsebening/n8n-nodes-easybill-api.git
cd n8n-nodes-easybill-api

npm install
npm run build
npm run lint
```

### Pull Requests

1. Repo forken
2. Branch erstellen: `feature/neues-feature`
3. Commiten
4. Pushen
5. Pull Request öffnen

### Code Style

* TypeScript
* ESLint beachten
* Tests hinzufügen
* README aktualisieren

---

## 📝 Changelog

### Version 0.1.0 (2025-12-04)

* 🎉 Initial Release
* Vollständige Easybill REST API Integration (core resources)
* Easybill Trigger Node
* Attachment Upload & Download
* PDF & JPG Retrieval
* Flexible API Call Resource

---

## 🛠️ Kompatibilität

* **n8n Version:** 1.113.0+
* **Node Version:** 20+
* **TypeScript:** 5+

---


## 📬 Über den Entwickler

Ich bin **[Rezk Jörg Sebening](https://github.com/rjsebening)** – Experte für Business-Automatisierung (DACH).  
Ich entwickle n8n-Nodes und Systeme, damit Agenturen, Coaches und Dienstleister **ohne manuelle Arbeit** skalieren und sauber liefern können.

👉 Folge mir auf GitHub, um neue DACH-Integrationen und Automations-Vorlagen zu erhalten.

## ⚖️ Rechtlicher Hinweis

Diese Community-Node steht **in keiner Verbindung zu Easybill**.  
Keine Partnerschaft, kein Sponsoring, keine offizielle Freigabe.  
Sie nutzt ausschließlich **öffentliche API-Endpunkte**.

-   Von der Community entwickelt & gepflegt
    
-   Für API-Fragen → Support von **Easybill** kontaktieren
    
-   Alle Marken & Logos gehören ihren Eigentümern
    

## 📄 Lizenz

**MIT License**  
Beiträge und Pull Requests sind willkommen!
Dieses Projekt steht unter der **MIT Lizenz**.

---

## ❓ Support

### Issues melden

➡ GitHub Issues: *coming soon URL*

### FAQ

**Kann ich mehrere Easybill Accounts nutzen?**
Ja – einfach mehrere Credentials anlegen.

**Sind alle API-Endpunkte abgedeckt?**
Die wichtigsten. Mit dem „API Call“-Resource kannst du jeden beliebigen Endpoint verwenden.

**Warum gibt es zwei Authentifizierungsmethoden (Basic/Bearer)?**
Easybill unterstützt beides – wähle einfach die für deinen Account passende aus.

---

⭐ **Wenn dir diese Node gefällt, gib dem Repo ein Star!**
💡 **Feature Wünsche?** → Issue erstellen!