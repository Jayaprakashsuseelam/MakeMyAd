import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Typography,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { Clear as ClearIcon, FilterList as FilterIcon } from '@mui/icons-material';
import { UserFilters } from '../../types';
import { mockRoles } from '../../data/mockData';

interface UserFiltersProps {
  filters: UserFilters;
  onFiltersChange: (filters: UserFilters) => void;
  onClearFilters: () => void;
}

const UserFiltersComponent: React.FC<UserFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const handleChange = (field: keyof UserFilters) => (
    e: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    const value = e.target.value;
    onFiltersChange({ ...filters, [field]: value });
  };

  const handleSwitchChange = (field: keyof UserFilters) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFiltersChange({ ...filters, [field]: e.target.checked });
  };

  const hasActiveFilters = Object.values(filters).some(value =>
    value !== undefined && value !== '' && value !== null
  );

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <FilterIcon sx={{ mr: 1 }} />
        <Typography variant="h6">Filters</Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
        <TextField
          label="Search by name or email"
          value={filters.search || ''}
          onChange={handleChange('search')}
          fullWidth
          size="small"
        />

        <FormControl fullWidth size="small">
          <InputLabel>Role</InputLabel>
          <Select
            value={filters.role || ''}
            onChange={handleChange('role')}
            label="Role"
          >
            <MenuItem value="">All Roles</MenuItem>
            {mockRoles.map((role) => (
              <MenuItem key={role.id} value={role.name}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={filters.sortBy || ''}
            onChange={handleChange('sortBy')}
            label="Sort By"
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="createdAt">Join Date</MenuItem>
            <MenuItem value="lastLogin">Last Login</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Sort Order</InputLabel>
          <Select
            value={filters.sortOrder || ''}
            onChange={handleChange('sortOrder')}
            label="Sort Order"
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={filters.isActive === true}
              onChange={handleSwitchChange('isActive')}
            />
          }
          label="Active Users Only"
        />
      </Box>

      {hasActiveFilters && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            startIcon={<ClearIcon />}
            onClick={onClearFilters}
            variant="outlined"
            size="small"
          >
            Clear Filters
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default UserFiltersComponent;
