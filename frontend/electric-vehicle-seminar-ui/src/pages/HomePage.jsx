// src/pages/HomePage.jsx
import Footer from "../components/layout/Footer"; // ← REMOVE this line

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Hero Section */}
      <div className="pt-32 pb-40 text-center relative grid-bg">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-[#1a1a2e] border border-cyan-500/30 rounded-full px-5 py-2 text-sm mb-8">
            <span className="text-cyan-400">●</span>
            SYSTEM ONLINE // PROTOCOL V2.0
          </div>

          <h1 className="text-7xl font-bold leading-none mb-6 text-white">
            WELCOME TO ZHONGNENG
            <br />
            <span className="text-cyan-400">EV REGISTRATION NEXUS</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Experience the future of electric mobility. Register for exclusive
            seminars, explore our latest EV models, and join China's electric
            vehicle revolution.
          </p>

          <div className="flex gap-5 justify-center">
            <a
              href="/register"
              className="bg-cyan-500 hover:bg-cyan-600 text-black px-10 py-4 rounded-2xl font-semibold text-lg"
            >
              INITIALIZE ACCOUNT
            </a>
            <a
              href="/catalog"
              className="border border-cyan-400 hover:bg-cyan-950 px-10 py-4 rounded-2xl font-semibold text-lg"
            >
              EXPLORE FLEET
            </a>
          </div>
        </div>
      </div>

      {/* REMOVE THIS LINE */}
      {/* <Footer /> */}
    </div>
  );
}
