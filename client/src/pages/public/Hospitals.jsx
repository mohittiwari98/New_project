import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaBed, FaMapMarkerAlt, FaSortAmountDown } from 'react-icons/fa';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import HospitalCard from '../../components/hospital/HospitalCard';
import hospitalService from '../../services/hospitalService';

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBedType, setSelectedBedType] = useState('all');
  const [sortBy, setSortBy] = useState('distance');

  useEffect(() => {
    const fetchHospitals = async () => {
      setLoading(true);
      try {
        const data = await hospitalService.getAllHospitals();
        setHospitals(data);
        setFilteredHospitals(data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  useEffect(() => {
    let filtered = [...hospitals];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(h =>
        h.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Bed type filter (basic version - you can enhance this later)
    if (selectedBedType !== 'all') {
      filtered = filtered.filter(h => {
        const beds = h.beds || {};
        return (beds.available || 0) > 0;
      });
    }

    // Sorting
    if (sortBy === 'distance') {
      filtered.sort((a, b) => (parseFloat(a.distance) || 999) - (parseFloat(b.distance) || 999));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'availability') {
      filtered.sort((a, b) => (b.beds?.available || 0) - (a.beds?.available || 0));
    }

    setFilteredHospitals(filtered);
  }, [searchTerm, selectedBedType, sortBy, hospitals]);

  const bedTypes = [
    { value: 'all', label: 'All Beds' },
    { value: 'general', label: 'General' },
    { value: 'icu', label: 'ICU' },
    { value: 'emergency', label: 'Emergency' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-4">
              <FaBed className="text-white" />
              <span className="text-white font-medium text-sm">REAL-TIME BED AVAILABILITY</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Hospitals
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover hospitals with available beds near you in real time
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
                placeholder="Search hospitals by name, area or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-base"
              />
            </div>

            {/* Bed Type Filter */}
            <div className="flex items-center gap-2">
              <FaBed className="text-green-600" />
              <select
                value={selectedBedType}
                onChange={(e) => setSelectedBedType(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-green-500 outline-none cursor-pointer"
              >
                {bedTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 ml-auto">
              <FaSortAmountDown className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-green-500 outline-none cursor-pointer"
              >
                <option value="distance">Nearest First</option>
                <option value="rating">Highest Rated</option>
                <option value="availability">Most Beds Available</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Results Info */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-600">
              Showing <span className="font-bold text-gray-900 text-lg">{filteredHospitals.length}</span> hospitals
            </p>
            
            {selectedBedType !== 'all' && (
              <div className="text-sm text-green-600 font-medium flex items-center gap-1">
                <FaBed /> Filtered by {selectedBedType.toUpperCase()} beds
              </div>
            )}
          </div>

          {/* Loading & Results */}
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
                    <div className="h-52 bg-gray-200" />
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-gray-200 rounded-xl w-4/5" />
                      <div className="h-4 bg-gray-200 rounded-xl w-3/4" />
                      <div className="h-10 bg-gray-200 rounded-2xl w-full mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredHospitals.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredHospitals.map((hospital, index) => (
                  <HospitalCard 
                    key={hospital.id} 
                    hospital={hospital} 
                    index={index} 
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-20">
                <div className="w-28 h-28 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <FaMapMarkerAlt className="text-6xl text-green-200" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  No hospitals found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  We couldn't find any hospitals matching your current filters.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedBedType('all');
                  }}
                  className="bg-green-600 text-white px-8 py-3 rounded-2xl hover:bg-green-700 transition-colors font-medium"
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

export default Hospitals;