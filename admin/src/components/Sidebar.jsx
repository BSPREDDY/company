import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiMail, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, admin } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/login', { replace: true });
    };

    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: FiHome },
        { path: '/contacts', label: 'Contacts', icon: FiMail },
    ];

    return (
        <>
            {/* Mobile Header Bar */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-blue-500/20 px-4 flex items-center justify-between z-30">
                <div className="flex items-center gap-2">
                    <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">BTSS Admin</h1>
                </div>
                <button
                    className="text-white hover:text-blue-400 focus:outline-none cursor-pointer p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Sidebar Drawer */}
            <aside
                className={`fixed md:relative inset-y-0 left-0 w-64 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-blue-500/20 text-white flex flex-col z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}
            >
                <div className="p-6 md:p-7 lg:p-8 flex flex-col h-full pt-20 md:pt-8">
                    {/* Header (Desktop only) */}
                    <div className="mb-10 hidden md:block">
                        <h1 className="text-2xl md:text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">BTSS Admin</h1>
                        <p className="text-xs text-slate-400 mt-1">Bhavana Technology</p>
                    </div>

                    {/* Nav Links */}
                    <nav className="space-y-3 flex-1">
                        {menuItems.map(({ path, label, icon: Icon }) => (
                            <Link
                                key={path}
                                to={path}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive(path)
                                    ? 'sidebar-active'
                                    : 'text-slate-300 hover:bg-slate-700/50'
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Footer Info & Logout */}
                    <div className="border-t border-slate-700 pt-6 mt-6">
                        <div className="mb-4 p-3 bg-slate-700/30 rounded-lg text-sm text-slate-300">
                            <p className="font-semibold text-slate-100">{admin?.name || 'Admin User'}</p>
                            <p className="text-xs text-slate-400 mt-1">{admin?.email || 'admin@bhavanatss.com'}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="admin-button w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all py-3 rounded-lg font-medium cursor-pointer"
                        >
                            <FiLogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 md:hidden z-30 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};
