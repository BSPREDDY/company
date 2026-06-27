/**
 * Centralized route configuration with metadata
 * Used for breadcrumbs, navigation, and dynamic routing
 */

export const routeConfig = {
  // Public routes
  login: {
    path: '/login',
    label: 'Login',
    breadcrumb: false,
  },
  register: {
    path: '/register',
    label: 'Register',
    breadcrumb: false,
  },

  // Protected routes - Main sections
  dashboard: {
    path: '/dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    breadcrumb: true,
  },
  contacts: {
    path: '/contacts',
    label: 'Contacts',
    icon: 'contacts',
    breadcrumb: true,
  },

  // Nested routes with parameters
  contactDetail: {
    path: '/contacts/:id',
    label: 'Contact Details',
    icon: 'contactDetail',
    breadcrumb: true,
    parent: 'contacts',
  },
  contactEdit: {
    path: '/contacts/:id/edit',
    label: 'Edit Contact',
    icon: 'contactEdit',
    breadcrumb: true,
    parent: 'contacts',
  },

  // Analytics sub-route
  analytics: {
    path: '/dashboard/analytics',
    label: 'Analytics',
    icon: 'analytics',
    breadcrumb: true,
    parent: 'dashboard',
  },
  settings: {
    path: '/dashboard/settings',
    label: 'Settings',
    icon: 'settings',
    breadcrumb: true,
    parent: 'dashboard',
  },
};

/**
 * Get route by key from config
 */
export const getRoute = (key) => {
  return routeConfig[key]?.path || '/';
};

/**
 * Get all main navigation routes
 */
export const getMainRoutes = () => {
  return Object.values(routeConfig).filter(
    route => route.breadcrumb && !route.parent && route.path !== '/login' && route.path !== '/register'
  );
};

/**
 * Get child routes for a parent
 */
export const getChildRoutes = (parentKey) => {
  return Object.values(routeConfig).filter(
    route => route.parent === parentKey
  );
};

/**
 * Build URL with parameters
 */
export const buildUrl = (routeKey, params = {}) => {
  let url = getRoute(routeKey);

  // Replace route parameters
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, value);
  });

  // Append query parameters
  const query = Object.entries(params)
    .filter(([key]) => !url.includes(`:${key}`))
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  if (query) {
    url += `?${query}`;
  }

  return url;
};
