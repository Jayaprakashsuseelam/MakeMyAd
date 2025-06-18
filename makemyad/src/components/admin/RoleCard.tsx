import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Box,
  Avatar,
  Tooltip,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Security as SecurityIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { Role } from '../../types';

interface RoleCardProps {
  role: Role;
  onEdit: (role: Role) => void;
  onDelete: (roleId: string) => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getPermissionCount = () => {
    return role.permissions.length;
  };

  const getResourceCount = () => {
    const resources = new Set(role.permissions.map(p => p.resource));
    return resources.size;
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2, bgcolor: 'secondary.main' }}>
            <SecurityIcon />
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6" component="h3">
                {role.name}
              </Typography>
              {role.isDefault && (
                <Tooltip title="Default Role">
                  <StarIcon sx={{ ml: 1, color: 'warning.main', fontSize: 20 }} />
                </Tooltip>
              )}
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {role.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={`${getPermissionCount()} permissions`}
                size="small"
                color="primary"
                variant="outlined"
              />
              <Chip
                label={`${getResourceCount()} resources`}
                size="small"
                color="secondary"
                variant="outlined"
              />
            </Box>
          </Box>
          <Box>
            <Tooltip title="Edit Role">
              <IconButton
                size="small"
                onClick={() => onEdit(role)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Role">
              <IconButton
                size="small"
                color="error"
                onClick={() => onDelete(role.id)}
                disabled={role.isDefault}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Permissions:
          </Typography>
          <List dense sx={{ maxHeight: 120, overflow: 'auto' }}>
            {role.permissions.slice(0, 3).map((permission) => (
              <ListItem key={permission.id} sx={{ py: 0 }}>
                <ListItemText
                  primary={permission.name}
                  secondary={`${permission.resource} - ${permission.action}`}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItem>
            ))}
            {role.permissions.length > 3 && (
              <ListItem sx={{ py: 0 }}>
                <ListItemText
                  primary={`+${role.permissions.length - 3} more permissions`}
                  primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
                />
              </ListItem>
            )}
          </List>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ScheduleIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Created: {formatDate(role.createdAt)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RoleCard;
