// src/pages/manager/AddRole.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Shield,
  CheckSquare,
  Square,
  Plus,
  X,
  Users,
  Briefcase,
  Calendar,
  FileText,
  Building,
  CheckCircle,
  Eye,
  Edit2
} from 'lucide-react';

const AddRole = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    department: '',
    level: '',
    baseSalary: '',
    permissions: {
      dashboard: true,
      employees: false,
      departments: false,
      attendance: false,
      leaves: false,
      recruitment: false,
      documents: false,
      analytics: false,
      settings: false
    }
  });

  const departments = ['All Departments', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
  const levels = ['Entry Level', 'Mid Level', 'Senior', 'Manager', 'Director', 'Executive'];

  const permissionsList = [
    { id: 'dashboard', label: 'Dashboard Access', description: 'View dashboard and analytics' },
    { id: 'employees', label: 'Employee Management', description: 'View, add, edit employees' },
    { id: 'departments', label: 'Department Access', description: 'View department details' },
    { id: 'attendance', label: 'Attendance Management', description: 'View and manage attendance' },
    { id: 'leaves', label: 'Leave Management', description: 'Approve/reject leave requests' },
    { id: 'recruitment', label: 'Recruitment', description: 'View job applications' },
    { id: 'documents', label: 'Document Access', description: 'View and upload documents' },
    { id: 'analytics', label: 'Analytics', description: 'Access detailed analytics' },
    { id: 'settings', label: 'Settings', description: 'Modify system settings' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePermission = (permissionId) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permissionId]: !prev.permissions[permissionId]
      }
    }));
  };

  const toggleAllPermissions = (checked) => {
    const newPermissions = {};
    Object.keys(formData.permissions).forEach(key => {
      newPermissions[key] = checked;
    });
    setFormData(prev => ({
      ...prev,
      permissions: newPermissions
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Role data:', formData);
    alert('Role created successfully!');
    navigate('/manager/roles');
  };

  const selectedCount = Object.values(formData.permissions).filter(Boolean).length;
  const totalCount = Object.keys(formData.permissions).length;

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => navigate('/manager/roles')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Create New Role</h1>
            <p className="text-slate-600">Define role permissions and access levels</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-blue-100">
              <Shield size={24} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Role Information</h2>
              <p className="text-sm text-slate-600">Basic details about the role</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Role Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="HR Manager"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Building size={14} className="inline mr-1" />
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Briefcase size={14} className="inline mr-1" />
                Level *
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Level</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Base Salary (Annual)
              </label>
              <input
                type="number"
                name="baseSalary"
                value={formData.baseSalary}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="75000"
                min="0"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Role Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the role's responsibilities and expectations..."
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-green-100">
                <CheckSquare size={24} className="text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Permissions</h2>
                <p className="text-sm text-slate-600">
                  Select permissions for this role ({selectedCount}/{totalCount} selected)
                </p>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => toggleAllPermissions(selectedCount !== totalCount)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              {selectedCount === totalCount ? (
                <>
                  <CheckSquare size={16} className="text-green-600" />
                  <span>Deselect All</span>
                </>
              ) : (
                <>
                  <Square size={16} className="text-slate-400" />
                  <span>Select All</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {permissionsList.map(permission => (
              <div
                key={permission.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.permissions[permission.id]
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => togglePermission(permission.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${
                    formData.permissions[permission.id] ? 'text-green-700' : 'text-slate-700'
                  }`}>
                    {permission.label}
                  </span>
                  {formData.permissions[permission.id] ? (
                    <CheckSquare size={18} className="text-green-600" />
                  ) : (
                    <Square size={18} className="text-slate-400" />
                  )}
                </div>
                <p className={`text-sm ${
                  formData.permissions[permission.id] ? 'text-green-600' : 'text-slate-500'
                }`}>
                  {permission.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Role Preview</h2>
          
          <div className="p-6 border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{formData.name || 'New Role'}</h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {formData.level || 'Not set'}
                  </span>
                  {formData.department && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {formData.department}
                    </span>
                  )}
                </div>
              </div>
              
              {formData.baseSalary && (
                <div className="text-right">
                  <p className="text-sm text-slate-600">Base Salary</p>
                  <p className="text-2xl font-bold text-slate-800">${parseInt(formData.baseSalary).toLocaleString()}</p>
                </div>
              )}
            </div>
            
            {formData.description && (
              <div className="mb-6">
                <h4 className="font-medium text-slate-700 mb-2">Description</h4>
                <p className="text-slate-600">{formData.description}</p>
              </div>
            )}
            
            <div>
              <h4 className="font-medium text-slate-700 mb-3">Access Permissions</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(formData.permissions)
                  .filter(([_, hasAccess]) => hasAccess)
                  .map(([key, _]) => (
                    <span key={key} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                  ))}
                
                {selectedCount === 0 && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-500 text-sm rounded-full">
                    No permissions selected
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/manager/roles')}
            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <CheckCircle size={18} />
            Create Role
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRole;