# n8n-nodes-easybill-api

![n8n](https://img.shields.io/badge/n8n-1.113.0+-brightgreen)
![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A full-featured **n8n Community Node** for the **Easybill REST API**, allowing you to automate invoicing, customer management, documents, payments, and real-time events directly inside your n8n workflows.

---

## 📌 What is n8n?

n8n is a powerful workflow automation tool (open-source) that lets you connect different apps and automate repetitive business processes.
With this Easybill integration, you can:

* Create offers, invoices, and documents automatically
* Sync customers and contacts
* Upload and manage attachments
* Receive Easybill events via webhook
* Fetch PDFs/JPGs of documents
* Add payments or mark documents as paid

All without manual intervention.

---

## ⚖️ Legal Notice

This community node uses the **public Easybill REST API** and is **not affiliated with Easybill GmbH**.
All trademarks belong to their respective owners.

---

## 🚀 Features

* **Full Easybill REST API integration**
* **Document, Customer, Contact, Attachment & Payment operations**
* **Webhook Trigger Node** with automatic registration/deregistration
* **API Call resource** for unsupported or custom endpoints
* **Supports both Bearer and Basic Authentication**
* Clean TypeScript implementation following n8n best practices

---

## 📋 Supported Resources & Operations

### 🧾 **Document**

* Create document
* Update document
* Delete document
* Send document (email / fax)
* Mark as done / cancel / convert
* Add payment
* Get PDF / Get JPG
* List versions
* Download files

### 👤 **Customer**

* Create customer
* Update customer
* Get one
* Get all
* Delete customer

### 🧑‍💼 **Contact**

* Create contact
* Update contact
* Get all contacts
* Delete contact

### 📎 **Attachment**

* Upload attachment
* Get attachment
* Delete attachment

### 💸 **Document Payment**

* Add payment
* Get payment list

### 🛠️ **API Call**

* Fully custom API requests to any Easybill endpoint
  (`GET`, `POST`, `PUT`, `DELETE` supported)

---

## 🎣 Easybill Webhook Trigger

The Easybill Trigger Node gives you **real-time automations** in n8n.

Supported event types include (examples):

* `contact.update`
* `contact.create`
* `customer.update`
* `customer.create`
* `document.update`
* `document.create`
* `payment.create`
* …and more depending on your Easybill configuration

When you activate a workflow, the webhook is:

1. **Automatically created in Easybill**, pointing to your n8n webhook URL
2. **Automatically removed** when the workflow is disabled

---

## 💡 Example Use Cases

### 📄 Automated Offer or Invoice Generation

Turn form submissions into fully generated and sent Easybill documents.

### 🔁 CRM Synchronization

Sync customers from tools like:

* Airtable
* HubSpot
* Pipedrive
* Umsatz.io
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
npm test
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

## 📄 License

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