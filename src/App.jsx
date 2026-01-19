import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

/* ---------- PAGES ---------- */
import Homepage from './pages/homepage';
import Login from './pages/manager/Login';

/* ---------- MANAGER LAYOUT ---------- */
import MainLayout from './pages/manager/MainLayout';

/* ---------- MANAGER PAGES ---------- */
import Dashboard from './pages/manager/Dashboard';
import EmployeeManagement from './pages/manager/EmployeeManagement';
import AttendanceTracking from './pages/manager/AttendanceTracking';
import LeaveApproval from './pages/manager/LeaveApproval';
import Roles from './pages/manager/Roles';
import Recruitment from './pages/manager/Recruitment';
import SecureVault from './pages/manager/SecureVault';
import Settings from './pages/manager/Settings';

// Add/Edit pages
import AddEmployee from './pages/manager/AddEmployee';
import EmployeeHierarchy from './pages/manager/EmployeeHierarchy';
import AddDepartment from './pages/manager/AddDepartment';
import AddRole from './pages/manager/AddRole';
import LeavePolicy from './pages/manager/LeavePolicy';
import UploadDocument from './pages/manager/UploadDocument';

/* ---------- AUTH GUARD ---------- */
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!user?.email) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default function App() {
  return (
    <Routes>

      {/* ===== PUBLIC SITE (ALL INSIDE HOMEPAGE) ===== */}
      <Route path="/" element={<Homepage />}>
        <Route index element={null} />
        <Route path="features" element={null} />
        <Route path="modules" element={null} />
        <Route path="careers" element={null} />
      </Route>

      {/* ===== LOGIN ===== */}
      <Route path="/login" element={<Login />} />

      {/* ===== MANAGER DASHBOARD ===== */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Employee Management */}
        <Route path="employees" element={<EmployeeManagement />} />
        <Route path="employees/add" element={<AddEmployee />} />
        <Route path="employees/hierarchy" element={<EmployeeHierarchy />} />

        {/* Departments */}
        <Route path="departments" element={<AddDepartment />} /> {/* Direct to Add/List combined */}
        <Route path="departments/add" element={<AddDepartment />} /> {/* Keep for consistency */}

        {/* Roles & Permissions */}
        <Route path="roles" element={<Roles />} />
        <Route path="roles/add" element={<AddRole />} />

        {/* Attendance Tracking (direct link) */}
        <Route path="attendance" element={<AttendanceTracking />} />

        {/* Leave Management */}
        <Route path="leave-approval" element={<LeaveApproval />} />
        <Route path="leave-policy" element={<LeavePolicy />} />

        {/* Recruitment */}
        <Route path="recruitment" element={<Recruitment />} />

        {/* Secure Vault */}
        <Route path="documents" element={<SecureVault />} />
        <Route path="documents/upload" element={<UploadDocument />} />

        {/* Settings (direct link) */}
        <Route path="settings" element={<Settings />} />

        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* ===== FALLBACK ===== */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}