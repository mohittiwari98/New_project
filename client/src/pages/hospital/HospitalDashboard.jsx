import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBed, 
  FaUserInjured, 
  FaClock, 
  FaCheckCircle,
  FaArrowRight,
  FaTint
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { THEME_COLORS } from '../../utils/constants';
import hospitalService from '../../services/hospitalService';
import bloodService from '../../services/bloodService';

const HospitalDashboard = () => {
  const { user } = useAuth();
  const theme = THEME_COLORS.hospital;
  
  const [hospital, setHospital] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
          const [hospitalData, requestsData] = await Promise.all([
          hospitalService.getHospitalById('h1'),
          bloodService.getBloodRequests({ status: 'pending' }),
        ]);
        setHospital(hospitalData);
        setRequests(requestsData.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { icon: FaBed, label: 'Total Beds', value: hospital?.beds?.total || 0, color: 'from-green-400 to-green-500', sub: `${hospital?.beds?.available || 0} available` },
    { icon: FaUserInjured, label: 'Occupied', value: hospital?.beds?.occupied || 0, color: 'from-red-400 to-red-500', sub: 'beds' },
    { icon: FaClock, label: 'Pending', value: requests.filter(r => r.status === 'pending').length, color: 'from-yellow-400 to-yellow-500', sub: 'requests' },
    { icon: FaCheckCircle, label: 'ICU', value: hospital?.beds?.icu || 0, color: 'from-purple-400 to-purple-500', sub: 'beds' },
  ];

  const getStatusColor = (urgency) => {
    const colors = {
      emergency: 'bg-red-100 text-red-700',
      urgent: 'bg-orange-100 text-orange-700',
      normal: 'bg-green-100 text-green-700',
    };
    return colors[urgency] || colors.normal;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name || 'Hospital'}!</h1>
        <p className="text-green-100">Here's your hospital management dashboard</p>
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
            <p className="text-xs text-gray-400">{stat.sub}</p>
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
          to="/dashboard/hospital/beds"
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white hover:from-green-600 hover:to-green-700 transition-all group"
        >
          <FaBed className="text-3xl mb-4" />
          <h3 className="text-xl font-bold mb-2">Manage Beds</h3>
          <p className="text-green-100">Update bed availability</p>
        </Link>
        
        <Link
          to="/dashboard/hospital/requests"
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white hover:from-blue-600 hover:to-blue-700 transition-all group"
        >
          <FaUserInjured className="text-3xl mb-4" />
          <h3 className="text-xl font-bold mb-2">Patient Requests</h3>
          <p className="text-blue-100">View and manage requests</p>
        </Link>
        
        <Link
          to="/dashboard/hospital/profile"
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white hover:from-purple-600 hover:to-purple-700 transition-all group"
        >
          <FaBed className="text-3xl mb-4" />
          <h3 className="text-xl font-bold mb-2">Hospital Profile</h3>
          <p className="text-purple-100">Manage hospital details</p>
        </Link>
      </motion.div>

      {/* Pending Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Pending Blood Requests</h2>
          <Link to="/dashboard/hospital/requests" className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-1">
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
            {requests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <FaTint className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{request.patientName}</p>
                    <p className="text-sm text-gray-500">{request.bloodGroup} • {request.units} unit(s)</p>
                    <p className="text-xs text-gray-400">Reason: {request.reason}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.urgency)}`}>
                    {request.urgency}
                  </span>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Accept
                  </button>
                </div>
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

      {/* Bed Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Bed Availability Overview</h2>
          <Link to="/dashboard/hospital/beds" className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-1">
            <span>Manage</span>
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-blue-600 font-medium mb-2">General Ward</p>
            <p className="text-3xl font-bold text-blue-700">{hospital?.beds?.total - (hospital?.beds?.icu || 0) || 0}</p>
            <p className="text-sm text-blue-500">beds total</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-purple-600 font-medium mb-2">ICU Beds</p>
            <p className="text-3xl font-bold text-purple-700">{hospital?.beds?.icu || 0}</p>
            <p className="text-sm text-purple-500">beds available</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4">
            <p className="text-red-600 font-medium mb-2">Emergency</p>
            <p className="text-3xl font-bold text-red-700">{hospital?.beds?.emergency || 0}</p>
            <p className="text-sm text-red-500">beds available</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HospitalDashboard;

