// src/pages/SeminarRegistrationPage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { seminarService } from "../api/seminarService";

export default function SeminarRegistrationPage() {
  const { addRegistration } = useAuth();

  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [seatsToRegister, setSeatsToRegister] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [registering, setRegistering] = useState(false);

  // Fetch upcoming seminars from backend
  useEffect(() => {
    const fetchSeminars = async () => {
      try {
        setLoading(true);
        const response = await seminarService.getUpcomingSeminars();
        setSeminars(response.data);
      } catch (err) {
        console.error("Failed to fetch seminars:", err);
        setError("Failed to load seminars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeminars();
  }, []);

  const handleCompleteRegistration = async () => {
    if (!selectedSeminar) return;

    setRegistering(true);

    try {
      const isFullyBooked = selectedSeminar.availableSeats <= 0;

      // Call backend API to register
      await seminarService.registerForSeminar(selectedSeminar.id, {
        seatsBooked: seatsToRegister,
      });

      // Add to My Registrations via AuthContext
      const status = isFullyBooked ? "Waitlisted" : "Confirmed";

      addRegistration({
        seminarId: selectedSeminar.id,
        seminar: selectedSeminar.vehicleModelNumber || selectedSeminar.title,
        date: selectedSeminar.seminarDate || selectedSeminar.date,
        time: selectedSeminar.time || "",
        location: selectedSeminar.location || "Beijing",
        seats: seatsToRegister,
        status: status,
      });

      // Optimistic UI update
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
              const newSeats = Math.max(0, s.availableSeats - seatsToRegister);
              return {
                ...s,
                availableSeats: newSeats,
                progress: Math.round(
                  ((s.totalSeats - newSeats) / s.totalSeats) * 100,
                ),
              };
            }
          }
          return s;
        }),
      );

      // Show success message
      setSuccessMessage(
        isFullyBooked
          ? `You have been added to the waitlist for ${selectedSeminar.vehicleModelNumber || selectedSeminar.title} (${seatsToRegister} seat${seatsToRegister > 1 ? "s" : ""})`
          : `Registration successful for ${selectedSeminar.vehicleModelNumber || selectedSeminar.title} with ${seatsToRegister} seat(s)!`,
      );

      // Reset form
      setSelectedSeminar(null);
      setSeatsToRegister(1);

      // Auto hide success message
      setTimeout(() => setSuccessMessage(""), 6000);
    } catch (err) {
      console.error(err);
      const errorMsg =
        err.response?.data?.message || "Registration failed. Please try again.";
      alert(errorMsg);
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl">Loading seminars...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-2">
          Electric Vehicle Seminar Registration
        </h1>
        <p className="text-gray-600 mb-10">
          Register for upcoming seminars and experience our latest EV models
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

            <div className="space-y-6">
              {seminars.map((seminar) => {
                const isFullyBooked = seminar.availableSeats <= 0;

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
                            {seminar.vehicleModelNumber || seminar.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 mt-3">
                          {seminar.description || seminar.desc}
                        </p>
                      </div>

                      <div className="text-right ml-8">
                        {isFullyBooked ? (
                          <span className="bg-purple-100 text-purple-700 px-5 py-2 rounded-full text-sm font-medium">
                            Waiting List: {seminar.waitlist || 0} people
                          </span>
                        ) : seminar.availableSeats > 5 ? (
                          <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-medium">
                            {seminar.availableSeats} seats available
                          </span>
                        ) : (
                          <span className="bg-amber-100 text-amber-700 px-5 py-2 rounded-full text-sm font-medium">
                            Only {seminar.availableSeats} seats left
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flex gap-8 text-sm text-gray-600">
                      <div>
                        📅{" "}
                        {new Date(
                          seminar.seminarDate || seminar.date,
                        ).toLocaleDateString()}
                      </div>
                      <div>🕒 {seminar.time || ""}</div>
                      <div>
                        📍 {seminar.location || "Beijing Innovation Center"}
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all"
                          style={{ width: `${seminar.progress || 0}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>
                          {seminar.totalSeats - (seminar.availableSeats || 0)}{" "}
                          registered
                        </span>
                        <span>{seminar.totalSeats || 50} total</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Registration Details Sidebar */}
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
                      {selectedSeminar.vehicleModelNumber ||
                        selectedSeminar.title}
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
                      <li>Confirmation will be sent to your email</li>
                      <li>
                        If the seminar is full, you will be added to the
                        waitlist
                      </li>
                      <li>
                        You can cancel your registration anytime before the
                        event
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={handleCompleteRegistration}
                    disabled={registering}
                    className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-4 rounded-2xl transition-all disabled:opacity-70"
                  >
                    {registering
                      ? "Processing Registration..."
                      : "Complete Registration"}
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
