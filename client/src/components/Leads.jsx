import React, { useState } from 'react';

const Leads = ({ leads, onAddLead, onDeleteLead }) => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('New');
  const [error, setError] = useState('');

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Call app prop
    onAddLead({ name, email, phone, status });

    // Reset Form
    setName('');
    setEmail('');
    setPhone('');
    setStatus('New');
    setShowModal(false);
  };

  // Filter Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search);
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Status Badge Helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Contacted':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Converted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Leads Database</h2>
          <p className="text-slate-500 text-sm mt-1">Manage and track your business prospects.</p>
        </div>
        <button
          onClick={() => {
            setError('');
            setShowModal(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
        >
          <span>➕</span> Add New Lead
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search leads by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:inline">
            Filter Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-40 px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            <option value="All">All Leads</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Converted">Converted</option>
          </select>
        </div>
      </div>

      {/* Leads Table Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        {filteredLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-bold text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone Number</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date Added</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/55 transition-all">
                    <td className="px-6 py-4 font-semibold text-slate-800">{lead.name}</td>
                    <td className="px-6 py-4">{lead.email}</td>
                    <td className="px-6 py-4">{lead.phone}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {new Date(lead.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete lead: ${lead.name}?`)) {
                            onDeleteLead(lead.id);
                          }
                        }}
                        className="text-rose-500 hover:text-rose-700 font-semibold p-1 hover:bg-rose-50 rounded transition-all cursor-pointer"
                        title="Delete Lead"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400">
            <p className="text-sm">No leads match the current filters or search term.</p>
          </div>
        )}
      </div>

      {/* Add Lead Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setShowModal(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />

          {/* Modal Container */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 overflow-hidden z-10 border border-slate-100 animate-slide-up">
            <div className="flex items-center justify-between pb-4 border-b border-slate-150 mb-4">
              <h3 className="text-lg font-bold text-slate-800">Add New Lead</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl focus:outline-none cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-lg text-xs font-semibold">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 99999 88888"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                  Lead Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-white"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Converted">Converted</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg font-semibold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-xs shadow-md shadow-indigo-100 hover:shadow-lg transition-colors cursor-pointer"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
