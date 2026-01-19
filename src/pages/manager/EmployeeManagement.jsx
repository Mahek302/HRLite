import React, { useState } from 'react';
import { Search, Filter, Plus, Mail, Phone, ChevronDown, MoreVertical } from 'lucide-react';

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const employees = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@company.com', 
      phone: '+1 234 567 8900', 
      department: 'Engineering', 
      role: 'Senior Developer',
      status: 'active',
      avatar: 'JD'
    },
    { 
      id: 2, 
      name: 'Sarah Smith', 
      email: 'sarah@company.com', 
      phone: '+1 234 567 8901', 
      department: 'Marketing', 
      role: 'Marketing Manager',
      status: 'active',
      avatar: 'SS'
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      email: 'mike@company.com', 
      phone: '+1 234 567 8902', 
      department: 'Sales', 
      role: 'Sales Executive',
      status: 'active',
      avatar: 'MJ'
    },
    { 
      id: 4, 
      name: 'Emily Chen', 
      email: 'emily@company.com', 
      phone: '+1 234 567 8903', 
      department: 'Engineering', 
      role: 'Frontend Developer',
      status: 'active',
      avatar: 'EC'
    },
    { 
      id: 5, 
      name: 'David Lee', 
      email: 'david@company.com', 
      phone: '+1 234 567 8904', 
      department: 'HR', 
      role: 'HR Manager',
      status: 'inactive',
      avatar: 'DL'
    },
  ];

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ color: '#1E293B' }}>Team Members</h1>
          <p className="text-slate-600" style={{ color: '#475569' }}>Manage your team members and their details</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <Plus size={18} />
          <span>Add Member</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="search"
              placeholder="Search by name, department, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <select className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>HR</option>
              </select>
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <select className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4" style={{ backgroundColor: '#FFFFFF' }}>
          <p className="text-sm text-slate-600">Total Members</p>
          <p className="text-2xl font-bold text-slate-800 mt-2">{employees.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4" style={{ backgroundColor: '#FFFFFF' }}>
          <p className="text-sm text-slate-600">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-2">{employees.filter(e => e.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4" style={{ backgroundColor: '#FFFFFF' }}>
          <p className="text-sm text-slate-600">Departments</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{[...new Set(employees.map(e => e.department))].length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4" style={{ backgroundColor: '#FFFFFF' }}>
          <p className="text-sm text-slate-600">Avg. Attendance</p>
          <p className="text-2xl font-bold text-purple-600 mt-2">92%</p>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50" style={{ backgroundColor: '#F8FAFC' }}>
                <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Employee</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Contact</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Department</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Role</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Status</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-slate-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                        <span className="font-semibold text-slate-700">{employee.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{employee.name}</p>
                        <p className="text-sm text-slate-600">ID: EMP{employee.id.toString().padStart(3, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-700">{employee.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-700">{employee.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-700">{employee.department}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-700">{employee.role}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      employee.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        Edit
                      </button>
                      <button className="p-1 hover:bg-slate-100 rounded">
                        <MoreVertical size={16} className="text-slate-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;