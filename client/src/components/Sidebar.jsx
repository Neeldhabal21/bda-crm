import React, { useState } from 'react';

const Sidebar = ({ activeTab, setActiveTab, onLogout, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'leads', label: 'Leads Management', icon: '👤' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsOpen(false); // Close mobile drawer
  };

  return (
    <>
      {/* Mobile Top Navbar */}
      <header className="md:hidden flex items-center justify-between bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-30 w-full shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">
            C
          </div>
          <span className="font-bold text-slate-800">BDA CRM</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-600 focus:outline-none p-2 rounded-lg hover:bg-slate-50 transition-colors"
        >
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </header>

      {/* Sidebar - Desktop and Mobile drawer */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 bg-white border-r border-slate-150 w-64 p-6 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 md:static md:h-screen ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-8">
          {/* Logo Section */}
          <div className="hidden md:flex items-center gap-3">
            <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-md shadow-indigo-100">
              C
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-lg leading-tight">BDA CRM</h1>
              <p className="text-xs text-slate-400">Internship Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">
              Main Menu
            </div>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* User profile & Logout */}
        <div className="border-t border-slate-100 pt-6 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="h-9 w-9 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600 text-sm">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="text-xs text-slate-400 font-medium">Logged in as</p>
              <p className="text-sm font-semibold text-slate-700 truncate" title={user?.email}>
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 cursor-pointer transition-all"
          >
            <span>🚪</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/25 backdrop-blur-xs md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
