import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { usePermissions, PermissionCheck } from '../../utils/permissions';
import { Box, Typography, CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: PermissionCheck[];
  requiredRole?: string;
  fallbackPath?: string;
  showLoading?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermissions = [],
  requiredRole,
  fallbackPath = '/',
  showLoading = true,
}) => {
  const location = useLocation();
  const { currentUser, isAuthenticated, loading } = useSelector((state: RootState) => state.user);
  const { roles } = useSelector((state: RootState) => state.roles);
  const permissions = usePermissions(currentUser);

  // Show loading while checking authentication
  if (loading && showLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography variant="body2" color="text.secondary">
          Checking permissions...
        </Typography>
      </Box>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated || !currentUser) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check required role
  if (requiredRole && currentUser.role.toLowerCase() !== requiredRole.toLowerCase()) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5" color="error">
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You don't have the required role to access this page.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Required role: {requiredRole} | Your role: {currentUser.role}
        </Typography>
      </Box>
    );
  }

  // Check required permissions
  if (requiredPermissions.length > 0) {
    const hasRequiredPermissions = permissions.hasAllPermissions(requiredPermissions);

    if (!hasRequiredPermissions) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h5" color="error">
            Access Denied
          </Typography>
          <Typography variant="body1" color="text.secondary">
            You don't have the required permissions to access this page.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Required permissions: {requiredPermissions.map(p => `${p.action} ${p.resource}`).join(', ')}
          </Typography>
        </Box>
      );
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
