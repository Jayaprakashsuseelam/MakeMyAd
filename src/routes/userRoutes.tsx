import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Profile from '../components/user/pages/Profile';
import Settings from '../components/user/pages/Settings';
import MyListings from '../components/user/pages/MyListings';

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // TODO: Replace with actual authentication check from Redux store
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-listings"
        element={
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default UserRoutes;
