// Role constants
export const ROLES = {
  PATIENT: 'patient',
  HOSPITAL: 'hospital',
  BLOODBANK: 'bloodbank',
  CARRIER: 'carrier',
  DONOR: 'donor',
  AMBULANCE: 'ambulance',
};

// Theme colors for each role
export const THEME_COLORS = {
  patient: {
    primary: 'blue',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    bgDark: 'bg-blue-600',
    hover: 'hover:bg-blue-700',
    light: 'blue-50',
    border: 'border-blue-200',
    gradient: 'from-blue-500 to-blue-600',
  },
  hospital: {
    primary: 'green',
    bg: 'bg-green-50',
    text: 'text-green-600',
    bgDark: 'bg-green-600',
    hover: 'hover:bg-green-700',
    light: 'green-50',
    border: 'border-green-200',
    gradient: 'from-green-500 to-green-600',
  },
  bloodbank: {
    primary: 'red',
    bg: 'bg-red-50',
    text: 'text-red-600',
    bgDark: 'bg-red-600',
    hover: 'hover:bg-red-700',
    light: 'red-50',
    border: 'border-red-200',
    gradient: 'from-red-500 to-red-600',
  },
  carrier: {
    primary: 'orange',
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    bgDark: 'bg-orange-600',
    hover: 'hover:bg-orange-700',
    light: 'orange-50',
    border: 'border-orange-200',
    gradient: 'from-orange-500 to-orange-600',
  },
  donor: {
    primary: 'purple',
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    bgDark: 'bg-purple-600',
    hover: 'hover:bg-purple-700',
    light: 'purple-50',
    border: 'border-purple-200',
    gradient: 'from-purple-500 to-purple-600',
  },
  ambulance: {
    primary: 'yellow',
    bg: 'bg-yellow-50',
    text: 'text-yellow-600',
    bgDark: 'bg-yellow-600',
    hover: 'hover:bg-yellow-700',
    light: 'yellow-50',
    border: 'border-yellow-200',
    gradient: 'from-yellow-500 to-yellow-600',
  },
};

// Blood groups
export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

// Bed types
export const BED_TYPES = {
  GENERAL: 'General Ward',
  ICU: 'ICU',
  ICU_VENTILATOR: 'ICU with Ventilator',
  NICU: 'NICU',
  EMERGENCY: 'Emergency',
  PEDIATRIC: 'Pediatric',
};

// Request statuses
export const REQUEST_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  COMPLETED: 'completed',
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
  },
  HOSPITALS: '/api/hospitals',
  BLOODBANKS: '/api/bloodbanks',
  BLOOD_REQUESTS: '/api/blood-requests',
  BEDS: '/api/beds',
  DELIVERIES: '/api/deliveries',
};

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  ROLE: 'role',
};

// Animation variants
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};
