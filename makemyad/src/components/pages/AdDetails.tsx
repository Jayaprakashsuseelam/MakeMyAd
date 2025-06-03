import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Button,
  Divider,
  Chip,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogContent,
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  Share,
  Favorite,
  FavoriteBorder,
  NavigateBefore,
  NavigateNext,
  Close,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setSelectedAd } from '../../store/slices/adsSlice';

const AdDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ad = useSelector((state: RootState) => state.ads.selectedAd);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isImageDialogOpen, setImageDialogOpen] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch the specific ad here
    // For now, we'll use the mock data
    if (id) {
      dispatch(setSelectedAd({
        id,
        title: 'Sample Ad Title',
        description: 'This is a detailed description of the item. It includes all the important information that a buyer might want to know about the product, its condition, and any special features.',
        price: 999.99,
        category: 'Electronics',
        location: 'Toronto, ON',
        images: [
          'https://source.unsplash.com/random/800x600/?electronics',
          'https://source.unsplash.com/random/800x600/?technology',
          'https://source.unsplash.com/random/800x600/?gadget',
        ],
        createdAt: new Date().toISOString(),
        userId: 'user123',
      }));
    }
  }, [id, dispatch]);

  if (!ad) {
    return <Typography>Loading...</Typography>;
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? ad.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === ad.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    // Implement share functionality
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Left Column - Images and Details */}
        <Grid container item xs={12} md={8}>
          {/* Image Gallery */}
          <Paper
            sx={{
              position: 'relative',
              mb: 3,
              '&:hover .navigation-buttons': {
                opacity: 1,
              },
            }}
          >
            <Box
              component="img"
              src={ad.images[currentImageIndex]}
              alt={ad.title}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 500,
                objectFit: 'contain',
                cursor: 'pointer',
              }}
              onClick={() => setImageDialogOpen(true)}
            />
            <Box
              className="navigation-buttons"
              sx={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'space-between',
                transform: 'translateY(-50%)',
                opacity: 0,
                transition: 'opacity 0.2s',
              }}
            >
              <IconButton
                onClick={handlePrevImage}
                sx={{ color: 'white', bgcolor: 'rgba(0,0,0,0.5)' }}
              >
                <NavigateBefore />
              </IconButton>
              <IconButton
                onClick={handleNextImage}
                sx={{ color: 'white', bgcolor: 'rgba(0,0,0,0.5)' }}
              >
                <NavigateNext />
              </IconButton>
            </Box>
          </Paper>

          {/* Thumbnail Grid */}
          <Grid container spacing={1} sx={{ mb: 3 }}>
            {ad.images.map((image, index) => (
              <Grid container item xs={3} key={index}>
                <Box
                  component="img"
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: 80,
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: index === currentImageIndex ? '2px solid primary.main' : 'none',
                  }}
                  onClick={() => setCurrentImageIndex(index)}
                />
              </Grid>
            ))}
          </Grid>

          {/* Ad Details */}
          <Typography variant="h4" gutterBottom>
            {ad.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip icon={<LocationOn />} label={ad.location} />
            <Chip label={ad.category} variant="outlined" />
          </Box>
          <Typography variant="h5" color="primary" gutterBottom>
            ${ad.price}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" paragraph>
            {ad.description}
          </Typography>
        </Grid>

        {/* Right Column - Contact and Actions */}
        <Grid container item xs={12} md={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Seller Information
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Phone sx={{ mr: 1 }} />
                <Typography>+1 (XXX) XXX-XXXX</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Email sx={{ mr: 1 }} />
                <Typography>contact@example.com</Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                sx={{ mb: 1 }}
                onClick={() => window.location.href = 'mailto:contact@example.com'}
              >
                Contact Seller
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => window.location.href = 'tel:+1234567890'}
              >
                Call Seller
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                  onClick={handleFavoriteToggle}
                  fullWidth
                >
                  {isFavorite ? 'Saved' : 'Save'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Share />}
                  onClick={handleShare}
                  fullWidth
                >
                  Share
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Full Screen Image Dialog */}
      <Dialog
        open={isImageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        maxWidth="xl"
        fullWidth
      >
        <DialogContent sx={{ position: 'relative', p: 0 }}>
          <IconButton
            onClick={() => setImageDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)',
            }}
          >
            <Close />
          </IconButton>
          <Box
            component="img"
            src={ad.images[currentImageIndex]}
            alt={ad.title}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '90vh',
              objectFit: 'contain',
            }}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AdDetails;
