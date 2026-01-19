import React, { useState } from 'react';
import { Search, Plus, Shield, Users, Edit, Trash2, Filter, CheckCircle } from 'lucide-react';

export default function Roles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roles, setRoles] = useState([
    { 
      id: 1, 
      name: 'Administrator', 
      users: 2, 
      permissions: ['All Access'], 
      description: 'Full system access',
      level: 'high'
    },
    { 
      id: 2, 
      name: 'Manager', 
      users: 5, 
      permissions: ['View Reports', 'Approve Leaves', 'Manage Team'], 
      description: 'Department management',
      level: 'medium'
    },
    { 
      id: 3, 
      name: 'Employee', 
      users: 45, 
      permissions: ['View Own Data', 'Request Leaves'], 
      description: 'Basic employee access',
      level: 'low'
    },
    { 
      id: 4, 
      name: 'HR Manager', 
      users: 3, 
      permissions: ['Manage Employees', 'View All Data', 'Generate Reports'], 
      description: 'HR management access',
      level: 'high'
    },
  ]);

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLevelColor = (level) => {
    switch(level) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Roles & Permissions</h1>
          <p className="text-slate-600">Manage system roles and access permissions</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <Plus size={18} />
          <span>Add Role</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="search"
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <select className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg">
                <option>All Levels</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRoles.map(role => (
            <div key={role.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Shield className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{role.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(role.level)}`}>
                        {role.level.toUpperCase()} Level
                      </span>
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Users size={14} />
                        <span>{role.users} users</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg">
                    <Edit size={16} className="text-blue-600" />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg">
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
              
              <p className="text-slate-600 mb-4">{role.description}</p>
              
              <div className="space-y-2">
                <h4 className="font-medium text-slate-700">Permissions:</h4>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((perm, idx) => (
                    <span key={idx} className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                      <CheckCircle size={12} />
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}