// src/pages/manager/Settings.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Globe,
  Palette,
  Database,
  Download,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  Lock,
  Building,
  Calendar,
  Clock
} from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Manager User',
    email: 'manager@litehr.com',
    phone: '+1 234 567 8900',
    department: 'Human Resources',
    position: 'HR Manager',
    joiningDate: '2023-01-15',
    bio: 'Experienced HR professional with 8+ years in people management and organizational development.'
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    sessionTimeout: 30,
    loginNotifications: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    leaveApprovals: true,
    attendanceAlerts: true,
    reportGeneration: false,
    systemUpdates: true,
    dailySummary: true,
    weeklyReports: true
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    language: 'english',
    timezone: 'UTC-05:00',
    dateFormat: 'MM/DD/YYYY',
    itemsPerPage: 20,
    compactMode: false
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecurityData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNotificationChange = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleAppearanceChange = (e) => {
    const { name, value } = e.target;
    setAppearanceSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'system', label: 'System', icon: <SettingsIcon size={18} /> }
  ];

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' }
  ];

  const timezones = [
    'UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:00',
    'UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00',
    'UTC-04:00', 'UTC-03:30', 'UTC-03:00', 'UTC-02:00',
    'UTC-01:00', 'UTC±00:00', 'UTC+01:00', 'UTC+02:00',
    'UTC+03:00', 'UTC+03:30', 'UTC+04:00', 'UTC+04:30',
    'UTC+05:00', 'UTC+05:30', 'UTC+05:45', 'UTC+06:00',
    'UTC+06:30', 'UTC+07:00', 'UTC+08:00', 'UTC+08:45',
    'UTC+09:00', 'UTC+09:30', 'UTC+10:00', 'UTC+10:30',
    'UTC+11:00', 'UTC+12:00', 'UTC+12:45', 'UTC+13:00',
    'UTC+14:00'
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                  MU
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-sm border border-slate-200">
                  <User size={16} className="text-slate-600" />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{profileData.name}</h3>
                <p className="text-slate-600">{profileData.position}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Building size={12} />
                    {profileData.department}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    Joined {profileData.joiningDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <User size={14} className="inline mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Mail size={14} className="inline mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Phone size={14} className="inline mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Building size={14} className="inline mr-1" />
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={profileData.department}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={profileData.position}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Calendar size={14} className="inline mr-1" />
                  Joining Date
                </label>
                <input
                  type="date"
                  name="joiningDate"
                  value={profileData.joiningDate}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Bio / Description
                </label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-800">Security Recommendations</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Enable two-factor authentication and use a strong password for better security.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-800 mb-4">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="currentPassword"
                        value={securityData.currentPassword}
                        onChange={handleSecurityChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      New Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      value={securityData.newPassword}
                      onChange={handleSecurityChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={securityData.confirmPassword}
                      onChange={handleSecurityChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-end">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="font-semibold text-slate-800 mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800">Two-Factor Authentication</p>
                      <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="twoFactorEnabled"
                        checked={securityData.twoFactorEnabled}
                        onChange={handleSecurityChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800">Login Notifications</p>
                      <p className="text-sm text-slate-600">Get notified of new sign-ins to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="loginNotifications"
                        checked={securityData.loginNotifications}
                        onChange={handleSecurityChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="range"
                      name="sessionTimeout"
                      min="5"
                      max="120"
                      step="5"
                      value={securityData.sessionTimeout}
                      onChange={handleSecurityChange}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-slate-600 mt-1">
                      <span>5 min</span>
                      <span className="font-medium">{securityData.sessionTimeout} min</span>
                      <span>120 min</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="font-semibold text-slate-800 mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  {[
                    { device: 'Chrome on Windows', location: 'New York, USA', lastActive: 'Now', current: true },
                    { device: 'Safari on iPhone', location: 'San Francisco, USA', lastActive: '2 hours ago', current: false },
                    { device: 'Firefox on Mac', location: 'London, UK', lastActive: 'Yesterday', current: false }
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-800">{session.device}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <span>{session.location}</span>
                          <span>•</span>
                          <span>Last active: {session.lastActive}</span>
                          {session.current && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                      {!session.current && (
                        <button className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50">
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-4">Notification Channels</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800">Email Notifications</p>
                      <p className="text-sm text-slate-600">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={() => handleNotificationChange('emailNotifications')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800">Push Notifications</p>
                      <p className="text-sm text-slate-600">Receive browser notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.pushNotifications}
                        onChange={() => handleNotificationChange('pushNotifications')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-4">Notification Schedule</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800">Daily Summary</p>
                      <p className="text-sm text-slate-600">Receive daily activity summary</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.dailySummary}
                        onChange={() => handleNotificationChange('dailySummary')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800">Weekly Reports</p>
                      <p className="text-sm text-slate-600">Receive weekly performance reports</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.weeklyReports}
                        onChange={() => handleNotificationChange('weeklyReports')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h3 className="font-semibold text-slate-800 mb-4">Notification Types</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'leaveApprovals', label: 'Leave Approval Requests', description: 'When employees request leave' },
                  { key: 'attendanceAlerts', label: 'Attendance Alerts', description: 'Late arrivals and absences' },
                  { key: 'reportGeneration', label: 'Report Generation', description: 'When reports are ready' },
                  { key: 'systemUpdates', label: 'System Updates', description: 'Important system notifications' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800">{item.label}</p>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings[item.key]}
                        onChange={() => handleNotificationChange(item.key)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Palette size={14} className="inline mr-1" />
                  Theme
                </label>
                <select
                  name="theme"
                  value={appearanceSettings.theme}
                  onChange={handleAppearanceChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Globe size={14} className="inline mr-1" />
                  Language
                </label>
                <select
                  name="language"
                  value={appearanceSettings.language}
                  onChange={handleAppearanceChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {languages.map(lang => (
                    <option key={lang.value} value={lang.value}>{lang.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Clock size={14} className="inline mr-1" />
                  Timezone
                </label>
                <select
                  name="timezone"
                  value={appearanceSettings.timezone}
                  onChange={handleAppearanceChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {timezones.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Date Format
                </label>
                <select
                  name="dateFormat"
                  value={appearanceSettings.dateFormat}
                  onChange={handleAppearanceChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Items Per Page
                </label>
                <input
                  type="number"
                  name="itemsPerPage"
                  value={appearanceSettings.itemsPerPage}
                  onChange={handleAppearanceChange}
                  min="5"
                  max="100"
                  step="5"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between md:col-span-2">
                <div>
                  <p className="font-medium text-slate-800">Compact Mode</p>
                  <p className="text-sm text-slate-600">Show more content with less spacing</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="compactMode"
                    checked={appearanceSettings.compactMode}
                    onChange={(e) => setAppearanceSettings(prev => ({ ...prev, compactMode: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h3 className="font-semibold text-slate-800 mb-4">Preview</h3>
              <div className={`p-6 border rounded-lg ${
                appearanceSettings.theme === 'dark' 
                  ? 'bg-slate-800 border-slate-700 text-white' 
                  : 'bg-white border-slate-200'
              }`}>
                <div className={`flex items-center gap-3 ${appearanceSettings.compactMode ? 'py-2' : 'py-4'}`}>
                  <div className={`rounded-full ${
                    appearanceSettings.theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'
                  } ${appearanceSettings.compactMode ? 'w-8 h-8' : 'w-12 h-12'}`}></div>
                  <div>
                    <p className={`font-medium ${appearanceSettings.compactMode ? 'text-sm' : 'text-base'}`}>
                      Sample User
                    </p>
                    <p className={`${appearanceSettings.theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} ${
                      appearanceSettings.compactMode ? 'text-xs' : 'text-sm'
                    }`}>
                      HR Manager
                    </p>
                  </div>
                </div>
                <p className={`mt-4 ${
                  appearanceSettings.theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                } ${appearanceSettings.compactMode ? 'text-sm' : 'text-base'}`}>
                  This is how your interface will look with the selected settings.
                </p>
              </div>
            </div>
          </div>
        );

      case 'system':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <SettingsIcon size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800">System Information</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Manage system settings and configurations. Changes here affect all users.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-4">Data Management</h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <Database size={20} className="text-blue-600" />
                      <div>
                        <p className="font-medium text-slate-800">Backup Database</p>
                        <p className="text-sm text-slate-600">Create a system backup</p>
                      </div>
                    </div>
                    <Download size={18} className="text-slate-400" />
                  </button>

                  <button className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <Database size={20} className="text-green-600" />
                      <div>
                        <p className="font-medium text-slate-800">Restore Backup</p>
                        <p className="text-sm text-slate-600">Restore from previous backup</p>
                      </div>
                    </div>
                    <Download size={18} className="text-slate-400" />
                  </button>

                  <button className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50">
                    <div className="flex items-center gap-3">
                      <Database size={20} className="text-red-600" />
                      <div>
                        <p className="font-medium text-red-800">Clear Cache</p>
                        <p className="text-sm text-red-600">Remove temporary files</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">System Version</span>
                    <span className="font-medium text-slate-800">v1.2.3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Last Backup</span>
                    <span className="font-medium text-slate-800">Yesterday, 2:30 AM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Database Size</span>
                    <span className="font-medium text-slate-800">245 MB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Active Users</span>
                    <span className="font-medium text-slate-800">42</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">System Uptime</span>
                    <span className="font-medium text-slate-800">99.8%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h3 className="font-semibold text-slate-800 mb-4">Advanced Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">Enable API Access</p>
                    <p className="text-sm text-slate-600">Allow external system integration</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">Audit Logging</p>
                    <p className="text-sm text-slate-600">Record all system activities</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">Maintenance Mode</p>
                    <p className="text-sm text-slate-600">Temporarily disable access</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => navigate('/manager/dashboard')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
            <p className="text-slate-600">Manage your account and system preferences</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Settings Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 lg:mb-0">
              <nav className="space-y-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className={activeTab === tab.id ? 'text-blue-600' : 'text-slate-500'}>
                      {tab.icon}
                    </div>
                    {tab.label}
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    saving
                      ? 'bg-slate-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => navigate('/manager/dashboard')}
                  className="w-full mt-3 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-blue-100">
                  {tabs.find(t => t.id === activeTab)?.icon || <SettingsIcon size={24} className="text-blue-600" />}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">
                    {tabs.find(t => t.id === activeTab)?.label || 'Settings'}
                  </h2>
                  <p className="text-sm text-slate-600">
                    Configure your {activeTab.toLowerCase()} settings
                  </p>
                </div>
              </div>

              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;