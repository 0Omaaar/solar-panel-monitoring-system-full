import LoginPage from '../src/components/auth/LoginPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import RegistrationPage from '../src/components/auth/RegistrationPage';
import UserManagementPage from '../src/components/userspage/UserManagementPage';
import UpdateUser from '../src/components/userspage/UpdateUser';
import MonitoringDashboard from './MonitoringDashboard';
import MonitoringDashboardV2 from './MonitoringDashboardV2';
import { AuthProvider, AuthContext } from './components/auth/AuthContext';
import { useContext } from 'react';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, isAdmin } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (requiredRole === 'ADMIN' && !isAdmin) {
        return <Navigate to="/profile" />;
    }

    return children;
};

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="App">
                    <Navbar />
                    <div className="content">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<LoginPage />} />
                            <Route path="/login" element={<LoginPage />} />

                            {/* Admin-only Routes */}
                            <Route
                                path="/register"
                                element={
                                    <ProtectedRoute requiredRole="ADMIN">
                                        <RegistrationPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/admin/user-management"
                                element={
                                    <ProtectedRoute requiredRole="ADMIN">
                                        <UserManagementPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/update-user/:userId"
                                element={
                                    <ProtectedRoute requiredRole="ADMIN">
                                        <UpdateUser />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/monitoring"
                                element={
                                    <ProtectedRoute requiredRole="ADMIN">
                                        <MonitoringDashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/monitoringv2"
                                element={
                                    <ProtectedRoute requiredRole="ADMIN">
                                        <MonitoringDashboardV2 />
                                    </ProtectedRoute>
                                }
                            />

                            {/* 404 Redirect */}
                            <Route path="*" element={<Navigate to="/login" />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;