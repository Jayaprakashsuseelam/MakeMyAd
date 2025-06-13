import React, { useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Slider,
  Paper,
} from '@mui/material';
import { AdCard } from '../components/ads/AdCard';
import { Ad, AdCategory, AdFilters } from '../types/ad';

// Temporary mock data - replace with actual API call
const mockAds: Ad[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro',
    description: 'Excellent condition, barely used',
    price: 899,
    category: 'Electronics',
    images: ['/iphone.jpg'],
    location: 'Toronto, ON',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'user1',
    contactInfo: {
      email: 'seller@example.com',
      phone: '123-456-7890',
    },
    status: 'active',
  },
  // Add more mock ads as needed
];

export const AdListing: React.FC = () => {
  const [filters, setFilters] = useState<AdFilters>({
    searchQuery: '',
    category: undefined,
    minPrice: 0,
    maxPrice: 10000,
    location: '',
  });

  const handleFilterChange = (field: keyof AdFilters, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const filteredAds = mockAds.filter(ad => {
    if (filters.searchQuery && !ad.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.category && ad.category !== filters.category) {
      return false;
    }
    if (filters.minPrice && ad.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && ad.price > filters.maxPrice) {
      return false;
    }
    if (filters.location && !ad.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Browse Advertisements
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search"
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category || ''}
                label="Category"
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {['Electronics', 'Vehicles', 'Property', 'Furniture', 'Fashion', 'Tools'].map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Location"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Price Range</Typography>
            <Slider
              value={[filters.minPrice || 0, filters.maxPrice || 10000]}
              onChange={(_, newValue) => {
                const [min, max] = newValue as number[];
                handleFilterChange('minPrice', min);
                handleFilterChange('maxPrice', max);
              }}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">${filters.minPrice}</Typography>
              <Typography variant="caption">${filters.maxPrice}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {filteredAds.map((ad) => (
          <Grid item key={ad.id} xs={12} sm={6} md={4} lg={3}>
            <AdCard ad={ad} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
