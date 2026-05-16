import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBed, FaSave, FaPlus, FaMinus, FaHospital } from 'react-icons/fa';
import toast from 'react-hot-toast';
import BedCard from '../../components/hospital/BedCard';
import hospitalService from '../../services/hospitalService';

const ManageBeds = () => {
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchHospital = async () => {
      setLoading(true);
      try {
        const data = await hospitalService.getHospitalById('h1');
        setHospital(data);
      } catch (error) {
        console.error('Error fetching hospital:', error);
        toast.error('Failed to load hospital data');
      } finally {
        setLoading(false);
      }
    };
    fetchHospital();
  }, []);

  const handleBedUpdate = (bedType, change) => {
    if (!hospital) return;

    const newBeds = { ...hospital.beds };

    switch (bedType) {
      case 'general':
        newBeds.total = Math.max(0, (newBeds.total || 0) + change);
        newBeds.available = Math.max(0, (newBeds.available || 0) + change);
        break;
      case 'icu':
        newBeds.icu = Math.max(0, (newBeds.icu || 0) + change);
        break;
      case 'icu_ventilator':
        newBeds.icuVentilator = Math.max(0, (newBeds.icuVentilator || 0) + change);
        break;
      case 'emergency':
        newBeds.emergency = Math.max(0, (newBeds.emergency || 0) + change);
        break;
      case 'pediatric':
        newBeds.pediatric = Math.max(0, (newBeds.pediatric || 0) + change);
        break;
      default:
        break;
    }

    // Recalculate totals
    newBeds.occupied = (newBeds.total || 0) - (newBeds.available || 0);

    setHospital({ ...hospital, beds: newBeds });
  };

  const handleSave = async () => {
    if (!hospital) return;
    
    setSaving(true);
    try {
      await hospitalService.updateBedAvailability('h1', hospital.beds);
      toast.success('Bed availability updated successfully!');
    } catch (error) {
      toast.error('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Calculate summary
  const totalBeds = hospital?.beds?.total || 0;
  const availableBeds = hospital?.beds?.available || 0;
  const occupiedBeds = hospital?.beds?.occupied || 0;
  const occupancyRate = totalBeds ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  const bedTypes = [
    { 
      type: 'general', 
      label: 'General Ward', 
      icon: FaBed,
      color: 'bg-blue-500',
      available: hospital?.beds?.available || 0,
      occupied: occupiedBeds,
      total: totalBeds 
    },
    { 
      type: 'icu', 
      label: 'ICU', 
      icon: FaBed,
      color: 'bg-purple-500',
      available: hospital?.beds?.icu || 0,
      occupied: 15,
      total: 25 
    },
    { 
      type: 'icu_ventilator', 
      label: 'ICU with Ventilator', 
      icon: FaBed,
      color: 'bg-rose-500',
      available: hospital?.beds?.icuVentilator || 0,
      occupied: 8,
      total: 12 
    },
    { 
      type: 'emergency', 
      label: 'Emergency', 
      icon: FaBed,
      color: 'bg-orange-500',
      available: hospital?.beds?.emergency || 0,
      occupied: 5,
      total: 15 
    },
    { 
      type: 'pediatric', 
      label: 'Pediatric', 
      icon: FaBed,
      color: 'bg-emerald-500',
      available: hospital?.beds?.pediatric || 0,
      occupied: 3,
      total: 10 
    },
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-10 w-72 bg-gray-200 rounded-2xl animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded-3xl animate-pulse" />
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-80 bg-gray-200 rounded-3xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
            <FaHospital className="text-green-600 text-3xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Beds</h1>
            <p className="text-gray-600">Real-time bed inventory management</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-70 shadow-lg"
        >
          {saving ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <FaSave className="text-lg" />
          )}
          <span>Save All Changes</span>
        </button>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <p className="text-gray-500 text-sm">Total Beds</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{totalBeds}</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <p className="text-gray-500 text-sm">Available Now</p>
          <p className="text-4xl font-bold text-green-600 mt-2">{availableBeds}</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <p className="text-gray-500 text-sm">Currently Occupied</p>
          <p className="text-4xl font-bold text-red-600 mt-2">{occupiedBeds}</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <p className="text-gray-500 text-sm">Occupancy Rate</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">{occupancyRate}%</p>
          <div className="h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${occupancyRate}%` }} />
          </div>
        </div>
      </motion.div>

      {/* Bed Types Grid */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Bed Categories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bedTypes.map((bed, index) => (
            <BedCard
              key={bed.type}
              type={bed.type}
              label={bed.label}
              icon={bed.icon}
              color={bed.color}
              available={bed.available}
              occupied={bed.occupied}
              total={bed.total}
              onUpdate={handleBedUpdate}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageBeds;