import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Trash2, Plus, LogOut, User as UserIcon } from 'lucide-react';

const Dashboard = () => {
  const { token, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  // 1. Fetch User Profile 
  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/me', {
        headers: { 'x-auth-token': token }
      });
      setProfile(res.data);
    } catch (err) {
      console.error("Profile Error:", err.response?.data);
    }
  };

  // 2. Fetch Tasks 
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/tasks?search=${search}`, {
        headers: { 'x-auth-token': token }
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Tasks Error:", err.response?.data);
    }
  };

  // Run on load and when search changes
  useEffect(() => {
    if (token) {
      fetchProfile();
      fetchTasks();
    }
  }, [token, search]);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/tasks', newTask, {
        headers: { 'x-auth-token': token }
      });
      setNewTask({ title: '', description: '' });
      fetchTasks();
    } catch (err) { alert("Failed to add task"); }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/tasks/${id}`, {
        headers: { 'x-auth-token': token }
      });
      fetchTasks();
    } catch (err) { alert("Delete failed"); }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* HEADER SECTION: Showing the Profile */}
      <nav className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-2 rounded-full text-blue-600 cursor-pointer">
            <UserIcon size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {profile ? profile.name : "Loading profile..."}
            </h1>
            <p className="text-sm text-gray-500">{profile?.email}</p>
          </div>
        </div>
        <button onClick={logout} className="flex items-center text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg cursor-pointer">
          <LogOut size={20} className="mr-2" /> Logout
        </button>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ADD TASK SECTION */}
        <div className="bg-white p-6 rounded-xl shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">New Task</h2>
          <form onSubmit={addTask} className="space-y-4">
            <input 
              type="text" placeholder="Title" required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})}
            />
            <textarea 
              placeholder="Description" required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})}
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex justify-center items-center cursor-pointer">
              <Plus size={18} className="mr-1" /> Add Task
            </button>
          </form>
        </div>

        {/* TASK LIST SECTION */}
        <div className="md:col-span-2">
          <input 
            type="text" placeholder="Search tasks..."
            className="w-full p-3 mb-6 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="grid gap-4">
            {tasks.length > 0 ? tasks.map(task => (
              <div key={task._id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500 flex justify-between items-center hover:shadow-md transition">
                <div>
                  <h3 className="font-bold text-gray-800">{task.title}</h3>
                  <p className="text-gray-600 text-sm">{task.description}</p>
                </div>
                <button onClick={() => deleteTask(task._id)} className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 cursor-pointer">
                  <Trash2 size={20} />
                </button>
              </div>
            )) : <p className="text-center text-gray-500 py-10">No tasks found. Add your First Task!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;