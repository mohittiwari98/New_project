import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaPaperPlane,
  FaWhatsapp 
} from 'react-icons/fa';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    toast.success('Thank you! Your message has been sent successfully.');
    reset();
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Our Location',
      details: '123 Healthcare Street, Medical City, Mumbai, Maharashtra 400001',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: FaPhone,
      title: 'Phone Number',
      details: '+91 98765 43210',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: FaEnvelope,
      title: 'Email Address',
      details: 'support@medicare.com',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: FaClock,
      title: 'Support Hours',
      details: '24/7 Emergency Support\nMon–Sat: 9:00 AM – 8:00 PM',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-red-600 via-red-500 to-rose-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Have questions or need assistance? Our team is ready to help you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 bg-white rounded-3xl shadow-xl p-8 lg:p-10"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1.5 text-sm text-red-500">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Please enter a valid email' }
                      })}
                      className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('subject', { required: 'Please select a subject' })}
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none bg-white"
                  >
                    <option value="">Select Subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership / Collaboration</option>
                    <option value="feedback">Feedback</option>
                    <option value="emergency">Emergency / Urgent Help</option>
                  </select>
                  {errors.subject && <p className="mt-1.5 text-sm text-red-500">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('message', { required: 'Message cannot be empty' })}
                    rows={6}
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none outline-none"
                    placeholder="How can we help you today?"
                  />
                  {errors.message && <p className="mt-1.5 text-sm text-red-500">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-4 rounded-2xl font-semibold text-base transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex gap-5">
                    <div className={`w-14 h-14 ${info.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <info.icon className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">{info.title}</h3>
                      <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                        {info.details}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* WhatsApp Quick Contact */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-green-50 border border-green-100 rounded-3xl p-6 flex items-center gap-5"
              >
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <FaWhatsapp className="text-3xl text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-green-700">Chat with us on WhatsApp</p>
                  <a href="https://wa.me/919876543210" target="_blank" className="text-green-600 hover:underline">
                    +91 98765 43210
                  </a>
                </div>
              </motion.div>

              {/* Emergency Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-3xl p-8"
              >
                <h3 className="text-xl font-semibold mb-3">Medical Emergency?</h3>
                <p className="text-white/90 mb-6">
                  Call our 24/7 emergency helpline for immediate assistance.
                </p>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-3 bg-white text-red-600 px-7 py-3.5 rounded-2xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  <FaPhone className="text-lg" />
                  +91 98765 43210
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;