import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  FaHospital,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
} from 'react-icons/fa';

import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const user = await login(data.email, data.password);
      toast.success('Login successful! Welcome back.');

      switch (user.role) {
        case ROLES.PATIENT:
          navigate('/dashboard/patient');
          break;
        case ROLES.HOSPITAL:
          navigate('/dashboard/hospital');
          break;
        case ROLES.BLOODBANK:
          navigate('/dashboard/bloodbank');
          break;
        case ROLES.CARRIER:
          navigate('/dashboard/carrier');
          break;
        case ROLES.DONOR:
          navigate('/dashboard/donor');
          break;
        case ROLES.AMBULANCE:
          navigate('/dashboard/ambulance');
          break;
        default:
          navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error(error.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const demoAccounts = [
    { email: 'patient@demo.com', password: 'demo123', role: 'Patient', color: 'text-blue-600' },
    { email: 'hospital@demo.com', password: 'demo123', role: 'Hospital', color: 'text-green-600' },
    { email: 'bloodbank@demo.com', password: 'demo123', role: 'Blood Bank', color: 'text-red-600' },
    { email: 'donor@demo.com', password: 'demo123', role: 'Donor', color: 'text-purple-600' },
    { email: 'carrier@demo.com', password: 'demo123', role: 'Carrier', color: 'text-orange-600' },
    { email: 'ambulance@demo.com', password: 'demo123', role: 'Ambulance', color: 'text-yellow-600' },
  ];

  const fillDemo = (email, password) => {
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    if (emailInput) emailInput.value = email;
    if (passwordInput) passwordInput.value = password;
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-red-600 via-red-500 to-rose-600 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:30px_30px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white z-10"
        >
          <div className="w-28 h-28 bg-white/20 backdrop-blur-2xl rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/30">
            <FaHospital className="text-6xl" />
          </div>

          <h1 className="text-5xl font-bold mb-4 tracking-tight">MediCare</h1>
          <p className="text-xl opacity-90 max-w-sm mx-auto">
            Connecting lives with instant healthcare access
          </p>

          <div className="mt-12 text-sm opacity-75">
            Trusted by 50,000+ users across India
          </div>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center">
                <FaHospital className="text-white text-3xl" />
              </div>
              <span className="text-3xl font-bold text-gray-900">MediCare</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-gray-600 mt-2">Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                    placeholder="patient@demo.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { required: 'Password is required' })}
                    className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.985] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <FaSignInAlt />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-10 pt-6 border-t border-gray-100">
              <p className="text-center text-sm text-gray-500 mb-4">Quick Demo Login</p>
              
              <div className="grid grid-cols-2 gap-3">
                {demoAccounts.map((account, idx) => (
                  <button
                    key={idx}
                    onClick={() => fillDemo(account.email, account.password)}
                    className="text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all text-sm border border-transparent hover:border-gray-200"
                  >
                    <span className={`font-semibold ${account.color}`}>
                      {account.role}
                    </span>
                  </button>
                ))}
              </div>

              <p className="text-xs text-center text-gray-400 mt-4">
                Password for all demo accounts: <span className="font-mono">demo123</span>
              </p>
            </div>

            {/* Register Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-red-600 font-semibold hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;