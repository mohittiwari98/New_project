import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaStar, FaClock, FaTint, FaChevronRight } from 'react-icons/fa';
import { BLOOD_GROUPS } from '../../utils/constants';

const BloodCard = ({ bloodBank, index = 0 }) => {
  const getBloodColor = (group) => {
    const colors = {
      'A+': 'bg-red-100 text-red-700 border-red-200',
      'A-': 'bg-red-50 text-red-600 border-red-100',
      'B+': 'bg-blue-100 text-blue-700 border-blue-200',
      'B-': 'bg-blue-50 text-blue-600 border-blue-100',
      'O+': 'bg-orange-100 text-orange-700 border-orange-200',
      'O-': 'bg-orange-50 text-orange-600 border-orange-100',
      'AB+': 'bg-purple-100 text-purple-700 border-purple-200',
      'AB-': 'bg-purple-50 text-purple-600 border-purple-100',
    };
    return colors[group] || 'bg-gray-100 text-gray-700';
  };

  const getStockLevel = (units) => {
    if (units > 40) return { label: 'High', color: 'text-green-600 bg-green-100' };
    if (units > 15) return { label: 'Medium', color: 'text-yellow-600 bg-yellow-100' };
    return { label: 'Low', color: 'text-red-600 bg-red-100' };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
    >
      {/* Header Image Section */}
      <div className="relative h-52 bg-gradient-to-br from-red-500 via-red-600 to-rose-600 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30">
            <FaTint className="text-white text-5xl" />
          </div>
        </div>

        {/* Distance Badge */}
        {bloodBank.distance && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-sm">
            <FaMapMarkerAlt className="text-red-500" />
            <span className="font-semibold text-sm text-gray-700">{bloodBank.distance} km</span>
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl flex items-center gap-1 shadow-sm">
          <FaStar className="text-yellow-500" />
          <span className="font-bold text-gray-800">{bloodBank.rating || '4.6'}</span>
        </div>

        {/* Open Status */}
        <div className="absolute bottom-4 left-4 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          OPEN NOW
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
          {bloodBank.name}
        </h3>

        <div className="flex items-start gap-2 text-gray-600 mb-4">
          <FaMapMarkerAlt className="mt-1 text-red-500 flex-shrink-0" />
          <p className="text-sm leading-tight">{bloodBank.address}</p>
        </div>

        {/* Contact Info */}
        <div className="flex items-center justify-between text-sm mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <FaPhone className="text-gray-400" />
            <span>{bloodBank.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaClock className="text-gray-400" />
            <span>{bloodBank.workingHours || '24/7'}</span>
          </div>
        </div>

        {/* Blood Stock Section */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">Available Stock</p>
          <div className="grid grid-cols-4 gap-3">
            {BLOOD_GROUPS.map((group) => {
              const units = bloodBank.stock?.[group] || 0;
              const level = getStockLevel(units);
              const isAvailable = units > 0;

              return (
                <div
                  key={group}
                  className={`rounded-2xl p-3 text-center border transition-all hover:scale-105 ${
                    isAvailable 
                      ? getBloodColor(group) 
                      : 'bg-gray-100 text-gray-400 border-gray-200'
                  }`}
                >
                  <p className="font-bold text-base mb-1">{group}</p>
                  <p className={`text-lg font-semibold ${isAvailable ? '' : 'line-through opacity-60'}`}>
                    {units}
                  </p>
                  {isAvailable && (
                    <p className={`text-[10px] font-medium mt-0.5 px-2 py-0.5 rounded-full w-fit mx-auto ${level.color}`}>
                      {level.label}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <button 
          className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.985] shadow-md"
        >
          <span>Request Blood Now</span>
          <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default BloodCard;