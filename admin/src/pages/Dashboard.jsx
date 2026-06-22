import { useEffect, useState } from 'react';
import { FiMail, FiCheck, FiAlertCircle, FiEye } from 'react-icons/fi';
import { MainLayout } from '../layouts/MainLayout';
import { contactService } from '../services/contactService';

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
                console.error('Failed to fetch stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            title: 'Total Contacts',
            value: stats.total,
            icon: FiMail,
            bgColor: 'bg-gradient-to-br from-blue-900/40 to-blue-800/40',
            textColor: 'text-blue-300',
            borderColor: 'border-blue-500/50',
        },
        {
            title: 'New',
            value: stats.new,
            icon: FiAlertCircle,
            bgColor: 'bg-gradient-to-br from-yellow-900/40 to-yellow-800/40',
            textColor: 'text-yellow-300',
            borderColor: 'border-yellow-500/50',
        },
        {
            title: 'Read',
            value: stats.read,
            icon: FiEye,
            bgColor: 'bg-gradient-to-br from-purple-900/40 to-purple-800/40',
            textColor: 'text-purple-300',
            borderColor: 'border-purple-500/50',
        },
        {
            title: 'Replied',
            value: stats.replied,
            icon: FiCheck,
            bgColor: 'bg-gradient-to-br from-green-900/40 to-green-800/40',
            textColor: 'text-green-300',
            borderColor: 'border-green-500/50',
        },
    ];

    return (
        <MainLayout>
            <div className="p-4 md:p-8">
                <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>

                {isLoading ? (
                    <div className="flex items-center justify-center h-96">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-yellow-400"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {statCards.map((card, index) => {
                                const Icon = card.icon;
                                return (
                                    <div
                                        key={index}
                                        className={`admin-card border-l-4 ${card.borderColor} p-6 hover:border-l-8 transition-all`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-slate-300 text-sm font-medium">
                                                    {card.title}
                                                </p>
                                                <p className={`${card.textColor} text-3xl font-bold mt-2`}>
                                                    {card.value}
                                                </p>
                                            </div>
                                            <Icon className={`${card.textColor} text-4xl opacity-30`} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="admin-card p-6">
                            <h2 className="text-2xl font-bold text-white mb-6">
                                Quick Stats
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-600">
                                    <span className="text-slate-300">Total Contacts:</span>
                                    <span className="font-bold text-blue-300 text-lg">{stats.total}</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-slate-600">
                                    <span className="text-slate-300">Spam Messages:</span>
                                    <span className="font-bold text-red-400 text-lg">{stats.spam}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-300">Response Rate:</span>
                                    <span className="font-bold text-green-400 text-lg">
                                        {stats.total > 0
                                            ? (((stats.read + stats.replied) / stats.total) * 100).toFixed(2)
                                            : 0}
                                        %
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </MainLayout>
    );
};
