import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Layout, LogOut } from 'lucide-react';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
        <Layout size={24} />
        <span>TaskManager</span>
      </Link>
      <div className="space-x-4">
        {token ? (
          <button onClick={handleLogout} className="flex items-center text-gray-600 hover:text-red-500 transition cursor-pointer">
            <LogOut size={18} className="mr-1" /> Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-blue-600 cursor-pointer">Login</Link>
            <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;