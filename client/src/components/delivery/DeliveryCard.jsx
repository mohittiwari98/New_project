import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaTint, FaClock, FaCheck, FaTruck, FaBox } from 'react-icons/fa';
import { formatDateTime, timeAgo } from '../../utils/formatDate';

const DeliveryCard = ({ delivery, onAccept, onStartPickup, onComplete, index = 0 }) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' },
      in_transit: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'In Transit' },
      delivered: { bg: 'bg-green-100', text: 'text-green-700', label: 'Delivered' },
      completed: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Completed' },
    };
    return colors[status] || colors.pending;
  };

  const status = getStatusColor(delivery.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <FaTruck className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Delivery #{delivery.id}</h3>
              <p className="text-white/80 text-sm">{timeAgo(delivery.createdAt)}</p>
            </div>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-bold ${status.bg} ${status.text}`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Blood Info */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FaTint className="text-red-600 text-xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{delivery.bloodGroup}</p>
              <p className="text-sm text-gray-500">{delivery.units} unit{delivery.units > 1 ? 's' : ''}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Request ID</p>
            <p className="font-semibold text-gray-800">#{delivery.bloodRequestId}</p>
          </div>
        </div>
      </div>

      {/* Route */}
      <div className="p-4">
        <div className="flex items-start space-x-4">
          {/* Pickup */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <FaBox className="text-green-600 text-sm" />
              </div>
              <span className="text-sm font-medium text-gray-500">Pickup</span>
            </div>
            <p className="font-semibold text-gray-800">{delivery.pickupLocation}</p>
            <p className="text-sm text-gray-500">{delivery.pickupAddress}</p>
            {delivery.pickedAt && (
              <p className="text-xs text-green-600 mt-1">
                Picked at: {formatDateTime(delivery.pickedAt)}
              </p>
            )}
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center justify-center px-4">
            <div className="w-px h-8 bg-gray-200" />
            <FaTruck className="text-orange-500 my-2" />
            <div className="w-px h-8 bg-gray-200" />
          </div>

          {/* Drop */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <FaMapMarkerAlt className="text-red-600 text-sm" />
              </div>
              <span className="text-sm font-medium text-gray-500">Drop</span>
            </div>
            <p className="font-semibold text-gray-800">{delivery.dropLocation}</p>
            <p className="text-sm text-gray-500">{delivery.dropAddress}</p>
            {delivery.deliveredAt && (
              <p className="text-xs text-green-600 mt-1">
                Delivered at: {formatDateTime(delivery.deliveredAt)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Carrier Info */}
      {delivery.carrier && (
        <div className="px-4 pb-4">
          <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {delivery.carrier.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">{delivery.carrier}</p>
                <p className="text-xs text-gray-500">Carrier</p>
              </div>
            </div>
            <a
              href={`tel:${delivery.carrierPhone}`}
              className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
            >
              <FaPhone className="text-green-600" />
            </a>
          </div>
        </div>
      )}

      {/* Estimated Delivery */}
      {delivery.estimatedDelivery && delivery.status === 'in_transit' && (
        <div className="px-4 pb-4">
          <div className="bg-blue-50 rounded-xl p-3 flex items-center space-x-3">
            <FaClock className="text-blue-600" />
            <div>
              <p className="text-sm text-blue-600">Estimated Delivery</p>
              <p className="font-semibold text-blue-700">{formatDateTime(delivery.estimatedDelivery)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex space-x-3">
          {delivery.status === 'pending' && onAccept && (
            <button
              onClick={() => onAccept(delivery.id)}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center space-x-2"
            >
              <FaCheck />
              <span>Accept Delivery</span>
            </button>
          )}
          {delivery.status === 'in_transit' && onStartPickup && onComplete && (
            <>
              <button
                onClick={() => onStartPickup(delivery.id)}
                className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all"
              >
                Start Pickup
              </button>
              <button
                onClick={() => onComplete(delivery.id)}
                className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-all"
              >
                Complete
              </button>
            </>
          )}
          {delivery.status === 'delivered' || delivery.status === 'completed' ? (
            <div className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-semibold text-center">
              Delivery Completed
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default DeliveryCard;

