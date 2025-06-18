import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  People as PeopleIcon,
  Security as SecurityIcon,
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { users } = useSelector((state: RootState) => state.user);
  const { roles } = useSelector((state: RootState) => state.roles);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(user => user.isActive).length,
    totalRoles: roles.length,
    defaultRoles: roles.filter(role => role.isDefault).length,
  };

  const recentUsers = users
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const quickActions = [
    {
      title: 'User Management',
      description: 'Manage user accounts, roles, and permissions',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: 'primary.main',
      path: '/admin/users',
    },
    {
      title: 'Role Management',
      description: 'Create and manage user roles and permissions',
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      color: 'secondary.main',
      path: '/admin/roles',
    },
  ];

  const systemInfo = [
    { label: 'Total Users', value: stats.totalUsers },
    { label: 'Active Users', value: stats.activeUsers },
    { label: 'Total Roles', value: stats.totalRoles },
    { label: 'Default Roles', value: stats.defaultRoles },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your application's users, roles, and system settings
        </Typography>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickActions.map((action) => (
          <Grid item xs={12} md={6} key={action.title}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
              onClick={() => navigate(action.path)}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Box sx={{ color: action.color, mb: 2 }}>
                  {action.icon}
                </Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  {action.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {action.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(action.path);
                  }}
                >
                  Manage {action.title.split(' ')[0]}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Statistics and Recent Activity */}
      <Grid container spacing={3}>
        {/* System Statistics */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <DashboardIcon sx={{ mr: 1 }} />
              <Typography variant="h6">System Statistics</Typography>
            </Box>
            <Grid container spacing={2}>
              {systemInfo.map((info) => (
                <Grid item xs={6} key={info.label}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="h4" color="primary.main" gutterBottom>
                      {info.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {info.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Users */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PeopleIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Recent Users</Typography>
            </Box>
            <List>
              {recentUsers.map((user, index) => (
                <React.Fragment key={user.id}>
                  <ListItem>
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={user.name}
                      secondary={`${user.email} • ${user.role}`}
                    />
                  </ListItem>
                  {index < recentUsers.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            {recentUsers.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                No users found
              </Typography>
            )}
            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/admin/users')}
              >
                View All Users
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Links */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Quick Links
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              startIcon={<TrendingUpIcon />}
              fullWidth
              sx={{ justifyContent: 'flex-start' }}
            >
              Analytics
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              startIcon={<NotificationsIcon />}
              fullWidth
              sx={{ justifyContent: 'flex-start' }}
            >
              Notifications
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              startIcon={<SettingsIcon />}
              fullWidth
              sx={{ justifyContent: 'flex-start' }}
            >
              System Settings
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              startIcon={<SecurityIcon />}
              fullWidth
              sx={{ justifyContent: 'flex-start' }}
              onClick={() => navigate('/admin/roles')}
            >
              Security
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
