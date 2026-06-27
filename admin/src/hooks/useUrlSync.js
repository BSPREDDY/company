import { useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Hook for syncing component state with URL query parameters
 * Enables real-time URL updates and state restoration from URL
 */
export const useUrlSync = (stateUpdaters = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Get all query parameters as an object
   */
  const getQueryParams = useCallback(() => {
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  /**
   * Update specific query parameters
   * Preserves other existing params unless overridden
   */
  const updateQueryParams = useCallback((newParams) => {
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev);

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          updated.delete(key);
        } else {
          updated.set(key, value);
        }
      });

      return updated;
    });
  }, [setSearchParams]);

  /**
   * Clear specific query parameters
   */
  const clearQueryParams = useCallback((keys = []) => {
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev);
      keys.forEach(key => updated.delete(key));
      return updated;
    });
  }, [setSearchParams]);

  /**
   * Reset to initial state and clear URL
   */
  const resetUrlState = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  /**
   * Sync state changes with URL in real-time
   */
  useEffect(() => {
    const params = getQueryParams();
    
    // Call each state updater with the corresponding query param
    Object.entries(stateUpdaters).forEach(([key, updater]) => {
      if (params[key] && typeof updater === 'function') {
        updater(params[key]);
      }
    });
  }, [searchParams, stateUpdaters, getQueryParams]);

  return {
    queryParams: getQueryParams(),
    updateQueryParams,
    clearQueryParams,
    resetUrlState,
    searchParams,
  };
};

/**
 * Hook for pagination with URL sync
 */
export const useUrlPagination = (itemsPerPage = 10) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || itemsPerPage;

  const setPage = useCallback((newPage) => {
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev);
      updated.set('page', Math.max(1, newPage));
      return updated;
    });
  }, [setSearchParams]);

  const setLimit = useCallback((newLimit) => {
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev);
      updated.set('limit', newLimit);
      updated.set('page', '1'); // Reset to first page when changing limit
      return updated;
    });
  }, [setSearchParams]);

  return {
    page,
    limit,
    setPage,
    setLimit,
  };
};

/**
 * Hook for search/filter with URL sync
 */
export const useUrlSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const filter = searchParams.get('filter') || '';

  const setSearch = useCallback((term) => {
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev);
      if (term) {
        updated.set('search', term);
        updated.set('page', '1'); // Reset to first page on new search
      } else {
        updated.delete('search');
      }
      return updated;
    });
  }, [setSearchParams]);

  const setFilter = useCallback((filterValue) => {
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev);
      if (filterValue) {
        updated.set('filter', filterValue);
        updated.set('page', '1');
      } else {
        updated.delete('filter');
      }
      return updated;
    });
  }, [setSearchParams]);

  return {
    search,
    filter,
    setSearch,
    setFilter,
  };
};
