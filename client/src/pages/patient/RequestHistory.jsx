import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTint, FaSearch, FaFilter, FaClock } from 'react-icons/fa';
import bloodService from '../../services/bloodService';
import { timeAgo } from '../../utils/formatDate';

const RequestHistory = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const data = await bloodService.getBloodRequests();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' },
      approved: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Approved' },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Rejected' },
      in_transit: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'In Transit' },
      delivered: { bg: 'bg-green-100', text: 'text-green-700', label: 'Delivered' },
    };
    return colors[status] || colors.pending;
  };

  const filteredRequests = requests.filter(r => {
    if (filter !== 'all' && r.status !== filter) return false;
    if (searchTerm && !r.patientName?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-2xl flex items-center justify-center">
            <FaTint className="text-red-600 text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Request History</h1>
            <p className="text-gray-600">Track all your blood requests</p>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-red-500 outline-none cursor-pointer"
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing <span className="font-bold text-gray-900">{filteredRequests.length}</span> requests
        </p>
      </div>

      {/* Requests List */}
      <AnimatePresence mode="wait">
        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 animate-pulse shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="space-y-3 flex-1">
                    <div className="h-5 bg-gray-200 rounded-xl w-1/3" />
                    <div className="h-4 bg-gray-200 rounded-xl w-2/3" />
                  </div>
                  <div className="h-8 w-24 bg-gray-200 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredRequests.length > 0 ? (
          <div className="grid gap-4">
            {filteredRequests.map((request, index) => {
              const status = getStatusColor(request.status);
              return (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <FaTint className="text-red-600 text-3xl" />
                        </div>

                        <div>
                          <h3 className="font-bold text-xl text-gray-900">
                            {request.patientName}
                          </h3>
                          <p className="text-gray-500 text-sm">Request ID: #{request.id}</p>
                        </div>
                      </div>

                      <div className={`px-5 py-2 rounded-2xl text-sm font-semibold flex items-center gap-2 ${status.bg} ${status.text}`}>
                        {status.label}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                      <div>
                        <p className="text-xs text-gray-500">Blood Group</p>
                        <p className="font-bold text-xl mt-1">{request.bloodGroup}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Units Required</p>
                        <p className="font-bold text-xl mt-1">{request.units}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Hospital</p>
                        <p className="font-medium text-gray-800 mt-1">{request.hospital}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Requested</p>
                        <p className="text-gray-600 mt-1 flex items-center gap-1">
                          <FaClock className="text-xs" />
                          {timeAgo(request.requestedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl py-20 text-center shadow-lg"
          >
            <div className="w-24 h-24 mx-auto bg-red-50 rounded-full flex items-center justify-center">
              <FaTint className="text-5xl text-red-200" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mt-6">No Requests Found</h3>
            <p className="text-gray-600 mt-3 max-w-sm mx-auto">
              You haven't made any blood requests yet or no matches found for your current filter.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RequestHistory;