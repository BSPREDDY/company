// import api from './api';

// export const authService = {
//     register: async (email, password, name) => {
//         const response = await api.post('/admin/auth/register', {
//             email,
//             password,
//             name,
//         });
//         if (response.data.token) {
//             localStorage.setItem('adminToken', response.data.token);
//             localStorage.setItem('admin', JSON.stringify(response.data.admin));
//         }
//         return response.data;
//     },

//     login: async (email, password) => {
//         const response = await api.post('/admin/auth/login', {
//             email,
//             password,
//         });
//         if (response.data.token) {
//             localStorage.setItem('adminToken', response.data.token);
//             localStorage.setItem('admin', JSON.stringify(response.data.admin));
//         }
//         return response.data;
//     },

//     logout: () => {
//         localStorage.removeItem('adminToken');
//         localStorage.removeItem('admin');
//     },

//     verifyToken: async () => {
//         const response = await api.get('/admin/auth/verify');
//         return response.data;
//     },

//     getCurrentAdmin: () => {
//         const admin = localStorage.getItem('admin');
//         return admin ? JSON.parse(admin) : null;
//     },

//     isLoggedIn: () => {
//         return !!localStorage.getItem('adminToken');
//     },
// };


import api from './api';

export const authService = {
    register: async (email, password, name) => {
        const response = await api.post('/admin/auth/register', {
            email,
            password,
            name,
        });
        if (response.data.accessToken) {
            localStorage.setItem('adminAccessToken', response.data.accessToken);
            localStorage.setItem('adminRefreshToken', response.data.refreshToken);
            localStorage.setItem('admin', JSON.stringify(response.data.admin));
            localStorage.setItem('tokenExpiresAt', new Date().getTime() + 60 * 60 * 1000); // 1 hour
        }
        return response.data;
    },

    login: async (email, password) => {
        const response = await api.post('/admin/auth/login', {
            email,
            password,
        });
        if (response.data.accessToken) {
            localStorage.setItem('adminAccessToken', response.data.accessToken);
            localStorage.setItem('adminRefreshToken', response.data.refreshToken);
            localStorage.setItem('admin', JSON.stringify(response.data.admin));
            localStorage.setItem('tokenExpiresAt', new Date().getTime() + 60 * 60 * 1000); // 1 hour
        }
        return response.data;
    },

    refreshToken: async () => {
        try {
            const refreshToken = localStorage.getItem('adminRefreshToken');
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await api.post('/admin/auth/refresh', {
                refreshToken,
            });

            if (response.data.accessToken) {
                localStorage.setItem('adminAccessToken', response.data.accessToken);
                localStorage.setItem('adminRefreshToken', response.data.refreshToken);
                localStorage.setItem('tokenExpiresAt', new Date().getTime() + 60 * 60 * 1000);
            }
            return response.data;
        } catch (error) {
            this.logout();
            throw error;
        }
    },

    logout: async () => {
        try {
            const token = localStorage.getItem('adminAccessToken');
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                await api.post('/admin/auth/logout');
            }
        } catch (error) {
            console.log('Logout error:', error);
        } finally {
            localStorage.removeItem('adminAccessToken');
            localStorage.removeItem('adminRefreshToken');
            localStorage.removeItem('admin');
            localStorage.removeItem('tokenExpiresAt');
            delete api.defaults.headers.common['Authorization'];
        }
    },

    verifyToken: async () => {
        const response = await api.get('/admin/auth/verify');
        return response.data;
    },

    getCurrentAdmin: () => {
        const admin = localStorage.getItem('admin');
        return admin ? JSON.parse(admin) : null;
    },

    isLoggedIn: () => {
        return !!localStorage.getItem('adminAccessToken');
    },

    isTokenExpired: () => {
        const expiresAt = localStorage.getItem('tokenExpiresAt');
        if (!expiresAt) return true;
        return new Date().getTime() > parseInt(expiresAt);
    },

    getAccessToken: () => {
        return localStorage.getItem('adminAccessToken');
    },
};
