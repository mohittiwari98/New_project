import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTruck, FaCheck, FaPlay, FaMapMarkerAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import deliveryService from '../../services/deliveryService';

const DeliveryTasks = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveries = async () => {
      setLoading(true);
      try {
        const data = await deliveryService.getAllDeliveries();
        setDeliveries(data.filter(d => d.status === 'pending' || d.status === 'in_transit'));
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveries();
  }, []);

  const handleAccept = async (id) => {
    try {
      await deliveryService.acceptDelivery(id);
      setDeliveries(deliveries.map(d => 
        d.id === id ? { ...d, status: 'in_transit' } : d
      ));
      toast.success('Delivery accepted!');
    } catch (error) {
      toast.error('Failed to accept delivery');
    }
  };

  const handleStartPickup = async (id) => {
    try {
      await deliveryService.startPickup(id);
      toast.success('Pickup started!');
    } catch (error) {
      toast.error('Failed to start pickup');
    }
  };

  const handleComplete = async (id) => {
    try {
      await deliveryService.completeDelivery(id);
      setDeliveries(deliveries.filter(d => d.id !== id));
      toast.success('Delivery completed!');
    } catch (error) {
      toast.error('Failed to complete delivery');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      in_transit: 'bg-blue-100 text-blue-700',
    };
    return colors[status] || colors.pending;
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Delivery Tasks</h1>
        <p className="text-gray-600">View and manage your delivery tasks</p>
      </motion.div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : deliveries.length > 0 ? (
        <div className="space-y-4">
          {deliveries.map((delivery, index) => (
            <motion.div
              key={delivery.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <FaTruck className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">Delivery #{delivery.id}</h3>
                      <p className="text-orange-100 text-sm">Blood Request #{delivery.bloodRequestId}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(delivery.status)}`}>
                    {delivery.status === 'pending' ? 'Pending' : 'In Transit'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
                      <span className="text-red-600 font-bold text-xl">{delivery.bloodGroup}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{delivery.bloodGroup} - {delivery.units} unit(s)</p>
                      <p className="text-sm text-gray-500">Blood Type</p>
                    </div>
                  </div>
                </div>

                {/* Route */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <FaMapMarkerAlt className="text-green-600" />
                      <span className="text-green-600 font-medium">Pickup</span>
                    </div>
                    <p className="font-semibold text-gray-900">{delivery.pickupLocation}</p>
                    <p className="text-sm text-gray-500">{delivery.pickupAddress}</p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <FaMapMarkerAlt className="text-red-600" />
                      <span className="text-red-600 font-medium">Drop</span>
                    </div>
                    <p className="font-semibold text-gray-900">{delivery.dropLocation}</p>
                    <p className="text-sm text-gray-500">{delivery.dropAddress}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  {delivery.status === 'pending' && (
                    <button
                      onClick={() => handleAccept(delivery.id)}
                      className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <FaCheck />
                      <span>Accept Delivery</span>
                    </button>
                  )}
                  {delivery.status === 'in_transit' && (
                    <>
                      <button
                        onClick={() => handleStartPickup(delivery.id)}
                        className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                      >
                        Start Pickup
                      </button>
                      <button
                        onClick={() => handleComplete(delivery.id)}
                        className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <FaCheck />
                        <span>Complete Delivery</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <FaTruck className="text-4xl text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No delivery tasks available</p>
        </div>
      )}
    </div>
  );
};

export default DeliveryTasks;

