import { motion } from 'framer-motion';
import { FaTint, FaExclamationTriangle } from 'react-icons/fa';
import BloodRequestForm from '../../components/blood/BloodRequestForm';
import { useAuth } from '../../hooks/useAuth';

const BloodRequest = () => {
  const { user } = useAuth();

  const handleSuccess = (request) => {
    console.log('Request submitted:', request);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Blood Request</h1>
        <p className="text-gray-600">Submit an emergency blood request</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <BloodRequestForm onSuccess={handleSuccess} />
        </motion.div>

        {/* Info Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Emergency Notice */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <FaExclamationTriangle className="text-2xl" />
              <h3 className="text-lg font-bold">Emergency?</h3>
            </div>
            <p className="text-red-100 mb-4">
              For life-threatening emergencies, please call emergency services immediately.
            </p>
            <a
              href="tel:911"
              className="inline-block bg-white text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-colors"
            >
              Call Emergency: 911
            </a>
          </div>

          {/* How it Works */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">How it Works</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">1</div>
                <div>
                  <p className="font-medium text-gray-900">Fill the Form</p>
                  <p className="text-sm text-gray-500">Enter patient and blood details</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">2</div>
                <div>
                  <p className="font-medium text-gray-900">Submit Request</p>
                  <p className="text-sm text-gray-500">Request is sent to blood banks</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">3</div>
                <div>
                  <p className="font-medium text-gray-900">Track Delivery</p>
                  <p className="text-sm text-gray-500">Monitor delivery status in real-time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Contact our support team for assistance with your blood request.
            </p>
            <a
              href="tel:+1234567890"
              className="block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Call Support
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BloodRequest;

