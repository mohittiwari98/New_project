import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHospital, 
  FaTint, 
  FaMapMarkerAlt, 
  FaClock, 
  FaExclamationTriangle,
  FaArrowRight,
  FaSearch,
  FaHistory,
  FaBell
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { THEME_COLORS } from '../../utils/constants';
import hospitalService from '../../services/hospitalService';
import bloodService from '../../services/bloodService';
import { formatDateTime, timeAgo } from '../../utils/formatDate';

const PatientDashboard = () => {
  const { user } = useAuth();
  const theme = THEME_COLORS.patient;
  
  const [hospitals, setHospitals] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [hospitalsData, requestsData] = await Promise.all([
          hospitalService.getAllHospitals(),
          bloodService.getBloodRequests(),
        ]);
        setHospitals(hospitalsData.slice(0, 5));
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
    { icon: FaHospital, label: 'Nearby Hospitals', value: hospitals.length, color: 'from-blue-400 to-blue-500', link: '/dashboard/patient/search' },
    { icon: FaTint, label: 'Blood Requests', value: requests.length, color: 'from-red-400 to-red-500', link: '/dashboard/patient/blood-request' },
    { icon: FaClock, label: 'Pending', value: requests.filter(r => r.status === 'pending').length, color: 'from-yellow-400 to-yellow-500', link: '/dashboard/patient/history' },
    { icon: FaExclamationTriangle, label: 'Active', value: requests.filter(r => r.status === 'in_transit').length, color: 'from-green-400 to-green-500', link: '/dashboard/patient/track-delivery' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-blue-100 text-blue-700',
      in_transit: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    };
    return colors[status] || colors.pending;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name || 'Patient'}!</h1>
        <p className="text-blue-100">Here's your health dashboard overview</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={stat.link} className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="text-white text-xl" />
                </div>
                <FaArrowRight className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </Link>
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
          to="/dashboard/patient/search"
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white hover:from-green-600 hover:to-green-700 transition-all group"
        >
          <FaSearch className="text-3xl mb-4" />
          <h3 className="text-xl font-bold mb-2">Find Hospitals</h3>
          <p className="text-green-100">Search for hospitals with available beds</p>
        </Link>
        
        <Link
          to="/dashboard/patient/blood-request"
          className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white hover:from-red-600 hover:to-red-700 transition-all group"
        >
          <FaTint className="text-3xl mb-4" />
          <h3 className="text-xl font-bold mb-2">Request Blood</h3>
          <p className="text-red-100">Submit an emergency blood request</p>
        </Link>
        
        <Link
          to="/dashboard/patient/track-delivery"
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white hover:from-purple-600 hover:to-purple-700 transition-all group"
        >
          <FaMapMarkerAlt className="text-3xl mb-4" />
          <h3 className="text-xl font-bold mb-2">Track Delivery</h3>
          <p className="text-purple-100">Track your blood delivery status</p>
        </Link>
      </motion.div>

      {/* Recent Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Blood Requests</h2>
          <Link to="/dashboard/patient/history" className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
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
                    <p className="text-sm text-gray-500">{request.bloodGroup} • {request.units} unit(s) • {request.hospital}</p>
                    <p className="text-xs text-gray-400">{timeAgo(request.requestedAt)}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                  {request.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FaTint className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No blood requests yet</p>
            <Link to="/dashboard/patient/blood-request" className="text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block">
              Make your first request
            </Link>
          </div>
        )}
      </motion.div>

      {/* Nearby Hospitals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Nearby Hospitals</h2>
          <Link to="/dashboard/patient/search" className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
            <span>View All</span>
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hospitals.slice(0, 3).map((hospital) => (
            <div key={hospital.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-1">{hospital.name}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <FaMapMarkerAlt className="mr-1" />
                <span>{hospital.distance}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-600 font-medium">{hospital.beds?.available} beds available</span>
                <Link to={`/hospitals/${hospital.id}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PatientDashboard;

