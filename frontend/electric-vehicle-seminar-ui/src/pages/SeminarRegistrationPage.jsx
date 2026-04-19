// src/pages/SeminarRegistrationPage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { seminarService } from "../api/seminarService";

export default function SeminarRegistrationPage() {
  const { user, addRegistration } = useAuth(); // ← Only this line was updated
  const navigate = useNavigate();

  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [seatsToRegister, setSeatsToRegister] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registering, setRegistering] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  const fetchSeminars = async () => {
    try {
      setLoading(true);
      const response = await seminarService.getUpcomingSeminars();
      setSeminars(response.data || []);
    } catch (err) {
      console.error(err);
      setSeminars([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeminars();
  }, []);

  const handleCompleteRegistration = async () => {
    if (!selectedSeminar) return;

    setRegistering(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await seminarService.registerForSeminar(selectedSeminar.id, {
        seatsBooked: seatsToRegister,
      });

      const availableSeats = selectedSeminar.availableSeats || 0;
      const isWaitlisted = availableSeats <= 0;

      const newRegistration = {
        id: Date.now(),
        seminar: selectedSeminar.vehicleModelNumber || "EV Seminar",
        date: selectedSeminar.seminarDate,
        seats: seatsToRegister,
        status: isWaitlisted ? "Waitlisted" : "Confirmed",
        registeredAt: new Date().toISOString(),
      };

      // === Added: Call addRegistration from context ===
      if (typeof addRegistration === "function") {
        addRegistration(newRegistration);
      }

      // Also save to localStorage as backup
      const existing = JSON.parse(
        localStorage.getItem("registrations") || "[]",
      );
      const updated = [newRegistration, ...existing];
      localStorage.setItem("registrations", JSON.stringify(updated));

      setSuccessMessage(
        isWaitlisted
          ? `Added to waitlist for ${selectedSeminar.vehicleModelNumber}!`
          : `Successfully registered for ${selectedSeminar.vehicleModelNumber}!`,
      );

      setTimeout(() => setSuccessMessage(""), 5000);
      setSelectedSeminar(null);
      setSeatsToRegister(1);

      fetchSeminars();
    } catch (err) {
      console.error("Registration error:", err.response?.data);

      const msg = err.response?.data?.message || "Registration failed";

      if (msg.includes("verified")) {
        setErrorMessage(
          "Your email needs verification. Please verify your email first.",
        );
      } else {
        setErrorMessage(msg);
      }
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-28">
        Loading seminars...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900">
            Electric Vehicle Seminar Registration
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            Register for upcoming seminars and experience our electric vehicles
            firsthand
          </p>
        </div>

        {successMessage && (
          <div className="mb-8 px-6 py-4 bg-green-100 text-green-700 rounded-2xl">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-8 px-6 py-4 bg-red-100 text-red-700 rounded-2xl">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left - Seminars */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-semibold mb-6">Upcoming Seminars</h2>
            <p className="text-gray-600 mb-8">Select a seminar to register</p>

            <div className="space-y-6">
              {seminars.map((seminar) => {
                const avail = seminar.availableSeats || 0;
                const total = seminar.totalSeats || 50;
                const progress = Math.round(((total - avail) / total) * 100);

                return (
                  <div
                    key={seminar.id}
                    onClick={() => setSelectedSeminar(seminar)}
                    className={`bg-white border rounded-3xl p-6 cursor-pointer hover:shadow-md transition-all ${
                      selectedSeminar?.id === seminar.id
                        ? "border-blue-600"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-xl">
                        {seminar.vehicleModelNumber}
                      </h3>
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          avail > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {avail > 0
                          ? `${avail} seats available`
                          : "Waitlisted : 0"}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">
                      Experience our latest EV model
                    </p>

                    <div className="mt-4 flex gap-6 text-sm text-gray-500">
                      <div>
                        📅 {new Date(seminar.seminarDate).toLocaleDateString()}
                      </div>
                      <div>
                        🕒{" "}
                        {new Date(seminar.seminarDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>

                    <div className="mt-6 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right - Registration Details */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 sticky top-8 border border-gray-100">
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
                    <p className="font-semibold text-lg">
                      {selectedSeminar.vehicleModelNumber}
                    </p>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Number of Seats
                    </label>
                    <div className="flex gap-3">
                      {[1, 2].map((n) => (
                        <button
                          key={n}
                          onClick={() => setSeatsToRegister(n)}
                          className={`flex-1 py-4 rounded-2xl border ${
                            seatsToRegister === n
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-300"
                          }`}
                        >
                          {n} Seat{n > 1 ? "s" : ""}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Important Notes - Figma Style */}
                  <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-2xl text-sm mb-8">
                    <p className="font-medium mb-3 flex items-center gap-2">
                      <span>ℹ️</span> Important Notes:
                    </p>
                    <ul className="list-disc list-inside space-y-1.5 text-gray-700">
                      <li>
                        Confirmation email will be sent upon successful
                        registration
                      </li>
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
                    className="w-full bg-black text-white py-4 rounded-2xl font-semibold hover:bg-gray-900 disabled:bg-gray-400"
                  >
                    {registering ? "Processing..." : "Complete Registration"}
                  </button>
                </>
              ) : (
                <div className="text-center py-20 text-gray-400">
                  Select a seminar from the list
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
