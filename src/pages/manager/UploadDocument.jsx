// src/pages/manager/UploadDocument.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Upload,
  FileText,
  Folder,
  Lock,
  Eye,
  Users,
  Calendar,
  Tag,
  X,
  CheckCircle,
  AlertCircle,
  Download,
  Shield,
  Clock
} from 'lucide-react';

const UploadDocument = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [documentData, setDocumentData] = useState({
    title: '',
    description: '',
    category: '',
    department: 'all',
    accessLevel: 'restricted',
    tags: [],
    expiryDate: '',
    reminderDate: ''
  });
  const [newTag, setNewTag] = useState('');
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    'Employee Records',
    'HR Policies',
    'Financial Documents',
    'Legal Agreements',
    'Training Materials',
    'Meeting Minutes',
    'Reports',
    'Certifications',
    'Other'
  ];

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' }
  ];

  const accessLevels = [
    { value: 'public', label: 'Public', icon: <Eye size={14} />, description: 'Visible to all employees' },
    { value: 'department', label: 'Department', icon: <Users size={14} />, description: 'Visible to department members' },
    { value: 'restricted', label: 'Restricted', icon: <Lock size={14} />, description: 'Selected employees only' },
    { value: 'confidential', label: 'Confidential', icon: <Shield size={14} />, description: 'Managers only' }
  ];

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = selectedFiles.map(file => ({
      file,
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type.split('/')[1] || 'file',
      progress: 0,
      status: 'pending'
    }));
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDocumentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !documentData.tags.includes(newTag.trim())) {
      setDocumentData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setDocumentData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const simulateUpload = () => {
    if (files.length === 0) {
      alert('Please select at least one file to upload');
      return;
    }

    if (!documentData.title || !documentData.category) {
      alert('Please fill in all required fields');
      return;
    }

    setIsUploading(true);
    let completed = 0;
    
    files.forEach((file, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          completed++;
          
          setFiles(prev => prev.map((f, i) => 
            i === index ? { ...f, progress: 100, status: 'completed' } : f
          ));
          
          if (completed === files.length) {
            setIsUploading(false);
            setTimeout(() => {
              alert('Documents uploaded successfully!');
              navigate('/manager/documents');
            }, 1000);
          }
        } else {
          setFiles(prev => prev.map((f, i) => 
            i === index ? { ...f, progress: Math.min(progress, 100) } : f
          ));
        }
      }, 200);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="text-red-500" size={20} />;
      case 'doc':
      case 'docx':
        return <FileText className="text-blue-500" size={20} />;
      case 'xls':
      case 'xlsx':
        return <FileText className="text-green-500" size={20} />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileText className="text-purple-500" size={20} />;
      default:
        return <FileText className="text-slate-500" size={20} />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => navigate('/manager/documents')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Upload Document</h1>
            <p className="text-slate-600">Upload and manage documents in secure vault</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Details Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-blue-100">
                <FileText size={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Document Details</h2>
                <p className="text-sm text-slate-600">Enter document information</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Document Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={documentData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter document title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={documentData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the document content"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Folder size={14} className="inline mr-1" />
                    Category *
                  </label>
                  <select
                    name="category"
                    value={documentData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Users size={14} className="inline mr-1" />
                    Department Access
                  </label>
                  <select
                    name="department"
                    value={documentData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {departments.map(dept => (
                      <option key={dept.value} value={dept.value}>{dept.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Access Level
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {accessLevels.map(level => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setDocumentData(prev => ({ ...prev, accessLevel: level.value }))}
                      className={`p-3 border rounded-lg text-left transition-all ${
                        documentData.accessLevel === level.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1 rounded ${
                          documentData.accessLevel === level.value ? 'bg-blue-100' : 'bg-slate-100'
                        }`}>
                          {level.icon}
                        </div>
                        <span className={`font-medium ${
                          documentData.accessLevel === level.value ? 'text-blue-700' : 'text-slate-700'
                        }`}>
                          {level.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{level.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Calendar size={14} className="inline mr-1" />
                    Expiry Date (Optional)
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={documentData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Clock size={14} className="inline mr-1" />
                    Reminder Date (Optional)
                  </label>
                  <input
                    type="date"
                    name="reminderDate"
                    value={documentData.reminderDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Tag size={14} className="inline mr-1" />
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add tag and press Enter"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                
                {documentData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {documentData.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-600"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-purple-100">
                <Upload size={24} className="text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Upload Files</h2>
                <p className="text-sm text-slate-600">Select files to upload</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  disabled={isUploading}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <Upload size={48} className="text-slate-400 mb-4" />
                    <p className="text-slate-600 mb-2">
                      {isUploading ? 'Upload in progress...' : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-slate-500">
                      PDF, DOC, XLS, JPG, PNG (Max 50MB each)
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {files.length > 0 && (
              <div>
                <h3 className="font-medium text-slate-800 mb-3">
                  Selected Files ({files.length})
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {files.map(file => (
                    <div key={file.id} className="p-3 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {getFileIcon(file.type)}
                          <div>
                            <p className="text-sm font-medium text-slate-800 truncate max-w-[180px]">
                              {file.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        
                        {!isUploading && (
                          <button
                            onClick={() => removeFile(file.id)}
                            className="p-1 hover:bg-red-50 rounded"
                          >
                            <X size={16} className="text-red-500" />
                          </button>
                        )}
                      </div>

                      {file.status === 'uploading' && (
                        <div className="mt-2">
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 text-right">
                            {Math.round(file.progress)}%
                          </p>
                        </div>
                      )}

                      {file.status === 'completed' && (
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-green-600 flex items-center gap-1">
                            <CheckCircle size={12} />
                            Uploaded
                          </span>
                          <span className="text-xs text-slate-500">
                            {formatFileSize(file.size)}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Upload Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Upload Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Total Files:</span>
                <span className="font-medium text-slate-800">{files.length}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Total Size:</span>
                <span className="font-medium text-slate-800">
                  {formatFileSize(files.reduce((sum, file) => sum + file.size, 0))}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Access Level:</span>
                <span className="font-medium text-slate-800">
                  {accessLevels.find(l => l.value === documentData.accessLevel)?.label}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Department:</span>
                <span className="font-medium text-slate-800">
                  {departments.find(d => d.value === documentData.department)?.label}
                </span>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-700">
                  Documents will be encrypted and stored securely. Ensure you have proper authorization to upload these files.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={simulateUpload}
                disabled={isUploading || files.length === 0}
                className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  isUploading || files.length === 0
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    <span>Upload Documents</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => navigate('/manager/documents')}
                className="w-full py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;