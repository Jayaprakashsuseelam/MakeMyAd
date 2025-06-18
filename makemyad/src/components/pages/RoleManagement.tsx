import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Add as AddIcon, FilterList as FilterIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  fetchRoles,
  createRole,
  updateRole,
  deleteRole,
  setFilters,
  clearFilters,
} from '../../store/slices/rolesSlice';
import RoleCard from '../admin/RoleCard';
import RoleForm from '../admin/RoleForm';
import { Role, RoleFilters } from '../../types';

const RoleManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { roles, loading, error, filters } = useSelector((state: RootState) => state.roles);

  const [formOpen, setFormOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchRoles(filters));
  }, [dispatch, filters]);

  const handleCreateRole = () => {
    setEditingRole(null);
    setFormOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setFormOpen(true);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoleToDelete(roleId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (roleToDelete) {
      dispatch(deleteRole(roleToDelete));
      setDeleteDialogOpen(false);
      setRoleToDelete(null);
    }
  };

  const handleFormSubmit = (roleData: Omit<Role, 'id' | 'createdAt'>) => {
    if (editingRole) {
      dispatch(updateRole({ id: editingRole.id, roleData }));
    } else {
      dispatch(createRole(roleData));
    }
    setFormOpen(false);
    setEditingRole(null);
  };

  const handleFiltersChange = (newFilters: RoleFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const filteredRoles = roles.filter(role => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!role.name.toLowerCase().includes(searchLower) &&
          !role.description.toLowerCase().includes(searchLower)) {
        return false;
      }
    }

    if (filters.isDefault !== undefined && role.isDefault !== filters.isDefault) {
      return false;
    }

    return true;
  });

  const sortedRoles = [...filteredRoles].sort((a, b) => {
    if (!filters.sortBy) return 0;

    let aValue: any;
    let bValue: any;

    switch (filters.sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      default:
        return 0;
    }

    if (filters.sortOrder === 'desc') {
      return bValue > aValue ? 1 : -1;
    } else {
      return aValue > bValue ? 1 : -1;
    }
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Role Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateRole}
        >
          Add Role
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FilterIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Filters</Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
          <TextField
            label="Search roles"
            value={filters.search || ''}
            onChange={(e) => handleFiltersChange({ ...filters, search: e.target.value })}
            fullWidth
            size="small"
          />

          <FormControl fullWidth size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filters.sortBy || ''}
              onChange={(e) => handleFiltersChange({ ...filters, sortBy: e.target.value as any })}
              label="Sort By"
            >
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="createdAt">Created Date</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Sort Order</InputLabel>
            <Select
              value={filters.sortOrder || ''}
              onChange={(e) => handleFiltersChange({ ...filters, sortOrder: e.target.value as any })}
              label="Sort Order"
            >
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Default Role</InputLabel>
            <Select
              value={filters.isDefault === undefined ? '' : filters.isDefault.toString()}
              onChange={(e) => {
                const value = e.target.value;
                handleFiltersChange({
                  ...filters,
                  isDefault: value === '' ? undefined : value === 'true'
                });
              }}
              label="Default Role"
            >
              <MenuItem value="">All Roles</MenuItem>
              <MenuItem value="true">Default Only</MenuItem>
              <MenuItem value="false">Non-Default Only</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {(filters.search || filters.sortBy || filters.sortOrder || filters.isDefault !== undefined) && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              onClick={handleClearFilters}
              variant="outlined"
              size="small"
            >
              Clear Filters
            </Button>
          </Box>
        )}
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {sortedRoles.length} of {roles.length} roles
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {sortedRoles.map((role) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={role.id}>
                <RoleCard
                  role={role}
                  onEdit={handleEditRole}
                  onDelete={handleDeleteRole}
                />
              </Grid>
            ))}
          </Grid>

          {sortedRoles.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No roles found
              </Typography>
            </Box>
          )}
        </>
      )}

      <RoleForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingRole(null);
        }}
        onSubmit={handleFormSubmit}
        role={editingRole}
        loading={loading}
      />

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this role? This action cannot be undone.
            Users with this role will need to be reassigned.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RoleManagement;
