import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import theme from './theme';

// Lazy load components
const Header = React.lazy(() => import('./components/layout/Header'));
const Footer = React.lazy(() => import('./components/layout/Footer'));
const Home = React.lazy(() => import('./components/pages/Home'));
const AdListing = React.lazy(() => import('./components/pages/AdListing'));
const AdDetails = React.lazy(() => import('./components/pages/AdDetails'));
const About = React.lazy(() => import('./components/pages/About'));
const Contact = React.lazy(() => import('./components/pages/Contact'));

// Admin components
const AdminDashboard = React.lazy(() => import('./components/pages/AdminDashboard'));
const UserManagement = React.lazy(() => import('./components/pages/UserManagement'));
const RoleManagement = React.lazy(() => import('./components/pages/RoleManagement'));

// Auth components
const ProtectedRoute = React.lazy(() => import('./components/auth/ProtectedRoute'));

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <React.Suspense fallback={<div>Loading...</div>}>
              <Header />
              <Box component="main" sx={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/ads" element={<AdListing />} />
                  <Route path="/ads/:id" element={<AdDetails />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* Admin Routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute
                        requiredPermissions={[{ resource: 'users', action: 'manage' }]}
                        fallbackPath="/"
                      >
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/users"
                    element={
                      <ProtectedRoute
                        requiredPermissions={[{ resource: 'users', action: 'manage' }]}
                        fallbackPath="/"
                      >
                        <UserManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/roles"
                    element={
                      <ProtectedRoute
                        requiredPermissions={[{ resource: 'roles', action: 'manage' }]}
                        fallbackPath="/"
                      >
                        <RoleManagement />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Box>
              <Footer />
            </React.Suspense>
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
