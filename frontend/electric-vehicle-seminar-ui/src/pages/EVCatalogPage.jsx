// src/pages/EVCatalogPage.jsx
import { useState } from "react";
import Footer from "../components/layout/Footer";

const evModels = [
  {
    id: 1,
    brand: "BYD",
    name: "BYD Seal",
    price: "¥189,800",
    image: "https://picsum.photos/id/1015/800/500",
    range: "650 km",
    topSpeed: "180 km/h",
    accel: "0-100 km/h 3.8s",
    efficiency: "82.5 kWh",
    seminars: 3,
    desc: "Flagship electric sedan featuring revolutionary Blade Battery technology and advanced DiPilot intelligent driving system.",
    features: [
      "Blade Battery Safety Technology",
      "DiPilot 100 Intelligent Driving",
      "50:50 Weight Distribution",
      "Heat Pump System",
      "360° Panoramic View",
    ],
  },
  {
    id: 2,
    brand: "Zeekr",
    name: "Zeekr 001",
    price: "¥299,000",
    image: "https://picsum.photos/id/106/800/500",
    range: "741 km",
    topSpeed: "200 km/h",
    accel: "0-100 km/h 3.3s",
    efficiency: "100 kWh",
    seminars: 2,
    desc: "Premium electric shooting brake combining exceptional range, luxurious interior, and cutting-edge performance.",
    features: [
      "PMA+ Motor System",
      "800V High Voltage Architecture",
      "Luxury Nappa Leather Interior",
      "27-inch 3D HUD",
      "Advanced Air Suspension",
    ],
  },
  {
    id: 3,
    brand: "Tesla",
    name: "Tesla Model 3",
    price: "¥249,900",
    image: "https://picsum.photos/id/1074/800/500",
    range: "713 km",
    topSpeed: "201 km/h",
    accel: "0-100 km/h 4.2s",
    efficiency: "60 kWh",
    seminars: 4,
    desc: "The best-selling electric sedan with industry-leading Autopilot, minimalist design, and continuous over-the-air updates.",
    features: [
      "Autopilot & Full Self-Driving Capability",
      "15-inch Touchscreen",
      "Over-the-Air Software Updates",
      "Premium Audio System",
      "Glass Roof",
    ],
  },
  {
    id: 4,
    brand: "Chery",
    name: "Chery Omoda 5 EV",
    price: "¥159,900",
    image: "https://picsum.photos/id/133/800/500",
    range: "520 km",
    topSpeed: "160 km/h",
    accel: "0-100 km/h 7.6s",
    efficiency: "61 kWh",
    seminars: 2,
    desc: "Stylish and futuristic crossover EV offering excellent value with modern design and competitive range.",
    features: [
      "Futuristic Lion Face Design",
      "Dual 12.25-inch Screens",
      "Level 2+ ADAS",
      "Wireless Charging",
      "Panoramic Sunroof",
    ],
  },
  {
    id: 5,
    brand: "Changan",
    name: "Changan Deepal S7",
    price: "¥189,900",
    image: "https://picsum.photos/id/201/800/500",
    range: "620 km",
    topSpeed: "170 km/h",
    accel: "0-100 km/h 6.7s",
    efficiency: "79.97 kWh",
    seminars: 2,
    desc: "Smart electric SUV featuring advanced autonomous driving technology and premium cabin experience.",
    features: [
      "AR-HUD Display",
      "High-speed NOA Navigation",
      "Zero Gravity Seats",
      "14-speaker Sony Audio",
      "Electric Tailgate",
    ],
  },
  {
    id: 6,
    brand: "ZhongNeng",
    name: "ZhongNeng GT Sport",
    price: "¥588,000",
    image: "https://picsum.photos/id/107/800/500",
    range: "520 km",
    topSpeed: "250 km/h",
    accel: "0-100 km/h 2.8s",
    efficiency: "98 kWh",
    seminars: 1,
    desc: "High-performance electric sports car delivering breathtaking acceleration and superior dynamic handling.",
    features: [
      "Carbon Fiber Body Panels",
      "Active Aerodynamics",
      "Track Mode",
      "Brembo Braking System",
      "Racing-inspired Interior",
    ],
  },
];

export default function EVCatalogPage() {
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-cyan-500/10 text-cyan-400 px-6 py-2 rounded-full text-sm mb-6">
            NEXT-GEN FLEET AVAILABLE NOW
          </div>
          <h1 className="text-6xl font-bold tracking-tighter mb-4">
            THE FUTURE OF
            <br />
            ELECTRIC MOBILITY
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience unparalleled performance, autonomous intelligence, and
            striking design.
          </p>
        </div>

        {/* EV Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {evModels.map((car) => (
            <div
              key={car.id}
              className="bg-[#12121a] rounded-3xl overflow-hidden border border-gray-800 hover:border-cyan-400 transition-all group cursor-pointer"
              onClick={() => setSelectedCar(car)}
            >
              <div className="relative h-64">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/80 text-white text-xs px-3 py-1 rounded-full">
                  26-C3
                </div>
                <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                  {car.brand}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-1">{car.name}</h3>
                <p className="text-cyan-400 text-2xl font-medium mb-4">
                  {car.price}
                </p>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                  {car.desc}
                </p>

                <div className="grid grid-cols-2 gap-3 text-sm mb-8">
                  <div>
                    Range: <span className="font-medium">{car.range}</span>
                  </div>
                  <div>
                    Top Speed:{" "}
                    <span className="font-medium">{car.topSpeed}</span>
                  </div>
                  <div>
                    0-100: <span className="font-medium">{car.accel}</span>
                  </div>
                  <div>
                    Efficiency:{" "}
                    <span className="font-medium">{car.efficiency}</span>
                  </div>
                </div>

                <button className="w-full py-4 border border-gray-700 hover:border-cyan-400 rounded-2xl font-medium transition-colors">
                  ACCESS DETAILS →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Modal */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
          <div className="bg-[#12121a] border border-cyan-500/30 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Image Header */}
            <div className="relative h-80">
              <img
                src={selectedCar.image}
                alt={selectedCar.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 right-6">
                <button
                  onClick={() => setSelectedCar(null)}
                  className="bg-black/70 text-white px-5 py-2 rounded-full text-sm hover:bg-black transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="p-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-cyan-400 text-sm font-medium">
                    {selectedCar.brand}
                  </div>
                  <h2 className="text-4xl font-bold text-white">
                    {selectedCar.name}
                  </h2>
                  <p className="text-3xl text-cyan-400 mt-2">
                    {selectedCar.price}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">
                    AVAILABLE SEMINARS
                  </div>
                  <div className="text-2xl font-semibold text-cyan-400">
                    {selectedCar.seminars}
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-10">
                {selectedCar.desc}
              </p>

              <div className="grid grid-cols-2 gap-10">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    Key Specifications
                  </h3>
                  <div className="space-y-4 text-gray-300">
                    <div className="flex justify-between">
                      <span>Range</span>
                      <span className="font-medium">{selectedCar.range}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Top Speed</span>
                      <span className="font-medium">
                        {selectedCar.topSpeed}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>0-100 km/h</span>
                      <span className="font-medium">{selectedCar.accel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Battery</span>
                      <span className="font-medium">
                        {selectedCar.efficiency}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    Key Features
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    {selectedCar.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-cyan-400 mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <button
                  onClick={() =>
                    alert(
                      `Seminar registration for ${selectedCar.name} coming soon!`,
                    )
                  }
                  className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-12 py-4 rounded-2xl text-lg transition-all"
                >
                  REGISTER FOR SEMINAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
