<div align="center">

# 🍽️ TBK Hero — The Bagara Kitchen

### A full-stack restaurant management & guest-facing web application

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-black?logo=framer&logoColor=white)](https://www.framer.com/motion)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📖 Overview

**TBK Hero** is a modern, production-ready web application for **The Bagara Kitchen** — a premium restaurant offering authentic cuisine, banquet hall bookings, and catering services. The application serves two audiences:

- **Guests** — Browse the menu, explore the gallery, book banquet halls, and get in touch.
- **Staff (Admin / Manager)** — Manage bookings, staff accounts, and day-to-day operations through dedicated role-based dashboards.

---

## ✨ Features

### 🌐 Guest-Facing (Public)
| Feature | Description |
|---|---|
| **Hero Section** | Animated landing with parallax and bubble particle effects |
| **Interactive Menu** | Category-filtered menu with full-screen image lightbox |
| **Banquet Booking** | Multi-session date picker with real-time conflict detection |
| **Gallery** | Cloudinary-powered photo gallery |
| **Contact Form** | Contact page with location, phone, and email |
| **About** | Restaurant story, values, and team |

### 🔐 Staff Portal (Protected)
| Feature | Description |
|---|---|
| **Role-Based Auth** | Firebase Authentication with `admin` and `manager` roles |
| **Admin Dashboard** | Full system oversight — bookings, revenue, staff management |
| **Manager Dashboard** | Session-level booking management and customer coordination |
| **Staff Management** | Admin can create and manage manager accounts without losing their own session |
| **Booking Management** | View, approve, reject, and track banquet bookings with session conflict detection |

---

## 🏗️ Architecture

```
src/
├── assets/              # Static images and branding assets
├── components/          # Reusable UI components
│   ├── Navbar.jsx       # Responsive nav with mobile drawer + backdrop dismiss
│   ├── Hero.jsx         # Animated hero with bubble particles
│   ├── Menu.jsx         # Interactive menu with lightbox zoom
│   ├── Banquet.jsx      # Banquet hall info and booking entry point
│   ├── BanquetDatePicker.jsx  # Custom date picker with session visualization
│   ├── BookingModal.jsx # Full booking flow with conflict validation
│   ├── Gallery.jsx      # Cloudinary image gallery
│   ├── Contact.jsx      # Contact information and form
│   ├── About.jsx        # About section
│   ├── Footer.jsx       # Site footer
│   ├── Logo.jsx         # TBK brand logo component
│   ├── CloudinaryUpload.jsx   # Image upload utility
│   └── BubbleParticles.jsx    # Canvas-based animated particles
├── context/
│   ├── AuthContext.jsx  # Firebase auth + role resolution (admin/manager)
│   ├── DataContext.jsx  # Data context export
│   └── DataProvider.jsx # Booking data management + conflict detection
├── pages/
│   ├── Login.jsx        # Unified login page for all roles
│   ├── AdminDashboard.jsx     # Admin control panel + staff management
│   └── ManagerDashboard.jsx   # Manager booking management panel
├── firebase.js          # Firebase app initialization
├── App.jsx              # Routes and protected route logic
└── main.jsx             # React entry point
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 + Vite 8 |
| **Styling** | TailwindCSS 4 + custom CSS animations |
| **Animations** | Framer Motion 12 |
| **Icons** | Lucide React |
| **Authentication** | Firebase Auth v12 |
| **Database** | Firebase Firestore |
| **Image Storage** | Cloudinary (via `@vercel/blob`) |
| **Build Tool** | Vite with `@vitejs/plugin-react` |
| **Linting** | ESLint 10 with React Hooks plugin |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A [Firebase](https://console.firebase.google.com/) project with **Authentication** and **Firestore** enabled

### 1. Clone the repository

```bash
git clone https://github.com/developer-tbk/TBK-HERO.git
cd TBK-HERO
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your Firebase project credentials:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### 4. Set up Firebase

In your Firebase console:

1. **Authentication** → Enable **Email/Password** sign-in method
2. **Firestore** → Create a database and add a `managers` collection
   - Each document in `managers` should have the field `email` matching the manager's login email
3. The first user **not** listed in `managers` is treated as the **admin**

### 5. Run locally

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 6. Build for production

```bash
npm run build
npm run preview
```

---

## 🔑 Authentication & Role System

| Role | Access | How It Works |
|---|---|---|
| **Admin** | Full access — bookings, staff management, system settings | Firebase user whose email is **not** in the Firestore `managers` collection |
| **Manager** | Booking management only | Firebase user whose email **exists** in the `managers` collection |

### Creating Manager Accounts (Admin Only)

1. Log in as **Admin**
2. Navigate to the **"Manage Staff"** tab in the Admin Dashboard
3. Fill in the manager's name, email, and password
4. Click **"Create Manager Account"**

The system uses a secondary Firebase App instance to create the account without disrupting the admin's active session.

---

## 📅 Banquet Booking System

Banquet hall bookings support **three daily sessions**:

| Session | Time Slot |
|---|---|
| Morning | 06:00 AM – 12:00 PM |
| Afternoon | 12:00 PM – 06:00 PM |
| Evening | 06:00 PM – 12:00 AM |

Each session is tracked independently. The date picker visually indicates:
- 🟢 **Available** — Free to book
- 🟡 **Partially Booked** — Some sessions taken
- 🔴 **Fully Booked** — All sessions occupied

---

## 📂 Key Scripts

```bash
npm run dev       # Start development server (Vite HMR)
npm run build     # Build production bundle
npm run preview   # Preview production build locally
npm run lint      # Run ESLint checks
```

---

## 🔒 Security Notes

- **Never commit your `.env` file** — it is listed in `.gitignore`
- Firebase API keys in `.env` are exposed to the client browser (this is normal for Firebase web apps) — secure your data using **Firestore Security Rules**
- Recommended Firestore rules: restrict read/write on `managers` and `bookings` collections to authenticated users only

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ for **The Bagara Kitchen**

</div>
