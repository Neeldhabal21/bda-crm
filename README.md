# BDA Lead Management CRM

A clean, modern, and lightweight full-stack CRM (Customer Relationship Management) system designed for Business Development Associates (BDAs). This project is built as a beginner-friendly template suitable for MERN/full-stack internship assessments.

---

## 🚀 Key Features

1. **Dashboard Overview**
   - Live analytics cards (Total Leads, New, Contacted, Converted).
   - Visual distribution bar showing the conversion funnel ratio.
   - Quick preview of the most recently added leads.

2. **Lead Management Tab**
   - Add new leads with a modern popup form (includes field validation).
   - Real-time search by Name, Email, or Phone.
   - Filter leads by status (`New`, `Contacted`, `Converted`).
   - Remove leads with dynamic UI updates.

3. **Sleek Login Experience**
   - Simple frontend authentication.
   - Presaved assessment credentials for convenience.

---

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Axios, Tailwind CSS v4, Google Fonts (Plus Jakarta Sans & Outfit).
- **Backend**: Node.js + Express.js.
- **Storage**: `leads.json` (Flat JSON file-based database managed via Node's `fs` module).

---

## 📂 Project Structure

```text
bda-lead-management-crm/
├── package.json         # Root configuration to orchestrate client & server execution
├── README.md            # Installation & project guide
├── server/
│   ├── server.js        # Main Express server API implementation
│   ├── leads.json       # JSON file storage (Mock Database)
│   └── package.json     # Backend configuration & dependencies
└── client/
    ├── src/
    │   ├── App.jsx      # Core state controller & views router
    │   ├── main.jsx     # Vite entrypoint
    │   ├── index.css    # Tailwind CSS directive configuration
    │   ├── App.css      # Custom css overrides
    │   └── components/
    │       ├── Login.jsx      # Authentication screen UI
    │       ├── Sidebar.jsx    # Responsive sidebar layout (desktop/mobile)
    │       ├── Dashboard.jsx  # Main stats & distribution UI
    │       └── Leads.jsx      # Lead database table & form modal UI
    ├── index.html       # Client HTML container
    ├── vite.config.js   # Vite builder configurations
    └── package.json     # Frontend dependencies & Tailwind configurations
```

---

## ⚙️ Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) installed.

### Step 1: Install Dependencies
Open your terminal in the root directory (`bda-lead-management-crm`) and install all dependencies:
```bash
npm run install-all
```
*This installs root dev-dependencies, backend packages, and frontend packages automatically.*

### Step 2: Run the Application
Start both the backend server and frontend client concurrently with a single command:
```bash
npm run dev
```

- **Frontend Server**: Runs on [http://localhost:5173](http://localhost:5173)
- **Backend API**: Production API hosted on [https://bda-crm-api.onrender.com](https://bda-crm-api.onrender.com)

---

## 🔑 Login Credentials

Use the following credentials to access the portal:
- **Email**: `admin@crm.com`
- **Password**: `admin123`

---

## 📡 API Endpoints (Backend)

The Express server exposes the following endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/leads` | Fetches all leads from `leads.json` sorted by date |
| **POST** | `/add-lead` | Creates a new lead (Name, Email, Phone, Status) |
| **DELETE** | `/delete-lead/:id` | Deletes a lead matching the provided ID |

---

## 🤝 Verification & Testing

### Test Backend Endpoints (using cURL or PowerShell)

- **Fetch all leads**:
  ```bash
  curl https://bda-crm-api.onrender.com/leads
  ```

- **Add a new lead**:
  ```bash
  curl -X POST -H "Content-Type: application/json" -d "{\"name\":\"Test Lead\",\"email\":\"test@example.com\",\"phone\":\"+91 99999 88888\",\"status\":\"New\"}" https://bda-crm-api.onrender.com/add-lead
  ```
