import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/signup', formData);
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed. Try again.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        {error && <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</p>}
        <div className="space-y-4">
          <input type="text" placeholder="Full Name" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={e => setFormData({...formData, name: e.target.value})} />
          <input type="email" placeholder="Email Address" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Password (min 6 chars)" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={e => setFormData({...formData, password: e.target.value})} />
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer">Register</button>
        </div>
        <p className="mt-4 text-center text-gray-600">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;