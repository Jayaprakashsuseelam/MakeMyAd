import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material';
import { Ad } from '../../types/ad';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface AdCardProps {
  ad: Ad;
}

export const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ads/${ad.id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)'
        }
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={ad.images[0] || '/placeholder-image.jpg'}
        alt={ad.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {ad.title}
        </Typography>
        <Typography variant="h5" color="primary" sx={{ mb: 1 }}>
          ${ad.price.toLocaleString()}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Chip label={ad.category} size="small" />
          <Chip
            label={ad.status}
            size="small"
            color={ad.status === 'active' ? 'success' : 'default'}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" noWrap>
          {ad.description}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {ad.location} • {formatDistanceToNow(new Date(ad.createdAt), { addSuffix: true })}
        </Typography>
      </CardContent>
    </Card>
  );
};
