import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiCalendar, FiMapPin, FiClock } from 'react-icons/fi';
import { THEME_COLORS } from '../../utils/constants';
import { formatDate } from '../../utils/formatDate';

const DonationHistory = () => {
  const [history] = useState([
    { id: '1', date: '2024-01-15', bloodGroup: 'O+', units: 1, hospital: 'City General Hospital', location: 'Downtown', status: 'completed' },
    { id: '2', date: '2023-12-01', bloodGroup: 'O+', units: 1, hospital: 'Memorial Medical Center', location: 'Westside', status: 'completed' },
    { id: '3', date: '2023-10-15', bloodGroup: 'O+', units: 1, hospital: 'St. Marys Hospital', location: 'Northside', status: 'completed' },
    { id: '4', date: '2023-08-20', bloodGroup: 'O+', units: 1, hospital: 'Riverside Medical College', location: 'Eastside', status: 'completed' },
    { id: '5', date: '2023-06-10', bloodGroup: 'O+', units: 1, hospital: 'Metro Health Hospital', location: 'Central', status: 'completed' },
  ]);

  // Safety fallback for theme
  const theme = THEME_COLORS?.donor || {
    gradient: 'from-red-500 to-rose-600',
    text: 'text-red-600',
    bg: 'bg-red-50'
  };

  const totalDonations = history.length;
  const totalUnits = history.reduce((acc, curr) => acc + curr.units, 0);
  const lastDonationDate = history[0]?.date || null;

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className={`bg-gradient-to-r ${theme.gradient} rounded-2xl p-6 text-white shadow-lg`}>
        <h1 className="text-2xl font-bold">Donation History</h1>
        <p className="opacity-90 mt-1">Your blood donation journey and impact</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-5 shadow-md border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Donations</p>
              <p className={`text-3xl font-bold ${theme.text}`}>{totalDonations}</p>
            </div>
            <div className={`p-3 rounded-full ${theme.bg}`}>
              <FiHeart className={theme.text} size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5 shadow-md border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Last Donation</p>
              <p className="text-xl font-bold text-gray-800">
                {lastDonationDate ? formatDate(lastDonationDate) : 'No history'}
              </p>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <FiCalendar className="text-red-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-5 shadow-md border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Units Donated</p>
              <p className="text-3xl font-bold text-gray-800">{totalUnits}</p>
            </div>
            <div className="p-3 rounded-full bg-rose-100">
              <FiHeart className="text-rose-600" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* History Table */}
      {history.length > 0 ? (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Group</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Units</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Hospital</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {history.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center text-sm font-medium text-gray-700">
                        <FiCalendar className="mr-2 text-gray-400" />
                        {formatDate(donation.date)}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-bold">
                        {donation.bloodGroup}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 font-bold">{donation.units} Unit</td>
                    <td className="py-4 px-6 text-sm text-gray-700 font-medium">{donation.hospital}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiMapPin className="mr-1 text-gray-400" />
                        {donation.location}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl p-16 shadow-lg text-center border-2 border-dashed border-gray-100">
          <FiHeart className="mx-auto text-gray-200 text-7xl mb-4" />
          <h3 className="text-xl font-bold text-gray-700">No Donations Yet</h3>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">Your donations can save lives. Schedule your first appointment today!</p>
          <button className={`mt-6 px-6 py-2 ${theme.bgDark || 'bg-red-600'} text-white rounded-lg font-bold shadow-md`}>
            Find a Blood Bank
          </button>
        </div>
      )}
    </div>
  );
};

export default DonationHistory;