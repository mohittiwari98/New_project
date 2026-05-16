import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTruck, FaMapMarkerAlt, FaClock, FaSearch } from 'react-icons/fa';
import deliveryService from '../../services/deliveryService';
import { formatDateTime, timeAgo } from '../../utils/formatDate';

const TrackDelivery = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDeliveries = async () => {
      setLoading(true);
      try {
        const data = await deliveryService.getAllDeliveries();
        setDeliveries(data);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveries();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending', step: 1 },
      in_transit: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'In Transit', step: 2 },
      delivered: { bg: 'bg-green-100', text: 'text-green-700', label: 'Delivered', step: 3 },
      completed: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Completed', step: 4 },
    };
    return colors[status] || colors.pending;
  };

  const filteredDeliveries = deliveries.filter(d => 
    searchTerm === '' || d.id.includes(searchTerm) || d.bloodRequestId.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Track Delivery</h1>
        <p className="text-gray-600">Track your blood delivery in real-time</p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-4"
      >
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by delivery ID or request ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </motion.div>

      {/* Deliveries */}
      <div className="space-y-6">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))
        ) : filteredDeliveries.length > 0 ? (
          filteredDeliveries.map((delivery, index) => {
            const status = getStatusColor(delivery.status);
            return (
              <motion.div
                key={delivery.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                        <FaTruck className="text-white text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-xl">Delivery #{delivery.id}</h3>
                        <p className="text-blue-100">Blood Request #{delivery.bloodRequestId}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${status.bg} ${status.text}`}>
                      {status.label}
                    </span>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    {['Pending', 'In Transit', 'Delivered', 'Completed'].map((step, idx) => {
                      const stepNum = idx + 1;
                      const isActive = status.step >= stepNum;
                      const isCurrent = status.step === stepNum;
                      return (
                        <div key={step} className="flex flex-col items-center flex-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                            isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                          } ${isCurrent ? 'ring-4 ring-blue-100' : ''}`}>
                            {stepNum}
                          </div>
                          <span className={`text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Route Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Pickup */}
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-bold">📦</span>
                        </div>
                        <span className="text-green-600 font-medium">Pickup</span>
                      </div>
                      <p className="font-semibold text-gray-900">{delivery.pickupLocation}</p>
                      <p className="text-sm text-gray-500">{delivery.pickupAddress}</p>
                      {delivery.pickedAt && (
                        <p className="text-xs text-green-600 mt-2">
                          Picked at: {formatDateTime(delivery.pickedAt)}
                        </p>
                      )}
                    </div>

                    {/* Drop */}
                    <div className="bg-red-50 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <FaMapMarkerAlt className="text-red-600" />
                        </div>
                        <span className="text-red-600 font-medium">Drop</span>
                      </div>
                      <p className="font-semibold text-gray-900">{delivery.dropLocation}</p>
                      <p className="text-sm text-gray-500">{delivery.dropAddress}</p>
                      {delivery.deliveredAt && (
                        <p className="text-xs text-green-600 mt-2">
                          Delivered at: {formatDateTime(delivery.deliveredAt)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Blood Info */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 font-bold text-lg">{delivery.bloodGroup}</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Blood Group</p>
                          <p className="font-semibold text-gray-900">{delivery.bloodGroup} - {delivery.units} unit(s)</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Created</p>
                        <p className="font-medium text-gray-900">{timeAgo(delivery.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <FaTruck className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No deliveries to track</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackDelivery;

