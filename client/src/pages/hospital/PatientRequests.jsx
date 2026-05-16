import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTint, FaCheck, FaTimes, FaSearch, FaFilter } from 'react-icons/fa';
import toast from 'react-hot-toast';
import bloodService from '../../services/bloodService';
import { formatDateTime, timeAgo } from '../../utils/formatDate';

const PatientRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

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

  const handleStatusUpdate = async (id, status) => {
    try {
      await bloodService.updateRequestStatus(id, status);
      setRequests(requests.map(r => 
        r.id === id ? { ...r, status } : r
      ));
      toast.success(`Request ${status} successfully!`);
    } catch (error) {
      toast.error('Failed to update request');
    }
  };

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

  const getUrgencyColor = (urgency) => {
    const colors = {
      emergency: 'bg-red-100 text-red-700',
      urgent: 'bg-orange-100 text-orange-700',
      normal: 'bg-green-100 text-green-700',
    };
    return colors[urgency] || colors.normal;
  };

  const filteredRequests = requests.filter(r => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Patient Requests</h1>
        <p className="text-gray-600">View and manage blood requests from patients</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div 
          onClick={() => setFilter('all')}
          className={`bg-white rounded-xl p-4 shadow-lg cursor-pointer transition-all ${filter === 'all' ? 'ring-2 ring-green-500' : ''}`}
        >
          <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
          <p className="text-sm text-gray-500">Total Requests</p>
        </div>
        <div 
          onClick={() => setFilter('pending')}
          className={`bg-white rounded-xl p-4 shadow-lg cursor-pointer transition-all ${filter === 'pending' ? 'ring-2 ring-yellow-500' : ''}`}
        >
          <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
          <p className="text-sm text-gray-500">Pending</p>
        </div>
        <div 
          onClick={() => setFilter('approved')}
          className={`bg-white rounded-xl p-4 shadow-lg cursor-pointer transition-all ${filter === 'approved' ? 'ring-2 ring-blue-500' : ''}`}
        >
          <p className="text-2xl font-bold text-blue-600">{approvedCount}</p>
          <p className="text-sm text-gray-500">Approved</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-2xl font-bold text-green-600">{requests.length - pendingCount}</p>
          <p className="text-sm text-gray-500">Processed</p>
        </div>
      </motion.div>

      {/* Requests Table */}
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
        ) : filteredRequests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Patient</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Blood Group</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Units</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Hospital</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Urgency</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRequests.map((request) => {
                  const status = getStatusColor(request.status);
                  const urgency = getUrgencyColor(request.urgency);
                  return (
                    <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{request.patientName}</p>
                          <p className="text-sm text-gray-500">{request.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                          {request.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{request.units}</td>
                      <td className="px-6 py-4 text-gray-600">{request.hospital}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${urgency}`}>
                          {request.urgency}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {request.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleStatusUpdate(request.id, 'approved')}
                              className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                              title="Approve"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(request.id, 'rejected')}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                              title="Reject"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <FaTint className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No requests found</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PatientRequests;

