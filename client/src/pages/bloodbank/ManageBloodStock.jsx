import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTint, FaSave, FaPlus, FaMinus, FaHospital } from 'react-icons/fa';
import toast from 'react-hot-toast';
import bloodService from '../../services/bloodService';
import { BLOOD_GROUPS } from '../../utils/constants';

const ManageBloodStock = () => {
  const [bloodBank, setBloodBank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchBloodBank = async () => {
      setLoading(true);
      try {
        const data = await bloodService.getBloodBankById('b1');
        setBloodBank(data);
      } catch (error) {
        console.error('Error fetching blood bank:', error);
        toast.error('Failed to load blood bank data');
      } finally {
        setLoading(false);
      }
    };
    fetchBloodBank();
  }, []);

  const handleStockUpdate = (bloodGroup, change) => {
    if (!bloodBank) return;
    
    const newStock = { ...bloodBank.stock };
    newStock[bloodGroup] = Math.max(0, (newStock[bloodGroup] || 0) + change);
    
    setBloodBank({ ...bloodBank, stock: newStock });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Update each blood group
      for (const [group, units] of Object.entries(bloodBank.stock || {})) {
        await bloodService.updateBloodStock(group, units);
      }
      toast.success('Blood stock updated successfully!');
    } catch (error) {
      toast.error('Failed to save blood stock. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getStockColor = (units) => {
    if (units > 40) return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' };
    if (units > 15) return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' };
    return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' };
  };

  const totalUnits = Object.values(bloodBank?.stock || {}).reduce((a, b) => a + b, 0);
  const lowStockCount = Object.values(bloodBank?.stock || {}).filter(u => u <= 15).length;

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-10 w-80 bg-gray-200 rounded-2xl animate-pulse" />
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded-3xl animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="h-52 bg-gray-200 rounded-3xl animate-pulse" />
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
          <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
            <FaTint className="text-red-600 text-3xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Blood Stock</h1>
            <p className="text-gray-600">Update real-time blood inventory</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-3 bg-gradient-to-r from-red-600 to-rose-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-red-700 hover:to-rose-700 transition-all disabled:opacity-70 shadow-lg"
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
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <p className="text-gray-500 text-sm">Total Units Available</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{totalUnits}</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <p className="text-gray-500 text-sm">Blood Groups</p>
          <p className="text-4xl font-bold text-red-600 mt-2">{BLOOD_GROUPS.length}</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <p className="text-gray-500 text-sm">Low Stock Alerts</p>
          <p className="text-4xl font-bold text-yellow-600 mt-2">{lowStockCount}</p>
          <p className="text-xs text-yellow-600 mt-1">Units ≤ 15</p>
        </div>
      </motion.div>

      {/* Blood Stock Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Blood Groups Stock</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {BLOOD_GROUPS.map((group, index) => {
            const units = bloodBank?.stock?.[group] || 0;
            const stock = getStockColor(units);

            return (
              <motion.div
                key={group}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04 }}
                className={`bg-white rounded-3xl shadow-lg overflow-hidden border-2 ${stock.border} hover:shadow-xl transition-all`}
              >
                {/* Header */}
                <div className={`p-5 text-center ${stock.bg}`}>
                  <h3 className={`text-4xl font-bold ${stock.text}`}>{group}</h3>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <p className="text-6xl font-bold text-gray-900 mb-6">{units}</p>
                  
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleStockUpdate(group, -1)}
                      className="w-12 h-12 bg-red-100 hover:bg-red-200 text-red-600 rounded-2xl flex items-center justify-center transition-colors active:scale-95"
                    >
                      <FaMinus className="text-xl" />
                    </button>

                    <button
                      onClick={() => handleStockUpdate(group, 1)}
                      className="w-12 h-12 bg-green-100 hover:bg-green-200 text-green-600 rounded-2xl flex items-center justify-center transition-colors active:scale-95"
                    >
                      <FaPlus className="text-xl" />
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mt-4">UNITS</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default ManageBloodStock;