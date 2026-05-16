import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMessageSquare, FiMail, FiSend, FiUser, FiClock } from 'react-icons/fi';
import { THEME_COLORS } from '../../utils/constants';

const ContactDispatch = () => {
  const [messages, setMessages] = useState([
    { id: '1', from: 'Dispatch', message: 'Emergency at Downtown - 5 patients', time: '10:30 AM', urgent: true },
    { id: '2', from: 'You', message: 'On my way to pickup', time: '10:35 AM', urgent: false },
    { id: '3', from: 'Dispatch', message: 'Priority case at Northside - cardiac emergency', time: '11:00 AM', urgent: true },
  ]);

  const [newMessage, setNewMessage] = useState('');
  
  // Safety check for theme constants
  const theme = THEME_COLORS?.ambulance || {
    gradient: 'from-yellow-400 to-yellow-600',
    bgDark: 'bg-yellow-600'
  };

  const contacts = [
    { name: 'Emergency Dispatch', phone: '911', available: true },
    { name: 'Hospital Coordinator', phone: '555-0100', available: true },
    { name: 'Traffic Control', phone: '555-0101', available: false },
    { name: 'Medical Control', phone: '555-0102', available: true },
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages, 
        { 
          id: Date.now().toString(), 
          from: 'You', 
          message: newMessage, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
          urgent: false 
        }
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-2">
      {/* Header */}
      <div className={`bg-gradient-to-r ${theme.gradient} rounded-2xl p-6 text-white shadow-md`}>
        <h1 className="text-2xl font-bold">Contact Dispatch</h1>
        <p className="opacity-90 mt-1">Communicate with dispatch center and hospitals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact List Column */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FiPhone className="mr-2 text-yellow-600" /> Emergency Contacts
          </h2>
          <div className="space-y-3">
            {contacts.map((contact, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-4 border border-gray-100 rounded-lg hover:border-yellow-400 hover:shadow-sm cursor-pointer transition bg-gray-50/50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.phone}</p>
                  </div>
                  <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded-full ${contact.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {contact.available ? 'Available' : 'Busy'}
                  </span>
                </div>
                <button className={`mt-3 w-full py-2 rounded-lg ${theme.bgDark} text-white text-sm flex items-center justify-center space-x-2 font-medium`}>
                  <FiPhone size={14} />
                  <span>Call Now</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Message Thread Column */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex flex-col">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FiMessageSquare className="mr-2 text-yellow-600" /> Live Chat
          </h2>
          
          <div className="h-[450px] overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.from === 'You' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                  msg.from === 'You' 
                  ? `${theme.bgDark} text-white rounded-tr-none` 
                  : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                } ${msg.urgent ? 'ring-2 ring-red-500' : ''}`}>
                  <div className="flex items-center justify-between mb-1 gap-4">
                    <span className="font-bold text-xs uppercase tracking-wider">{msg.from}</span>
                    <span className="text-[10px] opacity-70 flex items-center">
                      <FiClock className="mr-1" /> {msg.time}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                  {msg.urgent && <span className="text-[10px] font-bold text-red-500 block mt-2 uppercase">Priority Alert</span>}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Send Message Input */}
          <form onSubmit={handleSend} className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message to dispatch..."
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className={`px-6 py-3 ${theme.bgDark} text-white rounded-xl flex items-center space-x-2 font-bold shadow-md`}
            >
              <FiSend />
              <span>Send</span>
            </motion.button>
          </form>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.button
          whileHover={{ y: -3 }}
          className="bg-red-600 hover:bg-red-700 text-white p-5 rounded-2xl flex items-center justify-center space-x-3 shadow-lg transition-colors"
        >
          <FiPhone size={20} />
          <span className="font-bold uppercase tracking-wider">Emergency 911</span>
        </motion.button>
        <motion.button
          whileHover={{ y: -3 }}
          className="bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-2xl flex items-center justify-center space-x-3 shadow-lg transition-colors"
        >
          <FiMessageSquare size={20} />
          <span className="font-bold uppercase tracking-wider">Broadcast Alert</span>
        </motion.button>
        <motion.button
          whileHover={{ y: -3 }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-5 rounded-2xl flex items-center justify-center space-x-3 shadow-lg transition-colors"
        >
          <FiMail size={20} />
          <span className="font-bold uppercase tracking-wider">Send Incident Report</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ContactDispatch;