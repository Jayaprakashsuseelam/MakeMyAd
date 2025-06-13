import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Button,
  ImageList,
  ImageListItem,
  Chip,
  Divider,
} from '@mui/material';
import { Ad } from '../types/ad';
import { formatDistanceToNow } from 'date-fns';

// Temporary mock data - replace with actual API call
const mockAd: Ad = {
  id: '1',
  title: 'iPhone 13 Pro',
  description: 'Excellent condition iPhone 13 Pro, 256GB, Pacific Blue. Includes original box, charger, and accessories. No scratches or dents, battery health at 95%.',
  price: 899,
  category: 'Electronics',
  images: ['/iphone.jpg', '/iphone2.jpg', '/iphone3.jpg'],
  location: 'Toronto, ON',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  userId: 'user1',
  contactInfo: {
    email: 'seller@example.com',
    phone: '123-456-7890',
  },
  status: 'active',
};

export const AdDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);

  // In a real application, fetch the ad data based on the ID
  const ad = mockAd;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Image Gallery */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Box
              component="img"
              src={ad.images[selectedImage] || '/placeholder-image.jpg'}
              alt={ad.title}
              sx={{
                width: '100%',
                height: 400,
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />
            <ImageList sx={{ mt: 2 }} cols={4} rowHeight={100}>
              {ad.images.map((image, index) => (
                <ImageListItem
                  key={index}
                  sx={{
                    cursor: 'pointer',
                    border: selectedImage === index ? '2px solid #1976d2' : 'none',
                  }}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${ad.title} - ${index + 1}`}
                    loading="lazy"
                    style={{ height: '100%', objectFit: 'cover' }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Paper>
        </Grid>

        {/* Ad Details */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {ad.title}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${ad.price.toLocaleString()}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip label={ad.category} />
              <Chip
                label={ad.status}
                color={ad.status === 'active' ? 'success' : 'default'}
              />
            </Box>
            <Typography variant="body1" paragraph>
              {ad.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom>
              Location
            </Typography>
            <Typography variant="body2" paragraph>
              {ad.location}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Posted
            </Typography>
            <Typography variant="body2" paragraph>
              {formatDistanceToNow(new Date(ad.createdAt), { addSuffix: true })}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              href={`mailto:${ad.contactInfo.email}`}
            >
              Contact Seller
            </Button>
            {ad.contactInfo.phone && (
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 1 }}
                href={`tel:${ad.contactInfo.phone}`}
              >
                Call Seller
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
