import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiClock,
  FiMapPin,
  FiPhone,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { THEME_COLORS } from "../../utils/constants";

const DonorDashboard = () => {
  const [donor, setDonor] = useState({
    name: "John Donor",
    email: "donor@demo.com",
    phone: "+1 234 567 8900",
    bloodGroup: "O+",
    location: "123 Donor Street, City",
    available: true,
    totalDonations: 15,
    lastDonation: "2024-01-15",
  });

  const [requests, setRequests] = useState([
    {
      id: "1",
      hospital: "City General Hospital",
      bloodGroup: "O+",
      units: 2,
      urgency: "emergency",
      distance: "1.5 km",
      status: "pending",
    },
    {
      id: "2",
      hospital: "Memorial Medical Center",
      bloodGroup: "O+",
      units: 1,
      urgency: "urgent",
      distance: "3.2 km",
      status: "pending",
    },
  ]);

  const theme = THEME_COLORS.donor;

  const stats = [
    {
      label: "Total Donations",
      value: donor.totalDonations,
      icon: FiHeart,
      color: theme.text,
    },
    {
      label: "Available",
      value: donor.available ? "Yes" : "No",
      icon: FiCheckCircle,
      color: donor.available ? "text-green-600" : "text-red-600",
    },
    {
      label: "Blood Group",
      value: donor.bloodGroup,
      icon: FiHeart,
      color: "text-red-600",
    },
    {
      label: "Last Donation",
      value: "15 Jan 2024",
      icon: FiClock,
      color: theme.text,
    },
  ];

  const handleAcceptRequest = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "accepted" } : req
      )
    );
  };

  const toggleAvailability = () => {
    setDonor((prev) => ({
      ...prev,
      available: !prev.available,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`bg-gradient-to-r ${theme.gradient} rounded-2xl p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {donor.name}!</h1>
            <p className="mt-2 opacity-90">
              Your donations save lives. Thank you for being a hero!
            </p>
          </div>

          <div className="text-right">
            <div className="text-4xl font-bold">{donor.bloodGroup}</div>
            <div className="text-sm opacity-80">Blood Group</div>
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

      {/* Availability Toggle */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${theme.bg}`}>
              <FiMapPin className={theme.text} size={24} />
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">
                Availability Status
              </h3>
              <p className="text-sm text-gray-500">{donor.location}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span
              className={`px-4 py-2 rounded-full ${
                donor.available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {donor.available ? "Available for Donation" : "Unavailable"}
            </span>

            <button
              onClick={toggleAvailability}
              className={`px-6 py-2 rounded-lg ${theme.bgDark} text-white hover:opacity-90 transition`}
            >
              Toggle Status
            </button>
          </div>
        </div>
      </div>

      {/* Donation Requests */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Nearby Donation Requests
        </h2>

        <div className="space-y-4">
          {requests.map((request) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-xl border-2 ${
                request.status === "accepted"
                  ? "border-green-200 bg-green-50"
                  : "border-gray-100"
              } hover:border-purple-200 transition`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-full ${
                      request.urgency === "emergency"
                        ? "bg-red-100"
                        : "bg-yellow-100"
                    }`}
                  >
                    {request.urgency === "emergency" ? (
                      <FiAlertCircle className="text-red-600" size={24} />
                    ) : (
                      <FiClock className="text-yellow-600" size={24} />
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {request.hospital}
                    </h3>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center">
                        <FiHeart className="mr-1" />
                        {request.bloodGroup} - {request.units} unit(s)
                      </span>

                      <span className="flex items-center">
                        <FiMapPin className="mr-1" />
                        {request.distance}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {request.status === "accepted" ? (
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                      Accepted
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAcceptRequest(request.id)}
                      className={`px-4 py-2 ${theme.bgDark} text-white rounded-lg hover:opacity-90 transition`}
                    >
                      Accept Request
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          className={`p-6 rounded-xl ${theme.bg} border-2 border-purple-200 hover:border-purple-300 transition flex items-center justify-center space-x-3`}
        >
          <FiHeart className={theme.text} size={28} />
          <span className={`font-semibold ${theme.text}`}>
            View Donation History
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-xl bg-gray-100 border-2 border-gray-200 hover:border-gray-300 transition flex items-center justify-center space-x-3"
        >
          <FiPhone className="text-gray-600" size={28} />
          <span className="font-semibold text-gray-700">Update Profile</span>
        </motion.button>
      </div>
    </div>
  );
};

export default DonorDashboard;