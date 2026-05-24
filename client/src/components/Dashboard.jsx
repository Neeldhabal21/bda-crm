import React from 'react';

const Dashboard = ({ leads, setActiveTab }) => {
  // Metric calculations
  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === 'New').length;
  const contactedLeads = leads.filter((lead) => lead.status === 'Contacted').length;
  const convertedLeads = leads.filter((lead) => lead.status === 'Converted').length;

  const newPct = totalLeads ? Math.round((newLeads / totalLeads) * 100) : 0;
  const contactedPct = totalLeads ? Math.round((contactedLeads / totalLeads) * 100) : 0;
  const convertedPct = totalLeads ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  // Get 3 most recent leads
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

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
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Welcome Back, Associate</h2>
        <p className="text-slate-500 text-sm mt-1">Here is a summary of your lead pipelines today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Leads Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm font-semibold text-slate-400">Total Leads</span>
            <h3 className="text-3xl font-bold text-slate-800">{totalLeads}</h3>
          </div>
          <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 text-2xl font-semibold">
            👥
          </div>
        </div>

        {/* New Leads Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm font-semibold text-slate-400">New Leads</span>
            <h3 className="text-3xl font-bold text-slate-800">{newLeads}</h3>
          </div>
          <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-2xl font-semibold">
            ✨
          </div>
        </div>

        {/* Contacted Leads Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm font-semibold text-slate-400">Contacted</span>
            <h3 className="text-3xl font-bold text-slate-800">{contactedLeads}</h3>
          </div>
          <div className="h-12 w-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 text-2xl font-semibold">
            📞
          </div>
        </div>

        {/* Converted Leads Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm font-semibold text-slate-400">Converted</span>
            <h3 className="text-3xl font-bold text-slate-800">{convertedLeads}</h3>
          </div>
          <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 text-2xl font-semibold">
            🏆
          </div>
        </div>
      </div>

      {/* Progress & Quick Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Pipeline Distribution</h3>
        <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden flex">
          <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${newPct}%` }} title={`New: ${newPct}%`} />
          <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${contactedPct}%` }} title={`Contacted: ${contactedPct}%`} />
          <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${convertedPct}%` }} title={`Converted: ${convertedPct}%`} />
        </div>
        <div className="flex flex-wrap gap-6 mt-4 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 bg-blue-500 rounded-full" />
            <span>New: {newPct}% ({newLeads})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 bg-amber-500 rounded-full" />
            <span>Contacted: {contactedPct}% ({contactedLeads})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 bg-emerald-500 rounded-full" />
            <span>Converted: {convertedPct}% ({convertedLeads})</span>
          </div>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Recent Leads Activity</h3>
          <button
            onClick={() => setActiveTab('leads')}
            className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-colors cursor-pointer"
          >
            View All Leads →
          </button>
        </div>

        {recentLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-bold text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Added On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/55 transition-all">
                    <td className="px-6 py-4 font-semibold text-slate-800">{lead.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span>{lead.email}</span>
                        <span className="text-xs text-slate-400">{lead.phone}</span>
                      </div>
                    </td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400">
            <p className="text-sm">No recent leads found. Click "View All Leads" to add your first lead!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
