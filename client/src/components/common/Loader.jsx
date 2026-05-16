import { motion } from 'framer-motion';

const Loader = ({ size = 'md', color = 'red' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const colorClasses = {
    red: 'border-red-500',
    blue: 'border-blue-500',
    green: 'border-green-500',
    orange: 'border-orange-500',
    white: 'border-white',
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-t-transparent rounded-full`}
        style={{ borderTopColor: 'transparent' }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className={`${colorClasses[color]} absolute inset-0 rounded-full opacity-20`} />
      </motion.div>
    </div>
  );
};

// Full page loader
export const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-3xl font-bold">M</span>
          </div>
        </motion.div>
        <Loader size="lg" />
        <p className="mt-4 text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
};

// Button loader
export const ButtonLoader = ({ color = 'white' }) => {
  return (
    <motion.div
      className={`w-5 h-5 border-2 border-t-transparent rounded-full`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <div className={`border-${color}-500 absolute inset-0 rounded-full opacity-20`} />
    </motion.div>
  );
};

export default Loader;

