import { motion } from 'framer-motion';
import { FaHospital, FaTint, FaUsers, FaAward, FaHeart, FaShieldAlt, FaClock, FaHandHoldingMedical } from 'react-icons/fa';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const About = () => {
  const stats = [
    { icon: FaHospital, value: '500+', label: 'Hospitals', color: 'from-green-400 to-green-500' },
    { icon: FaTint, value: '200+', label: 'Blood Banks', color: 'from-red-400 to-red-500' },
    { icon: FaUsers, value: '50K+', label: 'Active Users', color: 'from-blue-400 to-blue-500' },
    { icon: FaHeart, value: '100K+', label: 'Lives Saved', color: 'from-pink-400 to-pink-500' },
  ];

  const features = [
    {
      icon: FaSearch,
      title: 'Real-Time Search',
      description: 'Find available hospital beds and blood banks near you in real-time with our advanced search system.',
    },
    {
      icon: FaClock,
      title: '24/7 Availability',
      description: 'Access healthcare information round the clock, any day of the year. We are always here to help.',
    },
    {
      icon: FaShieldAlt,
      title: 'Verified Providers',
      description: 'All hospitals and blood banks are verified for quality and reliability. Trust what you find.',
    },
    {
      icon: FaHandHoldingMedical,
      title: 'Emergency Support',
      description: 'Quick blood request system for emergencies with instant notifications to nearby blood banks.',
    },
  ];

  const team = [
    { name: 'Dr. Sarah Johnson', role: 'Medical Director', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200' },
    { name: 'John Smith', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' },
    { name: 'Emily Davis', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
    { name: 'Michael Chen', role: 'Tech Lead', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-red-500 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About MediCare
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Connecting patients with healthcare providers in real-time. Saving lives one search at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
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

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-red-600">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At MediCare, we believe that every second counts in a medical emergency. Our mission is to bridge the gap between patients in need and healthcare providers who can help.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We are committed to making healthcare resources accessible to everyone, anywhere, anytime. Through technology and innovation, we're transforming how people find hospital beds and blood donations during emergencies.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/40?img=${i + 10}`}
                      alt="Team member"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <p className="text-gray-600">Join 50,000+ users who trust MediCare</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600"
                alt="Medical team"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FaAward className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Award Winning</p>
                    <p className="text-sm text-gray-500">Healthcare Platform 2024</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
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
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="text-red-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-red-600">Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A dedicated team of healthcare professionals and tech experts working together to save lives.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

