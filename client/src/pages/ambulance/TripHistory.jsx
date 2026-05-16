import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTruck, FiCalendar, FiMapPin, FiClock, FiCheckCircle, FiNavigation } from 'react-icons/fi';
import { THEME_COLORS } from '../../utils/constants';
// Fallback if utility doesn't exist: (date) => new Date(date).toLocaleDateString()
import { formatDate } from '../../utils/formatDate';

const TripHistory = () => {
  const [history] = useState([
    { id: '1', patient: 'Jane Doe', date: '2024-01-20', time: '14:30', pickup: '123 Main St', hospital: 'St. Marys Hospital', status: 'completed', distance: '3.2 km', duration: '15 min' },
    { id: '2', patient: 'Bob Wilson', date: '2024-01-19', time: '09:15', pickup: '456 Oak Ave', hospital: 'Riverside Medical', status: 'completed', distance: '5.1 km', duration: '22 min' },
    { id: '3', patient: 'Alice Brown', date: '2024-01-18', time: '18:45', pickup: '789 Pine Rd', hospital: 'Metro Health', status: 'completed', distance: '2.8 km', duration: '12 min' },
    { id: '4', patient: 'John Smith', date: '2024-01-17', time: '11:00', pickup: '321 River Dr', hospital: 'City General', status: 'completed', distance: '4.5 km', duration: '18 min' },
    { id: '5', patient: 'Sarah Johnson', date: '2024-01-16', time: '16:20', pickup: '654 Metro Plaza', hospital: 'Memorial Medical', status: 'completed', distance: '6.0 km', duration: '25 min' },
  ]);

  // Safety check for theme
  const theme = THEME_COLORS?.ambulance || {
    gradient: 'from-yellow-400 to-yellow-600',
    text: 'text-yellow-600',
    bg: 'bg-yellow-100'
  };

  const totalTrips = history.length;
  const totalDistance = history.reduce((acc, trip) => acc + parseFloat(trip.distance), 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-2">
      {/* Header */}
      <div className={`bg-gradient-to-r ${theme.gradient} rounded-2xl p-6 text-white shadow-lg`}>
        <h1 className="text-2xl font-bold text-white">Trip History</h1>
        <p className="opacity-90 mt-1">Detailed log of your completed emergency missions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-5 shadow-lg border border-gray-50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total Trips</p>
              <p className={`text-3xl font-bold ${theme.text}`}>{totalTrips}</p>
            </div>
            <div className={`p-3 rounded-full ${theme.bg}`}>
              <FiTruck className={theme.text} size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5 shadow-lg border border-gray-50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total Distance</p>
              <p className="text-3xl font-bold text-gray-800">{totalDistance.toFixed(1)} km</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <FiNavigation className="text-blue-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-5 shadow-lg border border-gray-50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">This Month</p>
              <p className="text-3xl font-bold text-gray-800">{totalTrips}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <FiCheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-50 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">All Completed Trips</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Pickup Location</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Hospital</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Metrics</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.map((trip) => (
                <tr key={trip.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800 flex items-center">
                        <FiCalendar className="mr-2 text-gray-400" />
                        {formatDate ? formatDate(trip.date) : trip.date}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center mt-1">
                        <FiClock className="mr-2 text-gray-400" />
                        {trip.time}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-bold text-gray-700">{trip.patient}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-sm text-gray-600 max-w-[200px]">
                      <FiMapPin className="mr-2 text-red-400 shrink-0" />
                      <span className="truncate">{trip.pickup}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 font-medium">
                    {trip.hospital}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col text-xs font-medium">
                      <span className="text-blue-600">{trip.distance}</span>
                      <span className="text-gray-400">{trip.duration}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 capitalize">
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TripHistory;