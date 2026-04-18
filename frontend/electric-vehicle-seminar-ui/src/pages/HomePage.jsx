// src/pages/HomePage.jsx
export default function HomePage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Hero Section */}
      <div className="pt-32 pb-40 text-center relative">
        <div className="max-w-5xl mx-auto px-6">
          {/* System Status */}
          <div className="inline-flex items-center gap-2 bg-[#1a1a2e] border border-cyan-500/30 rounded-full px-5 py-2 text-sm mb-8">
            <span className="text-cyan-400">●</span>
            SYSTEM ONLINE // PROTOCOL V2.0
          </div>

          {/* Main Title */}
          <h1 className="text-7xl font-bold leading-none mb-6">
            WELCOME TO ZHONGNENG
            <br />
            <span className="text-cyan-400">EV REGISTRATION NEXUS</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Experience the future of electric mobility. Register for exclusive
            seminars, explore our latest EV models, and join China's electric
            vehicle revolution with our next-generation platform.
          </p>

          {/* Buttons */}
          <div className="flex gap-5 justify-center">
            <a
              href="/register"
              className="bg-cyan-500 hover:bg-cyan-600 text-black px-10 py-4 rounded-2xl font-semibold text-lg transition flex items-center gap-2"
            >
              INITIALIZE ACCOUNT →
            </a>
            <a
              href="/seminar-register"
              className="border border-cyan-400 hover:bg-cyan-950 px-10 py-4 rounded-2xl font-semibold text-lg transition flex items-center gap-2"
            >
              EXPLORE FLEET ⚡
            </a>
          </div>
        </div>
      </div>

      {/* Core Modules Section */}
      <div className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-sm mb-4">
            ⚙️ SYSTEM ARCHITECTURE
          </div>
          <h2 className="text-5xl font-bold mb-6">CORE MODULES</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our comprehensive seminar registration system provides everything
            you need to explore and experience our futuristic electric vehicles.
          </p>
        </div>
      </div>
    </div>
  );
}
