import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, THEME_COLORS } from '../../utils/constants';
import { 
  FiHome, FiSearch, FiDroplet, FiMapPin, FiClock, FiTruck, 
  FiUser, FiLogOut, FiActivity, FiTarget, FiAward,
  FiNavigation, FiPhone
} from 'react-icons/fi';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getTheme = () => {
    return THEME_COLORS[user?.role] || THEME_COLORS.patient;
  };

  const theme = getTheme();

  const menuItems = {
    [ROLES.PATIENT]: [
      { icon: FiHome, label: 'Dashboard', path: '/dashboard/patient' },
      { icon: FiSearch, label: 'Search Hospitals', path: '/dashboard/patient/search' },
      { icon: FiDroplet, label: 'Blood Request', path: '/dashboard/patient/blood-request' },
      { icon: FiClock, label: 'Request History', path: '/dashboard/patient/history' },
      { icon: FiMapPin, label: 'Track Delivery', path: '/dashboard/patient/track' },
    ],
    [ROLES.HOSPITAL]: [
      { icon: FiHome, label: 'Dashboard', path: '/dashboard/hospital' },
      { icon: FiActivity, label: 'Manage Beds', path: '/dashboard/hospital/beds' },
      { icon: FiUser, label: 'Patient Requests', path: '/dashboard/hospital/requests' },
      { icon: FiTarget, label: 'Profile', path: '/dashboard/hospital/profile' },
    ],
    [ROLES.BLOODBANK]: [
      { icon: FiHome, label: 'Dashboard', path: '/dashboard/bloodbank' },
      { icon: FiDroplet, label: 'Blood Stock', path: '/dashboard/bloodbank/stock' },
      { icon: FiUser, label: 'Blood Requests', path: '/dashboard/bloodbank/requests' },
      { icon: FiTruck, label: 'Assign Carrier', path: '/dashboard/bloodbank/assign' },
    ],
    [ROLES.CARRIER]: [
      { icon: FiHome, label: 'Dashboard', path: '/dashboard/carrier' },
      { icon: FiTruck, label: 'Delivery Tasks', path: '/dashboard/carrier/tasks' },
      { icon: FiClock, label: 'Delivery History', path: '/dashboard/carrier/history' },
    ],
    [ROLES.DONOR]: [
      { icon: FiHome, label: 'Dashboard', path: '/dashboard/donor' },
      { icon: FiAward, label: 'Donation History', path: '/dashboard/donor/history' },
      { icon: FiUser, label: 'Profile', path: '/dashboard/donor/profile' },
    ],
    [ROLES.AMBULANCE]: [
      { icon: FiHome, label: 'Dashboard', path: '/dashboard/ambulance' },
      { icon: FiNavigation, label: 'Trip History', path: '/dashboard/ambulance/trips' },
      { icon: FiPhone, label: 'Contact Dispatch', path: '/dashboard/ambulance/contact' },
      { icon: FiUser, label: 'Profile', path: '/dashboard/ambulance/profile' },
    ],
  };

  const items = menuItems[user?.role] || menuItems[ROLES.PATIENT];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">

      {/* Logo */}
      <div className={`p-6 bg-gradient-to-r ${theme.gradient}`}>
        <h1 className="text-white text-xl font-bold">MediCare</h1>
        <p className="text-white text-xs opacity-80">Hospital Management</p>
      </div>

      {/* User Info */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full bg-${theme.primary}-100 flex items-center justify-center`}>
            <span className={`text-${theme.primary}-600 font-bold`}>
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>

          <div>
            <p className="font-medium text-gray-800">{user?.name || 'User'}</p>
            <p className={`text-xs text-${theme.primary}-600 capitalize`}>
              {user?.role || 'Patient'}
            </p>
          </div>

        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? `bg-${theme.primary}-50 text-${theme.primary}-600`
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <FiLogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;