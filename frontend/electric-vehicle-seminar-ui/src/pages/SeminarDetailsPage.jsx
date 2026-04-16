// src/pages/SeminarDetailsPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const seminarsData = {
  1: {
    title: "ZhongNeng Sedan Pro",
    desc: "Experience the future of autonomous driving",
    date: "2026-04-15",
    time: "14:00",
    location: "Beijing Innovation Center",
    seatsAvailable: 14,
  },
  2: {
    title: "ZhongNeng SUV Elite",
    desc: "Family-oriented seminar",
    date: "2026-04-18",
    time: "10:00",
    location: "Shanghai Auto Expo Hall",
    seatsAvailable: 1,
  },
  3: {
    title: "ZhongNeng City Compact",
    desc: "Urban mobility solutions",
    date: "2026-04-22",
    time: "15:30",
    location: "Guangzhou City Center",
    seatsAvailable: 15,
  },
  4: {
    title: "ZhongNeng GT Sport",
    desc: "High-performance driving experience",
    date: "2026-04-25",
    time: "13:00",
    location: "Shenzhen Sports Car Track",
    seatsAvailable: 2,
  },
};

export default function SeminarDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const seminar = seminarsData[id];
  const [seats, setSeats] = useState(1);

  if (!seminar)
    return <div className="pt-40 text-center text-2xl">Seminar not found</div>;

  const handleRegister = () => {
    alert(`Registration successful for ${seminar.title} (${seats} seat(s))!`);
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <button onClick={() => navigate(-1)} className="mb-8 text-blue-600">
            ← Back
          </button>

          <div className="bg-white rounded-3xl p-10">
            <h1 className="text-4xl font-bold">{seminar.title}</h1>
            <p className="text-gray-600 mt-4">{seminar.desc}</p>

            <div className="grid grid-cols-3 gap-8 mt-10">
              <div>
                <span className="text-gray-500">Date</span>
                <br />
                <span className="font-medium">{seminar.date}</span>
              </div>
              <div>
                <span className="text-gray-500">Time</span>
                <br />
                <span className="font-medium">{seminar.time}</span>
              </div>
              <div>
                <span className="text-gray-500">Location</span>
                <br />
                <span className="font-medium">{seminar.location}</span>
              </div>
            </div>

            <div className="mt-12">
              <p className="font-medium mb-4">Number of Seats (Max 2)</p>
              <div className="flex gap-4">
                {[1, 2].map((n) => (
                  <button
                    key={n}
                    onClick={() => setSeats(n)}
                    className={`flex-1 py-4 rounded-2xl border ${seats === n ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}
                  >
                    {n} Seat{n > 1 ? "s" : ""}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleRegister}
              className="mt-10 w-full bg-black text-white py-5 rounded-2xl font-semibold"
            >
              Complete Registration
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
