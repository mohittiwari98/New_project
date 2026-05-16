import mockStore from './mockStore';

export const deliveryService = {
  getAllDeliveries: async (filters = {}) => {
    return mockStore.deliveries.list(filters);
  },

  getDeliveryById: async (id) => {
    return mockStore.deliveries.getById(id);
  },

  getActiveDeliveries: async () => {
    return mockStore.deliveries.getActive();
  },

  getDeliveryHistory: async () => {
    return mockStore.deliveries.history();
  },

  assignCarrier: async (deliveryId, carrierId) => {
    return mockStore.deliveries.assignCarrier(deliveryId, carrierId);
  },

  updateDeliveryStatus: async (deliveryId, status) => {
    return mockStore.deliveries.updateStatus(deliveryId, status);
  },

  acceptDelivery: async (deliveryId) => {
    return mockStore.deliveries.updateStatus(deliveryId, 'in_transit');
  },

  startPickup: async (deliveryId) => {
    return mockStore.deliveries.updateStatus(deliveryId, 'in_transit');
  },

  completeDelivery: async (deliveryId) => {
    return mockStore.deliveries.updateStatus(deliveryId, 'completed');
  },
};

export default deliveryService;



