import React from 'react';
import { User, Lock } from 'lucide-react';
import {Link} from 'react-router-dom';
import { motion } from 'framer-motion';


const LoginPage = () => {
  return (
    <motion.div
      className="w-full min-h-screen flex items-center justify-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeIn' }}
    >
{/*-------------bg img-----------*/}
        <form className='bg-white/80  shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md'>
        <h2 className="text-2xl font-bold mb-6 text-center text-black-700">House Booking</h2>
            
            <div className='mb-4'>
                <label className='block text-black-700 text-sm font-bold mb-2' htmlFor='username'>
                    Username
                </label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black-400" />
                    <input
                        className='shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline'
                        id="username"
                        type="text"
                        placeholder="Username"
                    />
                </div>
            </div>


            <div className='mb-6'>
                <label className='block text-black-700 text-sm font-bold mb-2' htmlFor='password'>
                    Password
                </label>
                <div className='relative'>
                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black-400'/>
                    <input 
                        className='shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline'
                        id="password"
                        type="password"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            
            <div className='flex items-center justify-between mb-6'>
                <button 
                    className='bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    type="submit"
                >
                    Sign In
                </button>
                <a 
                    className='inline-block align-baseline text-sm  text-teal-800 font-semibold hover:underline'
                    href="#"
                >
                    Forgot password?
                </a>
            </div>

            <div className='text-center'>
                <span className='text-sm'>Don't have an account? </span>
                <Link 
                    to="/SignUp"
                    className='font-bold text-sm text-teal-800 hover:underline'
                >
                    Sign Up
                </Link>
            </div>
        </form>
   
    </motion.div>
  )
}

export default LoginPage;