import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Role, Permission, RoleFilters } from '../../types';
import { mockRoles, mockPermissions } from '../../data/mockData';

interface RolesState {
  roles: Role[];
  permissions: Permission[];
  loading: boolean;
  error: string | null;
  filters: RoleFilters;
}

const initialState: RolesState = {
  roles: mockRoles,
  permissions: mockPermissions,
  loading: false,
  error: null,
  filters: {},
};

export const fetchRoles = createAsyncThunk(
  'roles/fetchRoles',
  async (filters?: RoleFilters) => {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockRoles;
  }
);

export const fetchPermissions = createAsyncThunk(
  'roles/fetchPermissions',
  async () => {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPermissions;
  }
);

export const createRole = createAsyncThunk(
  'roles/createRole',
  async (roleData: Omit<Role, 'id' | 'createdAt'>) => {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const newRole: Role = {
      ...roleData,
      id: `role${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    return newRole;
  }
);

export const updateRole = createAsyncThunk(
  'roles/updateRole',
  async ({ id, roleData }: { id: string; roleData: Partial<Role> }) => {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id, roleData };
  }
);

export const deleteRole = createAsyncThunk(
  'roles/deleteRole',
  async (roleId: string) => {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return roleId;
  }
);

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Roles
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch roles';
      })
      // Fetch Permissions
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch permissions';
      })
      // Create Role
      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles.push(action.payload);
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create role';
      })
      // Update Role
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.roles.findIndex(role => role.id === action.payload.id);
        if (index !== -1) {
          state.roles[index] = { ...state.roles[index], ...action.payload.roleData };
        }
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update role';
      })
      // Delete Role
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = state.roles.filter(role => role.id !== action.payload);
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete role';
      });
  },
});

export const { setFilters, clearFilters } = rolesSlice.actions;
export default rolesSlice.reducer;
