import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHospital, 
  FaTint, 
  FaSearch, 
  FaAmbulance, 
  FaClock, 
  FaShieldAlt,
  FaStar,
  FaUsers,
  FaHandHoldingMedical,
  FaMapMarkerAlt,
  FaPhone,
  FaArrowRight,
  FaCheckCircle,
  FaChevronRight
} from 'react-icons/fa';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import HospitalCard from '../../components/hospital/HospitalCard';
import BloodCard from '../../components/blood/BloodCard';
import hospitalService from '../../services/hospitalService';
import bloodService from '../../services/bloodService';

const Home = () => {
  const [hospitals, setHospitals] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [hospitalsData, bloodBanksData] = await Promise.all([
          hospitalService.getAllHospitals(),
          bloodService.getAllBloodBanks(),
        ]);
        setHospitals(hospitalsData.slice(0, 3));
        setBloodBanks(bloodBanksData.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { icon: FaHospital, label: 'Hospitals', value: '500+', color: 'from-green-400 to-green-500' },
    { icon: FaTint, label: 'Blood Banks', value: '200+', color: 'from-red-400 to-red-500' },
    { icon: FaUsers, label: 'Active Users', value: '50K+', color: 'from-blue-400 to-blue-500' },
    { icon: FaHandHoldingMedical, label: 'Lives Saved', value: '100K+', color: 'from-purple-400 to-purple-500' },
  ];

  const features = [
    {
      icon: FaSearch,
      title: 'Real-Time Search',
      description: 'Find available hospital beds and blood banks near you in real-time.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: FaAmbulance,
      title: 'Emergency Response',
      description: 'Quick blood request system for emergencies with instant notifications.',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: FaClock,
      title: '24/7 Availability',
      description: 'Access healthcare information round the clock, any day of the year.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: FaShieldAlt,
      title: 'Verified Providers',
      description: 'All hospitals and blood banks are verified for quality and reliability.',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-blue-50" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-6">
                <FaAmbulance />
                <span className="font-medium">Emergency Medical Services</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Find Hospital Beds & Blood
                <span className="text-red-600"> Instantly</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Connect with hospitals and blood banks in your area. Get real-time bed availability, request blood in emergencies, and track deliveries - all in one place.
              </p>

              {/* Search Box */}
              <div className="bg-white rounded-2xl shadow-xl p-2 mb-8">
                <div className="grid md:grid-cols-2 gap-2">
                  <div className="relative">
                    <FaHospital className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search hospitals..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div className="relative">
                    <FaTint className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <Link
                  to={`/hospitals${searchQuery ? `?search=${searchQuery}` : ''}`}
                  className="w-full mt-2 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center space-x-2"
                >
                  <FaSearch />
                  <span>Search Now</span>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-gray-600">Free to Use</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-gray-600">24/7 Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-gray-600">Verified Data</span>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Image/Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600"
                  alt="Medical Emergency"
                  className="rounded-3xl shadow-2xl"
                />
                {/* Floating Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -left-6 top-10 bg-white p-4 rounded-2xl shadow-xl"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FaHospital className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">150+ Beds</p>
                      <p className="text-sm text-gray-500">Available Now</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -right-6 bottom-20 bg-white p-4 rounded-2xl shadow-xl"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <FaTint className="text-red-600 text-xl" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">500+ Units</p>
                      <p className="text-sm text-gray-500">Blood Available</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="text-white text-2xl" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-red-600">MediCare</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide the fastest and most reliable way to find medical resources in emergencies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hospitals */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Featured <span className="text-green-600">Hospitals</span>
              </h2>
              <p className="text-gray-600">Find the best hospitals near you</p>
            </motion.div>
            <Link
              to="/hospitals"
              className="hidden md:flex items-center space-x-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
            >
              <span>View All</span>
              <FaArrowRight />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hospitals.map((hospital, index) => (
              <HospitalCard key={hospital.id} hospital={hospital} index={index} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link
              to="/hospitals"
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              <span>View All Hospitals</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Blood Banks */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Blood <span className="text-red-600">Banks</span>
              </h2>
              <p className="text-gray-600">Find blood banks with available stock</p>
            </motion.div>
            <Link
              to="/bloodbanks"
              className="hidden md:flex items-center space-x-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
            >
              <span>View All</span>
              <FaArrowRight />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bloodBanks.map((bloodBank, index) => (
              <BloodCard key={bloodBank.id} bloodBank={bloodBank} index={index} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link
              to="/bloodbanks"
              className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
            >
              <span>View All Blood Banks</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need Emergency Blood?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Request blood instantly and get it delivered to the hospital in no time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/register"
                className="w-full sm:w-auto bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

