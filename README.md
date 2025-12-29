# 🚀 ProjectPulse - Smart Project Management System

**ProjectPulse** is a robust, high-performance project management solution designed for modern teams. Built on the **MERN stack**, it streamlines the workflow between Admins, Employees, and Clients, ensuring real-time monitoring and administrative efficiency.

---

## 🛠️ Tech Stack

ProjectPulse is engineered using a modern and scalable tech stack:

* **Frontend**: **Next.js** (React-based framework for SSR and optimized routing), **Tailwind CSS**, and **DaisyUI**.
* **State Management**: **TanStack Query (React Query)** for efficient server-side state synchronization.
* **Backend**: **Node.js** and **Express.js** for a fast, minimalist web API.
* **Database**: **MongoDB** for flexible, NoSQL data storage.
* **Security**: **Firebase Authentication** integrated with **JWT (JSON Web Tokens)** for secure, role-based access.
* **Deployment**: Vercel (Frontend) and Render/Railway (Backend).

---

## ⚙️ How It Works

ProjectPulse utilizes a sophisticated architecture to ensure data integrity and security:

### 1. Secure Authentication & Role-Based Access
When a user logs in via **Firebase**, the system generates a **JWT** to secure subsequent API requests. The application features a specialized **Private Route** system that prevents unauthorized access. It includes a custom "Hydration-safe" loader that monitors the Firebase `onAuthStateChanged` observer before rendering protected content.

### 2. Dashboard Intelligence (Overview)
Upon successful authentication, users are greeted with a professional **Overview** dashboard. Using **TanStack Query**, the system fetches project metrics (like total project length) and displays them through modern, animated Stat Cards.

### 3. Workflow Management
* **Admins**: Can create and manage global projects, assign team members, and oversee blocker reports.
* **Employees**: Perform weekly check-ins to log their progress and report technical "Blockers" that hinder development.
* **Real-time Feedback**: Data is synchronized across the dashboard, ensuring that project "Pulses" (status updates) are visible instantly.

### 4. Blocker & Check-in System
The system categorizes issues using specialized icons and color-coded status indicators (Critical, Pending, Resolved), allowing Admins to prioritize and resolve bottlenecks immediately.

---

## ✨ Key Features

* **Role-Based Dashboards**: Customized views for Admins, Employees, and Clients.
* **Weekly Check-ins**: Automated tracking of employee progress.
* **Blocker Reporting**: Dedicated module for flagging and resolving project hurdles.
* **Optimized Performance**: Leverages Next.js SSR and client-side caching for lightning-fast navigation.
* **Modern UI**: A sleek, professional interface with skeleton loaders and animated transitions.

---

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone (https://github.com/omor244/Project-Pulse-client)
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up Environment Variables:**
    Create a `.env` file and add your Firebase and MongoDB credentials.
4.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

