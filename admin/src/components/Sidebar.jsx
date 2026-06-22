import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiMail, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { logout, admin } = useAuth();

    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: FiHome },
        { path: '/contacts', label: 'Contacts', icon: FiMail },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700 text-white transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    }`}
            >
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">Bhavana Admin</h1>

                    <nav className="space-y-2">
                        {menuItems.map(({ path, label, icon: Icon }) => (
                            <Link
                                key={path}
                                to={path}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive(path)
                                    ? 'sidebar-active'
                                    : 'text-slate-300 hover:bg-slate-700'
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                <Icon size={20} />
                                <span>{label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="absolute bottom-6 left-6 right-6 border-t border-slate-700 pt-6">
                    <div className="mb-4 text-sm text-slate-300">
                        <p className="font-semibold">{admin?.name}</p>
                        <p className="text-xs text-slate-400">{admin?.email}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="admin-button w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                    >
                        <FiLogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};
