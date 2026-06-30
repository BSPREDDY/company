import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminAccessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle responses and token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log('[v0] API Error:', {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            config: error.config?.url
        });

        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem('adminRefreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token');
                }

                const { data } = await axios.post(
                    `${API_BASE_URL}/admin/auth/refresh`,
                    { refreshToken }
                );

                localStorage.setItem('adminAccessToken', data.accessToken);
                localStorage.setItem('adminRefreshToken', data.refreshToken);
                localStorage.setItem('tokenExpiresAt', new Date().getTime() + 60 * 60 * 1000);

                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                processQueue(null, data.accessToken);
                return api(originalRequest);
            } catch (err) {
                console.log('Token refresh failed:', err);
                localStorage.removeItem('adminAccessToken');
                localStorage.removeItem('adminRefreshToken');
                localStorage.removeItem('admin');
                localStorage.removeItem('tokenExpiresAt');
                processQueue(err, null);
                window.location.href = '/login';
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
