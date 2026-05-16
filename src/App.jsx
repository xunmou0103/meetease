
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PreMeeting from './pages/PreMeeting';
import Settings from './pages/Settings';
import MeetingAnalysis from './pages/MeetingAnalysis';
import MeetingMinutes from './pages/MeetingMinutes';
import Tasks from './pages/Tasks';
import Integration from './pages/Integration';

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/pre-meeting" element={<PreMeeting />} />
              <Route path="/create" element={<Navigate to="/pre-meeting" replace />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/analysis" element={<MeetingAnalysis />} />
              <Route path="/record" element={<Navigate to="/analysis" replace />} />
              <Route path="/minutes" element={<MeetingMinutes />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/integration" element={<Integration />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
