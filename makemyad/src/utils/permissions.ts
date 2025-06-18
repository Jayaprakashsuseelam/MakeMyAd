import { User, Role, Permission } from '../types';

export interface PermissionCheck {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
}

export class PermissionManager {
  private static instance: PermissionManager;
  private roles: Role[] = [];
  private permissions: Permission[] = [];

  private constructor() {}

  static getInstance(): PermissionManager {
    if (!PermissionManager.instance) {
      PermissionManager.instance = new PermissionManager();
    }
    return PermissionManager.instance;
  }

  setRoles(roles: Role[]) {
    this.roles = roles;
  }

  setPermissions(permissions: Permission[]) {
    this.permissions = permissions;
  }

  hasPermission(user: User, check: PermissionCheck): boolean {
    const userRole = this.roles.find(role => role.name === user.role);
    if (!userRole) return false;

    return userRole.permissions.some(permission =>
      permission.resource === check.resource &&
      (permission.action === check.action || permission.action === 'manage')
    );
  }

  hasAnyPermission(user: User, checks: PermissionCheck[]): boolean {
    return checks.some(check => this.hasPermission(user, check));
  }

  hasAllPermissions(user: User, checks: PermissionCheck[]): boolean {
    return checks.every(check => this.hasPermission(user, check));
  }

  getUserPermissions(user: User): Permission[] {
    const userRole = this.roles.find(role => role.name === user.role);
    return userRole ? userRole.permissions : [];
  }

  canManageUsers(user: User): boolean {
    return this.hasPermission(user, { resource: 'users', action: 'manage' });
  }

  canManageRoles(user: User): boolean {
    return this.hasPermission(user, { resource: 'roles', action: 'manage' });
  }

  canManageAds(user: User): boolean {
    return this.hasPermission(user, { resource: 'ads', action: 'manage' });
  }

  canCreateAds(user: User): boolean {
    return this.hasPermission(user, { resource: 'ads', action: 'create' });
  }

  canEditAds(user: User): boolean {
    return this.hasPermission(user, { resource: 'ads', action: 'update' });
  }

  canDeleteAds(user: User): boolean {
    return this.hasPermission(user, { resource: 'ads', action: 'delete' });
  }

  canViewAnalytics(user: User): boolean {
    return this.hasPermission(user, { resource: 'analytics', action: 'read' });
  }

  isAdmin(user: User): boolean {
    return user.role.toLowerCase() === 'admin';
  }

  isModerator(user: User): boolean {
    return user.role.toLowerCase() === 'moderator';
  }

  isUser(user: User): boolean {
    return user.role.toLowerCase() === 'user';
  }

  getRoleHierarchy(): Record<string, number> {
    return {
      'admin': 3,
      'moderator': 2,
      'user': 1,
      'guest': 0,
    };
  }

  hasHigherRole(user1: User, user2: User): boolean {
    const hierarchy = this.getRoleHierarchy();
    const level1 = hierarchy[user1.role.toLowerCase()] || 0;
    const level2 = hierarchy[user2.role.toLowerCase()] || 0;
    return level1 > level2;
  }

  canManageUser(manager: User, targetUser: User): boolean {
    // Admins can manage anyone
    if (this.isAdmin(manager)) return true;

    // Moderators can manage users but not other moderators or admins
    if (this.isModerator(manager)) {
      return this.isUser(targetUser);
    }

    // Users can only manage themselves
    return manager.id === targetUser.id;
  }
}

// Export singleton instance
export const permissionManager = PermissionManager.getInstance();

// Hook for React components
export const usePermissions = (user: User | null) => {
  if (!user) {
    return {
      hasPermission: () => false,
      hasAnyPermission: () => false,
      hasAllPermissions: () => false,
      canManageUsers: () => false,
      canManageRoles: () => false,
      canManageAds: () => false,
      canCreateAds: () => false,
      canEditAds: () => false,
      canDeleteAds: () => false,
      canViewAnalytics: () => false,
      isAdmin: () => false,
      isModerator: () => false,
      isUser: () => false,
      getUserPermissions: () => [],
    };
  }

  return {
    hasPermission: (check: PermissionCheck) => permissionManager.hasPermission(user, check),
    hasAnyPermission: (checks: PermissionCheck[]) => permissionManager.hasAnyPermission(user, checks),
    hasAllPermissions: (checks: PermissionCheck[]) => permissionManager.hasAllPermissions(user, checks),
    canManageUsers: () => permissionManager.canManageUsers(user),
    canManageRoles: () => permissionManager.canManageRoles(user),
    canManageAds: () => permissionManager.canManageAds(user),
    canCreateAds: () => permissionManager.canCreateAds(user),
    canEditAds: () => permissionManager.canEditAds(user),
    canDeleteAds: () => permissionManager.canDeleteAds(user),
    canViewAnalytics: () => permissionManager.canViewAnalytics(user),
    isAdmin: () => permissionManager.isAdmin(user),
    isModerator: () => permissionManager.isModerator(user),
    isUser: () => permissionManager.isUser(user),
    getUserPermissions: () => permissionManager.getUserPermissions(user),
  };
};
