import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiTruck,
  FiMapPin,
  FiPhone,
  FiClock,
  FiNavigation,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { THEME_COLORS } from "../../utils/constants";

const AmbulanceDashboard = () => {
  const [ambulance] = useState({
    name: "Mike Ambulance",
    vehicleNumber: "AMB-1234",
    phone: "+1 234 567 8900",
    location: "Current Location: City Center",
    available: true,
    type: "Advanced Life Support",
  });

  const [trips, setTrips] = useState([
    {
      id: "1",
      patient: "John Smith",
      pickup: "123 Main Street",
      hospital: "City General Hospital",
      status: "in_progress",
      distance: "2.5 km",
      eta: "5 min",
    },
    {
      id: "2",
      patient: "Sarah Johnson",
      pickup: "456 Oak Avenue",
      hospital: "Memorial Medical Center",
      status: "pending",
      distance: "4.0 km",
      eta: null,
    },
  ]);

  const [history] = useState([
    {
      id: "1",
      patient: "Jane Doe",
      date: "2024-01-20",
      hospital: "St. Marys Hospital",
      status: "completed",
    },
    {
      id: "2",
      patient: "Bob Wilson",
      date: "2024-01-19",
      hospital: "Riverside Medical",
      status: "completed",
    },
    {
      id: "3",
      patient: "Alice Brown",
      date: "2024-01-18",
      hospital: "Metro Health",
      status: "completed",
    },
  ]);

  const theme = THEME_COLORS.ambulance;

  const stats = [
    { label: "Total Trips", value: "127", icon: FiTruck, color: theme.text },
    { label: "Today Trips", value: "3", icon: FiClock, color: theme.text },
    {
      label: "Status",
      value: ambulance.available ? "Available" : "Busy",
      icon: FiCheckCircle,
      color: ambulance.available ? "text-green-600" : "text-red-600",
    },
    { label: "Rating", value: "4.8", icon: FiNavigation, color: theme.text },
  ];

  const handleAcceptTrip = (id) => {
    setTrips((prev) =>
      prev.map((trip) =>
        trip.id === id ? { ...trip, status: "in_progress" } : trip
      )
    );
  };

  const handleCompleteTrip = (id) => {
    setTrips((prev) => prev.filter((trip) => trip.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className={`bg-gradient-to-r ${theme.gradient} rounded-2xl p-6 text-white`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {ambulance.name}!</h1>
            <p className="mt-2 opacity-90">
              {ambulance.vehicleNumber} - {ambulance.type}
            </p>
          </div>

          <div className="text-right">
            <div className="text-4xl font-bold">
              {ambulance.available ? "AVAILABLE" : "BUSY"}
            </div>
            <div className="text-sm opacity-80">Current Status</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>

              <div className={`p-3 rounded-full ${theme.bg}`}>
                <stat.icon className={theme.text} size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Current Location */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${theme.bg}`}>
              <FiMapPin className={theme.text} size={24} />
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">Current Location</h3>
              <p className="text-sm text-gray-500">{ambulance.location}</p>
            </div>
          </div>

          <button
            className={`px-6 py-2 rounded-lg ${theme.bgDark} text-white hover:opacity-90 transition`}
          >
            Update Location
          </button>
        </div>
      </div>

      {/* Active Trips */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Active Emergency Trips
        </h2>

        <div className="space-y-4">
          {trips.map((trip) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-xl border-2 ${
                trip.status === "in_progress"
                  ? "border-yellow-200 bg-yellow-50"
                  : "border-gray-100"
              } hover:border-yellow-200 transition`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-full ${
                      trip.status === "in_progress"
                        ? "bg-yellow-100"
                        : "bg-gray-100"
                    }`}
                  >
                    {trip.status === "in_progress" ? (
                      <FiNavigation className="text-yellow-600" size={24} />
                    ) : (
                      <FiAlertCircle className="text-gray-600" size={24} />
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {trip.patient}
                    </h3>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center">
                        <FiMapPin className="mr-1" />
                        Pickup: {trip.pickup}
                      </span>

                      <span className="flex items-center">
                        <FiTruck className="mr-1" />
                        {trip.distance}
                      </span>
                    </div>

                    <div className="text-sm text-gray-500 mt-1">
                      Hospital: {trip.hospital}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {trip.status === "in_progress" ? (
                    <>
                      <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-medium">
                        In Progress {trip.eta && `- ${trip.eta}`}
                      </span>

                      <button
                        onClick={() => handleCompleteTrip(trip.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        Complete
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleAcceptTrip(trip.id)}
                      className={`px-4 py-2 ${theme.bgDark} text-white rounded-lg hover:opacity-90 transition`}
                    >
                      Accept Trip
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trip History */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recent Trip History
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                  Patient
                </th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                  Hospital
                </th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {history.map((trip) => (
                <tr
                  key={trip.id}
                  className="border-b border-gray-50 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{trip.patient}</td>
                  <td className="py-3 px-4 text-gray-500">{trip.date}</td>
                  <td className="py-3 px-4 text-gray-500">{trip.hospital}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          className={`p-6 rounded-xl ${theme.bg} border-2 border-yellow-200 hover:border-yellow-300 transition flex items-center justify-center space-x-3`}
        >
          <FiTruck className={theme.text} size={28} />
          <span className={`font-semibold ${theme.text}`}>View All Trips</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-xl bg-gray-100 border-2 border-gray-200 hover:border-gray-300 transition flex items-center justify-center space-x-3"
        >
          <FiPhone className="text-gray-600" size={28} />
          <span className="font-semibold text-gray-700">
            Contact Dispatch
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-xl bg-gray-100 border-2 border-gray-200 hover:border-gray-300 transition flex items-center justify-center space-x-3"
        >
          <FiMapPin className="text-gray-600" size={28} />
          <span className="font-semibold text-gray-700">Update Status</span>
        </motion.button>
      </div>
    </div>
  );
};

export default AmbulanceDashboard;