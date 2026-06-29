import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
    const [admin, setAdmin] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                if (authService.isLoggedIn()) {
                    // Check if token is expired and refresh if needed
                    if (authService.isTokenExpired()) {
                        await authService.refreshToken();
                    }
                    const currentAdmin = authService.getCurrentAdmin();
                    setAdmin(currentAdmin);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.log('Auth verification failed:', error);
                await authService.logout();
                setAdmin(null);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();

        // Setup token refresh interval (check every 50 minutes for 1 hour token)
        const tokenRefreshInterval = setInterval(() => {
            if (authService.isLoggedIn() && authService.isTokenExpired()) {
                authService.refreshToken().catch(() => {
                    setAdmin(null);
                    setIsAuthenticated(false);
                });
            }
        }, 50 * 60 * 1000);

        return () => clearInterval(tokenRefreshInterval);
    }, []);

    const login = useCallback(async (email, password) => {
        setIsLoading(true);
        try {
            const result = await authService.login(email, password);
            setAdmin(result.admin);
            setIsAuthenticated(true);
            return result;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.log('Logout error:', error);
        } finally {
            setAdmin(null);
            setIsAuthenticated(false);
        }
    }, []);

    const register = useCallback(async (email, password, name) => {
        setIsLoading(true);
        try {
            const result = await authService.register(email, password, name);
            setAdmin(result.admin);
            setIsAuthenticated(true);
            return result;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        admin,
        isLoading,
        isAuthenticated,
        login,
        logout,
        register,
    };
};
