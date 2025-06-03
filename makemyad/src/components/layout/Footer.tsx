import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const categories = [
    'Electronics',
    'Vehicles',
    'Property',
    'Jobs',
    'Furniture',
    'Fashion',
    'Tools',
    'Sports',
  ];

  const quickLinks = [
    { title: 'About Us', path: '/about' },
    { title: 'Contact', path: '/contact' },
    { title: 'Terms & Conditions', path: '/terms' },
    { title: 'Privacy Policy', path: '/privacy' },
    { title: 'FAQ', path: '/faq' },
    { title: 'How It Works', path: '/how-it-works' },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid container item xs={12} md={4}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                About MakeMyAd
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Your trusted marketplace for buying and selling locally. Connect with your
                community and find great deals on items near you.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <IconButton color="inherit" aria-label="Facebook">
                  <Facebook />
                </IconButton>
                <IconButton color="inherit" aria-label="Twitter">
                  <Twitter />
                </IconButton>
                <IconButton color="inherit" aria-label="Instagram">
                  <Instagram />
                </IconButton>
                <IconButton color="inherit" aria-label="LinkedIn">
                  <LinkedIn />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Categories Section */}
          <Grid container item xs={12} sm={6} md={4}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Categories
              </Typography>
              <Grid container spacing={1}>
                {categories.map((category) => (
                  <Grid container item xs={6} key={category}>
                    <Link
                      href="#"
                      color="inherit"
                      underline="hover"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/ads?category=${category}`);
                      }}
                      sx={{ display: 'block', mb: 1 }}
                    >
                      {category}
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          {/* Quick Links Section */}
          <Grid container item xs={12} sm={6} md={4}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  color="inherit"
                  underline="hover"
                  onClick={() => handleNavigate(link.path)}
                  sx={{ display: 'block', mb: 1, cursor: 'pointer' }}
                >
                  {link.title}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Contact Information */}
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid container item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, md: 0 }, width: '100%' }}>
              <LocationOn sx={{ mr: 1 }} />
              <Typography variant="body2">
                123 Main Street, Toronto, ON M5V 1A1
              </Typography>
            </Box>
          </Grid>
          <Grid container item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, md: 0 }, width: '100%', justifyContent: { md: 'center' } }}>
              <Phone sx={{ mr: 1 }} />
              <Typography variant="body2">1-800-MAKEMYAD</Typography>
            </Box>
          </Grid>
          <Grid container item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: { md: 'flex-end' } }}>
              <Email sx={{ mr: 1 }} />
              <Typography variant="body2">support@makemyad.com</Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 4, opacity: 0.8 }}
        >
          © {new Date().getFullYear()} MakeMyAd. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
