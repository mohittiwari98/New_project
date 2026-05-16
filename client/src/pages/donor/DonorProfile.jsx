import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiPhone, FiMapPin, FiHeart, FiMail, FiSave } from 'react-icons/fi';
import { THEME_COLORS } from '../../utils/constants';

const DonorProfile = () => {
  const [donor, setDonor] = useState({
    name: 'John Donor',
    email: 'donor@demo.com',
    phone: '+1 234 567 8900',
    bloodGroup: 'O+',
    location: '123 Donor Street, City',
    available: true,
    dateOfBirth: '1990-05-15',
    lastDonation: '2024-01-15',
  });

  // Fallback theme safety
  const theme = THEME_COLORS?.donor || {
    gradient: 'from-purple-600 to-pink-600',
    bgDark: 'bg-purple-700'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
    console.log('Updated Donor Data:', donor);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      {/* Header Card */}
      <div className={`bg-gradient-to-r ${theme.gradient} rounded-2xl p-6 text-white shadow-lg`}>
        <h1 className="text-2xl font-bold">Update Profile</h1>
        <p className="opacity-90 mt-1">Manage your donor profile and life-saving information</p>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-xl p-8 shadow-xl border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={donor.name}
                  onChange={(e) => setDonor({ ...donor, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  value={donor.email}
                  onChange={(e) => setDonor({ ...donor, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  value={donor.phone}
                  onChange={(e) => setDonor({ ...donor, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Group</label>
              <div className="relative">
                <FiHeart className="absolute left-3 top-3 text-red-500" />
                <select
                  value={donor.bloodGroup}
                  onChange={(e) => setDonor({ ...donor, bloodGroup: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location / Address</label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={donor.location}
                  onChange={(e) => setDonor({ ...donor, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Availability */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Available for Donation?</label>
              <div className="flex items-center space-x-4 mt-1">
                <button
                  type="button"
                  onClick={() => setDonor({ ...donor, available: true })}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all border-2 ${
                    donor.available 
                    ? 'bg-green-600 border-green-600 text-white shadow-lg ring-4 ring-green-100' 
                    : 'bg-white border-gray-200 text-gray-500 hover:border-green-200'
                  }`}
                >
                  Yes, I am Available
                </button>
                <button
                  type="button"
                  onClick={() => setDonor({ ...donor, available: false })}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all border-2 ${
                    !donor.available 
                    ? 'bg-red-600 border-red-600 text-white shadow-lg ring-4 ring-red-100' 
                    : 'bg-white border-gray-200 text-gray-500 hover:border-red-200'
                  }`}
                >
                  Not Right Now
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-6 border-t border-gray-100">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={`flex items-center space-x-2 px-10 py-3.5 ${theme.bgDark} text-white rounded-xl hover:opacity-90 shadow-xl transition-all font-bold tracking-wide`}
            >
              <FiSave size={20} />
              <span>Save Profile Changes</span>
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonorProfile;