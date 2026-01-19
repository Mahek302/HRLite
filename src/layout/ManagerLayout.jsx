// src/layout/ManagerLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome,
  FiUsers,
  FiLayers,
  FiCalendar,
  FiSettings,
  FiLogOut,
  FiBell,
  FiChevronDown,
  FiUser,
  FiMessageSquare,
  FiGrid,
  FiBriefcase,
  FiShield,
  FiFileText,
  FiPieChart,
  FiClipboard,
  FiSearch,
  FiTrendingUp,
  FiActivity,
  FiLock,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { AiOutlineAudit } from 'react-icons/ai';

const ManagerLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userDropdown, setUserDropdown] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [darkMode, setDarkMode] = useState(true);

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('litehr-theme');
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setDarkMode(isDark);
      applyTheme(isDark);
    } else {
      setDarkMode(true);
      applyTheme(true);
    }
  }, []);

  // Apply theme classes to document
  const applyTheme = (isDark) => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.add('light');
      html.classList.remove('dark');
    }
    
    // Also apply to body for better coverage
    document.body.classList.toggle('dark', isDark);
    document.body.classList.toggle('light', !isDark);
  };

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('litehr-theme', newDarkMode ? 'dark' : 'light');
    applyTheme(newDarkMode);
    
    // Force re-render of all components by triggering storage event
    window.dispatchEvent(new Event('storage'));
  };

  const toggleMenu = (label) => {
    setExpandedMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  // Function to handle logo click
  const handleLogoClick = () => {
    navigate('/manager/dashboard');
  };

  const menuItems = [
    { label: "Dashboard", icon: <FiGrid />, path: "/manager/dashboard" },
    
    // Employees Module
    { 
      label: "Employees", 
      icon: <FiUsers />, 
      path: "/manager/employees",
      subItems: [
        { label: "Employee List", path: "/manager/employees" },
        { label: "Add Employee", path: "/manager/employees/add" },
        { label: "Reporting Hierarchy", path: "/manager/employees/hierarchy" },
      ]
    },
    
    // Departments Module
    { 
      label: "Departments", 
      icon: <HiOutlineOfficeBuilding />, 
      path: "/manager/departments",
      subItems: [
        { label: "Department List", path: "/manager/departments" },
        { label: "Add Department", path: "/manager/departments/add" },
      ]
    },
    
    // Roles & Permissions Module
    { 
      label: "Roles & Permissions", 
      icon: <FiShield />, 
      path: "/manager/roles",
      subItems: [
        { label: "Role List", path: "/manager/roles" },
        { label: "Add Role", path: "/manager/roles/add" },
      ]
    },
    
    // Attendance Module
    { 
      label: "Attendance", 
      icon: <FiCalendar />, 
      path: "/manager/attendance",
      subItems: [
        { label: "Monthly", path: "/manager/attendance" },
        { label: "Reports", path: "/manager/attendance/reports" },
      ]
    },
    
    // Leaves Module
    { 
      label: "Leaves", 
      icon: <FiCalendar />, 
      path: "/manager/leave-approval",
      subItems: [
        { label: "Leave Requests", path: "/manager/leave-approval" },
        { label: "Leave Policy", path: "/manager/leaves/policy" },
      ]
    },
    
    // Recruitment Module
    { 
      label: "Recruitment", 
      icon: <FiBriefcase />, 
      path: "/manager/recruitment",
      subItems: [
        { label: "Job Openings", path: "/manager/recruitment/jobs" },
        { label: "Applications", path: "/manager/candidates" },
      ]
    },
    
    // Secure Vault Module
    { 
      label: "Secure Vault", 
      icon: <FiLock />, 
      path: "/manager/vault",
      subItems: [
        { label: "Document List", path: "/manager/vault" },
        { label: "Upload Document", path: "/manager/vault/upload" },
      ]
    },
    
    // Analytics Module
    { 
      label: "Analytics", 
      icon: <FiTrendingUp />, 
      path: "/manager/analytics",
      subItems: [
        { label: "Dashboard", path: "/manager/analytics" },
      ]
    },
    
    // Settings Module
    { label: "Settings", icon: <FiSettings />, path: "/manager/settings" },
  ];

  const notifications = [
    { id: 1, text: "New leave request from Rahul Sharma", time: "2 min ago", unread: true },
    { id: 2, text: "Performance review scheduled", time: "1 hour ago", unread: true },
    { id: 3, text: "System maintenance tonight", time: "3 hours ago", unread: false },
  ];

  // Helper function to check if a path is active
  const isActivePath = (itemPath, currentPath) => {
    if (itemPath === currentPath) return true;
    if (currentPath.startsWith(itemPath) && itemPath !== "/manager") return true;
    return false;
  };

  // Helper function to check if any sub-item is active
  const isSubItemActive = (subItems, currentPath) => {
    return subItems?.some(subItem => isActivePath(subItem.path, currentPath));
  };

  // Theme colors
  const themeColors = darkMode ? {
    primary: '#8b5cf6',
    secondary: '#10b981',
    accent: '#3b82f6',
    background: '#0f172a',
    card: '#1e293b',
    text: '#f9fafb',
    muted: '#9ca3af',
    border: '#374151',
  } : {
    primary: '#2563eb',
    secondary: '#10b981',
    accent: '#8b5cf6',
    background: '#f8fafc',
    card: '#ffffff',
    text: '#1e293b',
    muted: '#64748b',
    border: '#e2e8f0',
  };

  return (
    <div className={`flex h-screen transition-colors duration-300 ${darkMode ? 'dark bg-[#0f172a]' : 'bg-[#f8fafc]'}`}>
      {/* SIDEBAR */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 shadow-lg z-20 border-r flex flex-col`}
        style={{
          backgroundColor: themeColors.card,
          borderColor: themeColors.border,
          color: themeColors.text
        }}>
        
        {/* Logo - Now clickable */}
        <div className={`px-6 py-5 border-b`} style={{ borderColor: themeColors.border }}>
          <div className="flex items-center justify-start">
            {/* Expanded sidebar logo - Clickable */}
            {!sidebarCollapsed && (
              <div 
                className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={handleLogoClick}
                title="Go to Dashboard"
              >
                <div className="h-10 w-10 bg-gradient-to-r from-[#8B5CF6] to-[#10B981] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">HR</span>
                </div>
                <span className="text-xl font-semibold" style={{ color: themeColors.text }}>LiteHR</span>
              </div>
            )}

            {/* Collapsed sidebar logo - Clickable */}
            {sidebarCollapsed && (
              <div 
                className="w-8 h-8 flex items-center justify-start cursor-pointer hover:opacity-90 transition-opacity"
                onClick={handleLogoClick}
                title="Go to Dashboard"
              >
                <div className="h-8 w-8 bg-gradient-to-r from-[#8B5CF6] to-[#10B981] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">HR</span>
                </div>
              </div>
            )}
            
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`p-2 rounded-lg ml-auto transition-colors duration-300 hover:opacity-80`}
              style={{ 
                backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                color: themeColors.text 
              }}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d={sidebarCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = isActivePath(item.path, location.pathname) || isSubItemActive(item.subItems, location.pathname);
            const isExpanded = expandedMenus[item.label];
            const hasSubItems = item.subItems && item.subItems.length > 0;
            
            const activeBg = darkMode ? 'bg-[#8b5cf6]' : 'bg-[#8b5cf6]';
            const activeText = darkMode ? 'text-white' : 'text-white';
            const inactiveHoverBg = darkMode ? 'hover:bg-[#2d3748]' : 'hover:bg-gray-100';
            const subItemActiveBg = darkMode ? 'bg-[#8b5cf6]/20' : 'bg-[#8b5cf6]/10';
            const subItemActiveText = darkMode ? 'text-white' : 'text-[#8b5cf6]';
            const subItemBorder = darkMode ? 'border-[#8b5cf6]' : 'border-[#8b5cf6]';
            
            return (
              <div 
                key={item.path} 
                className="space-y-1"
              >
                {hasSubItems ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className={[
                        "relative w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all duration-300",
                        isActive
                          ? `${activeBg} ${activeText}`
                          : `hover:opacity-90 ${inactiveHoverBg}`,
                        sidebarCollapsed ? "justify-center" : ""
                      ].join(" ")}
                      style={{
                        color: isActive ? 'white' : themeColors.text,
                        backgroundColor: isActive ? activeBg : 'transparent'
                      }}
                      title={sidebarCollapsed ? item.label : ""}
                    >
                      <span className="text-lg">
                        {item.icon}
                      </span>
                      {!sidebarCollapsed && (
                        <>
                          <span className="flex-1 text-left">{item.label}</span>
                          <svg 
                            className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </>
                      )}
                    </button>
                    
                    {/* Sub-menu items */}
                    {!sidebarCollapsed && item.subItems && (
                      <div className={`
                        ml-4 space-y-1 pl-3 border-l
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                      `} style={{ borderColor: themeColors.border }}>
                        <div className="pb-2 pt-1">
                          {item.subItems.map((subItem) => {
                            const isSubActive = location.pathname === subItem.path;
                            return (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                className={[
                                  "relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
                                  "transition-all duration-300 hover:opacity-90",
                                  isSubActive
                                    ? `${subItemActiveBg} ${subItemActiveText} border-l-2`
                                    : `hover:bg-opacity-50 ${inactiveHoverBg}`
                                ].join(" ")}
                                style={{
                                  color: isSubActive ? subItemActiveText : themeColors.text,
                                  borderColor: isSubActive ? subItemBorder : 'transparent'
                                }}
                              >
                                <div
                                  className={`w-1.5 h-1.5 rounded-full ${isSubActive ? 'bg-[#8b5cf6]' : 'bg-gray-500'}`}
                                />
                                <span>{subItem.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={[
                      "flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all duration-300",
                      isActive
                        ? `${activeBg} ${activeText}`
                        : `hover:opacity-90 ${inactiveHoverBg}`,
                      sidebarCollapsed ? "justify-center" : ""
                    ].join(" ")}
                    style={{
                      color: isActive ? 'white' : themeColors.text,
                      backgroundColor: isActive ? activeBg : 'transparent'
                    }}
                    title={sidebarCollapsed ? item.label : ""}
                  >
                    <span className="text-lg">
                      {item.icon}
                    </span>
                    {!sidebarCollapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {isActive && (
                          <span className={`w-2 h-2 rounded-full bg-white`}></span>
                        )}
                      </>
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className={`p-4 border-t`} style={{ borderColor: themeColors.border }}>
          {!sidebarCollapsed ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white font-bold`}>
                  AU
                </div>
                <div>
                  <p className={`font-medium`} style={{ color: themeColors.text }}>Admin User</p>
                  <p className={`text-xs`} style={{ color: themeColors.muted }}>Admin</p>
                </div>
              </div>
              <button className={`w-full flex items-center justify-center gap-2 text-sm px-3 py-2 rounded-lg transition-all duration-300 hover:opacity-90`}
                style={{ 
                  backgroundColor: darkMode ? '#374151' : '#f1f5f9',
                  color: themeColors.text,
                  border: `1px solid ${themeColors.border}`
                }}>
                <FiLogOut />
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white font-bold text-sm`}>
                AU
              </div>
              <button className={`p-2 rounded-lg transition-colors duration-300 hover:opacity-80`}
                style={{ 
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  color: themeColors.text 
                }}>
                <FiLogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: themeColors.background }}>
        {/* HEADER */}
        <header className={`px-6 py-3 border-b flex justify-between items-center shadow-sm transition-colors duration-300`}
          style={{
            backgroundColor: themeColors.card,
            borderColor: themeColors.border,
            color: themeColors.text
          }}>
          <div>
            <h1 className={`text-lg font-semibold`} style={{ color: themeColors.text }}>
              {(() => {
                const activeItem = menuItems.find(item => 
                  isActivePath(item.path, location.pathname) || isSubItemActive(item.subItems, location.pathname)
                );
                
                if (activeItem) {
                  // Check if a sub-item is active
                  const activeSubItem = activeItem.subItems?.find(subItem => 
                    location.pathname === subItem.path
                  );
                  
                  if (activeSubItem) {
                    return `${activeItem.label} › ${activeSubItem.label}`;
                  }
                  return activeItem.label;
                }
                return "Dashboard";
              })()}
            </h1>
            <p className={`text-sm`} style={{ color: themeColors.muted }}>
              HR Management System
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Dark/Light Mode Toggle */}
            <div>
              <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors duration-300 hover:opacity-80`}
                style={{ 
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  color: themeColors.text 
                }}
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? (
                  <FiSun className="w-5 h-5 text-amber-300" />
                ) : (
                  <FiMoon className="w-5 h-5 text-purple-600" />
                )}
              </button>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`p-2 rounded-lg transition-colors duration-300 hover:opacity-80 relative`}
                style={{ 
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  color: themeColors.text 
                }}
              >
                <IoMdNotificationsOutline className={`w-5 h-5`} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#8b5cf6] text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.filter(n => n.unread).length}
                </span>
              </button>
              
              {notificationsOpen && (
                <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg border py-2 z-50 transition-colors duration-300`}
                  style={{
                    backgroundColor: themeColors.card,
                    borderColor: themeColors.border,
                    color: themeColors.text
                  }}>
                  <div className={`px-4 py-3 border-b`} style={{ borderColor: themeColors.border }}>
                    <h3 className={`font-semibold`} style={{ color: themeColors.text }}>Notifications</h3>
                  </div>
                  {notifications.map(notif => (
                    <div key={notif.id} className={`px-4 py-3 transition-colors duration-300 hover:opacity-90 ${notif.unread ? 'opacity-100' : 'opacity-70'}`}
                      style={{
                        backgroundColor: notif.unread ? (darkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)') : 'transparent'
                      }}>
                      <p className={`text-sm`} style={{ color: themeColors.text }}>{notif.text}</p>
                      <p className={`text-xs mt-1`} style={{ color: themeColors.muted }}>
                        {notif.time}
                      </p>
                    </div>
                  ))}
                  <div className={`border-t px-4 py-3`} style={{ borderColor: themeColors.border }}>
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className={`block w-full text-center text-sm transition-colors duration-300 hover:opacity-80`}
                      style={{ color: themeColors.primary }}
                    >
                      View All Updates
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Clock */}
            <div className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors duration-300`}
              style={{
                backgroundColor: darkMode ? '#374151' : '#f1f5f9',
                color: themeColors.text,
                borderColor: themeColors.border
              }}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setUserDropdown(!userDropdown)}
                className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 hover:opacity-80`}
                style={{ 
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  color: themeColors.text 
                }}
              >
                <div className={`w-8 h-8 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white font-bold text-sm`}>
                  AU
                </div>
                <FiChevronDown className={`transition-transform ${userDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {userDropdown && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border py-2 z-50 transition-colors duration-300`}
                  style={{
                    backgroundColor: themeColors.card,
                    borderColor: themeColors.border,
                    color: themeColors.text
                  }}>
                  <div className={`px-4 py-3 border-b`} style={{ borderColor: themeColors.border }}>
                    <p className={`font-semibold`} style={{ color: themeColors.text }}>Admin User</p>
                    <p className={`text-xs`} style={{ color: themeColors.muted }}>admin@hr.com</p>
                  </div>
                  <button className={`w-full text-left px-4 py-2 text-sm transition-colors duration-300 hover:opacity-90`}
                    style={{ color: themeColors.text }}>
                    <FiUser className="inline mr-2" /> Profile
                  </button>
                  <button className={`w-full text-left px-4 py-2 text-sm transition-colors duration-300 hover:opacity-90`}
                    style={{ color: themeColors.text }}>
                    <FiSettings className="inline mr-2" /> Settings
                  </button>
                  <div className={`border-t mt-2 pt-2`} style={{ borderColor: themeColors.border }}>
                    <button className={`w-full text-left px-4 py-2 text-sm transition-colors duration-300 hover:opacity-90`}
                      style={{ color: '#ef4444' }}>
                      <FiLogOut className="inline mr-2" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className={`flex-1 overflow-y-auto p-6 transition-colors duration-300`} style={{ backgroundColor: themeColors.background }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ManagerLayout;