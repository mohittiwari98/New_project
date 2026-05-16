import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import DashboardLayout from '../layouts/DashboardLayout';

// Public Pages
import Home from '../pages/public/Home';
import Hospitals from '../pages/public/Hospitals';
import BloodBanks from '../pages/public/BloodBanks';
import About from '../pages/public/About';
import Contact from '../pages/public/Contact';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Patient Pages
import PatientDashboard from '../pages/patient/PatientDashboard';
import SearchHospitals from '../pages/patient/SearchHospitals';
import BloodRequest from '../pages/patient/BloodRequest';
import RequestHistory from '../pages/patient/RequestHistory';
import TrackDelivery from '../pages/patient/TrackDelivery';

// Hospital Pages
import HospitalDashboard from '../pages/hospital/HospitalDashboard';
import ManageBeds from '../pages/hospital/ManageBeds';
import PatientRequests from '../pages/hospital/PatientRequests';
import HospitalProfile from '../pages/hospital/HospitalProfile';

// Blood Bank Pages
import BloodBankDashboard from '../pages/bloodbank/BloodBankDashboard';
import ManageBloodStock from '../pages/bloodbank/ManageBloodStock';
import BloodRequests from '../pages/bloodbank/BloodRequests';
import AssignCarrier from '../pages/bloodbank/AssignCarrier';

// Carrier Pages
import CarrierDashboard from '../pages/carrier/CarrierDashboard';
import DeliveryTasks from '../pages/carrier/DeliveryTasks';
import DeliveryHistory from '../pages/carrier/DeliveryHistory';

// Donor Pages
import DonorDashboard from '../pages/donor/DonorDashboard';
import DonationHistory from '../pages/donor/DonationHistory';
import DonorProfile from '../pages/donor/DonorProfile';

// Ambulance Pages
import AmbulanceDashboard from '../pages/ambulance/AmbulanceDashboard';
import TripHistory from '../pages/ambulance/TripHistory';
import AmbulanceProfile from '../pages/ambulance/AmbulanceProfile';
import ContactDispatch from '../pages/ambulance/ContactDispatch';

// Utils
import ProtectedRoute from '../components/common/ProtectedRoute';
import { ROLES } from '../utils/constants';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/bloodbanks" element={<BloodBanks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Patient Routes */}
        <Route path="/dashboard/patient" element={
          <ProtectedRoute allowedRoles={[ROLES.PATIENT]}>
            <DashboardLayout><PatientDashboard /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/patient/search" element={
          <ProtectedRoute allowedRoles={[ROLES.PATIENT]}>
            <DashboardLayout><SearchHospitals /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/patient/blood-request" element={
          <ProtectedRoute allowedRoles={[ROLES.PATIENT]}>
            <DashboardLayout><BloodRequest /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/patient/history" element={
          <ProtectedRoute allowedRoles={[ROLES.PATIENT]}>
            <DashboardLayout><RequestHistory /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/patient/track" element={
          <ProtectedRoute allowedRoles={[ROLES.PATIENT]}>
            <DashboardLayout><TrackDelivery /></DashboardLayout>
          </ProtectedRoute>
        } />
        
        {/* Hospital Routes */}
        <Route path="/dashboard/hospital" element={
          <ProtectedRoute allowedRoles={[ROLES.HOSPITAL]}>
            <DashboardLayout><HospitalDashboard /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/hospital/beds" element={
          <ProtectedRoute allowedRoles={[ROLES.HOSPITAL]}>
            <DashboardLayout><ManageBeds /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/hospital/requests" element={
          <ProtectedRoute allowedRoles={[ROLES.HOSPITAL]}>
            <DashboardLayout><PatientRequests /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/hospital/profile" element={
          <ProtectedRoute allowedRoles={[ROLES.HOSPITAL]}>
            <DashboardLayout><HospitalProfile /></DashboardLayout>
          </ProtectedRoute>
        } />
        
        {/* Blood Bank Routes */}
        <Route path="/dashboard/bloodbank" element={
          <ProtectedRoute allowedRoles={[ROLES.BLOODBANK]}>
            <DashboardLayout><BloodBankDashboard /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/bloodbank/stock" element={
          <ProtectedRoute allowedRoles={[ROLES.BLOODBANK]}>
            <DashboardLayout><ManageBloodStock /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/bloodbank/requests" element={
          <ProtectedRoute allowedRoles={[ROLES.BLOODBANK]}>
            <DashboardLayout><BloodRequests /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/bloodbank/assign" element={
          <ProtectedRoute allowedRoles={[ROLES.BLOODBANK]}>
            <DashboardLayout><AssignCarrier /></DashboardLayout>
          </ProtectedRoute>
        } />
        
        {/* Carrier Routes */}
        <Route path="/dashboard/carrier" element={
          <ProtectedRoute allowedRoles={[ROLES.CARRIER]}>
            <DashboardLayout><CarrierDashboard /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/carrier/tasks" element={
          <ProtectedRoute allowedRoles={[ROLES.CARRIER]}>
            <DashboardLayout><DeliveryTasks /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/carrier/history" element={
          <ProtectedRoute allowedRoles={[ROLES.CARRIER]}>
            <DashboardLayout><DeliveryHistory /></DashboardLayout>
          </ProtectedRoute>
        } />
        
        {/* Donor Routes */}
        <Route path="/dashboard/donor" element={
          <ProtectedRoute allowedRoles={[ROLES.DONOR]}>
            <DashboardLayout><DonorDashboard /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/donor/history" element={
          <ProtectedRoute allowedRoles={[ROLES.DONOR]}>
            <DashboardLayout><DonationHistory /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/donor/profile" element={
          <ProtectedRoute allowedRoles={[ROLES.DONOR]}>
            <DashboardLayout><DonorProfile /></DashboardLayout>
          </ProtectedRoute>
        } />
        
        {/* Ambulance Routes */}
        <Route path="/dashboard/ambulance" element={
          <ProtectedRoute allowedRoles={[ROLES.AMBULANCE]}>
            <DashboardLayout><AmbulanceDashboard /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/ambulance/trips" element={
          <ProtectedRoute allowedRoles={[ROLES.AMBULANCE]}>
            <DashboardLayout><TripHistory /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/ambulance/profile" element={
          <ProtectedRoute allowedRoles={[ROLES.AMBULANCE]}>
            <DashboardLayout><AmbulanceProfile /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/ambulance/contact" element={
          <ProtectedRoute allowedRoles={[ROLES.AMBULANCE]}>
            <DashboardLayout><ContactDispatch /></DashboardLayout>
          </ProtectedRoute>
        } />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
