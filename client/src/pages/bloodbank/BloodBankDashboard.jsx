import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaTint, 
  FaTruck, 
  FaClock, 
  FaCheckCircle,
  FaArrowRight,
  FaIndustry
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { THEME_COLORS, BLOOD_GROUPS } from '../../utils/constants';
import bloodService from '../../services/bloodService';

const BloodBankDashboard = () => {
  const { user } = useAuth();
  const theme = THEME_COLORS.bloodbank;
  
  const [bloodBank, setBloodBank] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [bloodBankData, requestsData] = await Promise.all([
          bloodService.getBloodBankById('b1'),
          bloodService.getBloodRequests({ status: 'pending' }),
        ]);
        setBloodBank(bloodBankData);
        setRequests(requestsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { icon: FaTint, label: 'Total Units', value: Object.values(bloodBank?.stock || {}).reduce((a, b) => a + b, 0), color: 'from-red-400 to-red-500' },
    { icon: FaClock, label: 'Pending', value: requests.filter(r => r.status === 'pending').length, color: 'from-yellow-400 to-yellow-500' },
    { icon: FaTruck, label: 'In Transit', value: requests.filter(r => r.status === 'in_transit').length, color: 'from-blue-400 to-blue-500' },
    { icon: FaCheckCircle, label: 'Delivered', value: requests.filter(r => r.status === 'delivered').length, color: 'from-green-400 to-green-500' },
  ];

  const getStockLevel = (units) => {
    if (units > 40) return { level: 'High', color: 'text-green-600', bg: 'bg-green-100' };
    if (units > 15) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Low', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name || 'Blood Bank'}!</h1>
        <p className="text-red-100">Here's your blood bank management dashboard</p>
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
        className="grid md:grid-cols-3 gap-6"
      >
        <Link
          to="/dashboard/bloodbank/stock"
          className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white hover:from-red-600 hover:to-red-700 transition-all group"
        >
          <FaIndustry className="text-3xl mb-4" />
          <h3 className="text-xl font-bold mb-2">Blood Stock</h3>
          <p className="text-red-100">Manage blood inventory</p>
        </Link>
        
        <Link
          to="/dashboard/bloodbank/requests"
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white hover:from-blue-600 hover:to-blue-700 transition-all group"
        >
          <FaTint className="text-3xl mb-4" />
          <h3 className="text-xl font-bold mb-2">Blood Requests</h3>
          <p className="text-blue-100">View and approve requests</p>
        </Link>
        
        <Link
          to="/dashboard/bloodbank/assign"
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white hover:from-orange-600 hover:to-orange-700 transition-all group"
        >
          <FaTruck className="text-3xl mb-4" />
          <h3 className="text-xl font-bold mb-2">Assign Carrier</h3>
          <p className="text-orange-100">Assign delivery carriers</p>
        </Link>
      </motion.div>

      {/* Blood Stock Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Blood Stock Overview</h2>
          <Link to="/dashboard/bloodbank/stock" className="text-red-600 hover:text-red-700 font-medium flex items-center space-x-1">
            <span>Manage</span>
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {BLOOD_GROUPS.map((group) => {
            const units = bloodBank?.stock?.[group] || 0;
            const stock = getStockLevel(units);
            return (
              <div key={group} className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-lg font-bold text-gray-900 mb-1">{group}</p>
                <p className={`text-2xl font-bold ${stock.color}`}>{units}</p>
                <span className={`text-xs ${stock.color}`}>{stock.level}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Pending Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Pending Requests</h2>
          <Link to="/dashboard/bloodbank/requests" className="text-red-600 hover:text-red-700 font-medium flex items-center space-x-1">
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
        ) : requests.length > 0 ? (
          <div className="space-y-4">
            {requests.slice(0, 5).map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <FaTint className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{request.patientName}</p>
                    <p className="text-sm text-gray-500">{request.bloodGroup} • {request.units} unit(s) • {request.hospital}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                  Pending
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FaCheckCircle className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No pending requests</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BloodBankDashboard;

