// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

// export const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();
//     const { login } = useAuth();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setIsLoading(true);

//         try {
//             await login(email, password);
//             navigate('/dashboard');
//         } catch (err) {
//             setError(err.response?.data?.message || 'Login failed. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
//                     Bhavana Admin
//                 </h1>
//                 <p className="text-gray-600 text-center mb-8">Login to your account</p>

//                 {error && (
//                     <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
//                         {error}
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Email
//                         </label>
//                         <input
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                             placeholder="admin@example.com"
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
//                             placeholder="••••••••"
//                             required
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
//                     >
//                         {isLoading ? 'Logging in...' : 'Login'}
//                     </button>
//                 </form>

//                 <p className="text-center text-gray-600 text-sm mt-6">
//                     Don&apos;t have an account?{' '}
//                     <Link to="/register" className="text-blue-600 hover:underline">
//                         Register here
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// };


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
        setIsLoading(true);

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
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
