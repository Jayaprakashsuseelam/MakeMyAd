import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  FormGroup,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Role, Permission } from '../../types';
import { mockPermissions } from '../../data/mockData';

interface RoleFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (roleData: Omit<Role, 'id' | 'createdAt'>) => void;
  role?: Role | null;
  loading?: boolean;
}

const RoleForm: React.FC<RoleFormProps> = ({
  open,
  onClose,
  onSubmit,
  role,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
    isDefault: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        description: role.description,
        permissions: role.permissions.map(p => p.id),
        isDefault: role.isDefault,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        permissions: [],
        isDefault: false,
      });
    }
    setErrors({});
  }, [role, open]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Role name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.permissions.length === 0) {
      newErrors.permissions = 'At least one permission is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const selectedPermissions = mockPermissions.filter(p =>
        formData.permissions.includes(p.id)
      );
      onSubmit({
        name: formData.name,
        description: formData.description,
        permissions: selectedPermissions,
        isDefault: formData.isDefault,
      });
    }
  };

  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSwitchChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.checked }));
  };

  const handlePermissionChange = (permissionId: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter(id => id !== permissionId),
    }));
    if (errors.permissions) {
      setErrors(prev => ({ ...prev, permissions: '' }));
    }
  };

  const groupPermissionsByResource = () => {
    const grouped: Record<string, Permission[]> = {};
    mockPermissions.forEach(permission => {
      if (!grouped[permission.resource]) {
        grouped[permission.resource] = [];
      }
      grouped[permission.resource].push(permission);
    });
    return grouped;
  };

  const groupedPermissions = groupPermissionsByResource();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {role ? 'Edit Role' : 'Create New Role'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Role Name"
              value={formData.name}
              onChange={handleChange('name')}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              required
            />

            <TextField
              label="Description"
              value={formData.description}
              onChange={handleChange('description')}
              error={!!errors.description}
              helperText={errors.description}
              fullWidth
              multiline
              rows={3}
              required
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.isDefault}
                  onChange={handleSwitchChange('isDefault')}
                />
              }
              label="Default Role"
            />

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Permissions
              </Typography>
              {errors.permissions && (
                <Typography variant="caption" color="error" display="block" gutterBottom>
                  {errors.permissions}
                </Typography>
              )}

              {Object.entries(groupedPermissions).map(([resource, permissions]) => (
                <Accordion key={resource} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                      {resource}
                    </Typography>
                    <Chip
                      label={`${permissions.filter(p => formData.permissions.includes(p.id)).length}/${permissions.length}`}
                      size="small"
                      sx={{ ml: 2 }}
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      {permissions.map((permission) => (
                        <FormControlLabel
                          key={permission.id}
                          control={
                            <Checkbox
                              checked={formData.permissions.includes(permission.id)}
                              onChange={handlePermissionChange(permission.id)}
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body2">
                                {permission.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {permission.description}
                              </Typography>
                            </Box>
                          }
                        />
                      ))}
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Saving...' : role ? 'Update Role' : 'Create Role'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RoleForm;
