## 🚀 Quick Start Guide

Follow these steps to run the project locally after cloning.

### 1. Clone the Repository

````bash
git clone <your-repository-url>
cd electric-vehicle-seminar-ui

### 2. Install All Dependencies

```bash
npm install



### 3. Start the Development Server

```bash
npm run dev

####4. Alternative: Manual Installation

```bash
# Core packages (already included)
npm install react react-dom react-router-dom

# Styling
npm install @tailwindcss/postcss tailwindcss

# Icons & Animations
npm install lucide-react framer-motion

# HTTP Client
npm install axios


## 🔧 Available Scripts

| Command               | Description                                      |
|-----------------------|--------------------------------------------------|
| `npm install`         | Install all dependencies                         |
| `npm run dev`         | Start development server (localhost:5173)        |
| `npm run build`       | Build the project for production                 |
| `npm run preview`     | Preview the production build locally             |
| `npm run lint`        | Run ESLint to check code quality                 |


### Project Structure

/frontend
├── electric-vehicle-seminar-ui
├── public/
│   ├── favicon.ico
│   └── ... (other static assets)
├── src/
│   ├── api/
│   │   ├── axiosInstance.js
│   │   ├── authService.js
│   │   ├── seminarService.js
│   │   └── customerService.js
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   │       └── index.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── MainLayout.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Spinner.jsx
│   │   └── ... (other specific components)
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useApi.js
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── SeminarListPage.jsx
│   │   ├── SeminarDetailsPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── routes/
│   │   └── AppRouter.jsx
│   ├── utils/
│   │   ├── formatDate.js
│   │   └── validators.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── jsconfig.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
````
