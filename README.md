# n8n-nodes-easybill-api

![n8n](https://img.shields.io/badge/n8n-1.113.0+-brightgreen)
![Version](https://img.shields.io/badge/version-0.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A full-featured **n8n Community Node** for the **Easybill REST API**, allowing you to automate invoicing, customer management, documents, payments, and real-time events directly inside your n8n workflows.

Targets the **Easybill API 1.99.0**.

---

## 🆕 What's New

**API 1.99.0**

* New Customer operation: **Transfer SEPA mandate** to the connected payment provider
* Document: **Advanced Data Fields** (EN16931 Business Terms / BT fields)
* Document: **Payment Link** options (enabled + locale)
* New **ZUGFeRD 2.4 / 2.5** file formats (EN16931 and Extended)
* SEPA Payment: **Debitor Address Line 2**

---

## 📌 What is n8n?

n8n is a powerful workflow automation tool (open-source) that lets you connect different apps and automate repetitive business processes.
With this Easybill integration, you can:

* Create offers, invoices, and documents automatically
* Sync customers and contacts
* Manage projects, tasks and time tracking
* Handle SEPA payments, discounts, positions and stock
* Upload and manage attachments
* Receive Easybill events via webhook — registered automatically by the trigger
* Fetch PDFs/JPGs of documents
* Add payments or mark documents as paid

All without manual intervention.

---

## ⚖️ Legal Notice

This community node uses the **public Easybill REST API** and is **not affiliated with Easybill GmbH**.
All trademarks belong to their respective owners.

---

## 🚀 Features

* **Complete Easybill REST API coverage** — all 104 endpoints across all 21 API areas
* **22 resources**: documents, customers, contacts, projects, tasks, SEPA payments, discounts, positions, stock, time tracking, and more
* **Webhook Trigger Node** that registers the webhook in Easybill for you — and removes it again automatically
* **API Call resource** as a fallback for any future endpoint
* **Supports both Bearer and Basic Authentication**
* Clean TypeScript implementation following n8n best practices

---

## 📋 Supported Resources & Operations

**The node covers the Easybill REST API in full — every endpoint of every API area is implemented.**
Grouped below by the API's own areas (tags), with the operation names as they appear in the n8n UI.

### 🧾 Document

`Create` · `Get` · `Get Many` · `Update` · `Delete` · `Send` · `Finish` · `Cancel` · `Convert` · `Get PDF` · `Get JPG` · `Download`

Send via **email, fax or post**. Convert between document types (e.g. offer → invoice). Supports **ZUGFeRD 1 / 2.2 / 2.4 / 2.5** and **XRechnung 2.1–3.0**, plus EN16931 advanced data fields (BT) and payment links.

### 📄 Document Version

`Get` · `Get Many` · `Download Item`

### 💸 Document Payment

`Create` · `Get` · `Get Many` · `Delete`

### 👤 Customer

`Create` · `Get` · `Get Many` · `Update` · `Delete` · `Transfer SEPA Mandate`

`Transfer SEPA Mandate` hands the stored SEPA mandate over to the connected payment provider (e.g. Mollie).

### 🧑‍💼 Contact

`Create` · `Get` · `Get Many` · `Update` · `Delete`

### 👥 Customer Group

`Create` · `Get` · `Get Many` · `Update` · `Delete`

### 📁 Project

`Create` · `Get` · `Get Many` · `Update` · `Delete`

### ✅ Task

`Create` · `Get` · `Get Many` · `Update` · `Delete`

### ⏱️ Time Tracking

`Create` · `Get` · `Get Many` · `Update` · `Delete`

### 🏦 SEPA Payment

`Create` · `Get` · `Get Many` · `Update` · `Delete`

Manage SEPA direct debits and credit transfers, including creditor/debitor data, mandate reference and remittance information.

### 🏷️ Discount Position

`Create` · `Get` · `Get Many` · `Update` · `Delete`

### 🏷️ Discount Position Group

`Create` · `Get` · `Get Many` · `Update` · `Delete`

Manage discounts at both levels the API offers: per **position** and per **position group**.

### 📦 Position

`Create` · `Get` · `Get Many` · `Update` · `Delete`

### 📦 Position Group

`Create` · `Get` · `Get Many` · `Update` · `Delete`

### 📊 Stock

`Create` · `Get` · `Get Many`

### 🔢 Serial Number

`Create` · `Get` · `Get Many` · `Delete`

### 📎 Attachment

`Create` · `Get` · `Get Many` · `Update` · `Delete` · `Get Content`

### 📬 Post Box

`Get` · `Get Many` · `Delete`

### 📝 Text Template

`Create` · `Get` · `Get Many` · `Update` · `Delete`

### 🖨️ PDF Template

`Get Many`

### 🔑 Login

`Get` · `Get Many`

### 🪝 WebHook

`Create` · `Get` · `Get Many` · `Update` · `Delete`

Manage webhooks manually — or let the **Easybill Trigger** handle it for you (see below).

### 🛠️ API Call

`Custom Call` — fully custom requests to any Easybill endpoint (`GET`, `POST`, `PUT`, `DELETE`), as a fallback for anything the API adds in future.

---

## 🎣 Easybill Trigger — zero-config webhooks

The **Easybill Trigger** node gives you real-time automations without ever touching the Easybill settings UI.

### No manual webhook setup

You pick an event, activate the workflow — that's it. The node talks to the Easybill API for you:

1. **On activation** it creates the webhook in your Easybill account, pointed at your n8n webhook URL
2. **On deactivation** it deletes that webhook again — no orphaned entries piling up in your account
3. A **signing secret** is generated and registered automatically, so incoming payloads can be verified

You never copy a URL into Easybill by hand, and you never clean up afterwards.

### Supported events (19)

| Area | Events |
|---|---|
| **Contact** | `contact.create` · `contact.update` · `contact.delete` |
| **Customer** | `customer.create` · `customer.update` · `customer.delete` |
| **Document** | `document.create` · `document.update` · `document.completed` · `document.deleted` |
| **Payment** | `document.payment_add` · `document.payment_delete` |
| **Position** | `position.create` · `position.update` · `position.delete` |
| **Post Box** | `postbox.create` · `postbox.update` · `postbox.sent` · `postbox.delete` |

> Prefer to manage webhooks yourself? The **WebHook** resource on the main node exposes full CRUD.

---

## 💡 Example Use Cases

### 📄 Automated Offer or Invoice Generation

Turn form submissions into fully generated and sent Easybill documents.

### 🔁 CRM Synchronization

Sync customers from tools like:

* Airtable
* HubSpot
* Pipedrive
* Close CRM
* Umsatz.io
* SalesSuite.com
* Custom CRMs

…and keep Easybill always up to date.

### 💰 Payment Automation

When Easybill registers a payment:

* Trigger n8n
* Mark document as paid
* Update CRM
* Send confirmation email
* Trigger onboarding steps

### 📦 End-to-End Onboarding Workflow

After a client signs:

* Create invoice
* Send welcome documents
* Assign project tasks
* Notify Slack/Teams
* Add internal checklists

---

## 🛠️ Installation

### Option 1: Install via n8n Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings → Community Nodes**
3. Install:

   ```
   n8n-nodes-easybill-api
   ```
4. Restart n8n

---

### Option 2: Manual Installation

```bash
npm install n8n-nodes-easybill-api
```

Restart n8n:

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

Place the node inside `/data/custom`.

---

## 🔐 Authentication Setup

### 1. Generate Easybill API Key

1. Log in to Easybill
2. Go to **My Account → REST API**
3. Generate API key
4. Copy your API key

### 2. Add credentials in n8n

1. Go to **Credentials**
2. Create new → search for **Easybill API**
3. Fill in:

* **Authentication:** Basic or Bearer
* **API Key**
* **Base URL:** `https://api.easybill.de/rest/v1`

4. Test & Save

---

## 📖 Usage

### Example: Create a Document

```
1. Add Easybill node
2. Resource: Document
3. Operation: Create
4. Fill in required fields (customer_id, items, etc.)
5. Execute workflow
```

### Example: Use Easybill Trigger

```
1. Add Easybill Trigger node
2. Select desired event (e.g., document.update)
3. Activate workflow
4. Webhook is automatically created in Easybill
```

---

## 🔧 API Reference

This node communicates with the official Easybill API:

**Base URL:**
`https://api.easybill.de/rest/v1`

**Auth:**
`Authorization: Bearer <API_KEY>`
or
Basic Auth with API key

Official API Documentation:
➡ [https://api.easybill.de/rest/v1/](https://api.easybill.de/rest/v1/)

---

## 🤝 Contributing

We welcome contributions!

### Development Setup

```bash
git clone https://github.com/rjsebening/n8n-nodes-easybill-api.git
cd n8n-nodes-easybill-api

npm install
npm run build
npm run lint
```

### Pull Request Workflow

1. Fork the repo
2. Create a branch: `feature/new-feature`
3. Commit changes
4. Push
5. Open Pull Request

### Code Guidelines

* TypeScript only
* Keep node structure aligned with n8n conventions
* Add tests where possible
* Update documentation

---

## 📝 Changelog

### **0.1.0 – Initial Release (2025-12-04)**

* Full Easybill REST API integration (core resources)
* Easybill Webhook Trigger node
* Document creation, sending & file retrieval
* Customer & Contact operations
* Attachment upload & management
* Flexible API Call resource
* Clean TypeScript structure

---

## 🛠️ Compatibility

* **n8n version:** 1.113.0+
* **Node.js:** 20+
* **TypeScript:** 5+

---


## 📬 About the Author

I’m **[Rezk Jörg Sebening](https://github.com/rjsebening)** – Automation & Systems Expert (DACH).
I build n8n nodes and process automation systems that help agencies, coaches, and service providers scale **without manual work**.

👉 Follow me on GitHub for new DACH integrations and automation templates.

## ⚖️ Legal Disclaimer

This community node is **not affiliated with EasyBill** (no partnership, no sponsorship, no official endorsement).
It simply connects to publicly available API endpoints.

* Community developed & maintained
* For API-related issues → contact **EasyBill Support**
* All trademarks & logos belong to their respective owners

## 📄 License

**MIT License**
Contributions and pull requests are welcome!
This project is licensed under the **MIT License**.

---

## ❓ Support

### Issues / Bugs / Feature Requests

➡ GitHub Issues: *(link to be added)*

### FAQ

**Can I use multiple Easybill accounts?**
Yes, create multiple credential entries.

**Are all API endpoints supported?**
Major endpoints are fully implemented.
For missing endpoints, use the **API Call** resource.

**Why both Basic and Bearer Auth?**
Easybill supports different authentication formats depending on the account.

---

⭐ **If you like this node, please star the GitHub repository!**
💡 **Feature ideas?** Open an issue — community contributions are welcome.