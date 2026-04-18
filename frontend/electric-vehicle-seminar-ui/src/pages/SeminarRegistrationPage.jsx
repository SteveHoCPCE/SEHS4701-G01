// src/pages/SeminarRegistrationPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const upcomingSeminars = [
  {
    id: 1,
    title: "ZhongNeng Sedan Pro",
    desc: "Experience the future of autonomous driving with our Sedan Pro model",
    date: "2026-04-15",
    time: "14:00",
    location: "Beijing Innovation Center",
    seatsAvailable: 14,
    totalSeats: 50,
    progress: 72,
    waitlist: 0,
  },
  {
    id: 2,
    title: "ZhongNeng SUV Elite",
    desc: "Family-oriented seminar showcasing the spacious SUV Elite",
    date: "2026-04-18",
    time: "10:00",
    location: "Shanghai Auto Expo Hall",
    seatsAvailable: 0,
    totalSeats: 60,
    progress: 100,
    waitlist: 3, // initial waitlist count
  },
  {
    id: 3,
    title: "ZhongNeng City Compact",
    desc: "Urban mobility solutions with the City Compact model",
    date: "2026-04-22",
    time: "15:30",
    location: "Guangzhou City Center",
    seatsAvailable: 15,
    totalSeats: 40,
    progress: 62,
    waitlist: 0,
  },
  {
    id: 4,
    title: "ZhongNeng GT Sport",
    desc: "High-performance driving experience with GT Sport",
    date: "2026-04-25",
    time: "13:00",
    location: "Shenzhen Sports Car Track",
    seatsAvailable: 2,
    totalSeats: 30,
    progress: 93,
    waitlist: 0,
  },
];

export default function SeminarRegistrationPage() {
  const { addRegistration } = useAuth();
  const navigate = useNavigate();

  const [seminars, setSeminars] = useState(upcomingSeminars);
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [seatsToRegister, setSeatsToRegister] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCompleteRegistration = () => {
    if (!selectedSeminar) return;

    const isFullyBooked = selectedSeminar.seatsAvailable <= 0;
    const status = isFullyBooked ? "Waitlisted" : "Confirmed";

    // Add to My Registrations
    addRegistration({
      seminar: selectedSeminar.title,
      date: selectedSeminar.date,
      time: selectedSeminar.time,
      location: selectedSeminar.location,
      seats: seatsToRegister,
      status: status,
    });

    // Update seminar data
    setSeminars((prev) =>
      prev.map((s) => {
        if (s.id === selectedSeminar.id) {
          if (isFullyBooked) {
            // Increase waitlist count
            return {
              ...s,
              waitlist: (s.waitlist || 0) + seatsToRegister,
            };
          } else {
            // Reduce available seats
            const newSeats = s.seatsAvailable - seatsToRegister;
            return {
              ...s,
              seatsAvailable: Math.max(0, newSeats),
              progress: Math.round(
                ((s.totalSeats - newSeats) / s.totalSeats) * 100,
              ),
            };
          }
        }
        return s;
      }),
    );

    setSuccessMessage(
      isFullyBooked
        ? `You have been added to the waitlist for ${selectedSeminar.title}. (${seatsToRegister} seat${seatsToRegister > 1 ? "s" : ""})`
        : `Registration successful for ${selectedSeminar.title} with ${seatsToRegister} seat(s)!`,
    );

    setSelectedSeminar(null);
    setSeatsToRegister(1);

    setTimeout(() => setSuccessMessage(""), 5000);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-2">
          Electric Vehicle Seminar Registration
        </h1>
        <p className="text-gray-600 mb-10">
          Register for upcoming seminars and experience our electric vehicles
          firsthand
        </p>

        {successMessage && (
          <div className="mb-8 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-2xl flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <p>{successMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Seminars List */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-semibold mb-6">Upcoming Seminars</h2>
            <p className="text-gray-600 mb-8">Select a seminar to register</p>

            <div className="space-y-6">
              {seminars.map((seminar) => {
                const isFullyBooked = seminar.seatsAvailable <= 0;
                return (
                  <div
                    key={seminar.id}
                    onClick={() => setSelectedSeminar(seminar)}
                    className={`bg-white border rounded-3xl p-7 cursor-pointer transition-all hover:shadow-md ${
                      selectedSeminar?.id === seminar.id
                        ? "border-blue-600 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🚗</span>
                          <h3 className="font-semibold text-xl">
                            {seminar.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 mt-3">{seminar.desc}</p>
                      </div>

                      <div className="text-right ml-8">
                        {isFullyBooked ? (
                          <span className="bg-purple-100 text-purple-700 px-5 py-2 rounded-full text-sm font-medium">
                            Waiting List: {seminar.waitlist || 0} people
                          </span>
                        ) : seminar.seatsAvailable > 5 ? (
                          <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-medium">
                            {seminar.seatsAvailable} seats available
                          </span>
                        ) : (
                          <span className="bg-amber-100 text-amber-700 px-5 py-2 rounded-full text-sm font-medium">
                            {seminar.seatsAvailable} seats left
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flex gap-8 text-sm text-gray-600">
                      <div>📅 {seminar.date}</div>
                      <div>🕒 {seminar.time}</div>
                      <div>📍 {seminar.location}</div>
                    </div>

                    <div className="mt-6">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all"
                          style={{ width: `${seminar.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>
                          {seminar.totalSeats - seminar.seatsAvailable}{" "}
                          registered
                        </span>
                        <span>{seminar.totalSeats} total</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Registration Details */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 sticky top-8">
              <h3 className="font-semibold text-xl mb-2">
                Registration Details
              </h3>
              <p className="text-gray-600 mb-8">
                Complete your seminar registration
              </p>

              {selectedSeminar ? (
                <>
                  <div className="bg-blue-50 p-6 rounded-2xl mb-8">
                    <p className="text-sm text-gray-500">Selected Seminar</p>
                    <p className="font-semibold text-lg mt-1">
                      {selectedSeminar.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {selectedSeminar.date} • {selectedSeminar.time}
                      <br />
                      {selectedSeminar.location}
                    </p>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Number of Seats
                    </label>
                    <div className="flex gap-3">
                      {[1, 2].map((num) => (
                        <button
                          key={num}
                          onClick={() => setSeatsToRegister(num)}
                          className={`flex-1 py-4 rounded-2xl border font-medium transition-all ${
                            seatsToRegister === num
                              ? "border-blue-600 bg-blue-50 text-blue-700"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          {num} Seat{num > 1 ? "s" : ""}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-2xl text-sm mb-8">
                    <p className="font-medium mb-2">Important Notes:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>
                        Confirmation email will be sent upon successful
                        registration
                      </li>
                      <li>If seminar is full, you will be waitlisted</li>
                      <li>You can cancel your registration anytime</li>
                    </ul>
                  </div>

                  <button
                    onClick={handleCompleteRegistration}
                    className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-4 rounded-2xl transition-all"
                  >
                    Complete Registration
                  </button>
                </>
              ) : (
                <div className="text-center py-20 text-gray-400">
                  <div className="text-6xl mb-6">📅</div>
                  Select a seminar from the list to continue
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
