// src/pages/EVCatalogPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function EVCatalogPage() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/vehicles");

        if (response.ok) {
          const data = await response.json();
          setVehicles(Array.isArray(data) ? data : getSampleVehicles());
        } else {
          throw new Error("Backend error");
        }
      } catch (err) {
        console.log("Backend not available → using sample vehicles");
        setVehicles(getSampleVehicles());
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const getSampleVehicles = () => [
    {
      id: 1,
      modelNumber: "BYD-SEAL",
      description:
        "Flagship electric sedan with advanced Blade Battery and premium interior.",
      pictureUrl: "https://picsum.photos/id/1015/1200/800",
      features: ["Blade Battery", "800V Architecture", "Intelligent Cockpit"],
      unitPrice: "¥289,800",
      seminarDate: "2026-05-10",
      maxSeats: 50,
      availableSeats: 27,
    },
    {
      id: 2,
      modelNumber: "NIO-ET7",
      description: "Luxury electric sedan with battery swapping technology.",
      pictureUrl: "https://picsum.photos/id/106/1200/800",
      features: ["Battery Swap", "NAD Autonomous Driving", "Premium Audio"],
      unitPrice: "¥458,000",
      seminarDate: "2026-05-15",
      maxSeats: 40,
      availableSeats: 12,
    },
    {
      id: 3,
      modelNumber: "XPENG-G9",
      description: "High-performance electric SUV with advanced AI.",
      pictureUrl: "https://picsum.photos/id/1074/1200/800",
      features: ["XPILOT 4.0", "Dual Motor AWD", "Panoramic Roof"],
      unitPrice: "¥399,900",
      seminarDate: "2026-05-20",
      maxSeats: 45,
      availableSeats: 25,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-28">
        <p className="text-xl text-gray-400">Loading EV Catalog...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">EV CATALOG</h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Explore our latest electric vehicle lineup and register for
            exclusive seminars
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-[#12121a] border border-gray-800 rounded-3xl overflow-hidden hover:border-cyan-400 transition-all cursor-pointer group"
              onClick={() => setSelectedVehicle(vehicle)}
            >
              <div className="relative h-64 bg-black">
                <img
                  src={vehicle.pictureUrl}
                  alt={vehicle.modelNumber}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x250?text=EV+Model";
                  }}
                />
              </div>

              <div className="p-8">
                <h3 className="font-bold text-2xl text-white mb-3">
                  {vehicle.modelNumber}
                </h3>
                <p className="text-gray-400 line-clamp-3 mb-6">
                  {vehicle.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-cyan-400 font-medium">
                    {vehicle.unitPrice}
                  </span>
                  <button className="bg-white text-black px-6 py-2 rounded-2xl text-sm font-medium hover:bg-cyan-400 hover:text-black transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Dark Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-[#12121a] w-full max-w-5xl max-h-[95vh] rounded-3xl overflow-hidden border border-gray-800 relative flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setSelectedVehicle(null)}
              className="absolute top-6 right-6 z-60 bg-black/70 hover:bg-black text-white p-3 rounded-full transition"
            >
              <X size={28} />
            </button>

            {/* Hero Image */}
            <div className="relative h-[70vh] bg-black">
              <img
                src={selectedVehicle.pictureUrl}
                alt={selectedVehicle.modelNumber}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/1200x800?text=EV+Model";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-10">
              <h2 className="text-4xl font-bold text-white mb-4">
                {selectedVehicle.modelNumber}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                {selectedVehicle.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-cyan-400 font-semibold text-xl mb-6">
                    KEY FEATURES
                  </h3>
                  <ul className="space-y-4">
                    {(selectedVehicle.features || []).map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <span className="text-cyan-400 mt-1">→</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-cyan-400 font-semibold text-xl mb-6">
                    SPECIFICATIONS
                  </h3>
                  <div className="space-y-6 text-gray-300">
                    <div className="flex justify-between border-b border-gray-800 pb-4">
                      <span>Unit Price</span>
                      <span className="font-medium text-white">
                        {selectedVehicle.unitPrice}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-800 pb-4">
                      <span>Max Seats</span>
                      <span className="font-medium text-white">
                        {selectedVehicle.maxSeats}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Seminar</span>
                      <span className="font-medium text-white">
                        {new Date(
                          selectedVehicle.seminarDate,
                        ).toLocaleDateString("en-GB")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="p-8 border-t border-gray-800 bg-[#1a1a24]">
              <button
                onClick={() => navigate("/seminar-register")}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black font-semibold py-4 rounded-2xl text-lg transition-all"
              >
                REGISTER FOR SEMINAR →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
