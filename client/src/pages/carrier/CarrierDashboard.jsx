import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaTruck, 
  FaClock, 
  FaCheckCircle,
  FaMapMarkerAlt,
  FaArrowRight
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { THEME_COLORS } from '../../utils/constants';
import deliveryService from '../../services/deliveryService';

const CarrierDashboard = () => {
  const { user } = useAuth();
  const theme = THEME_COLORS.carrier;
  
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const stats = [
    { icon: FaTruck, label: 'Active', value: deliveries.filter(d => d.status === 'in_transit').length, color: 'from-blue-400 to-blue-500' },
    { icon: FaClock, label: 'Pending', value: deliveries.filter(d => d.status === 'pending').length, color: 'from-yellow-400 to-yellow-500' },
    { icon: FaCheckCircle, label: 'Completed', value: deliveries.filter(d => d.status === 'delivered' || d.status === 'completed').length, color: 'from-green-400 to-green-500' },
    { icon: FaMapMarkerAlt, label: 'Total', value: deliveries.length, color: 'from-orange-400 to-orange-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name || 'Carrier'}!</h1>
        <p className="text-orange-100">Here's your delivery dashboard</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="text-white text-xl" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <Link
          to="/dashboard/carrier/tasks"
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white hover:from-orange-600 hover:to-orange-700 transition-all group"
        >
          <FaTruck className="text-3xl mb-4" />
          <h3 className="text-xl font-bold mb-2">Delivery Tasks</h3>
          <p className="text-orange-100">View and accept delivery tasks</p>
        </Link>
        
        <Link
          to="/dashboard/carrier/history"
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white hover:from-blue-600 hover:to-blue-700 transition-all group"
        >
          <FaCheckCircle className="text-3xl mb-4" />
          <h3 className="text-xl font-bold mb-2">Delivery History</h3>
          <p className="text-blue-100">View completed deliveries</p>
        </Link>
      </motion.div>

      {/* Active Deliveries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Active Deliveries</h2>
          <Link to="/dashboard/carrier/tasks" className="text-orange-600 hover:text-orange-700 font-medium flex items-center space-x-1">
            <span>View All</span>
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : deliveries.filter(d => d.status === 'in_transit' || d.status === 'pending').length > 0 ? (
          <div className="space-y-4">
            {deliveries.filter(d => d.status === 'in_transit' || d.status === 'pending').slice(0, 5).map((delivery) => (
              <div key={delivery.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <FaTruck className="text-orange-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Delivery #{delivery.id}</p>
                    <p className="text-sm text-gray-500">{delivery.bloodGroup} • {delivery.units} unit(s)</p>
                    <p className="text-xs text-gray-400">To: {delivery.dropLocation}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  delivery.status === 'in_transit' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {delivery.status === 'in_transit' ? 'In Transit' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FaTruck className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No active deliveries</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CarrierDashboard;

