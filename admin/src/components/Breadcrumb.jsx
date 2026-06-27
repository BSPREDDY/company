import { useLocation, useNavigate } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { routeConfig } from '../utils/routeConfig';
import { motion } from 'framer-motion';

/**
 * Breadcrumb navigation component
 * Automatically builds breadcrumb trail from current route
 */
export const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse current path to build breadcrumb
  const buildBreadcrumbs = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/dashboard' }];

    // Find matching routes in config
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Check if this segment matches any route config
      const matchedRoute = Object.entries(routeConfig).find(([key, route]) => {
        // Handle dynamic segments like :id
        if (route.path.includes(':')) {
          const pathRegex = route.path.replace(/:[^\s/]+/g, '[^/]+');
          return new RegExp(`^${pathRegex}$`).test(currentPath);
        }
        return route.path === currentPath;
      });

      if (matchedRoute) {
        const [key, route] = matchedRoute;
        if (route.breadcrumb && key !== 'login' && key !== 'register') {
          breadcrumbs.push({
            label: route.label,
            path: currentPath,
            key,
          });
        }
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumbs();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-1 mb-8 text-sm"
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="flex items-center gap-1">
          {index > 0 && (
            <FiChevronRight className="text-slate-500 mx-1" size={16} />
          )}
          <motion.button
            whileHover={{ color: '#60a5fa' }}
            onClick={() => navigate(breadcrumb.path)}
            className="text-slate-400 hover:text-blue-400 transition-colors px-2 py-1 rounded hover:bg-slate-700/50"
          >
            {breadcrumb.label}
          </motion.button>
        </div>
      ))}
    </motion.nav>
  );
};

/**
 * Simplified breadcrumb for specific routes
 * Used when you want custom breadcrumb structure
 */
export const CustomBreadcrumb = ({ items = [] }) => {
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-1 mb-8 text-sm"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          {index > 0 && (
            <FiChevronRight className="text-slate-500 mx-1" size={16} />
          )}
          {item.path ? (
            <motion.button
              whileHover={{ color: '#60a5fa' }}
              onClick={() => navigate(item.path)}
              className="text-slate-400 hover:text-blue-400 transition-colors px-2 py-1 rounded hover:bg-slate-700/50"
            >
              {item.label}
            </motion.button>
          ) : (
            <span className="text-slate-300 px-2 py-1">{item.label}</span>
          )}
        </div>
      ))}
    </motion.nav>
  );
};
