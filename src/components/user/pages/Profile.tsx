import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Avatar,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const Profile: React.FC = () => {
  // TODO: Replace with actual user data from Redux store
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: '2024-01-01',
    location: 'Toronto, ON',
    activeListings: 5,
    avatar: '/path/to/avatar.jpg'
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Profile Header */}
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar
              src={user.avatar}
              sx={{ width: 150, height: 150, margin: '0 auto', mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              {user.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {user.location}
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Edit Profile
            </Button>
          </Grid>

          {/* Profile Details */}
          <Grid item xs={12} md={8}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Profile Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                <ListItem>
                  <ListItemText
                    primary="Email"
                    secondary={user.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Member Since"
                    secondary={user.joinDate}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Active Listings"
                    secondary={user.activeListings}
                  />
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;
