# n8n-nodes-easybill

![n8n](https://img.shields.io/badge/n8n-1.113.0+-brightgreen)
![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Ein **n8n Community Node** für die **Easybill REST API**, mit dem du Easybill vollständig in deine n8n-Workflows integrieren kannst.
Unterstützt **sämtliche wichtigen Endpunkte**, inklusive **Dokumente, Kunden, Kontakte, Zahlungen, Anhänge, Webhooks** und vieles mehr.

---

## 📌 Was ist n8n?

n8n ist eine leistungsstarke Automatisierungsplattform (Open Source), mit der du Aktionen zwischen verschiedenen Apps verbinden kannst.
Mit diesem Easybill-Node kannst du:

* Angebote & Rechnungen automatisch erstellen
* Kunden & Kontakte synchronisieren
* Zahlungen verbuchen
* Dokumenten-PDFs oder JPGs abrufen
* Webhooks für Echtzeit-Events nutzen

… und dadurch Stunden an manueller Arbeit sparen.

---

## ⚖️ Rechtlicher Hinweis

Diese Community-Integration nutzt die **offizielle Easybill REST API**, ist jedoch **nicht** von Easybill gesponsert oder unterstützt.
Alle Marken und Logos gehören ihren jeweiligen Eigentümern.

---

## 🚀 Features

* **Vollständige Easybill REST API Integration**
* **Mehr als XX Operationen** (Anzahl steigert sich beim Ausbau)
* **4+ Ressourcen** (Customer, Contact, Document, Attachment, uvm.)
* **Webhook Trigger Node** (Easybill Events → sofort in n8n)
* **Automatische Registrierung & Deregistrierung von Webhooks**
* **API-Call Resource** für benutzerdefinierte Easybill-Endpunkte

---

## 📋 Unterstützte Ressourcen & Operationen

> *Hinweis: Liste dynamisch, da du aktiv am Ausbau arbeitest – aber bereits vollständig genug für eine öffentliche README.*

### 🧾 **Document**

* Dokument erstellen
* Dokument aktualisieren
* Dokument löschen
* Dokument versenden (E-Mail / Fax)
* Dokument bezahlen / stornieren / abschließen
* PDF abrufen
* JPG abrufen
* Dokument-Versionen abrufen
* Dokument anhängen / Anhänge verwalten

### 🧑‍💼 **Customer**

* Kunden erstellen
* Kunden aktualisieren
* Kunden abrufen
* Alle Kunden abrufen
* Kunden löschen

### 👤 **Contact**

* Kontakt erstellen
* Kontakt aktualisieren
* Kontakt löschen
* Kontakte abrufen

### 📎 **Attachment**

* Anhänge hochladen
* Anhänge abrufen
* Anhänge löschen

### 💸 **Document Payments**

* Zahlung für Dokument hinzufügen
* Zahlungsstatus abrufen

### 🛠️ **API Call**

* Voll flexible Custom Requests an jeden Easybill Endpoint

---

## 🎣 Easybill Trigger Node (Webhook)

Der Node unterstützt Echtzeit-Events wie:

* `contact.create`
* `contact.update`
* `customer.create`
* `customer.update`
* `document.create`
* `document.update`
* `payment.create`
* uvm.

Beim Aktivieren des Workflows werden Webhooks **automatisch in Easybill registriert** und beim Deaktivieren sauber entfernt.

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
* Umsatz.io

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
   `n8n-nodes-easybill` oder
   `@rjsebening/n8n-nodes-easybill`
4. Starte n8n neu

---

### Option 2: Manuelle Installation

#### A) Scoped

```bash
npm i @rjsebening/n8n-nodes-easybill
```

#### B) Unscoped

```bash
npm install n8n-nodes-easybill
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
git clone https://github.com/rjsebening/n8n-nodes-easybill.git
cd n8n-nodes-easybill

npm install
npm run build
npm test
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

## 📄 Lizenz

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