import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaHospital, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaSave } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const HospitalProfile = () => {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || 'City General Hospital',
      address: '123 Main Street, Downtown',
      phone: '+1 234 567 8900',
      email: 'contact@cityhospital.com',
      workingHours: '24/7',
      emergency: 'Yes',
    },
  });

  const onSubmit = async (data) => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Profile updated successfully!');
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Hospital Profile</h1>
        <p className="text-gray-600">Manage your hospital information</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Hospital Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Name
                </label>
                <div className="relative">
                  <FaHospital className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    {...register('name', { required: 'Hospital name is required' })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-3 text-gray-400" />
                  <textarea
                    {...register('address')}
                    rows={2}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      {...register('phone')}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      {...register('email')}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Working Hours
                  </label>
                  <div className="relative">
                    <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      {...register('workingHours')}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                    >
                      <option value="24/7">24/7</option>
                      <option value="8:00 AM - 8:00 PM">8:00 AM - 8:00 PM</option>
                      <option value="9:00 AM - 5:00 PM">9:00 AM - 5:00 PM</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Services
                  </label>
                  <select
                    {...register('emergency')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaSave />
                )}
                <span>Save Changes</span>
              </button>
            </form>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Profile Photo */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHospital className="text-white text-4xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{user?.name || 'Hospital'}</h3>
            <p className="text-gray-500">Verified Hospital</p>
            <button className="mt-4 text-green-600 hover:text-green-700 font-medium">
              Change Logo
            </button>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Beds</span>
                <span className="font-semibold text-gray-900">100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Available</span>
                <span className="font-semibold text-green-600">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pending Requests</span>
                <span className="font-semibold text-yellow-600">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Rating</span>
                <span className="font-semibold text-gray-900">4.5 ★</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HospitalProfile;

