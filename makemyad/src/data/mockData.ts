import { Ad, Category, User, Role, Permission } from '../types';

export const mockAds: Ad[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro Max',
    description: 'Excellent condition, 256GB, Pacific Blue',
    price: 899,
    category: 'Electronics',
    location: 'New York, NY',
    images: ['https://via.placeholder.com/300x200'],
    createdAt: '2024-01-15T10:30:00Z',
    userId: 'user1',
  },
  {
    id: '2',
    title: '2019 Honda Civic',
    description: 'Low mileage, well maintained, automatic transmission',
    price: 18500,
    category: 'Vehicles',
    location: 'Los Angeles, CA',
    images: ['https://via.placeholder.com/300x200'],
    createdAt: '2024-01-14T15:45:00Z',
    userId: 'user2',
  },
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    subcategories: ['Phones', 'Computers', 'Tablets', 'Accessories'],
  },
  {
    id: '2',
    name: 'Vehicles',
    subcategories: ['Cars', 'Motorcycles', 'Trucks', 'Boats'],
  },
  {
    id: '3',
    name: 'Real Estate',
    subcategories: ['Apartments', 'Houses', 'Commercial', 'Land'],
  },
];

export const mockPermissions: Permission[] = [
  {
    id: 'perm1',
    name: 'View Ads',
    description: 'Can view all advertisements',
    resource: 'ads',
    action: 'read',
  },
  {
    id: 'perm2',
    name: 'Create Ads',
    description: 'Can create new advertisements',
    resource: 'ads',
    action: 'create',
  },
  {
    id: 'perm3',
    name: 'Edit Ads',
    description: 'Can edit advertisements',
    resource: 'ads',
    action: 'update',
  },
  {
    id: 'perm4',
    name: 'Delete Ads',
    description: 'Can delete advertisements',
    resource: 'ads',
    action: 'delete',
  },
  {
    id: 'perm5',
    name: 'Manage Users',
    description: 'Can manage user accounts',
    resource: 'users',
    action: 'manage',
  },
  {
    id: 'perm6',
    name: 'Manage Roles',
    description: 'Can manage user roles and permissions',
    resource: 'roles',
    action: 'manage',
  },
  {
    id: 'perm7',
    name: 'View Analytics',
    description: 'Can view system analytics and reports',
    resource: 'analytics',
    action: 'read',
  },
];

export const mockRoles: Role[] = [
  {
    id: 'role1',
    name: 'Admin',
    description: 'Full system access with all permissions',
    permissions: mockPermissions,
    isDefault: false,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'role2',
    name: 'Moderator',
    description: 'Can manage ads and moderate content',
    permissions: mockPermissions.filter(p => ['perm1', 'perm2', 'perm3', 'perm4'].includes(p.id)),
    isDefault: false,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'role3',
    name: 'User',
    description: 'Standard user with basic permissions',
    permissions: mockPermissions.filter(p => ['perm1', 'perm2', 'perm3'].includes(p.id)),
    isDefault: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'role4',
    name: 'Guest',
    description: 'Limited access for unregistered users',
    permissions: mockPermissions.filter(p => ['perm1'].includes(p.id)),
    isDefault: false,
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-0123',
    location: 'New York, NY',
    role: 'Admin',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T10:30:00Z',
  },
  {
    id: 'user2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1-555-0124',
    location: 'Los Angeles, CA',
    role: 'Moderator',
    isActive: true,
    createdAt: '2024-01-02T00:00:00Z',
    lastLogin: '2024-01-14T15:45:00Z',
  },
  {
    id: 'user3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '+1-555-0125',
    location: 'Chicago, IL',
    role: 'User',
    isActive: true,
    createdAt: '2024-01-03T00:00:00Z',
    lastLogin: '2024-01-13T09:15:00Z',
  },
  {
    id: 'user4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    phone: '+1-555-0126',
    location: 'Miami, FL',
    role: 'User',
    isActive: false,
    createdAt: '2024-01-04T00:00:00Z',
    lastLogin: '2024-01-10T14:20:00Z',
  },
  {
    id: 'user5',
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    phone: '+1-555-0127',
    location: 'Seattle, WA',
    role: 'User',
    isActive: true,
    createdAt: '2024-01-05T00:00:00Z',
    lastLogin: '2024-01-12T11:30:00Z',
  },
];
