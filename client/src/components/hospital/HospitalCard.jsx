import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaStar, FaClock, FaBed, FaChevronRight } from 'react-icons/fa';

const HospitalCard = ({ hospital, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
    >
      {/* Hospital Image Section */}
      <div className="relative h-52 bg-gradient-to-br from-green-500 to-emerald-600 overflow-hidden">
        
        {/* Main Hospital Image */}
        <img
          src="https://images.unsplash.com/photo-1587351021753-71e3c6b1c8c4?w=800&fit=crop"
          alt={hospital.name || "Hospital"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
            e.target.parentElement.querySelector('.fallback').style.display = 'flex';
          }}
        />

        {/* Fallback Hospital Logo / Icon */}
        <div className="fallback hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-green-600 to-emerald-700">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-2xl rounded-3xl flex items-center justify-center border border-white/30">
            <FaBed className="text-white text-6xl" />
          </div>
        </div>

        {/* Distance Badge */}
        {hospital.distance && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm z-10">
            <FaMapMarkerAlt className="text-green-600" />
            <span className="font-semibold text-sm text-gray-700">{hospital.distance} km</span>
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-1 shadow-sm z-10">
          <FaStar className="text-yellow-500" />
          <span className="font-bold text-gray-800">{hospital.rating || '4.7'}</span>
        </div>

        {/* Status */}
        <div className="absolute bottom-4 left-4 bg-green-500 text-white text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-2 z-10">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          OPEN NOW
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
          {hospital.name}
        </h3>

        <div className="flex items-start gap-2 text-gray-600 mb-4">
          <FaMapMarkerAlt className="mt-1 text-green-500 flex-shrink-0" />
          <p className="text-sm leading-tight line-clamp-2">{hospital.address}</p>
        </div>

        {/* Contact Details */}
        <div className="flex items-center justify-between text-sm mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <FaPhone className="text-gray-400" />
            <span>{hospital.phone || 'Not Available'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaClock className="text-gray-400" />
            <span>24/7</span>
          </div>
        </div>

        {/* Bed Availability */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-semibold text-gray-700">Beds Available</p>
            <span className="text-3xl font-bold text-green-600">
              {hospital.beds?.available || 0}
            </span>
          </div>

          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(
                  ((hospital.beds?.available || 0) / (hospital.beds?.total || 100)) * 100,
                  100
                )}%`,
              }}
            />
          </div>

          <p className="text-xs text-gray-500 mt-2">
            {hospital.beds?.total
              ? `${hospital.beds.available} of ${hospital.beds.total} beds available`
              : 'Contact hospital for latest info'}
          </p>
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.985] shadow-md">
          View Details & Book Bed
          <FaChevronRight className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
};

export default HospitalCard;