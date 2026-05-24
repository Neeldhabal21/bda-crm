# 📊 BDA Lead Management CRM

A professional, minimal, and fully-responsive **Business Development Associate (BDA) Lead Management CRM** application. Designed and built as an internship assessment submission, this application enables BDAs to easily manage, search, filter, and track sales prospects through the pipeline funnel.

---

## 🔗 Live Deployments

- **Frontend Application**: [Insert Live Frontend URL Here]
- **Backend REST API**: [https://bda-crm-api.onrender.com](https://bda-crm-api.onrender.com)

---

## 🛠️ Tech Stack

### Frontend (Client)
* **Framework**: React.js (Scaffolded with Vite)
* **Styling**: Tailwind CSS v4 (Modern utility-first styling with custom Google Fonts)
* **Typography**: *Plus Jakarta Sans* & *Outfit* (Loaded for premium, modern dashboard presentation)
* **API Communication**: Axios (Asynchronous REST API requests)

### Backend (Server)
* **Runtime**: Node.js
* **Framework**: Express.js
* **CORS**: Enabled for cross-origin frontend communication
* **Database/Storage**: Node.js `fs` module (Stores all lead data in a local [leads.json](file:///C:/Users/neelc/.gemini/antigravity/scratch/bda-lead-management-crm/server/leads.json) database simulation, eliminating heavy external DB setup for easy evaluation)

---

## ✨ Features

### 1. 🔒 Secure Login Screen
- **Modern Login Card**: Sleek visual interface with floating inputs and hover feedback.
- **Frontend Authentication**: Local session check. Persists user session in `localStorage`.
- **Preconfigured Demo Access**: Setup with prefilled credentials for immediate testing.

### 2. 📊 Associate Dashboard
- **Analytics Metrics**: Quick statistic cards showing Total Leads, New, Contacted, and Converted leads.
- **Pipeline distribution bar**: Dynamic percentage ratio breakdown showing pipeline funnel status (New vs. Contacted vs. Converted).
- **Recent Leads Preview**: A table tracking the top 3 most recently created leads with timestamp indicators.

### 3. 👥 Leads Database Manager
- **Interactive Leads Table**: View all leads in a clean, scrollable interface with structured tables.
- **Full Search functionality**: Query database in real-time by Name, Email, or Phone Number.
- **Pipeline Filter**: Dropdown menu to filter leads by Status (`New`, `Contacted`, or `Converted`).
- **New Prospect Form**: Interactive slide-in/popup modal containing dynamic email validation and inputs.
- **Prospect Removal**: Delete prospects securely with prompt dialog confirmation.

---

## 📂 Directory Layout

```text
bda-lead-management-crm/
├── package.json         # Root package manager (runs client & server together)
├── README.md            # Internship project submission guide
├── server/
│   ├── server.js        # Main Node/Express API entrypoint
│   ├── leads.json       # JSON file database storage
│   └── package.json     # Express dependencies & scripts
└── client/
    ├── src/
    │   ├── App.jsx      # Core Router & Application state coordinator
    │   ├── main.jsx     # Vite client entrypoint
    │   ├── index.css    # Tailwind CSS directive imports
    │   └── components/
    │       ├── Login.jsx      # Login interface view
    │       ├── Sidebar.jsx    # Responsive sidebar layout
    │       ├── Dashboard.jsx  # Analytics overview panel
    │       └── Leads.jsx      # Leads management & modal forms
    ├── index.html       # Web application base wrapper & custom font loaders
    ├── vite.config.js   # Vite bundle settings & Tailwind plugins
    └── package.json     # React client configurations
```

---

## ⚙️ Local Installation & Development

Ensure you have **Node.js** (v16+) and **npm** installed on your machine.

### Step 1: Install Dependencies
Open your command terminal in the project root directory and run:
```bash
npm run install-all
```
*This installs root CLI tooling (concurrently), server dependencies, and client-side web packages automatically.*

### Step 2: Start the CRM Portal
Run the following script to boot both Express.js and the Vite React server:
```bash
npm run dev
```

- **Vite Web App UI**: Runs locally on [http://localhost:5173](http://localhost:5173)
- **Express Backend API**: Runs locally on [http://localhost:5000](http://localhost:5000)

---

## 🔑 Login Credentials (Evaluation)

To quickly assess the application, use the pre-seeded login credentials:
* **Demo Email**: `admin@crm.com`
* **Demo Password**: `admin123`

---

## 📡 REST API Documentation

All routes accept and return standard `application/json` payloads.

### 1. Retrieve Leads
* **Method**: `GET`
* **Path**: `/leads`
* **Response**: An array of lead objects sorted by creation date (newest first).

### 2. Add New Lead
* **Method**: `POST`
* **Path**: `/add-lead`
* **Body Requirements**:
  ```json
  {
    "name": "Arjun Sharma",
    "email": "arjun.sharma@example.com",
    "phone": "+91 98765 43210",
    "status": "New" // Optional: "New", "Contacted", or "Converted"
  }
  ```

### 3. Delete Lead
* **Method**: `DELETE`
* **Path**: `/delete-lead/:id`
* **Parameters**: `id` (e.g., `lead_1779610746444`)
