import { motion } from 'framer-motion';
import { FaBed, FaUser, FaCheck, FaTimes } from 'react-icons/fa';

const BedCard = ({ type, available, occupied, total, onUpdate, index = 0 }) => {
  const percentage = total > 0 ? (available / total) * 100 : 0;
  
  const getStatusColor = () => {
    if (percentage > 50) return 'from-green-400 to-green-500';
    if (percentage > 20) return 'from-yellow-400 to-yellow-500';
    return 'from-red-400 to-red-500';
  };

  const getTypeLabel = () => {
    const labels = {
      general: 'General Ward',
      icu: 'ICU',
      icu_ventilator: 'ICU with Ventilator',
      emergency: 'Emergency',
      pediatric: 'Pediatric',
      nicu: 'NICU',
    };
    return labels[type] || type;
  };

  const getTypeIcon = () => {
    const icons = {
      general: '🛏️',
      icu: '🏥',
      icu_ventilator: '💨',
      emergency: '🚨',
      pediatric: '👶',
      nicu: '👶‍🍼',
    };
    return icons[type] || '🛏️';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${getStatusColor()} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{getTypeIcon()}</span>
            <div>
              <h3 className="text-white font-bold text-lg">{getTypeLabel()}</h3>
              <p className="text-white/80 text-sm">Bed Management</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
            <span className="text-white font-bold text-2xl">{available}</span>
            <span className="text-white/80 text-sm">/ {total}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 pt-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Occupancy</span>
          <span className="font-semibold text-gray-800">{Math.round((occupied / total) * 100)}%</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(occupied / total) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`h-full bg-gradient-to-r ${getStatusColor()}`}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <FaCheck className="text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-green-700">{available}</p>
            <p className="text-xs text-green-600">Available</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-xl">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <FaUser className="text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-red-700">{occupied}</p>
            <p className="text-xs text-red-600">Occupied</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {onUpdate && (
        <div className="px-4 pb-4">
          <p className="text-xs text-gray-500 mb-2">Quick Update</p>
          <div className="flex space-x-2">
            <button
              onClick={() => onUpdate(type, -1)}
              className="flex-1 flex items-center justify-center space-x-1 bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition-colors"
            >
              <FaTimes />
              <span>-1</span>
            </button>
            <button
              onClick={() => onUpdate(type, 1)}
              className="flex-1 flex items-center justify-center space-x-1 bg-green-100 text-green-600 py-2 rounded-lg hover:bg-green-200 transition-colors"
            >
              <FaCheck />
              <span>+1</span>
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BedCard;

