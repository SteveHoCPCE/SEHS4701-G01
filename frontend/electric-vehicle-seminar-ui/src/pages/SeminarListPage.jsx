// src/pages/SeminarListPage.jsx
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const upcomingSeminars = [
  {
    id: 1,
    title: "ZhongNeng Sedan Pro",
    desc: "Experience the future of autonomous driving",
    date: "2026-04-15",
    time: "14:00",
    location: "Beijing Innovation Center",
    seatsAvailable: 14,
  },
  {
    id: 2,
    title: "ZhongNeng SUV Elite",
    desc: "Family-oriented seminar",
    date: "2026-04-18",
    time: "10:00",
    location: "Shanghai Auto Expo Hall",
    seatsAvailable: 1,
  },
  {
    id: 3,
    title: "ZhongNeng City Compact",
    desc: "Urban mobility solutions",
    date: "2026-04-22",
    time: "15:30",
    location: "Guangzhou City Center",
    seatsAvailable: 15,
  },
  {
    id: 4,
    title: "ZhongNeng GT Sport",
    desc: "High-performance driving experience",
    date: "2026-04-25",
    time: "13:00",
    location: "Shenzhen Sports Car Track",
    seatsAvailable: 2,
  },
];

export default function SeminarListPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">
            Electric Vehicle Seminar Registration
          </h1>
          <p className="text-gray-600 mb-10">Select a seminar to register</p>

          <div className="space-y-6">
            {upcomingSeminars.map((s) => (
              <div
                key={s.id}
                onClick={() => navigate(`/seminar-details/${s.id}`)}
                className="bg-white p-8 rounded-3xl border border-gray-200 hover:border-blue-600 cursor-pointer hover:shadow-md transition-all"
              >
                <h3 className="text-2xl font-semibold">{s.title}</h3>
                <p className="text-gray-600 mt-2">{s.desc}</p>
                <div className="mt-4 flex gap-6 text-sm text-gray-600">
                  <div>📅 {s.date}</div>
                  <div>🕒 {s.time}</div>
                  <div>📍 {s.location}</div>
                </div>
                <div className="mt-4">
                  {s.seatsAvailable > 5 ? (
                    <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
                      {s.seatsAvailable} seats available
                    </span>
                  ) : (
                    <span className="bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm">
                      {s.seatsAvailable} seats left
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
