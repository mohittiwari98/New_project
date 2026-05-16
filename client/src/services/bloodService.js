import mockStore from './mockStore';

export const bloodService = {
  getAllBloodBanks: async (filters = {}) => {
    return mockStore.bloodBanks.list(filters);
  },

  getBloodBankById: async (id) => {
    return mockStore.bloodBanks.getById(id);
  },

  getBloodStock: async () => {
    return mockStore.bloodBanks.getStock();
  },

  updateBloodStock: async (bloodGroup, quantity) => {
    return mockStore.bloodBanks.updateStock(bloodGroup, quantity);
  },

  getBloodRequests: async (filters = {}) => {
    return mockStore.bloodRequests.list(filters);
  },

  createBloodRequest: async (requestData) => {
    return mockStore.bloodRequests.create(requestData);
  },

  updateRequestStatus: async (id, status) => {
    return mockStore.bloodRequests.updateStatus(id, status);
  },
};

export default bloodService;


