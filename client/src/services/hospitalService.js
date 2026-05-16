import mockStore from './mockStore';

export const hospitalService = {
  getAllHospitals: async (filters = {}) => {
    return mockStore.hospitals.list(filters);
  },

  getHospitalById: async (id) => {
    return mockStore.hospitals.getById(id);
  },

  updateBedAvailability: async (id, bedData) => {
    return mockStore.hospitals.updateBeds(id, bedData);
  },

  getNearbyHospitals: async (_lat, _lng, _radius = 10) => {
    // distance not simulated; return all
    return mockStore.hospitals.list();
  },
};

export default hospitalService;


