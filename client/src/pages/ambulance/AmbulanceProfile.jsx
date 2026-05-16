import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiPhone, FiTruck, FiMapPin, FiMail, FiSave } from 'react-icons/fi';
import { THEME_COLORS } from '../../utils/constants';

const AmbulanceProfile = () => {
  const [driver, setDriver] = useState({
    name: 'Mike Ambulance',
    email: 'ambulance@demo.com',
    phone: '+1 234 567 8900',
    licenseNumber: 'DL-12345678',
    vehicle: 'Ambulance ABC-123',
    vehicleType: 'Advanced Life Support',
    location: '123 Ambulance Street, City',
    available: true,
  });

  // Fallback theme in case THEME_COLORS is undefined
  const theme = THEME_COLORS?.ambulance || {
    gradient: 'from-yellow-500 to-orange-600',
    bgDark: 'bg-yellow-600'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
    console.log('Updated Driver Data:', driver);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      {/* Header Section */}
      <div className={`bg-gradient-to-r ${theme.gradient} rounded-2xl p-6 text-white shadow-lg`}>
        <h1 className="text-2xl font-bold">Update Profile</h1>
        <p className="opacity-90 mt-1">Manage your ambulance driver profile and availability</p>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-xl p-6 shadow-xl border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={driver.name}
                  onChange={(e) => setDriver({ ...driver, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  value={driver.email}
                  onChange={(e) => setDriver({ ...driver, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  value={driver.phone}
                  onChange={(e) => setDriver({ ...driver, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* License Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
              <div className="relative">
                <FiTruck className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={driver.licenseNumber}
                  onChange={(e) => setDriver({ ...driver, licenseNumber: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Vehicle Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Number</label>
              <div className="relative">
                <FiTruck className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={driver.vehicle}
                  onChange={(e) => setDriver({ ...driver, vehicle: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
              <div className="relative">
                <FiTruck className="absolute left-3 top-3 text-gray-400" />
                <select
                  value={driver.vehicleType}
                  onChange={(e) => setDriver({ ...driver, vehicleType: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="Basic Life Support">Basic Life Support</option>
                  <option value="Advanced Life Support">Advanced Life Support</option>
                  <option value="Patient Transport">Patient Transport</option>
                </select>
              </div>
            </div>

            {/* Current Location */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Location/Base</label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={driver.location}
                  onChange={(e) => setDriver({ ...driver, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Availability Status */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability Status</label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setDriver({ ...driver, available: true })}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    driver.available 
                    ? 'bg-green-600 text-white shadow-md ring-2 ring-green-200' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  Available
                </button>
                <button
                  type="button"
                  onClick={() => setDriver({ ...driver, available: false })}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    !driver.available 
                    ? 'bg-red-600 text-white shadow-md ring-2 ring-red-200' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  Busy / Offline
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={`flex items-center space-x-2 px-8 py-3 ${theme.bgDark} text-white rounded-lg hover:opacity-90 shadow-lg transition-all font-bold`}
            >
              <FiSave size={20} />
              <span>Save Changes</span>
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AmbulanceProfile;