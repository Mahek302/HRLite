import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Calendar, Filter, Eye, Download, Clock, Mail, User, FileText, ChevronDown, Search, Plus, Trash2, Edit, Send, Bell, BarChart3 } from 'lucide-react';

const LeaveApproval = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  
  const [leaveRequests, setLeaveRequests] = useState([
    { 
      id: 1, 
      employee: { name: 'John Doe', department: 'Engineering', avatar: 'JD', email: 'john@company.com', phone: '+1234567890' }, 
      type: 'Casual Leave', 
      dates: '15-12-2024 to 16-12-2024', 
      days: 2, 
      status: 'pending', 
      reason: 'Family wedding ceremony', 
      appliedOn: '10-12-2024',
      leaveBalance: { casual: 8, sick: 10, earned: 15 }
    },
    { 
      id: 2, 
      employee: { name: 'Sarah Smith', department: 'Marketing', avatar: 'SS', email: 'sarah@company.com', phone: '+1234567891' }, 
      type: 'Sick Leave', 
      dates: '12-12-2024', 
      days: 1, 
      status: 'pending', 
      reason: 'Doctor appointment for medical checkup', 
      appliedOn: '11-12-2024',
      leaveBalance: { casual: 5, sick: 8, earned: 12 }
    },
    { 
      id: 3, 
      employee: { name: 'Mike Johnson', department: 'Sales', avatar: 'MJ', email: 'mike@company.com', phone: '+1234567892' }, 
      type: 'Earned Leave', 
      dates: '18-12-2024 to 22-12-2024', 
      days: 5, 
      status: 'pending', 
      reason: 'Year-end vacation with family', 
      appliedOn: '01-12-2024',
      leaveBalance: { casual: 10, sick: 12, earned: 20 }
    },
    { 
      id: 4, 
      employee: { name: 'Emily Chen', department: 'Engineering', avatar: 'EC', email: 'emily@company.com', phone: '+1234567893' }, 
      type: 'Casual Leave', 
      dates: '20-12-2024', 
      days: 1, 
      status: 'approved', 
      reason: 'Personal work at government office', 
      appliedOn: '12-12-2024',
      approvedOn: '13-12-2024',
      approvedBy: 'Alex Morgan'
    },
    { 
      id: 5, 
      employee: { name: 'David Lee', department: 'HR', avatar: 'DL', email: 'david@company.com', phone: '+1234567894' }, 
      type: 'Sick Leave', 
      dates: '14-12-2024', 
      days: 1, 
      status: 'rejected', 
      reason: 'Not feeling well', 
      appliedOn: '13-12-2024',
      rejectedOn: '13-12-2024',
      rejectedBy: 'Alex Morgan',
      rejectionReason: 'Medical certificate not provided'
    },
  ]);

  const filters = [
    { value: 'all', label: 'All Requests', count: leaveRequests.length },
    { value: 'pending', label: 'Pending', count: leaveRequests.filter(r => r.status === 'pending').length },
    { value: 'approved', label: 'Approved', count: leaveRequests.filter(r => r.status === 'approved').length },
    { value: 'rejected', label: 'Rejected', count: leaveRequests.filter(r => r.status === 'rejected').length },
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'Sick Leave': return 'bg-yellow-100 text-yellow-800 border border-yellow-500';
      case 'Casual Leave': return 'bg-blue-100 text-blue-800 border border-blue-500';
      case 'Earned Leave': return 'bg-green-100 text-green-800 border border-green-500';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const filteredRequests = leaveRequests.filter(request => {
    if (filter !== 'all' && request.status !== filter) return false;
    if (searchTerm && !request.employee.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleApprove = (id) => {
    const request = leaveRequests.find(r => r.id === id);
    const confirmed = window.confirm(`Approve ${request.employee.name}'s ${request.type} request?`);
    if (confirmed) {
      setLeaveRequests(prev => prev.map(req => 
        req.id === id ? { 
          ...req, 
          status: 'approved', 
          approvedOn: new Date().toLocaleDateString('en-GB'),
          approvedBy: 'Alex Morgan'
        } : req
      ));
      alert(`Leave request for ${request.employee.name} approved successfully!`);
      setSelectedRequest(null);
    }
  };

  const handleReject = (id) => {
    const request = leaveRequests.find(r => r.id === id);
    const reason = prompt(`Enter reason for rejecting ${request.employee.name}'s leave request:`);
    if (reason) {
      setLeaveRequests(prev => prev.map(req => 
        req.id === id ? { 
          ...req, 
          status: 'rejected', 
          rejectedOn: new Date().toLocaleDateString('en-GB'),
          rejectedBy: 'Alex Morgan',
          rejectionReason: reason
        } : req
      ));
      alert(`Leave request for ${request.employee.name} rejected.`);
      setSelectedRequest(null);
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleExportData = (format = 'csv') => {
    let dataStr, fileName, mimeType;
    
    if (format === 'csv') {
      const headers = ['Employee', 'Department', 'Type', 'Dates', 'Days', 'Status', 'Reason', 'Applied On'];
      const rows = filteredRequests.map(req => 
        [req.employee.name, req.employee.department, req.type, req.dates, req.days, req.status, req.reason, req.appliedOn].join(',')
      );
      dataStr = [headers.join(','), ...rows].join('\n');
      fileName = `leave-requests-${filter}-${new Date().getTime()}.csv`;
      mimeType = 'text/csv';
    } else if (format === 'json') {
      const exportData = {
        filter,
        total: filteredRequests.length,
        requests: filteredRequests
      };
      dataStr = JSON.stringify(exportData, null, 2);
      fileName = `leave-requests-${filter}-${new Date().getTime()}.json`;
      mimeType = 'application/json';
    }
    
    const dataBlob = new Blob([dataStr], { type: mimeType });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    
    setShowExportOptions(false);
    alert(`Leave requests exported as ${format.toUpperCase()}!`);
  };

  const handleSendEmail = (email, subject, body) => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };

  const handleAddNewRequest = () => {
    const employeeName = prompt('Enter employee name:');
    if (employeeName) {
      const leaveType = prompt('Enter leave type (Casual/Sick/Earned):');
      if (leaveType) {
        const dates = prompt('Enter leave dates (DD-MM-YYYY to DD-MM-YYYY):');
        if (dates) {
          const newId = leaveRequests.length > 0 ? Math.max(...leaveRequests.map(r => r.id)) + 1 : 1;
          const newRequest = {
            id: newId,
            employee: { 
              name: employeeName, 
              department: 'New', 
              avatar: employeeName.split(' ').map(n => n[0]).join('').toUpperCase(),
              email: `${employeeName.toLowerCase().replace(' ', '.')}@company.com`,
              phone: '+1234567899'
            },
            type: leaveType,
            dates: dates,
            days: 1,
            status: 'pending',
            reason: 'New leave request',
            appliedOn: new Date().toLocaleDateString('en-GB'),
            leaveBalance: { casual: 12, sick: 10, earned: 15 }
          };
          setLeaveRequests(prev => [...prev, newRequest]);
          alert(`New leave request added for ${employeeName}`);
        }
      }
    }
  };

  const handleDeleteRequest = (id, employeeName) => {
    const confirmed = window.confirm(`Delete leave request for ${employeeName}?`);
    if (confirmed) {
      setLeaveRequests(prev => prev.filter(req => req.id !== id));
      alert(`Leave request deleted successfully!`);
    }
  };

  const handleViewCalendar = (dates) => {
    const startDate = dates.split(' to ')[0];
    navigate(`/calendar?date=${startDate}`);
  };

  const handleViewAnalytics = () => {
    navigate('/analytics');
  };

  const handleViewEmployeeProfile = (employee) => {
    navigate(`/employees?view=${employee.name.toLowerCase().replace(' ', '-')}`);
  };

  const handleSendReminder = (employee) => {
    const subject = 'Reminder: Action Required on Leave Request';
    const body = `Dear ${employee.name},\n\nThis is a reminder about your pending leave request. Please ensure all required documents are submitted.\n\nBest regards,\nHR Department`;
    handleSendEmail(employee.email, subject, body);
  };

  const handleViewAttendance = (employeeName) => {
    navigate(`/attendance?search=${employeeName}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Leave Approval</h1>
          <p className="text-slate-600">Review and manage leave requests from your team</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleAddNewRequest}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus size={18} />
            <span>Add Request</span>
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowExportOptions(!showExportOptions)}
              className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
            >
              <Download size={18} />
              <span>Export</span>
              <ChevronDown size={16} />
            </button>
            {showExportOptions && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10 min-w-[160px]">
                <button 
                  onClick={() => handleExportData('csv')}
                  className="w-full px-4 py-2 text-left hover:bg-slate-50"
                >
                  Export as CSV
                </button>
                <button 
                  onClick={() => handleExportData('json')}
                  className="w-full px-4 py-2 text-left hover:bg-slate-50"
                >
                  Export as JSON
                </button>
                <button 
                  onClick={() => navigate('/analytics')}
                  className="w-full px-4 py-2 text-left hover:bg-slate-50"
                >
                  View Analytics
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pending Requests</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {leaveRequests.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock size={24} className="text-yellow-500" />
            </div>
          </div>
        </div>

        <div 
          onClick={() => setFilter('approved')}
          className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Approved This Month</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {leaveRequests.filter(r => r.status === 'approved').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle size={24} className="text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Average Response</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">6h</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Calendar size={24} className="text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((filterItem) => (
              <button
                key={filterItem.value}
                onClick={() => setFilter(filterItem.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === filterItem.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {filterItem.label} ({filterItem.count})
              </button>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <button 
                onClick={() => setShowFilterOptions(!showFilterOptions)}
                className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
              >
                <Filter size={18} />
                <span>Filter</span>
                <ChevronDown size={16} />
              </button>
              {showFilterOptions && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10 min-w-[200px]">
                  <div className="p-3">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Filter by Type</label>
                    <div className="space-y-2">
                      {['All Types', 'Casual Leave', 'Sick Leave', 'Earned Leave'].map(type => (
                        <label key={type} className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                    <button className="w-full mt-3 px-3 py-1 bg-blue-500 text-white rounded text-sm">
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="search"
                placeholder="Search by employee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {filteredRequests.length === 0 ? (
              <div className="p-8 text-center">
                <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-700">No leave requests found</h3>
                <p className="text-slate-500 mt-2">Try changing your filters or search term</p>
                <button 
                  onClick={handleAddNewRequest}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add New Request
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Employee & Details</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Leave Information</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Status</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-slate-50">
                        <td className="py-4 px-4">
                          <div 
                            onClick={() => handleViewDetails(request)}
                            className="flex items-center space-x-3 cursor-pointer"
                          >
                            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                              <span className="font-semibold text-slate-700">{request.employee.avatar}</span>
                            </div>
                            <div>
                              <p className="font-medium text-slate-800">{request.employee.name}</p>
                              <p className="text-sm text-slate-600">{request.employee.department}</p>
                              <p className="text-xs text-slate-500 mt-1">Applied: {request.appliedOn}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <span className={`px-3 py-1 rounded text-sm font-medium ${getTypeColor(request.type)}`}>
                                {request.type}
                              </span>
                              <span className="text-slate-700 font-medium">{request.days} day(s)</span>
                            </div>
                            <div 
                              onClick={() => handleViewCalendar(request.dates)}
                              className="flex items-center space-x-2 text-slate-600 cursor-pointer hover:text-blue-600"
                            >
                              <Calendar size={16} />
                              <span>{request.dates}</span>
                            </div>
                            <p className="text-sm text-slate-700 truncate max-w-xs">{request.reason}</p>
                            {request.leaveBalance && (
                              <div className="flex space-x-2 mt-2">
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">CL: {request.leaveBalance.casual}</span>
                                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">SL: {request.leaveBalance.sick}</span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">EL: {request.leaveBalance.earned}</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {request.status === 'approved' ? (
                            <div className="space-y-1">
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Approved</span>
                              <p className="text-xs text-slate-600">On: {request.approvedOn}</p>
                              <p className="text-xs text-slate-500">By: {request.approvedBy}</p>
                            </div>
                          ) : request.status === 'rejected' ? (
                            <div className="space-y-1">
                              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">Rejected</span>
                              <p className="text-xs text-slate-600">On: {request.rejectedOn}</p>
                              {request.rejectionReason && (
                                <p className="text-xs text-red-600 truncate max-w-[150px]">{request.rejectionReason}</p>
                              )}
                            </div>
                          ) : (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Pending Review</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col space-y-2">
                            {request.status === 'pending' ? (
                              <>
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleApprove(request.id)}
                                    className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center space-x-1"
                                  >
                                    <CheckCircle size={16} />
                                    <span>Approve</span>
                                  </button>
                                  <button
                                    onClick={() => handleReject(request.id)}
                                    className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center space-x-1"
                                  >
                                    <XCircle size={16} />
                                    <span>Reject</span>
                                  </button>
                                </div>
                                <div className="flex space-x-2">
                                  <button 
                                    onClick={() => handleViewDetails(request)}
                                    className="flex-1 px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 flex items-center justify-center space-x-1"
                                  >
                                    <Eye size={16} />
                                    <span>View</span>
                                  </button>
                                  <button 
                                    onClick={() => handleSendReminder(request.employee)}
                                    className="flex-1 px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 flex items-center justify-center space-x-1"
                                  >
                                    <Send size={16} />
                                    <span>Remind</span>
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => handleViewDetails(request)}
                                  className="flex-1 px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 flex items-center justify-center space-x-1"
                                >
                                  <Eye size={16} />
                                  <span>Details</span>
                                </button>
                                <button 
                                  onClick={() => handleDeleteRequest(request.id, request.employee.name)}
                                  className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            )}
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleViewEmployeeProfile(request.employee)}
                                className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                              >
                                Profile
                              </button>
                              <button 
                                onClick={() => handleViewAttendance(request.employee.name)}
                                className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
                              >
                                Attendance
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {selectedRequest ? (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Request Details</h3>
                <button 
                  onClick={() => setSelectedRequest(null)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  × Close
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                    <span className="font-semibold text-slate-700">{selectedRequest.employee.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{selectedRequest.employee.name}</p>
                    <p className="text-sm text-slate-600">{selectedRequest.employee.department}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <a href={`mailto:${selectedRequest.employee.email}`} className="text-blue-600 hover:text-blue-800">
                        <Mail size={14} />
                      </a>
                      <span className="text-sm text-slate-500">{selectedRequest.employee.email}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-slate-200 rounded-lg">
                  <p className="font-medium text-slate-800 mb-2">Leave Details</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Type:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(selectedRequest.type)}`}>
                        {selectedRequest.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Dates:</span>
                      <span className="text-sm text-slate-800">{selectedRequest.dates}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Duration:</span>
                      <span className="text-sm text-slate-800">{selectedRequest.days} day(s)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Applied:</span>
                      <span className="text-sm text-slate-800">{selectedRequest.appliedOn}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-slate-200 rounded-lg">
                  <p className="font-medium text-slate-800 mb-2">Reason</p>
                  <p className="text-sm text-slate-700">{selectedRequest.reason}</p>
                </div>
                
                {selectedRequest.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApprove(selectedRequest.id)}
                      className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(selectedRequest.id)}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleViewCalendar(selectedRequest.dates)}
                    className="flex-1 px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                  >
                    View in Calendar
                  </button>
                  <button 
                    onClick={() => handleSendReminder(selectedRequest.employee)}
                    className="flex-1 px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 flex items-center justify-center space-x-1"
                  >
                    <Bell size={14} />
                    <span>Remind</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center">
                <Eye size={48} className="mx-auto text-slate-300 mb-4" />
                <h4 className="text-lg font-medium text-slate-700">Select a Request</h4>
                <p className="text-slate-500 mt-2">Click on any request to view details</p>
              </div>
            </div>
          )}
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h4 className="font-medium text-slate-800 mb-4">Quick Actions</h4>
            <div className="space-y-3">
              <button 
                onClick={handleAddNewRequest}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add New Request
              </button>
              <button 
                onClick={() => setFilter('pending')}
                className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
              >
                View Pending Only
              </button>
              <button 
                onClick={handleViewAnalytics}
                className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 flex items-center justify-center space-x-2"
              >
                <BarChart3 size={16} />
                <span>View Analytics</span>
              </button>
              <button 
                onClick={() => navigate('/calendar')}
                className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 flex items-center justify-center space-x-2"
              >
                <Calendar size={16} />
                <span>View Calendar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-800">Summary</h3>
          <button 
            onClick={() => handleExportData('csv')}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
          >
            <Download size={16} />
            <span>Export Summary</span>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white border border-slate-200 rounded-lg">
            <p className="text-2xl font-bold text-slate-800">{leaveRequests.length}</p>
            <p className="text-sm text-slate-600">Total Requests</p>
          </div>
          <div className="text-center p-4 bg-white border border-slate-200 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">
              {leaveRequests.filter(r => r.status === 'pending').length}
            </p>
            <p className="text-sm text-slate-600">Pending</p>
          </div>
          <div className="text-center p-4 bg-white border border-slate-200 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {leaveRequests.filter(r => r.status === 'approved').length}
            </p>
            <p className="text-sm text-slate-600">Approved</p>
          </div>
          <div className="text-center p-4 bg-white border border-slate-200 rounded-lg">
            <p className="text-2xl font-bold text-red-600">
              {leaveRequests.filter(r => r.status === 'rejected').length}
            </p>
            <p className="text-sm text-slate-600">Rejected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveApproval;