// src/pages/manager/AddDepartment.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Building,
  Users,
  DollarSign,
  Target,
  BarChart3,
  CheckCircle,
  Plus,
  X,
  UserPlus,
  Calendar,
  Briefcase
} from 'lucide-react';

const AddDepartment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    manager: '',
    budget: '',
    location: '',
    phone: '',
    email: '',
    goals: [''],
    teamMembers: []
  });

  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGoalChange = (index, value) => {
    const newGoals = [...formData.goals];
    newGoals[index] = value;
    setFormData(prev => ({
      ...prev,
      goals: newGoals
    }));
  };

  const addGoal = () => {
    setFormData(prev => ({
      ...prev,
      goals: [...prev.goals, '']
    }));
  };

  const removeGoal = (index) => {
    const newGoals = formData.goals.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      goals: newGoals
    }));
  };

  const addTeamMember = () => {
    if (newMember.name && newMember.role) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, { ...newMember, id: Date.now() }]
      }));
      setNewMember({ name: '', role: '', email: '' });
    }
  };

  const removeTeamMember = (id) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(member => member.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Department data:', formData);
    alert('Department created successfully!');
    navigate('/manager/departments');
  };

  const existingManagers = [
    'Sarah Johnson',
    'Michael Chen',
    'Emily Davis',
    'Robert Wilson',
    'Lisa Brown'
  ];

  const locations = ['New York HQ', 'San Francisco', 'London', 'Singapore', 'Remote'];

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => navigate('/manager/departments')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Create New Department</h1>
            <p className="text-slate-600">Set up a new department in the organization</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-blue-100">
              <Building size={24} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Basic Information</h2>
              <p className="text-sm text-slate-600">Department details and identification</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Department Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Engineering"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Department Code *
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ENG"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Users size={14} className="inline mr-1" />
                Department Manager *
              </label>
              <select
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Manager</option>
                {existingManagers.map(manager => (
                  <option key={manager} value={manager}>{manager}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <DollarSign size={14} className="inline mr-1" />
                Annual Budget
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="500000"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Location
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Location</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the department's purpose and responsibilities..."
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-green-100">
              <Target size={24} className="text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Goals & Objectives</h2>
              <p className="text-sm text-slate-600">Set departmental goals and KPIs</p>
            </div>
          </div>

          <div className="space-y-4">
            {formData.goals.map((goal, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => handleGoalChange(index, e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter department goal..."
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeGoal(index)}
                  className="p-2 hover:bg-red-50 rounded-lg"
                  disabled={formData.goals.length === 1}
                >
                  <X size={16} className="text-red-500" />
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addGoal}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              <Plus size={16} />
              <span>Add Another Goal</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-purple-100">
              <UserPlus size={24} className="text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Initial Team Members</h2>
              <p className="text-sm text-slate-600">Add key team members to the department</p>
            </div>
          </div>

          <div className="mb-6 p-4 border border-slate-200 rounded-lg">
            <h3 className="font-medium text-slate-800 mb-3">Add Team Member</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={newMember.name}
                  onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Role"
                  value={newMember.role}
                  onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={newMember.email}
                  onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={addTeamMember}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add to Team
            </button>
          </div>

          {formData.teamMembers.length > 0 && (
            <div>
              <h3 className="font-medium text-slate-800 mb-3">Team Members ({formData.teamMembers.length})</h3>
              <div className="space-y-2">
                {formData.teamMembers.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{member.name}</p>
                        <p className="text-sm text-slate-600">{member.role}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTeamMember(member.id)}
                      className="p-1 hover:bg-red-50 rounded"
                    >
                      <X size={16} className="text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-amber-100">
              <BarChart3 size={24} className="text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Contact Information</h2>
              <p className="text-sm text-slate-600">Department contact details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Department Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+1 234 567 8900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Department Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="engineering@company.com"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/manager/departments')}
            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <CheckCircle size={18} />
            Create Department
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDepartment;