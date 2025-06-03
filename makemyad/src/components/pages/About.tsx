import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';

const About: React.FC = () => {
  const theme = useTheme();

  return (
    <Container sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          About MakeMyAd
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Your trusted marketplace for buying and selling locally
        </Typography>
      </Box>

      {/* Mission Statement */}
      <Paper
        sx={{
          p: 4,
          mb: 8,
          bgcolor: theme.palette.primary.main,
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Our Mission
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          To create a safe, efficient, and user-friendly platform that connects buyers
          and sellers in local communities, fostering sustainable commerce and
          helping people find exactly what they need.
        </Typography>
      </Paper>

      {/* Key Features */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Why Choose MakeMyAd?
        </Typography>
        <Grid container spacing={4}>
          <Grid container item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%', width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                🔒 Secure Transactions
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Our platform implements the latest security measures to ensure safe
                and reliable transactions between users.
              </Typography>
            </Paper>
          </Grid>
          <Grid container item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%', width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                🌍 Local Focus
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We prioritize connecting people within their local communities,
                reducing shipping costs and environmental impact.
              </Typography>
            </Paper>
          </Grid>
          <Grid container item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%', width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                👥 User-Friendly
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Our intuitive interface makes it easy to post ads, search for items,
                and communicate with other users.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Company Stats */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Our Impact
        </Typography>
        <Grid container spacing={4}>
          <Grid container item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Typography variant="h3" color="primary" gutterBottom>
                1M+
              </Typography>
              <Typography variant="h6">Active Users</Typography>
            </Box>
          </Grid>
          <Grid container item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Typography variant="h3" color="primary" gutterBottom>
                5M+
              </Typography>
              <Typography variant="h6">Ads Posted</Typography>
            </Box>
          </Grid>
          <Grid container item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Typography variant="h3" color="primary" gutterBottom>
                100+
              </Typography>
              <Typography variant="h6">Cities Covered</Typography>
            </Box>
          </Grid>
          <Grid container item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Typography variant="h3" color="primary" gutterBottom>
                95%
              </Typography>
              <Typography variant="h6">Satisfaction Rate</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Company Values */}
      <Box>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Our Values
        </Typography>
        <Grid container spacing={4}>
          <Grid container item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%', width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Trust & Safety
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                We prioritize creating a safe environment for our users through
                identity verification, secure messaging, and transaction protection.
              </Typography>
            </Paper>
          </Grid>
          <Grid container item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%', width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Community First
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                We believe in fostering strong local communities and supporting
                sustainable, peer-to-peer commerce.
              </Typography>
            </Paper>
          </Grid>
          <Grid container item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%', width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Innovation
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                We continuously improve our platform with new features and
                technologies to provide the best possible user experience.
              </Typography>
            </Paper>
          </Grid>
          <Grid container item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%', width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Sustainability
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                We promote sustainable consumption by making it easy for people to
                buy and sell used items locally.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default About;
