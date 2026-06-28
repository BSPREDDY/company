import { useState, Suspense } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AdminBackground3D } from '../components/3D/AdminBackground3D';
import { FiMail, FiLock } from 'react-icons/fi';
import styles from '../styles/auth.module.css';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setIsLoading(true);

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            console.log('[v0] Login error:', err);
            console.log('[v0] Error message:', err.message);
            console.log('[v0] Error code:', err.code);

            let errorMsg = 'Login failed. Please try again.';

            // Handle network errors
            if (!err.response) {
                if (err.code === 'ECONNABORTED' || err.code === 'ECONNREFUSED') {
                    errorMsg = 'Connection failed. Make sure the server is running on http://localhost:5000';
                } else if (err.message === 'Network Error') {
                    errorMsg = 'Network error. Please check your connection and ensure the server is running.';
                } else {
                    errorMsg = `Connection error: ${err.message}`;
                }
            } else if (err.response?.status === 401) {
                errorMsg = 'Invalid email or password. Please check your credentials.';
            } else if (err.response?.status === 404) {
                errorMsg = 'Account not found. Please register first.';
            } else if (err.response?.status === 429) {
                errorMsg = 'Too many login attempts. Please try again later.';
            } else if (err.response?.status === 500) {
                errorMsg = 'Server error. Please try again later.';
            } else if (err.response?.data?.message) {
                errorMsg = err.response.data.message;
            }

            setError(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            {/* 3D Background */}
            <div className={styles.backgroundLayer}>
                <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />}>
                    <AdminBackground3D />
                </Suspense>
            </div>
            <div className={styles.overlayGradient}></div>

            {/* Login Form */}
            <div className={styles.formContainer}>
                <div className={styles.formBox}>
                    <div className={styles.formCard}>
                        <div className={styles.headerSection}>
                            <h1 className={styles.mainTitle}>
                                Bhavana Admin
                            </h1>
                            <p className={styles.subtitle}>Secure access to admin panel</p>
                        </div>

                        {error && (
                            <div className={styles.errorBox}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className={styles.formField}>
                                <label className={styles.fieldLabel}>
                                    Email Address
                                </label>
                                <div className="relative">
                                    <FiMail className={styles.inputIcon} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={styles.fieldInput}
                                        placeholder="admin@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formField}>
                                <label className={styles.fieldLabel}>
                                    Password
                                </label>
                                <div className="relative">
                                    <FiLock className={styles.inputIcon} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={styles.fieldInput}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={styles.submitButton}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>

                        <p className={styles.footerText}>
                            Don&apos;t have an account?{' '}
                            <Link to="/register" className={styles.footerLink}>
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
