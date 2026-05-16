import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTruck, FaUser, FaPhone, FaMapMarkerAlt, FaCheck, FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';
import bloodService from '../../services/bloodService';
import deliveryService from '../../services/deliveryService';
import mockStore from '../../services/mockStore';


const AssignCarrier = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const data = await bloodService.getBloodRequests({ status: 'approved' });
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleAssign = async (requestId, carrierId = '4') => {
    try {
      // Create a delivery from the approved blood request, then assign a carrier.
      // Use mockStore directly because deliveryService does not expose delivery creation.
      const delivery = await mockStore.deliveries.createFromDeliveryRequest({ bloodRequestId: requestId });
      if (!delivery?.id) {
        throw new Error('Failed to create delivery');
      }
      await deliveryService.assignCarrier(delivery.id, carrierId);





      toast.success('Carrier assigned successfully!');
      setRequests(requests.filter(r => r.id !== requestId));
    } catch (error) {
      console.error('Assign carrier error:', error);
      toast.error('Failed to assign carrier');
    }
  };

  const mockCarriers = [
    { id: '1', name: 'Mike Carrier', phone: '4445556666', vehicle: 'Bike', status: 'available' },
    { id: '2', name: 'John Deliver', phone: '4445556667', vehicle: 'Car', status: 'available' },
    { id: '3', name: 'Sarah Speed', phone: '4445556668', vehicle: 'Bike', status: 'busy' },
  ];

  const filteredRequests = requests.filter(r => 
    searchTerm === '' || 
    r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Assign Carrier</h1>
        <p className="text-gray-600">Assign carriers to deliver blood to hospitals</p>
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
            placeholder="Search by patient or hospital..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </motion.div>

      {/* Available Carriers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Available Carriers</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {mockCarriers.map((carrier) => (
            <div key={carrier.id} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{carrier.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{carrier.name}</p>
                  <p className="text-sm text-gray-500">{carrier.vehicle}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  carrier.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {carrier.status === 'available' ? 'Available' : 'Busy'}
                </span>
                <a href={`tel:${carrier.phone}`} className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                  <FaPhone />
                </a>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Pending Assignments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Pending Assignments</h2>
        </div>

        {loading ? (
          <div className="p-8 space-y-4">
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
        ) : filteredRequests.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredRequests.map((request) => (
              <div key={request.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
                      <span className="text-red-600 font-bold text-xl">{request.bloodGroup}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{request.patientName}</p>
                      <p className="text-sm text-gray-500">{request.units} unit(s) • {request.hospital}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAssign(request.id, '4')}
                    className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                    disabled={loading}
                    title={loading ? 'Loading requests...' : 'Assign carrier'}
                  >
                    <FaTruck />
                    <span>Assign Carrier</span>
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Pickup Location</p>
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-green-600" />
                        <span className="font-medium">Red Cross Blood Bank</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Drop Location</p>
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-red-600" />
                        <span className="font-medium">{request.hospital}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaTruck className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No requests need carrier assignment</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AssignCarrier;

