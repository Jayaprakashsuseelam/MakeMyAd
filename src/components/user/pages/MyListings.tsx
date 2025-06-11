import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

interface Listing {
  id: string;
  title: string;
  price: number;
  status: 'active' | 'pending' | 'sold';
  image: string;
  category: string;
  createdAt: string;
}

const MyListings: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedListing, setSelectedListing] = React.useState<string | null>(null);

  // TODO: Replace with actual data from Redux store
  const listings: Listing[] = [
    {
      id: '1',
      title: 'iPhone 13 Pro',
      price: 899,
      status: 'active',
      image: '/path/to/iphone.jpg',
      category: 'Electronics',
      createdAt: '2024-03-15',
    },
    {
      id: '2',
      title: 'Mountain Bike',
      price: 450,
      status: 'pending',
      image: '/path/to/bike.jpg',
      category: 'Sports',
      createdAt: '2024-03-14',
    },
  ];

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, listingId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedListing(listingId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedListing(null);
  };

  const handleEdit = (listingId: string) => {
    navigate(`/edit-listing/${listingId}`);
    handleMenuClose();
  };

  const handleDelete = (listingId: string) => {
    // TODO: Implement delete functionality
    console.log('Delete listing:', listingId);
    handleMenuClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'sold':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          My Listings
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/create-listing')}
        >
          Create New Listing
        </Button>
      </Box>

      <Grid container spacing={3}>
        {listings.map((listing) => (
          <Grid item xs={12} sm={6} md={4} key={listing.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={listing.image}
                alt={listing.title}
              />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" noWrap sx={{ maxWidth: '80%' }}>
                    {listing.title}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, listing.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  ${listing.price}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <Chip
                    label={listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                    color={getStatusColor(listing.status) as any}
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    Posted: {listing.createdAt}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => selectedListing && handleEdit(selectedListing)}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => selectedListing && handleDelete(selectedListing)}
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default MyListings;
