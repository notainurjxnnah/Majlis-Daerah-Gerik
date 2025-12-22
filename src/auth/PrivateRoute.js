import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Role-based route configuration
const ROLE_ROUTES = {
  admin: '/admin',
  setiausaha: '/setiausaha', 
  jabatan: '/jabatan',
  latihan: '/latihan'
};

// Path prefixes for each role
const ROLE_PATH_PREFIXES = {
  admin: '/admin',
  setiausaha: '/setiausaha',
  jabatan: '/jabatan',
  latihan: '/latihan'
};

// Default routes for each role when access is denied
const DEFAULT_ROUTES = {
  admin: '/admin/dashboard',
  setiausaha: '/setiausaha/dashboard',
  jabatan: '/jabatan/dashboard',
  latihan: '/latihan/dashboard',
  default: '/login'
};

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userString = localStorage.getItem('user');
        
        // No token - redirect to login
        if (!token) {
          setRedirectTo(DEFAULT_ROUTES.default);
          setIsAuthorized(false);
          return;
        }

        // Parse user data
        const user = userString ? JSON.parse(userString) : {};
        const userRole = user.role || '';
        const currentPath = location.pathname;

        // Check if user role is valid
        if (!userRole || !ROLE_ROUTES[userRole]) {
          console.error('Invalid user role:', userRole);
          setRedirectTo(DEFAULT_ROUTES.default);
          setIsAuthorized(false);
          return;
        }

        // Get allowed path prefix for user's role
        const allowedPrefix = ROLE_PATH_PREFIXES[userRole];
        
        // Check if user has access to current path
        const hasAccess = currentPath.startsWith(allowedPrefix);
        
        if (!hasAccess) {
          // Redirect to default route for user's role
          const defaultRoute = DEFAULT_ROUTES[userRole] || DEFAULT_ROUTES.default;
          setRedirectTo(defaultRoute);
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setRedirectTo(DEFAULT_ROUTES.default);
        setIsAuthorized(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  // Show loading state while checking
  if (isChecking) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>Loading...</div>
        {/* You can replace with a proper loading spinner */}
      </div>
    );
  }

  // Redirect if not authorized
  if (redirectTo) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // Return children if authorized
  return isAuthorized ? children : null;
};

export default PrivateRoute;
