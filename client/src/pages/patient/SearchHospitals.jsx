import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter } from 'react-icons/fa';
import HospitalCard from '../../components/hospital/HospitalCard';
import hospitalService from '../../services/hospitalService';

const SearchHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBedType, setSelectedBedType] = useState('all');

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
    if (searchTerm) {
      filtered = filtered.filter(h =>
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredHospitals(filtered);
  }, [searchTerm, hospitals]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Search Hospitals</h1>
        <p className="text-gray-600">Find hospitals with available beds near you</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-4"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by hospital name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedBedType}
            onChange={(e) => setSelectedBedType(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Beds</option>
            <option value="general">General Ward</option>
            <option value="icu">ICU</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>
      </motion.div>

      {/* Results */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))
        ) : filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital, index) => (
            <HospitalCard key={hospital.id} hospital={hospital} index={index} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No hospitals found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHospitals;

