import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaHistory, FaMapMarkerAlt } from 'react-icons/fa';
import deliveryService from '../../services/deliveryService';
import { formatDateTime, timeAgo } from '../../utils/formatDate';

const DeliveryHistory = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveries = async () => {
      setLoading(true);
      try {
        const data = await deliveryService.getDeliveryHistory();
        setDeliveries(data);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveries();
  }, []);

  const completedCount = deliveries.filter(d => d.status === 'completed').length;
  const deliveredCount = deliveries.filter(d => d.status === 'delivered').length;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Delivery History</h1>
        <p className="text-gray-600">View your completed deliveries</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-2xl font-bold text-gray-900">{deliveries.length}</p>
          <p className="text-sm text-gray-500">Total Deliveries</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-2xl font-bold text-green-600">{deliveredCount}</p>
          <p className="text-sm text-gray-500">Delivered</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-2xl font-bold text-blue-600">{completedCount}</p>
          <p className="text-sm text-gray-500">Completed</p>
        </div>
      </motion.div>

      {/* History List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : deliveries.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {deliveries.map((delivery, index) => (
              <motion.div
                key={delivery.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Delivery #{delivery.id}</p>
                      <p className="text-sm text-gray-500">{delivery.bloodGroup} • {delivery.units} unit(s)</p>
                      <p className="text-xs text-gray-400">{timeAgo(delivery.deliveredAt || delivery.createdAt)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {delivery.status === 'completed' ? 'Completed' : 'Delivered'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Pickup</p>
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-green-600" />
                        <span className="font-medium">{delivery.pickupLocation}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Drop</p>
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-red-600" />
                        <span className="font-medium">{delivery.dropLocation}</span>
                      </div>
                    </div>
                  </div>
                  {delivery.deliveredAt && (
                    <p className="text-xs text-green-600 mt-3">
                      Delivered on: {formatDateTime(delivery.deliveredAt)}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaHistory className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No delivery history</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DeliveryHistory;

