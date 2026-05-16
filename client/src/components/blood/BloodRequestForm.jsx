import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaTint, FaHospital, FaUser, FaPhone, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import { BLOOD_GROUPS } from '../../utils/constants';
import bloodService from '../../services/bloodService';

const BloodRequestForm = ({ onSuccess, preSelectedHospital }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [urgency, setUrgency] = useState('normal');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      patientName: '',
      bloodGroup: '',
      units: 1,
      hospital: preSelectedHospital || '',
      phone: '',
      reason: '',
      urgency: 'normal',
    },
  });

  const getBloodColor = (group) => {
    const colors = {
      'A+': 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200',
      'A-': 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100',
      'B+': 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200',
      'B-': 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100',
      'O+': 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200',
      'O-': 'bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100',
      'AB+': 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200',
      'AB-': 'bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100',
    };
    return colors[group] || 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200';
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await bloodService.createBloodRequest(data);
      if (result.success) {
        toast.success('Blood request submitted successfully!');
        reset();
        if (onSuccess) onSuccess(result.request);
      }
    } catch (error) {
      toast.error('Failed to submit blood request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const urgencyOptions = [
    { value: 'emergency', label: 'Emergency', color: 'bg-red-500', icon: '🚨' },
    { value: 'urgent', label: 'Urgent', color: 'bg-orange-500', icon: '⚠️' },
    { value: 'normal', label: 'Normal', color: 'bg-green-500', icon: '✓' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
          <FaTint className="text-white text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Blood Request Form</h2>
          <p className="text-sm text-gray-500">Fill in the details below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Patient Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              {...register('patientName', { required: 'Patient name is required' })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              placeholder="Enter patient name"
            />
          </div>
          {errors.patientName && (
            <p className="mt-1 text-sm text-red-500">{errors.patientName.message}</p>
          )}
        </div>

        {/* Blood Group Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blood Group <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {BLOOD_GROUPS.map((group) => (
              <label key={group} className="cursor-pointer">
                <input
                  type="radio"
                  value={group}
                  {...register('bloodGroup', { required: 'Blood group is required' })}
                  className="hidden"
                />
                <div className={`p-3 rounded-xl border-2 text-center transition-all ${getBloodColor(group)}`}>
                  <span className="font-bold text-lg">{group}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.bloodGroup && (
            <p className="mt-1 text-sm text-red-500">{errors.bloodGroup.message}</p>
          )}
        </div>

        {/* Units Required */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Units Required <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="1"
              max="10"
              {...register('units', { 
                required: 'Units is required',
                min: { value: 1, message: 'Minimum 1 unit' },
                max: { value: 10, message: 'Maximum 10 units' }
              })}
              className="w-24 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
            <span className="text-gray-500">units</span>
          </div>
          {errors.units && (
            <p className="mt-1 text-sm text-red-500">{errors.units.message}</p>
          )}
        </div>

        {/* Hospital */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hospital <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaHospital className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              {...register('hospital', { required: 'Hospital name is required' })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              placeholder="Enter hospital name"
            />
          </div>
          {errors.hospital && (
            <p className="mt-1 text-sm text-red-500">{errors.hospital.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Phone <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: { value: /^[0-9]{10}$/, message: 'Enter valid phone number' }
              })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              placeholder="Enter phone number"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Request <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('reason', { required: 'Reason is required' })}
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
            placeholder="e.g., Surgery, Accident, Childbirth, etc."
          />
          {errors.reason && (
            <p className="mt-1 text-sm text-red-500">{errors.reason.message}</p>
          )}
        </div>

        {/* Urgency Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Urgency Level <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {urgencyOptions.map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  value={option.value}
                  {...register('urgency')}
                  className="hidden"
                  onChange={(e) => setUrgency(e.target.value)}
                />
                <div
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    urgency === option.value
                      ? `${option.color} text-white border-transparent`
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg mr-2">{option.icon}</span>
                  <span className="font-medium">{option.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <FaExclamationTriangle />
              <span>Submit Emergency Request</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default BloodRequestForm;

