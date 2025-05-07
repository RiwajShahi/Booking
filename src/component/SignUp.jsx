import React from 'react';
import { motion } from 'framer-motion';
import {User, Mail, Phone, Lock} from 'lucide-react';

    

const SignUpPage = () => {
  return (
    <motion.div
      className="w-full min-h-screen flex items-center justify-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/*-------------bg img-----------*/}
      <form className="bg-white/80  p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-black-700">Create Account</h2>

        <div className="mb-4">
          <label className="block text-black-600 mb-1 font-bold">Full Name</label>
          <div>
            <div className ='relative'>
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black-400" />
              <input type="text" placeholder="Ram Bahadur"
              className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-black-600 mb-1 font-bold">Email Address</label>
          <div className='relative'>
            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black-400'/>
            <input type="email" 
            placeholder="example@gmail.com"
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-black-600 mb-1 font-bold">Phone Number</label>
          <div className='relative'>
            <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black-400'/>
          <input type="tel" 
           placeholder="+977 1234567890"
           className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
        </div>
        </div>

        <div className="mb-4">
          <label className="block text-black-600 mb-1 font-bold">User Type</label>
          
          <select className="w-full px-4 py-2 pr-5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400">
            <option value="">Select type</option>
            <option value="guest">Guest</option>
            <option value="host">Host</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-black-600 mb-1 font-bold">Password</label>
          <div className='relative'>
            <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black-400'/>
            <input type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-black-600 mb-1 font-bold"> Confirm Password</label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black-400'/>
              <input type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
            </div>
        </div>

        <button
          type="button"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-black-600 mt-4">
          Already have an account? <a href="/" className="text-teal-800 font-semibold hover:underline">Login</a>
        </p>
      </form>
    </motion.div>
  );
};

export default SignUpPage;
