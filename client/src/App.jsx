import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Leads from './components/Leads';

const API_BASE_URL = 'http://localhost:5000';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('bda_crm_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch leads on load if logged in
  useEffect(() => {
    if (user) {
      fetchLeads();
    }
  }, [user]);

  const fetchLeads = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/leads`);
      setLeads(response.data);
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError('Unable to connect to the backend server. Please verify if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('bda_crm_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bda_crm_user');
  };

  const handleAddLead = async (leadData) => {
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/add-lead`, leadData);
      // Prepend newly added lead to avoid refetching or just reload
      setLeads((prevLeads) => [response.data, ...prevLeads]);
    } catch (err) {
      console.error('Error adding lead:', err);
      setError('Failed to add the lead. Please try again.');
    }
  };

  const handleDeleteLead = async (id) => {
    setError('');
    try {
      await axios.delete(`${API_BASE_URL}/delete-lead/${id}`);
      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
    } catch (err) {
      console.error('Error deleting lead:', err);
      setError('Failed to delete the lead. Please try again.');
    }
  };

  // If user is not logged in, render the login page
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        user={user}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-h-screen overflow-y-auto w-full">
        {/* Connection/Error Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-sm font-medium flex items-center justify-between shadow-xs">
            <span>⚠️ {error}</span>
            <button
              onClick={() => setError('')}
              className="text-rose-400 hover:text-rose-600 font-bold ml-4 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Loading Indicator overlay / banner */}
        {loading && (
          <div className="fixed top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-xs font-semibold z-50 animate-pulse">
            <span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
            Loading Database...
          </div>
        )}

        {/* Tab content router */}
        {activeTab === 'dashboard' ? (
          <Dashboard leads={leads} setActiveTab={setActiveTab} />
        ) : (
          <Leads
            leads={leads}
            onAddLead={handleAddLead}
            onDeleteLead={handleDeleteLead}
          />
        )}
      </main>
    </div>
  );
}

export default App;
