<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:dc2626,100:991b1b&height=220&section=header&text=LifeFlow&fontSize=80&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Every%20Drop%20Counts.%20Every%20Second%20Matters.&descAlignY=62&descSize=18"/>

[![Deployed](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://mohittiwari98.github.io/New_project/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Google Maps](https://img.shields.io/badge/Google%20Maps-Tracking-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white)](https://developers.google.com/maps)
[![Zustand](https://img.shields.io/badge/Zustand-State-orange?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-ff69b4?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

[![Stars](https://img.shields.io/github/stars/mohittiwari98/New_project?style=for-the-badge&color=dc2626)](https://github.com/mohittiwari98/New_project/stargazers)
[![Last Commit](https://img.shields.io/github/last-commit/mohittiwari98/New_project?style=for-the-badge&color=991b1b)](https://github.com/mohittiwari98/New_project/commits/main)
[![Issues](https://img.shields.io/github/issues/mohittiwari98/New_project?style=for-the-badge&color=red)](https://github.com/mohittiwari98/New_project/issues)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

> ### 🩸 *"Between life and death, there is a moment. LifeFlow fills that moment."*

<br/>

**[🚑 Live Demo](https://mohittiwari98.github.io/New_project/) · [🐛 Report Bug](https://github.com/mohittiwari98/New_project/issues) · [✨ Request Feature](https://github.com/mohittiwari98/New_project/issues)**

</div>

---

## 🌍 What is LifeFlow?

**LifeFlow** is a full-stack, real-time hospital blood bank management ecosystem designed to save lives by connecting every critical stakeholder in a medical emergency — all in one platform.

From the moment a patient needs blood to the second it's delivered, LifeFlow orchestrates **donors, hospitals, blood banks, ambulances, carriers, and patients** in a seamless, intelligent, and real-time network.

> No delays. No confusion. Just life.

---

## 🧩 The Ecosystem
─────────────────────────────────┐
│                     LifeFlow Ecosystem                  │
│                                                         │
│   🏥 Hospital ──── requests ────► 🩸 Blood Bank         │
│       │                               │                 │
│       │                           dispatches            │
│       │                               │                 │
│   🧑‍⚕️ Patient ◄─── treated ────── 🚑 Ambulance          │
│       │                               │                 │
│   📍 Real-time                    🏍️ Carrier             │
│     Tracking                          │                 │
│                                   🙋 Donor              │
└─────────────────────────────────────────────────────────┘

| Role | Responsibility |
|---|---|
| 🏥 **Hospital** | Request blood units, manage inventory, track incoming supply |
| 🩸 **Blood Bank** | Manage blood stock, process requests, dispatch to hospitals |
| 🙋 **Donor** | Register, schedule donations, track donation history |
| 🧑‍⚕️ **Patient** | Request blood, track delivery, view medical status |
| 🚑 **Ambulance** | Respond to emergencies, transport patients & blood units |
| 🏍️ **Carrier** | Last-mile delivery of blood units to hospitals & patients |

---

## ✨ Features

- 🩸 **Blood Bank Management** — Real-time blood inventory tracking by type (A+, B+, O-, AB+ etc.)
- 🗺️ **Live Tracking** — Google Maps integration for ambulance & carrier tracking
- ⚡ **Real-time Updates** — Socket.io powered live notifications and status updates
- 📊 **Analytics Dashboard** — Recharts-powered insights on donations, requests & inventory
- 🔐 **Role-based Access** — Separate dashboards for Hospital, Donor, Patient, Ambulance, Carrier
- 📱 **Fully Responsive** — Mobile-first design for on-the-go emergency access
- 🎨 **Smooth Animations** — Framer Motion powered transitions
- 🔔 **Instant Notifications** — React Hot Toast alerts for critical events
- 📋 **Form Validation** — React Hook Form for reliable data entry
- 🗃️ **State Management** — Zustand for efficient global state

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| ⚛️ React | 19 | UI Framework |
| ⚡ Vite | 7 | Build Tool |
| 🎨 Tailwind CSS | 4 | Styling |
| 🔗 React Router | 7 | Client Routing |
| 🗺️ Google Maps API | 2 | Live Location Tracking |
| ⚡ Socket.io Client | 4 | Real-time Communication |
| 📊 Recharts | 3 | Analytics & Charts |
| 🎭 Framer Motion | 12 | Animations |
| 🗃️ Zustand | 5 | State Management |
| 📋 React Hook Form | 7 | Form Handling |
| 🌐 Axios | 1 | API Requests |
| 🎯 React Icons | 5 | Icon Library |

---

## 🚀 Getting Started

### Prerequisites

![Node](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-latest-CB3837?style=flat-square&logo=npm&logoColor=white)

### Installation

```bash
# Clone the repository
git clone https://github.com/mohittiwari98/New_project.git

# Navigate to client folder
cd New_project/client

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure
New_project/
└── client/
├── public/                   # Static assets
├── src/
│   ├── components/           # Reusable UI components
│   ├── pages/                # Role-based pages
│   │   ├── Hospital/         # Hospital dashboard
│   │   ├── Donor/            # Donor portal
│   │   ├── Patient/          # Patient portal
│   │   ├── Ambulance/        # Ambulance tracking
│   │   └── Carrier/          # Carrier management
│   ├── store/                # Zustand state management
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Helper functions
│   ├── App.jsx               # Root component
│   └── main.jsx              # Entry point
├── index.html
├── vite.config.js
└── package.json

---

## 🔄 CI/CD Pipeline
Push to main
↓
GitHub Actions triggered
↓
npm install + npm run build
↓
Deploy to gh-pages branch
↓
Live at GitHub Pages 🎉

[![Deploy Status](https://img.shields.io/github/actions/workflow/status/mohittiwari98/New_project/deploy.yml?style=for-the-badge&label=Deploy&logo=github-actions&logoColor=white)](https://github.com/mohittiwari98/New_project/actions)

---

## 🌐 Deployment

The app is deployed on **GitHub Pages** and accessible at:

🔗 **https://mohittiwari98.github.io/New_project/**

---

## 💡 Why LifeFlow?

Every year, millions of lives are lost due to delayed blood supply during emergencies. LifeFlow bridges the gap between **supply and demand** in the most critical moments by:

- ✅ Reducing blood request response time
- ✅ Connecting donors directly to hospitals in need
- ✅ Providing real-time visibility to all stakeholders
- ✅ Eliminating manual coordination during emergencies

---

## 🤝 Contributing

Contributions are always welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Mohit Tiwari**

[![GitHub](https://img.shields.io/badge/GitHub-mohittiwari98-181717?style=for-the-badge&logo=github)](https://github.com/mohittiwari98)

---

<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:991b1b,100:dc2626&height=120&section=footer"/>

🩸 **Built with purpose. Designed to save lives.** 🩸

⭐ **Star this repo if you believe in the mission!** ⭐
