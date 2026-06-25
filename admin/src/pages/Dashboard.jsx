import { useEffect, useState } from 'react';
import { FiMail, FiCheck, FiAlertCircle, FiEye, FiTrendingUp, FiTarget } from 'react-icons/fi';
import { MainLayout } from '../layouts/MainLayout';
import { contactService } from '../services/contactService';
import { motion } from 'framer-motion';

export const Dashboard = () => {
    const [stats, setStats] = useState({
        total: 0,
        new: 0,
        read: 0,
        replied: 0,
        spam: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await contactService.getStats();
                setStats(response.stats);
            } catch (error) {
                console.error('[v0] Failed to fetch stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { title: 'Total', value: stats.total, icon: FiMail, textColor: 'text-blue-300' },
        { title: 'New', value: stats.new, icon: FiAlertCircle, textColor: 'text-yellow-300' },
        { title: 'Read', value: stats.read, icon: FiEye, textColor: 'text-purple-300' },
        { title: 'Replied', value: stats.replied, icon: FiCheck, textColor: 'text-green-300' },
    ];

    return (
        <MainLayout>
            <div className="w-full space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-slate-300 text-lg">Welcome to Bhavana Technology Admin Panel</p>
                </motion.div>

                {isLoading ? (
                    <div className="flex items-center justify-center h-96">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-yellow-400"></div>
                    </div>
                ) : (
                    <>
                        {/* Statistics Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {statCards.map((card, index) => {
                                const Icon = card.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="bg-gradient-to-br from-slate-800 to-slate-700 border border-blue-500/20 rounded-lg p-6 hover:border-blue-400/50 transition-all hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{card.title}</p>
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                                    className={`text-4xl font-bold mt-3 ${card.textColor}`}
                                                >
                                                    {card.value}
                                                </motion.p>
                                            </div>
                                            <motion.div
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ repeat: Infinity, duration: 4, delay: index * 0.2 }}
                                                className={`${card.textColor} text-4xl opacity-20`}
                                            >
                                                <Icon />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Main Content Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                        >
                            {/* Quick Stats Card */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-gradient-to-br from-slate-800 to-slate-700 border border-blue-500/20 rounded-lg p-8 hover:border-blue-400/50 transition-all hover:shadow-lg hover:shadow-blue-500/20"
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                                    >
                                        <FiTarget className="text-2xl text-blue-400" />
                                    </motion.div>
                                    <h2 className="text-2xl font-bold text-white">Quick Stats</h2>
                                </div>
                                <div className="space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.4 }}
                                        className="flex justify-between items-center pb-4 border-b border-slate-600/50"
                                    >
                                        <span className="text-slate-300 font-medium">Total Contacts</span>
                                        <span className="text-blue-300 text-xl font-bold">{stats.total}</span>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.45 }}
                                        className="flex justify-between items-center pb-4 border-b border-slate-600/50"
                                    >
                                        <span className="text-slate-300 font-medium">Spam Messages</span>
                                        <span className="text-red-400 text-xl font-bold">{stats.spam}</span>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.5 }}
                                        className="flex justify-between items-center"
                                    >
                                        <span className="text-slate-300 font-medium">Response Rate</span>
                                        <span className="text-green-400 text-xl font-bold">
                                            {stats.total > 0
                                                ? (((stats.read + stats.replied) / stats.total) * 100).toFixed(2)
                                                : 0}
                                            %
                                        </span>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Status Breakdown Card */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-gradient-to-br from-slate-800 to-slate-700 border border-blue-500/20 rounded-lg p-8 hover:border-blue-400/50 transition-all hover:shadow-lg hover:shadow-blue-500/20"
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                                    >
                                        <FiTrendingUp className="text-2xl text-green-400" />
                                    </motion.div>
                                    <h2 className="text-2xl font-bold text-white">Status Breakdown</h2>
                                </div>
                                <div className="space-y-6">
                                    {/* New */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.4 }}
                                    >
                                        <div className="flex justify-between mb-3">
                                            <span className="text-slate-300 font-medium">New</span>
                                            <span className="text-yellow-300 font-bold">{stats.new}</span>
                                        </div>
                                        <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: '0%' }}
                                                animate={{ width: stats.total > 0 ? `${(stats.new / stats.total) * 100}%` : '0%' }}
                                                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                                                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300"
                                            ></motion.div>
                                        </div>
                                    </motion.div>
                                    {/* Read */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.45 }}
                                    >
                                        <div className="flex justify-between mb-3">
                                            <span className="text-slate-300 font-medium">Read</span>
                                            <span className="text-blue-300 font-bold">{stats.read}</span>
                                        </div>
                                        <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: '0%' }}
                                                animate={{ width: stats.total > 0 ? `${(stats.read / stats.total) * 100}%` : '0%' }}
                                                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.55 }}
                                                className="h-full bg-gradient-to-r from-blue-400 to-blue-300"
                                            ></motion.div>
                                        </div>
                                    </motion.div>
                                    {/* Replied */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.5 }}
                                    >
                                        <div className="flex justify-between mb-3">
                                            <span className="text-slate-300 font-medium">Replied</span>
                                            <span className="text-green-300 font-bold">{stats.replied}</span>
                                        </div>
                                        <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: '0%' }}
                                                animate={{ width: stats.total > 0 ? `${(stats.replied / stats.total) * 100}%` : '0%' }}
                                                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
                                                className="h-full bg-gradient-to-r from-green-400 to-green-300"
                                            ></motion.div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </div>
        </MainLayout>
    );
};

export default Dashboard;
