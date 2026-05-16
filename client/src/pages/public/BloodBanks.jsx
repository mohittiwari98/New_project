import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTint, FaMapMarkerAlt, FaSortAmountDown } from 'react-icons/fa';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import BloodCard from '../../components/blood/BloodCard';
import bloodService from '../../services/bloodService';
import { BLOOD_GROUPS } from '../../utils/constants';

const BloodBanks = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [filteredBloodBanks, setFilteredBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('all');
  const [sortBy, setSortBy] = useState('distance');

  useEffect(() => {
    const fetchBloodBanks = async () => {
      setLoading(true);
      try {
        const data = await bloodService.getAllBloodBanks();
        setBloodBanks(data);
        setFilteredBloodBanks(data);
      } catch (error) {
        console.error('Error fetching blood banks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBloodBanks();
  }, []);

  useEffect(() => {
    let filtered = [...bloodBanks];

    if (searchTerm) {
      filtered = filtered.filter(b =>
        b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedBloodGroup !== 'all') {
      filtered = filtered.filter(b => (b.stock?.[selectedBloodGroup] || 0) > 0);
    }

    if (sortBy === 'distance') {
      filtered.sort((a, b) => (parseFloat(a.distance) || 999) - (parseFloat(b.distance) || 999));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredBloodBanks(filtered);
  }, [searchTerm, selectedBloodGroup, sortBy, bloodBanks]);

  const getBloodColor = (group) => {
    const colors = {
      'A+': 'bg-red-100 text-red-700 border-red-200',
      'A-': 'bg-red-50 text-red-600 border-red-100',
      'B+': 'bg-blue-100 text-blue-700 border-blue-200',
      'B-': 'bg-blue-50 text-blue-600 border-blue-100',
      'O+': 'bg-orange-100 text-orange-700 border-orange-200',
      'O-': 'bg-orange-50 text-orange-600 border-orange-100',
      'AB+': 'bg-purple-100 text-purple-700 border-purple-200',
      'AB-': 'bg-purple-50 text-purple-600 border-purple-100',
    };
    return colors[group] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-red-600 via-red-500 to-rose-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-4">
              <FaTint className="text-white" />
              <span className="text-white font-medium text-sm">LIVE STOCK AVAILABLE</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Blood Banks
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Real-time blood availability near you. Save lives in minutes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Filters */}
      <section className="sticky top-16 z-30 bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-5 items-start lg:items-center">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-xl">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, area or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-base"
              />
            </div>

            {/* Blood Group Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedBloodGroup('all')}
                className={`px-5 py-2.5 rounded-2xl font-medium transition-all whitespace-nowrap ${
                  selectedBloodGroup === 'all'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                All Blood
              </button>

              {BLOOD_GROUPS.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedBloodGroup(group)}
                  className={`px-5 py-2.5 rounded-2xl font-semibold border-2 transition-all whitespace-nowrap ${
                    selectedBloodGroup === group
                      ? 'bg-white shadow-md border-red-600 text-red-600'
                      : `${getBloodColor(group)} border-transparent hover:border-red-200`
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 ml-auto">
              <FaSortAmountDown className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 outline-none cursor-pointer"
              >
                <option value="distance">Nearest First</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-600">
              Showing <span className="font-bold text-gray-900 text-lg">{filteredBloodBanks.length}</span> blood banks
            </p>
            
            {selectedBloodGroup !== 'all' && (
              <div className="text-sm text-red-600 font-medium flex items-center gap-1">
                <FaTint /> Showing only {selectedBloodGroup} availability
              </div>
            )}
          </div>

          {/* Loading State */}
          <AnimatePresence>
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
                    <div className="h-52 bg-gray-200" />
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-gray-200 rounded-xl w-4/5" />
                      <div className="h-4 bg-gray-200 rounded-xl w-3/4" />
                      <div className="flex gap-2 pt-3">
                        {[1, 2, 3, 4].map(j => (
                          <div key={j} className="h-9 flex-1 bg-gray-200 rounded-2xl" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredBloodBanks.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBloodBanks.map((bloodBank, index) => (
                  <BloodCard 
                    key={bloodBank.id} 
                    bloodBank={bloodBank} 
                    index={index} 
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-20">
                <div className="w-28 h-28 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-6">
                  <FaTint className="text-6xl text-red-200" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  No blood banks found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  We couldn't find any blood banks matching your current filters. 
                  Try changing the blood group or search term.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedBloodGroup('all');
                  }}
                  className="bg-red-600 text-white px-8 py-3 rounded-2xl hover:bg-red-700 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BloodBanks;