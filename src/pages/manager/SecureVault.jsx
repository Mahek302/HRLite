// src/pages/manager/SecureVault.jsx
import React, { useState } from 'react';
import { Search, Plus, FileText, Lock, Download, Eye, Trash2, Filter, Calendar, User } from 'lucide-react';

export default function SecureVault() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const documents = [
    {
      id: 1,
      name: 'Employee Handbook.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadedBy: 'John Doe',
      uploadedDate: '2025-01-15',
      category: 'Policy',
      access: 'All Employees'
    },
    {
      id: 2,
      name: 'NDA Template.docx',
      type: 'DOCX',
      size: '1.2 MB',
      uploadedBy: 'Sarah Smith',
      uploadedDate: '2025-01-12',
      category: 'Legal',
      access: 'Managers Only'
    },
    {
      id: 3,
      name: 'Salary Structure.xlsx',
      type: 'Excel',
      size: '3.1 MB',
      uploadedBy: 'David Lee',
      uploadedDate: '2025-01-10',
      category: 'Confidential',
      access: 'HR Only'
    },
    {
      id: 4,
      name: 'Company Policies.pdf',
      type: 'PDF',
      size: '4.5 MB',
      uploadedBy: 'Emily Chen',
      uploadedDate: '2025-01-08',
      category: 'Policy',
      access: 'All Employees'
    },
    {
      id: 5,
      name: 'Quarterly Report.pdf',
      type: 'PDF',
      size: '5.2 MB',
      uploadedBy: 'Mike Johnson',
      uploadedDate: '2025-01-05',
      category: 'Reports',
      access: 'Management'
    },
  ];

  const filteredDocs = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAccessColor = (access) => {
    switch(access) {
      case 'All Employees': return 'bg-green-100 text-green-800';
      case 'Managers Only': return 'bg-yellow-100 text-yellow-800';
      case 'HR Only': return 'bg-red-100 text-red-800';
      case 'Management': return 'bg-purple-100 text-purple-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const handleUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.doc,.docx,.xlsx,.txt';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`File "${file.name}" selected for upload`);
      }
    };
    fileInput.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Secure Document Vault</h1>
          <p className="text-slate-600">Store and manage confidential documents securely</p>
        </div>
        <button 
          onClick={handleUpload}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={18} />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="search"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <select className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg">
                <option>All Categories</option>
                <option>Policy</option>
                <option>Legal</option>
                <option>Reports</option>
                <option>Confidential</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Document</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Category</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Size</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Uploaded By</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Access Level</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredDocs.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{doc.name}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                          <Calendar size={12} />
                          <span>{doc.uploadedDate}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-700">{doc.category}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-700">{doc.size}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-slate-500" />
                      <span className="text-slate-700">{doc.uploadedBy}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded text-xs font-medium ${getAccessColor(doc.access)}`}>
                      {doc.access}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg" title="Preview">
                        <Eye size={16} className="text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg" title="Download">
                        <Download size={16} className="text-green-600" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg" title="Delete">
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg" title="Restrict Access">
                        <Lock size={16} className="text-purple-600" />
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
}