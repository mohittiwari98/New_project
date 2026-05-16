// Frontend-only mock data store using localStorage
// Replaces backend API calls so registration/login + CRUD work without MongoDB.

import { ROLES } from '../utils/constants';

const LS_KEYS = {
  USERS: 'mock_users',
  HOSPITALS: 'mock_hospitals',
  BLOOD_BANKS: 'mock_blood_banks',
  BLOOD_REQUESTS: 'mock_blood_requests',
  DELIVERIES: 'mock_deliveries',
  NEXT_IDS: 'mock_next_ids',
};

const uid = () => Math.random().toString(16).slice(2) + Date.now().toString(16);

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const nextIds = () => load(LS_KEYS.NEXT_IDS, {
  userId: 100,
  hospitalId: 200,
  bloodBankId: 300,
  bloodRequestId: 400,
  deliveryId: 500,
  bedUpdateId: 600,
});

const bump = (field) => {
  const ids = nextIds();
  ids[field] = (ids[field] ?? 0) + 1;
  save(LS_KEYS.NEXT_IDS, ids);
  return ids[field];
};

const ensureSeeded = () => {
  // Seed mock users
  const users = load(LS_KEYS.USERS, null);
  if (!users) {
    const seeded = [
      {
        id: '1',
        email: 'patient@demo.com',
        name: 'John Patient',
        role: ROLES.PATIENT,
        phone: '1111111111',
        address: 'Patient Street',
        password: 'demo123',
        isActive: true,
      },
      {
        id: '2',
        email: 'hospital@demo.com',
        name: 'City Hospital',
        role: ROLES.HOSPITAL,
        phone: '2222222222',
        address: 'Hospital Street',
        password: 'demo123',
        isActive: true,
        beds: {
          total: 100,
          available: 60,
          icu: 10,
          icuVentilator: 4,
          emergency: 20,
          pediatric: 15,
          occupied: 40,
        },
      },
      {
        id: '3',
        email: 'bloodbank@demo.com',
        name: 'Red Cross Blood Bank',
        role: ROLES.BLOODBANK,
        phone: '3333333333',
        address: 'BloodBank Street',
        password: 'demo123',
        isActive: true,
        stock: {
          A_plus: 20,
          A_minus: 10,
          B_plus: 18,
          B_minus: 9,
          AB_plus: 8,
          AB_minus: 4,
          O_plus: 30,
          O_minus: 12,
        },
      },
      {
        id: '4',
        email: 'carrier@demo.com',
        name: 'Mike Carrier',
        role: ROLES.CARRIER,
        phone: '4444444444',
        address: 'Carrier Street',
        password: 'demo123',
        isActive: true,
      },
      {
        id: '5',
        email: 'donor@demo.com',
        name: 'John Donor',
        role: ROLES.DONOR,
        phone: '5555555555',
        address: 'Donor Street',
        password: 'demo123',
        isActive: true,
        bloodGroup: 'O+',
      },
      {
        id: '6',
        email: 'ambulance@demo.com',
        name: 'Mike Ambulance',
        role: ROLES.AMBULANCE,
        phone: '6666666666',
        address: 'Ambulance Street',
        password: 'demo123',
        isActive: true,
      },
    ];
    save(LS_KEYS.USERS, seeded);
  }

  // Seed hospitals
  const hospitals = load(LS_KEYS.HOSPITALS, null);
  if (!hospitals) {
    const seededHospitals = [
      {
        id: 'h1',
        name: 'City Hospital',
        email: 'hospital@demo.com',
        phone: '2222222222',
        role: ROLES.HOSPITAL,
        address: 'Hospital Street',
        beds: {
          total: 100,
          available: 60,
          icu: 10,
          icuVentilator: 4,
          emergency: 20,
          pediatric: 15,
          occupied: 40,
        },
        facilities: ['ICU', 'Emergency', 'Pediatrics'],
        workingHours: '24/7',
        location: { type: 'Point', coordinates: [77.5946, 12.9716] },
        isActive: true,
      },
    ];
    save(LS_KEYS.HOSPITALS, seededHospitals);
  }

  // Seed blood banks
  const banks = load(LS_KEYS.BLOOD_BANKS, null);
  if (!banks) {
    const seededBanks = [
      {
        id: 'b1',
        name: 'Red Cross Blood Bank',
        email: 'bloodbank@demo.com',
        phone: '3333333333',
        role: ROLES.BLOODBANK,
        address: 'BloodBank Street',
        stock: {
          A_plus: 20,
          A_minus: 10,
          B_plus: 18,
          B_minus: 9,
          AB_plus: 8,
          AB_minus: 4,
          O_plus: 30,
          O_minus: 12,
        },
        facilities: ['Testing Lab'],
        workingHours: '8am-8pm',
        location: { type: 'Point', coordinates: [77.5946, 12.9716] },
        isActive: true,
      },
    ];
    save(LS_KEYS.BLOOD_BANKS, seededBanks);
  }

  // Seed requests / deliveries
  const reqs = load(LS_KEYS.BLOOD_REQUESTS, null);
  if (!reqs) {
    save(LS_KEYS.BLOOD_REQUESTS, []);
  }
  const deliveries = load(LS_KEYS.DELIVERIES, null);
  if (!deliveries) {
    save(LS_KEYS.DELIVERIES, []);
  }
};

ensureSeeded();

// --- Generic helpers ---
const getUsers = () => load(LS_KEYS.USERS, []);
const setUsers = (u) => save(LS_KEYS.USERS, u);

const getHospitals = () => load(LS_KEYS.HOSPITALS, []);
const setHospitals = (h) => save(LS_KEYS.HOSPITALS, h);

const getBloodBanks = () => load(LS_KEYS.BLOOD_BANKS, []);
const setBloodBanks = (b) => save(LS_KEYS.BLOOD_BANKS, b);

const getBloodRequests = () => load(LS_KEYS.BLOOD_REQUESTS, []);
const setBloodRequests = (r) => save(LS_KEYS.BLOOD_REQUESTS, r);

const getDeliveries = () => load(LS_KEYS.DELIVERIES, []);
const setDeliveries = (d) => save(LS_KEYS.DELIVERIES, d);

// --- Auth-like methods ---
export const auth = {
  register: async (userData) => {
    const users = getUsers();
    const exists = users.some((u) => u.email.toLowerCase() === userData.email.toLowerCase());
    if (exists) throw new Error('User already exists');

    const id = String(bump('userId'));
    const newUser = {
      id,
      email: userData.email,
      name: userData.name || 'User',
      phone: userData.phone || '0000000000',
      role: userData.role,
      address: userData.address || 'N/A',
      password: userData.password,
      isActive: true,
      // optional role profile fields
      bloodGroup: userData.bloodGroup,
      beds: userData.beds,
      stock: userData.stock,
    };

    users.push(newUser);
    setUsers(users);
    return { token: `mock_token_${uid()}`, user: stripPassword(newUser) };
  },

  login: async ({ email, password }) => {
    const users = getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) throw new Error('Invalid email or password');
    if (!user.isActive) throw new Error('Account deactivated');
    return { token: `mock_token_${uid()}`, user: stripPassword(user) };
  },
};

const stripPassword = (u) => {
  const { password, ...rest } = u;
  return rest;
};

// --- Hospitals ---
export const hospitals = {
  list: async (filters = {}) => {
    const all = getHospitals();
    // Minimal filtering support used by UI
    if (filters?.query) {
      const q = String(filters.query).toLowerCase();
      return all.filter((h) => h.name.toLowerCase().includes(q));
    }
    return all;
  },

  getById: async (id) => {
    return getHospitals().find((h) => h.id === id);
  },

  updateBeds: async (id, bedData) => {
    const hospitals = getHospitals();
    const idx = hospitals.findIndex((h) => h.id === id);
    if (idx === -1) throw new Error('Hospital not found');
    hospitals[idx] = {
      ...hospitals[idx],
      beds: {
        ...hospitals[idx].beds,
        ...bedData,
      },
    };
    setHospitals(hospitals);
    return hospitals[idx];
  },
};

// --- Blood banks ---
export const bloodBanks = {
  list: async (filters = {}) => {
    const all = getBloodBanks();
    if (filters?.query) {
      const q = String(filters.query).toLowerCase();
      return all.filter((b) => b.name.toLowerCase().includes(q));
    }
    return all;
  },

  getById: async (id) => {
    return getBloodBanks().find((b) => b.id === id);
  },

  getStock: async () => {
    const banks = getBloodBanks();
    return banks[0]?.stock || {};
  },

  updateStock: async (bloodGroup, quantity) => {
    const banks = getBloodBanks();
    const b = banks[0];
    if (!b) throw new Error('No blood bank seeded');
    const key = String(bloodGroup).replace(/\s/g, '_');
    b.stock[key] = Math.max(0, (b.stock[key] ?? 0) + Number(quantity));
    setBloodBanks(banks);
    return { ...b.stock };
  },
};

// --- Blood requests ---
export const bloodRequests = {
  list: async (filters = {}) => {
    let all = getBloodRequests();
    if (filters?.status) {
      all = all.filter((r) => r.status === filters.status);
    }
    return all;
  },

  create: async (requestData) => {
    const all = getBloodRequests();
    const id = String(bump('bloodRequestId'));

    const request = {
      id,
      patientName: requestData.patientName || 'Patient',
      patientId: requestData.patientId,
      hospitalId: requestData.hospitalId,
      bloodGroup: requestData.bloodGroup,
      units: requestData.units || 1,
      location: requestData.location,
      status: 'pending',
      createdAt: new Date().toISOString(),
      notes: requestData.notes,
    };

    all.push(request);
    setBloodRequests(all);
    return request;
  },

  updateStatus: async (id, status) => {
    const all = getBloodRequests();
    const idx = all.findIndex((r) => String(r.id) === String(id));
    if (idx === -1) throw new Error('Request not found');
    all[idx] = { ...all[idx], status };
    setBloodRequests(all);
    return all[idx];
  },
};

// --- Deliveries ---
export const deliveries = {
  list: async (filters = {}) => {
    let all = getDeliveries();
    if (filters?.status) {
      all = all.filter((d) => d.status === filters.status);
    }
    return all;
  },

  getById: async (id) => {
    return getDeliveries().find((d) => String(d.id) === String(id));
  },

  getActive: async () => {
    return getDeliveries().filter((d) => d.status !== 'completed');
  },

  history: async () => {
    return getDeliveries().slice().sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  },

  createFromDeliveryRequest: async ({ bloodRequestId }) => {
    const all = getDeliveries();
    const id = String(bump('deliveryId'));
    const delivery = {
      id,
      bloodRequestId,
      carrierId: null,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    all.push(delivery);
    setDeliveries(all);
    return delivery;
  },

  assignCarrier: async (deliveryId, carrierId) => {
    const all = getDeliveries();
    const idx = all.findIndex((d) => String(d.id) === String(deliveryId));
    if (idx === -1) throw new Error('Delivery not found');
    all[idx] = { ...all[idx], carrierId };
    setDeliveries(all);
    return all[idx];
  },

  updateStatus: async (deliveryId, status) => {
    const all = getDeliveries();
    const idx = all.findIndex((d) => String(d.id) === String(deliveryId));
    if (idx === -1) throw new Error('Delivery not found');
    all[idx] = { ...all[idx], status, updatedAt: new Date().toISOString() };
    setDeliveries(all);
    return all[idx];
  },
};

// --- Convenience export (so services can import one name) ---
export default {
  auth,
  hospitals,
  bloodBanks,
  bloodRequests,
  deliveries,
};

