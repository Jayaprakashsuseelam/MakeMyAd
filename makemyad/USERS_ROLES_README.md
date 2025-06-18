# Users and Roles Management System

This document describes the comprehensive users and roles management system implemented for the MakeMyAd application.

## Overview

The system provides a complete role-based access control (RBAC) solution with the following features:

- **User Management**: Create, read, update, and delete user accounts
- **Role Management**: Define and manage user roles with granular permissions
- **Permission System**: Fine-grained permission control based on resources and actions
- **Admin Dashboard**: Centralized administration interface
- **Protected Routes**: Role-based route protection
- **Permission Utilities**: Helper functions for permission checking

## Architecture

### Core Components

1. **Types** (`src/types/index.ts`)
   - Extended User interface with role and status fields
   - Role and Permission interfaces
   - Filter interfaces for search and sorting

2. **Redux Store**
   - `userSlice.ts`: User management state and actions
   - `rolesSlice.ts`: Role management state and actions
   - Integrated with the main store

3. **Components**
   - Admin pages: Dashboard, User Management, Role Management
   - Reusable components: Cards, Forms, Filters
   - Protected routes for access control

4. **Utilities**
   - Permission manager for role-based access control
   - React hooks for permission checking

## Features

### User Management

#### User Interface
- **UserCard**: Displays user information with role and status indicators
- **UserForm**: Create and edit user accounts with validation
- **UserFilters**: Advanced filtering and sorting options

#### User Operations
- Create new user accounts
- Edit existing user information
- Activate/deactivate user accounts
- Assign roles to users
- Delete user accounts (with confirmation)

#### Filtering and Search
- Search by name or email
- Filter by role
- Filter by active status
- Sort by name, email, join date, or last login
- Clear filters functionality

### Role Management

#### Role Interface
- **RoleCard**: Displays role information with permission counts
- **RoleForm**: Create and edit roles with permission selection
- **RoleFilters**: Filter and sort roles

#### Role Operations
- Create new roles with custom permissions
- Edit existing roles and their permissions
- Set default roles
- Delete roles (with protection for default roles)

#### Permission System
- Granular permissions based on resources and actions
- Resource-based grouping (ads, users, roles, analytics)
- Action types: create, read, update, delete, manage
- Permission inheritance and hierarchy

### Admin Dashboard

#### Overview
- System statistics (total users, active users, roles)
- Quick access to user and role management
- Recent user activity
- Quick links to various admin functions

#### Navigation
- Direct access to user management
- Direct access to role management
- Placeholder links for future features

### Access Control

#### Protected Routes
- Route-level permission checking
- Role-based access control
- Graceful access denied handling
- Loading states during permission checks

#### Permission Utilities
- `PermissionManager`: Singleton class for permission logic
- `usePermissions`: React hook for component-level permission checking
- Role hierarchy management
- User management permissions

## Data Structure

### User Interface
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}
```

### Role Interface
```typescript
interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isDefault: boolean;
  createdAt: string;
}
```

### Permission Interface
```typescript
interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
}
```

## Default Roles and Permissions

### Admin Role
- Full system access
- All permissions granted
- Can manage users, roles, and content

### Moderator Role
- Content management permissions
- Can manage ads (create, read, update, delete)
- Cannot manage users or roles

### User Role (Default)
- Basic user permissions
- Can create, read, and update ads
- Cannot delete ads or manage system

### Guest Role
- Limited read-only access
- Can only view ads

## Usage Examples

### Checking Permissions in Components
```typescript
import { usePermissions } from '../utils/permissions';

const MyComponent = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const permissions = usePermissions(currentUser);

  if (permissions.canManageUsers()) {
    // Show admin features
  }

  if (permissions.canCreateAds()) {
    // Show create ad button
  }
};
```

### Protecting Routes
```typescript
<ProtectedRoute
  requiredPermissions={[{ resource: 'users', action: 'manage' }]}
  fallbackPath="/"
>
  <UserManagement />
</ProtectedRoute>
```

### Using Permission Manager Directly
```typescript
import { permissionManager } from '../utils/permissions';

const canManage = permissionManager.canManageUsers(user);
const hasPermission = permissionManager.hasPermission(user, {
  resource: 'ads',
  action: 'delete'
});
```

## API Integration

The system is designed to work with REST APIs. The Redux slices include async thunks for:

- User operations: fetch, create, update, delete
- Role operations: fetch, create, update, delete
- Permission operations: fetch

### API Endpoints (To be implemented)
- `GET /api/users` - Fetch users with filters
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/roles` - Fetch roles
- `POST /api/roles` - Create role
- `PUT /api/roles/:id` - Update role
- `DELETE /api/roles/:id` - Delete role

## Security Considerations

1. **Role Hierarchy**: Higher roles can manage lower roles
2. **Permission Inheritance**: 'manage' permission includes all other permissions
3. **Default Role Protection**: Default roles cannot be deleted
4. **User Management Permissions**: Users can only manage users of lower roles
5. **Route Protection**: All admin routes are protected by permissions

## Future Enhancements

1. **Audit Logging**: Track user actions and changes
2. **Bulk Operations**: Mass user/role updates
3. **Advanced Permissions**: Time-based permissions, conditional permissions
4. **User Groups**: Group-based permission management
5. **API Rate Limiting**: Prevent abuse of admin functions
6. **Two-Factor Authentication**: Enhanced security for admin accounts

## File Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── UserCard.tsx
│   │   ├── UserForm.tsx
│   │   ├── UserFilters.tsx
│   │   ├── RoleCard.tsx
│   │   └── RoleForm.tsx
│   ├── auth/
│   │   └── ProtectedRoute.tsx
│   └── pages/
│       ├── AdminDashboard.tsx
│       ├── UserManagement.tsx
│       └── RoleManagement.tsx
├── store/
│   ├── slices/
│   │   ├── userSlice.ts
│   │   └── rolesSlice.ts
│   └── index.ts
├── types/
│   └── index.ts
├── utils/
│   └── permissions.ts
└── data/
    └── mockData.ts
```

## Getting Started

1. **Access Admin Dashboard**: Navigate to `/admin`
2. **Manage Users**: Navigate to `/admin/users`
3. **Manage Roles**: Navigate to `/admin/roles`

The system is ready for production use with proper API integration and security measures.
