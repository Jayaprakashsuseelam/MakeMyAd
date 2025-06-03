import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from '@mui/material';
import { Search, LocationOn, Category } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCategory, setLocation } from '../../store/slices/filtersSlice';

const popularCategories = [
  { id: 'electronics', name: 'Electronics', icon: '🖥️' },
  { id: 'vehicles', name: 'Vehicles', icon: '🚗' },
  { id: 'property', name: 'Property', icon: '🏠' },
  { id: 'jobs', name: 'Jobs', icon: '💼' },
  { id: 'furniture', name: 'Furniture', icon: '🪑' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/ads');
  };

  const handleCategoryClick = (categoryId: string) => {
    dispatch(setCategory(categoryId));
    navigate('/ads');
  };

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://source.unsplash.com/random/?marketplace)',
          minHeight: '400px',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
          }}
        />
        <Container
          sx={{
            position: 'relative',
            pt: 8,
            pb: 6,
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            color="inherit"
            gutterBottom
            align="center"
          >
            Find Everything You Need
          </Typography>
          <Typography variant="h5" color="inherit" paragraph align="center">
            Buy and sell items, find jobs, rent properties, and more
          </Typography>

          {/* Search Bar */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              mt: 4,
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column', md: 'row' },
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            <TextField
              fullWidth
              placeholder="What are you looking for?"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
            />
            <TextField
              fullWidth
              placeholder="Location"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
              sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ minWidth: { md: 200 } }}
            >
              Search
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Popular Categories */}
      <Container>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Popular Categories
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {popularCategories.map((category) => (
            <Grid item xs={6} sm={4} md={2} key={category.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s',
                  },
                }}
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardActionArea>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" component="div" gutterBottom>
                      {category.icon}
                    </Typography>
                    <Typography variant="h6" component="div">
                      {category.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works */}
      <Box sx={{ bgcolor: 'background.paper', py: 8, mt: 8 }}>
        <Container>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
            How It Works
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h1" gutterBottom>
                  📝
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Post Your Ad
                </Typography>
                <Typography color="text.secondary">
                  Create a detailed listing with photos and description
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h1" gutterBottom>
                  👥
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Connect with Buyers
                </Typography>
                <Typography color="text.secondary">
                  Receive inquiries and communicate with interested parties
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h1" gutterBottom>
                  🤝
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Make a Deal
                </Typography>
                <Typography color="text.secondary">
                  Meet safely and complete your transaction
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
