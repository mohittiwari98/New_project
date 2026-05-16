import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaHospital,
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
} from "react-icons/fa";

import { useAuth } from "../../hooks/useAuth";
import { ROLES } from "../../utils/constants";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRole, setSelectedRole] = useState(ROLES.PATIENT);

  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const roles = [
    {
      value: ROLES.PATIENT,
      label: "Patient",
      icon: "👤",
      description: "Find hospitals and request blood",
    },
    {
      value: ROLES.HOSPITAL,
      label: "Hospital",
      icon: "🏥",
      description: "Manage beds and patients",
    },
    {
      value: ROLES.BLOODBANK,
      label: "Blood Bank",
      icon: "🩸",
      description: "Manage blood inventory",
    },
    {
      value: ROLES.CARRIER,
      label: "Carrier",
      icon: "🚚",
      description: "Deliver blood to hospitals",
    },
    {
      value: ROLES.DONOR,
      label: "Donor",
      icon: "❤️",
      description: "Donate blood to help patients",
    },
    {
      value: ROLES.AMBULANCE,
      label: "Ambulance",
      icon: "🚑",
      description: "Emergency patient transport",
    },
  ];

  const getRoleColor = (role) => {
    const colors = {
      [ROLES.PATIENT]: "border-blue-500 bg-blue-50 text-blue-600",
      [ROLES.HOSPITAL]: "border-green-500 bg-green-50 text-green-600",
      [ROLES.BLOODBANK]: "border-red-500 bg-red-50 text-red-600",
      [ROLES.CARRIER]: "border-orange-500 bg-orange-50 text-orange-600",
      [ROLES.DONOR]: "border-purple-500 bg-purple-50 text-purple-600",
      [ROLES.AMBULANCE]: "border-yellow-500 bg-yellow-50 text-yellow-700",
    };

    return colors[role] || "border-gray-200";
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await registerUser({ ...data, role: selectedRole });

      toast.success("Registration successful!");

      switch (selectedRole) {
        case ROLES.PATIENT:
          navigate("/dashboard/patient");
          break;

        case ROLES.HOSPITAL:
          navigate("/dashboard/hospital");
          break;

        case ROLES.BLOODBANK:
          navigate("/dashboard/bloodbank");
          break;

        case ROLES.CARRIER:
          navigate("/dashboard/carrier");
          break;

        case ROLES.DONOR:
          navigate("/dashboard/donor");
          break;

        case ROLES.AMBULANCE:
          navigate("/dashboard/ambulance");
          break;

        default:
          navigate("/");
      }
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-500 to-red-600 items-center justify-center p-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="text-center text-white">
            <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-3xl flex items-center justify-center mx-auto mb-8">
              <FaHospital className="text-5xl" />
            </div>

            <h1 className="text-4xl font-bold mb-4">Join MediCare</h1>

            <p className="text-lg opacity-90 max-w-md">
              Create an account and get access to real-time hospital beds and
              blood availability.
            </p>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mr-3">
              <FaHospital className="text-white" />
            </div>
            <span className="text-2xl font-bold">MediCare</span>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Create Account
              </h2>
              <p className="text-gray-500">
                Select your role and fill the details
              </p>
            </div>

            {/* ROLE SELECT */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">
                I am a:
              </label>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`p-3 rounded-xl border-2 transition ${
                      selectedRole === role.value
                        ? getRoleColor(role.value)
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-2xl block">{role.icon}</span>

                    <span className="font-semibold block">
                      {role.label}
                    </span>

                    <p className="text-xs opacity-70">
                      {role.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* NAME */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                    placeholder="Enter full name"
                  />
                </div>

                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="email"
                    {...register("email", { required: "Email required" })}
                    className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              {/* PHONE */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone
                </label>

                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    {...register("phone", {
                      required: "Phone required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter 10 digit phone",
                      },
                    })}
                    className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                    placeholder="Phone number"
                  />
                </div>
              </div>

              {/* ADDRESS */}
              {(selectedRole === ROLES.HOSPITAL ||
                selectedRole === ROLES.BLOODBANK) && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Address
                  </label>

                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-3 text-gray-400" />

                    <textarea
                      {...register("address")}
                      rows={2}
                      className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                      placeholder="Enter address"
                    />
                  </div>
                </div>
              )}

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
                      },
                    })}
                    className="w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                    placeholder="Create password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* TERMS */}
              <label className="flex items-center text-sm">
                <input type="checkbox" required className="mr-2" />
                I agree to the Terms and Privacy Policy
              </label>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FaUserPlus />
                    Create Account
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-red-600 font-semibold">
                Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;