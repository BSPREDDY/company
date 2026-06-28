import { useState, Suspense } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AdminBackground3D } from '../components/3D/AdminBackground3D';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import styles from '../styles/auth.module.css';

export const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation checks
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        try {
            await register(formData.email, formData.password, formData.name);
            navigate('/dashboard');
        } catch (err) {
            console.log('[v0] Register error:', err);
            console.log('[v0] Error message:', err.message);
            console.log('[v0] Error code:', err.code);

            let errorMsg = 'Registration failed. Please try again.';

            // Handle network errors
            if (!err.response) {
                if (err.code === 'ECONNABORTED' || err.code === 'ECONNREFUSED') {
                    errorMsg = 'Connection failed. Make sure the server is running on http://localhost:5000';
                } else if (err.message === 'Network Error') {
                    errorMsg = 'Network error. Please check your connection and ensure the server is running.';
                } else {
                    errorMsg = `Connection error: ${err.message}`;
                }
            } else if (err.response?.status === 400) {
                errorMsg = err.response?.data?.message || 'Invalid registration data. Please check your inputs.';
            } else if (err.response?.status === 409 || err.response?.status === 409) {
                errorMsg = 'Email already registered. Please login or use a different email.';
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

            {/* Register Form */}
            <div className={styles.formContainer}>
                <div className={styles.formBox}>
                    <div className={styles.formCard}>
                        <div className={styles.headerSection}>
                            <h1 className={styles.mainTitle}>
                                Create Account
                            </h1>
                            <p className={styles.subtitle}>Register as admin for Bhavana</p>
                        </div>

                        {error && (
                            <div className={styles.errorBox}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className={styles.formField}>
                                <label className={styles.fieldLabel}>
                                    Full Name
                                </label>
                                <div className="relative">
                                    <FiUser className={styles.inputIcon} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={styles.fieldInput}
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formField}>
                                <label className={styles.fieldLabel}>
                                    Email Address
                                </label>
                                <div className="relative">
                                    <FiMail className={styles.inputIcon} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
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
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={styles.fieldInput}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formField}>
                                <label className={styles.fieldLabel}>
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <FiLock className={styles.inputIcon} />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
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
                                {isLoading ? 'Creating Account...' : 'Register'}
                            </button>
                        </form>

                        <p className={styles.footerText}>
                            Already have an account?{' '}
                            <Link to="/login" className={styles.footerLink}>
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
