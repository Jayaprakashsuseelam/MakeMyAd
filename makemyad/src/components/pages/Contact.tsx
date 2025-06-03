import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
} from '@mui/icons-material';

const Contact: React.FC = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    setSnackbar({
      open: true,
      message: 'Message sent successfully!',
      severity: 'success',
    });
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const officeLocations = [
    {
      city: 'Toronto',
      address: '123 Bay Street, Toronto, ON M5J 2T3',
      phone: '+1 (416) 555-0123',
      email: 'toronto@makemyad.com',
    },
    {
      city: 'Vancouver',
      address: '456 West Georgia St, Vancouver, BC V6B 4N7',
      phone: '+1 (604) 555-0456',
      email: 'vancouver@makemyad.com',
    },
    {
      city: 'Montreal',
      address: '789 Rue Sainte-Catherine O, Montreal, QC H3B 1B9',
      phone: '+1 (514) 555-0789',
      email: 'montreal@makemyad.com',
    },
  ];

  return (
    <Container sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="h5" color="text.secondary">
          We're here to help and answer any questions you might have
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid container item xs={12} md={8}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Send us a Message
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid container item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid container item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid container item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={4}
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid container item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Contact Information */}
        <Grid container item xs={12} md={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Customer Support
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Email sx={{ mr: 2, color: 'primary.main' }} />
                <Typography>support@makemyad.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ mr: 2, color: 'primary.main' }} />
                <Typography>1-800-MAKEMYAD</Typography>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Business Hours
              </Typography>
              <Typography variant="body1" paragraph>
                Monday - Friday: 9:00 AM - 8:00 PM
              </Typography>
              <Typography variant="body1">
                Saturday - Sunday: 10:00 AM - 6:00 PM
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Facebook sx={{ color: '#1877F2', cursor: 'pointer' }} />
                <Twitter sx={{ color: '#1DA1F2', cursor: 'pointer' }} />
                <LinkedIn sx={{ color: '#0A66C2', cursor: 'pointer' }} />
                <Instagram sx={{ color: '#E4405F', cursor: 'pointer' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Office Locations */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Our Offices
        </Typography>
        <Grid container spacing={4}>
          {officeLocations.map((office) => (
            <Grid container item xs={12} md={4} key={office.city}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  {office.city}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>{office.address}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Phone sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>{office.phone}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Email sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>{office.email}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
