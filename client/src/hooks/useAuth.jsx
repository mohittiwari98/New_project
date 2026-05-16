import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { STORAGE_KEYS, ROLES } from '../utils/constants';

// Create auth context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const demoUsers = {
      'patient@demo.com': { id: '1', email: 'patient@demo.com', name: 'John Patient', role: ROLES.PATIENT },
      'hospital@demo.com': { id: '2', email: 'hospital@demo.com', name: 'City Hospital', role: ROLES.HOSPITAL },
      'bloodbank@demo.com': { id: '3', email: 'bloodbank@demo.com', name: 'Red Cross Blood Bank', role: ROLES.BLOODBANK },
      'carrier@demo.com': { id: '4', email: 'carrier@demo.com', name: 'Mike Carrier', role: ROLES.CARRIER },
      'donor@demo.com': { id: '5', email: 'donor@demo.com', name: 'John Donor', role: ROLES.DONOR },
      'ambulance@demo.com': { id: '6', email: 'ambulance@demo.com', name: 'Mike Ambulance', role: ROLES.AMBULANCE },
    };

    const foundUser = demoUsers[email];
    if (foundUser && password === 'demo123') {
      const token = `demo_token_${Date.now()}`;
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(foundUser));
      setUser(foundUser);
      // IMPORTANT: routes are built as /dashboard/<roleLowercase>
      navigate('/dashboard/' + String(foundUser.role).toLowerCase());
      return foundUser;

    }
    throw new Error('Invalid credentials');
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setUser(null);
    navigate('/login');
  };

  const register = async (userData) => {
    const { user, token } = await authService.register(userData);
    setUser(user);
    navigate(`/dashboard/${user.role}`);
    return user;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    const user = storedUser ? JSON.parse(storedUser) : null;
    return {
      user,
      login: async (email, password) => {
        const demoUsers = {
          'patient@demo.com': { id: '1', email: 'patient@demo.com', name: 'John Patient', role: ROLES.PATIENT },
          'hospital@demo.com': { id: '2', email: 'hospital@demo.com', name: 'City Hospital', role: ROLES.HOSPITAL },
          'bloodbank@demo.com': { id: '3', email: 'bloodbank@demo.com', name: 'Red Cross Blood Bank', role: ROLES.BLOODBANK },
          'carrier@demo.com': { id: '4', email: 'carrier@demo.com', name: 'Mike Carrier', role: ROLES.CARRIER },
          'donor@demo.com': { id: '5', email: 'donor@demo.com', name: 'John Donor', role: ROLES.DONOR },
          'ambulance@demo.com': { id: '6', email: 'ambulance@demo.com', name: 'Mike Ambulance', role: ROLES.AMBULANCE },
        };
        const foundUser = demoUsers[email];
        if (foundUser && password === 'demo123') {
          const token = `demo_token_${Date.now()}`;
          localStorage.setItem(STORAGE_KEYS.TOKEN, token);
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(foundUser));
          window.location.href = '/dashboard/' + String(foundUser.role).toLowerCase();
          return foundUser;

        }
        throw new Error('Invalid credentials');
      },
      logout: () => {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        window.location.href = '/login';
      },
      register: async (userData) => {
        const { user, token } = await authService.register(userData);
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        window.location.href = `/dashboard/${user.role}`;
        return user;
      },
      loading: false,
    };
  }
  return context;
};

export default useAuth;
