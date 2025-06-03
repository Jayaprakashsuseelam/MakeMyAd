import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import {
  FilterList,
  Sort,
  Clear,
  LocationOn,
  AttachMoney,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
  setCategory,
  setLocation,
  setPriceRange,
  setSortBy,
  clearFilters,
} from '../../store/slices/filtersSlice';
import { fetchAds, filterAds } from '../../store/slices/adsSlice';

const AdListing: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items: ads, loading } = useSelector((state: RootState) => state.ads);
  const filters = useSelector((state: RootState) => state.filters);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [priceRange, setPriceRangeLocal] = useState<number[]>([0, 10000]);

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  useEffect(() => {
    // Apply filters whenever they change
    dispatch(filterAds(filters));
  }, [dispatch, filters]);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRangeLocal(newValue as number[]);
  };

  const handlePriceChangeCommitted = () => {
    dispatch(setPriceRange({ min: priceRange[0], max: priceRange[1] }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setPriceRangeLocal([0, 10000]);
  };

  const filterDrawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Filters</Typography>
        <IconButton onClick={handleClearFilters} size="small">
          <Clear />
        </IconButton>
      </Box>

      <List>
        <ListItem>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category || ''}
              label="Category"
              onChange={(e) => dispatch(setCategory(e.target.value))}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="vehicles">Vehicles</MenuItem>
              <MenuItem value="property">Property</MenuItem>
              <MenuItem value="jobs">Jobs</MenuItem>
              <MenuItem value="furniture">Furniture</MenuItem>
              <MenuItem value="fashion">Fashion</MenuItem>
            </Select>
          </FormControl>
        </ListItem>

        <ListItem>
          <TextField
            fullWidth
            label="Location"
            value={filters.location || ''}
            onChange={(e) => dispatch(setLocation(e.target.value))}
            InputProps={{
              startAdornment: <LocationOn sx={{ mr: 1, color: 'action.active' }} />,
            }}
          />
        </ListItem>

        <ListItem>
          <Box sx={{ width: '100%' }}>
            <Typography gutterBottom>Price Range</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              onChangeCommitted={handlePriceChangeCommitted}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              step={100}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">${priceRange[0]}</Typography>
              <Typography variant="body2">${priceRange[1]}</Typography>
            </Box>
          </Box>
        </ListItem>

        <ListItem>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filters.sortBy || 'date'}
              label="Sort By"
              onChange={(e) => dispatch(setSortBy(e.target.value))}
            >
              <MenuItem value="date">Newest First</MenuItem>
              <MenuItem value="price">Price: Low to High</MenuItem>
              <MenuItem value="relevance">Most Relevant</MenuItem>
            </Select>
          </FormControl>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Browse Ads</Typography>
        <Button
          startIcon={<FilterList />}
          onClick={() => setDrawerOpen(true)}
          sx={{ display: { sm: 'none' } }}
        >
          Filters
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Filters for desktop */}
        <Grid
          container
          item
          sm={3}
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          {filterDrawer}
        </Grid>

        {/* Ad Grid */}
        <Grid container item xs={12} sm={9}>
          <Grid container spacing={2}>
            {loading ? (
              <Typography>Loading...</Typography>
            ) : ads.length === 0 ? (
              <Typography>No ads found</Typography>
            ) : (
              ads.map((ad) => (
                <Grid container item xs={12} sm={6} md={4} key={ad.id}>
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
                    onClick={() => navigate(`/ads/${ad.id}`)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={ad.images[0]}
                      alt={ad.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {ad.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="primary"
                        gutterBottom
                      >
                        ${ad.price}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          icon={<LocationOn />}
                          label={ad.location}
                          size="small"
                        />
                        <Chip
                          label={ad.category}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* Mobile Filters Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {filterDrawer}
      </Drawer>
    </Container>
  );
};

export default AdListing;
