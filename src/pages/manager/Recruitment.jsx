import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Mail, Phone, MapPin, Briefcase, Calendar, FileText, CheckCircle, XCircle, Eye, User, ChevronDown, ExternalLink } from 'lucide-react';

export default function Recruitment() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedJob, setSelectedJob] = useState('all');
  const [expandedApplication, setExpandedApplication] = useState(null);
  
  // Load applications from localStorage (same as homepage)
  const [applications, setApplications] = useState([]);
  
  // Load job postings from homepage data
  const jobPostings = [
    { id: 1, title: 'Frontend Developer', department: 'Engineering' },
    { id: 2, title: 'HR Product Manager', department: 'Product' },
    { id: 3, title: 'UX/UI Designer', department: 'Design' },
    { id: 4, title: 'Backend Engineer', department: 'Engineering' },
    { id: 5, title: 'Customer Success Manager', department: 'Operations' },
    { id: 6, title: 'Sales Executive', department: 'Sales' },
  ];

  // Load applications from localStorage on component mount
  useEffect(() => {
    loadApplications();
    
    // Optional: Listen for storage events to update when new applications are submitted
    window.addEventListener('storage', loadApplications);
    
    return () => {
      window.removeEventListener('storage', loadApplications);
    };
  }, []);

  const loadApplications = () => {
    try {
      const saved = localStorage.getItem('litehr_applications');
      if (saved) {
        const parsed = JSON.parse(saved);
        setApplications(parsed);
      }
    } catch (error) {
      console.error('Error loading applications:', error);
      setApplications([]);
    }
  };

  // Filter applications based on search and filters
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    const matchesJob = selectedJob === 'all' || 
      (app.position && app.position.toLowerCase().includes(selectedJob.toLowerCase()));

    return matchesSearch && matchesStatus && matchesJob;
  });

  // Status management
  const getStatusColor = (status) => {
    switch(status) {
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-purple-100 text-purple-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'review': return 'Under Review';
      case 'shortlisted': return 'Shortlisted';
      case 'hired': return 'Hired';
      case 'rejected': return 'Rejected';
      case 'pending': return 'Pending';
      default: return 'New Application';
    }
  };

  // Update application status
  const updateApplicationStatus = (id, newStatus) => {
    const updatedApps = applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApps);
    localStorage.setItem('litehr_applications', JSON.stringify(updatedApps));
  };

  // Export applications
  const exportApplications = () => {
    const dataStr = JSON.stringify(applications, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `litehr_applications_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // View resume (simulated)
  const viewResume = (application) => {
    if (application.resume) {
      alert(`Resume: ${application.resumeName || 'Resume'}\n\nIn a real application, this would open the uploaded file.`);
    } else {
      alert('No resume uploaded');
    }
  };

  // Toggle expand details
  const toggleExpand = (id) => {
    setExpandedApplication(expandedApplication === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Recruitment Applications</h1>
          <p className="text-slate-600">
            Manage applications from careers page • {applications.length} total applications
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={exportApplications}
            className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            <Download size={18} />
            <span>Export JSON</span>
          </button>
          <button 
            onClick={loadApplications}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Total Applications</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{applications.length}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Pending Review</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">
                {applications.filter(a => !a.status || a.status === 'pending').length}
              </h3>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Eye className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Shortlisted</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">
                {applications.filter(a => a.status === 'shortlisted').length}
              </h3>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <User className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Hired</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">
                {applications.filter(a => a.status === 'hired').length}
              </h3>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="search"
              placeholder="Search by name, email, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending/New</option>
                <option value="review">Under Review</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="all">All Positions</option>
                {jobPostings.map(job => (
                  <option key={job.id} value={job.title}>{job.title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => (
              <div key={application.id} className="border border-slate-200 rounded-xl overflow-hidden">
                {/* Application Header */}
                <div className="bg-white p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <User className="text-blue-600" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-slate-800">{application.name || 'No Name'}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            {application.email && (
                              <span className="flex items-center gap-1 text-slate-600 text-sm">
                                <Mail size={14} />
                                {application.email}
                              </span>
                            )}
                            {application.phone && (
                              <span className="flex items-center gap-1 text-slate-600 text-sm">
                                <Phone size={14} />
                                {application.phone}
                              </span>
                            )}
                            {application.timestamp && (
                              <span className="flex items-center gap-1 text-slate-600 text-sm">
                                <Calendar size={14} />
                                {formatDate(application.timestamp)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-slate-500">Applied Position</div>
                          <div className="font-medium">{application.position || 'General Application'}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-500">Status</div>
                          <div className="font-medium">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status || 'pending')}`}>
                              {getStatusText(application.status || 'pending')}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-500">Contact</div>
                          <div className="font-medium">{application.phone || 'No phone provided'}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-3">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => toggleExpand(application.id)}
                          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          {expandedApplication === application.id ? 'Hide Details' : 'View Details'}
                        </button>
                        <button
                          onClick={() => viewResume(application)}
                          className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-lg"
                        >
                          Resume
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      onClick={() => updateApplicationStatus(application.id, 'review')}
                      className={`px-3 py-1 rounded-lg text-sm ${(application.status || 'pending') === 'review' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                    >
                      Mark Review
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(application.id, 'shortlisted')}
                      className={`px-3 py-1 rounded-lg text-sm ${(application.status || 'pending') === 'shortlisted' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}
                    >
                      Shortlist
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(application.id, 'hired')}
                      className={`px-3 py-1 rounded-lg text-sm ${(application.status || 'pending') === 'hired' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                    >
                      Hire
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(application.id, 'rejected')}
                      className={`px-3 py-1 rounded-lg text-sm ${(application.status || 'pending') === 'rejected' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                    >
                      Reject
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedApplication === application.id && (
                  <div className="border-t border-slate-200 bg-slate-50 p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left Column - Personal Info */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-2">Contact Information</h4>
                          <div className="space-y-2">
                            <div>
                              <div className="text-sm text-slate-500">Email</div>
                              <div className="font-medium">{application.email}</div>
                            </div>
                            {application.phone && (
                              <div>
                                <div className="text-sm text-slate-500">Phone</div>
                                <div className="font-medium">{application.phone}</div>
                              </div>
                            )}
                            {application.linkedin && (
                              <div>
                                <div className="text-sm text-slate-500">LinkedIn</div>
                                <a 
                                  href={application.linkedin} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  {application.linkedin}
                                  <ExternalLink size={12} />
                                </a>
                              </div>
                            )}
                            {application.github && (
                              <div>
                                <div className="text-sm text-slate-500">GitHub</div>
                                <a 
                                  href={application.github} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  {application.github}
                                  <ExternalLink size={12} />
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-2">Application Details</h4>
                          <div className="space-y-2">
                            <div>
                              <div className="text-sm text-slate-500">Applied On</div>
                              <div className="font-medium">{formatDate(application.timestamp)}</div>
                            </div>
                            {application.appliedDate && (
                              <div>
                                <div className="text-sm text-slate-500">Submitted Date</div>
                                <div className="font-medium">{application.appliedDate}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Middle Column - Cover Letter */}
                      <div className="lg:col-span-2">
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-2">Cover Letter</h4>
                          <div className="bg-white p-4 rounded-lg border border-slate-200 max-h-60 overflow-y-auto">
                            <p className="text-slate-700 whitespace-pre-wrap">
                              {application.coverLetter || 'No cover letter provided'}
                            </p>
                          </div>
                        </div>
                        
                        {/* Resume Info */}
                        <div className="mt-4">
                          <h4 className="font-semibold text-slate-800 mb-2">Resume Information</h4>
                          <div className="bg-white p-4 rounded-lg border border-slate-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <FileText size={20} className="text-blue-600" />
                                <div>
                                  <div className="font-medium text-slate-800">
                                    {application.resumeName || 'Resume file'}
                                  </div>
                                  <div className="text-sm text-slate-500">
                                    {application.resume ? 'File uploaded successfully' : 'No resume uploaded'}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => viewResume(application)}
                                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={40} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {applications.length === 0 ? 'No applications yet' : 'No matching applications'}
              </h3>
              <p className="text-slate-600">
                {applications.length === 0 
                  ? 'Applications submitted through the careers page will appear here.'
                  : 'Try adjusting your search criteria'}
              </p>
              {applications.length === 0 && (
                <div className="mt-4 text-sm text-slate-500">
                  <p>Submit applications from the homepage careers section to see them here.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}