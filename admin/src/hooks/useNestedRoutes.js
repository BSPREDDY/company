import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

/**
 * Hook for managing nested routes and dynamic parameters
 */
export const useNestedRoutes = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Navigate to a nested route with parameters
   */
  const navigateToNested = useCallback((basePath, id, subPath = '') => {
    let path = `${basePath}/${id}`;
    if (subPath) {
      path += `/${subPath}`;
    }
    navigate(path);
  }, [navigate]);

  /**
   * Get parent path from current route
   */
  const getParentPath = useCallback(() => {
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments.length > 1) {
      return `/${segments.slice(0, -1).join('/')}`;
    }
    return '/';
  }, [location.pathname]);

  /**
   * Navigate back to parent
   */
  const navigateToParent = useCallback(() => {
    navigate(getParentPath());
  }, [navigate, getParentPath]);

  /**
   * Navigate with query parameters preserved
   */
  const navigateWithQuery = useCallback((path, queryParams = {}) => {
    const query = new URLSearchParams(queryParams).toString();
    navigate(`${path}${query ? '?' + query : ''}`);
  }, [navigate]);

  return {
    params,
    navigate,
    navigateToNested,
    navigateToParent,
    navigateWithQuery,
    currentPath: location.pathname,
    parentPath: getParentPath(),
  };
};

/**
 * Hook for handling dynamic ID-based routes
 */
export const useDynamicRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Parse ID from URL - handles both numeric and string IDs
   */
  const getParsedId = useCallback(() => {
    if (!id) return null;
    return isNaN(id) ? id : parseInt(id);
  }, [id]);

  /**
   * Navigate to edit view with same ID
   */
  const navigateToEdit = useCallback(() => {
    navigate(`${location.pathname}/edit`);
  }, [navigate, location.pathname]);

  /**
   * Navigate to detail view (removes /edit suffix)
   */
  const navigateToDetail = useCallback(() => {
    const cleanPath = location.pathname.replace('/edit', '');
    navigate(cleanPath);
  }, [navigate, location.pathname]);

  /**
   * Check if current route is in edit mode
   */
  const isEditMode = location.pathname.endsWith('/edit');

  return {
    id: getParsedId(),
    rawId: id,
    navigate,
    navigateToEdit,
    navigateToDetail,
    isEditMode,
    currentPath: location.pathname,
  };
};

/**
 * Hook for handling tab/section navigation
 */
export const useTabNavigation = (defaultTab = 'overview') => {
  const { tab: urlTab } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = urlTab || defaultTab;

  const navigateToTab = useCallback((newTab) => {
    const path = location.pathname.replace(/(\/[^\/]+)?$/, `/${newTab}`);
    navigate(path);
  }, [navigate, location.pathname]);

  return {
    currentTab,
    navigateToTab,
  };
};
