// // import { useEffect, useState } from 'react';
// // import { FiMail, FiCheck, FiAlertCircle, FiEye } from 'react-icons/fi';
// // import { MainLayout } from '../layouts/MainLayout';
// // import { contactService } from '../services/contactService';

// // export const Dashboard = () => {
// //     const [stats, setStats] = useState({
// //         total: 0,
// //         new: 0,
// //         read: 0,
// //         replied: 0,
// //         spam: 0,
// //     });
// //     const [isLoading, setIsLoading] = useState(true);

// //     useEffect(() => {
// //         const fetchStats = async () => {
// //             try {
// //                 const response = await contactService.getStats();
// //                 setStats(response.stats);
// //             } catch (error) {
// //                 console.error('Failed to fetch stats:', error);
// //             } finally {
// //                 setIsLoading(false);
// //             }
// //         };

// //         fetchStats();
// //     }, []);

// //     const statCards = [
// //         {
// //             title: 'Total Contacts',
// //             value: stats.total,
// //             icon: FiMail,
// //             bgColor: 'bg-gradient-to-br from-blue-900/40 to-blue-800/40',
// //             textColor: 'text-blue-300',
// //             borderColor: 'border-blue-500/50',
// //         },
// //         {
// //             title: 'New',
// //             value: stats.new,
// //             icon: FiAlertCircle,
// //             bgColor: 'bg-gradient-to-br from-yellow-900/40 to-yellow-800/40',
// //             textColor: 'text-yellow-300',
// //             borderColor: 'border-yellow-500/50',
// //         },
// //         {
// //             title: 'Read',
// //             value: stats.read,
// //             icon: FiEye,
// //             bgColor: 'bg-gradient-to-br from-purple-900/40 to-purple-800/40',
// //             textColor: 'text-purple-300',
// //             borderColor: 'border-purple-500/50',
// //         },
// //         {
// //             title: 'Replied',
// //             value: stats.replied,
// //             icon: FiCheck,
// //             bgColor: 'bg-gradient-to-br from-green-900/40 to-green-800/40',
// //             textColor: 'text-green-300',
// //             borderColor: 'border-green-500/50',
// //         },
// //     ];

// //     return (
// //         <MainLayout>
// //             <div className="p-4 md:p-8">
// //                 <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>

// //                 {isLoading ? (
// //                     <div className="flex items-center justify-center h-96">
// //                         <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-yellow-400"></div>
// //                     </div>
// //                 ) : (
// //                     <>
// //                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //                             {statCards.map((card, index) => {
// //                                 const Icon = card.icon;
// //                                 return (
// //                                     <div
// //                                         key={index}
// //                                         className={`admin-card border-l-4 ${card.borderColor} p-6 hover:border-l-8 transition-all`}
// //                                     >
// //                                         <div className="flex items-center justify-between">
// //                                             <div>
// //                                                 <p className="text-slate-300 text-sm font-medium">
// //                                                     {card.title}
// //                                                 </p>
// //                                                 <p className={`${card.textColor} text-3xl font-bold mt-2`}>
// //                                                     {card.value}
// //                                                 </p>
// //                                             </div>
// //                                             <Icon className={`${card.textColor} text-4xl opacity-30`} />
// //                                         </div>
// //                                     </div>
// //                                 );
// //                             })}
// //                         </div>

// //                         <div className="admin-card p-6">
// //                             <h2 className="text-2xl font-bold text-white mb-6">
// //                                 Quick Stats
// //                             </h2>
// //                             <div className="space-y-4">
// //                                 <div className="flex justify-between items-center pb-4 border-b border-slate-600">
// //                                     <span className="text-slate-300">Total Contacts:</span>
// //                                     <span className="font-bold text-blue-300 text-lg">{stats.total}</span>
// //                                 </div>
// //                                 <div className="flex justify-between items-center pb-4 border-b border-slate-600">
// //                                     <span className="text-slate-300">Spam Messages:</span>
// //                                     <span className="font-bold text-red-400 text-lg">{stats.spam}</span>
// //                                 </div>
// //                                 <div className="flex justify-between items-center">
// //                                     <span className="text-slate-300">Response Rate:</span>
// //                                     <span className="font-bold text-green-400 text-lg">
// //                                         {stats.total > 0
// //                                             ? (((stats.read + stats.replied) / stats.total) * 100).toFixed(2)
// //                                             : 0}
// //                                         %
// //                                     </span>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </>
// //                 )}
// //             </div>
// //         </MainLayout>
// //     );
// // };


// import { useEffect, useState, Suspense } from 'react';
// import { FiMail, FiCheck, FiAlertCircle, FiEye, FiTrendingUp, FiTarget } from 'react-icons/fi';
// import { MainLayout } from '../layouts/MainLayout';
// import { contactService } from '../services/contactService';
// import AdminBackground3D from '../components/3D/AdminBackground3D';

// export const Dashboard = () => {
//     const [stats, setStats] = useState({
//         total: 0,
//         new: 0,
//         read: 0,
//         replied: 0,
//         spam: 0,
//     });
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 const response = await contactService.getStats();
//                 setStats(response.stats);
//             } catch (error) {
//                 console.error('Failed to fetch stats:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchStats();
//     }, []);

//     const statCards = [
//         {
//             title: 'Total Contacts',
//             value: stats.total,
//             icon: FiMail,
//             bgColor: 'bg-gradient-to-br from-blue-900/40 to-blue-800/40',
//             textColor: 'text-blue-300',
//             borderColor: 'border-blue-500/50',
//         },
//         {
//             title: 'New',
//             value: stats.new,
//             icon: FiAlertCircle,
//             bgColor: 'bg-gradient-to-br from-yellow-900/40 to-yellow-800/40',
//             textColor: 'text-yellow-300',
//             borderColor: 'border-yellow-500/50',
//         },
//         {
//             title: 'Read',
//             value: stats.read,
//             icon: FiEye,
//             bgColor: 'bg-gradient-to-br from-purple-900/40 to-purple-800/40',
//             textColor: 'text-purple-300',
//             borderColor: 'border-purple-500/50',
//         },
//         {
//             title: 'Replied',
//             value: stats.replied,
//             icon: FiCheck,
//             bgColor: 'bg-gradient-to-br from-green-900/40 to-green-800/40',
//             textColor: 'text-green-300',
//             borderColor: 'border-green-500/50',
//         },
//     ];

//     return (
//         <MainLayout>
//             {/* 3D Background */}
//             <div className="fixed inset-0 -z-10 h-screen overflow-hidden">
//                 <div className="absolute inset-0 h-full w-full">
//                     <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />}>
//                         <AdminBackground3D />
//                     </Suspense>
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/50 to-slate-900/80"></div>
//             </div>

//             <div className="relative z-10 p-4 md:p-8">
//                 <div className="mb-10">
//                     <h1 className="text-5xl font-bold text-white mb-2">Dashboard</h1>
//                     <p className="text-slate-300">Welcome to Bhavana Technology Admin Panel</p>
//                 </div>

//                 {isLoading ? (
//                     <div className="flex items-center justify-center h-96">
//                         <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-yellow-400"></div>
//                     </div>
//                 ) : (
//                     <>
//                         {/* Stat Cards */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//                             {statCards.map((card, index) => {
//                                 const Icon = card.icon;
//                                 return (
//                                     <div
//                                         key={index}
//                                         className={`admin-card border-l-4 ${card.borderColor} p-6 hover:border-l-8 hover:shadow-2xl transition-all group cursor-pointer`}
//                                     >
//                                         <div className="flex items-center justify-between">
//                                             <div>
//                                                 <p className="text-slate-300 text-sm font-semibold uppercase tracking-wide">
//                                                     {card.title}
//                                                 </p>
//                                                 <p className={`${card.textColor} text-4xl font-bold mt-3 group-hover:scale-110 transition-transform`}>
//                                                     {card.value}
//                                                 </p>
//                                             </div>
//                                             <div className={`${card.textColor} text-5xl opacity-20 group-hover:opacity-30 transition-opacity`}>
//                                                 <Icon />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>

//                         {/* Quick Stats Section */}
//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                             <div className="admin-card p-8 border border-blue-500/30">
//                                 <div className="flex items-center gap-3 mb-8">
//                                     <FiTarget className="text-3xl text-blue-400" />
//                                     <h2 className="text-2xl font-bold text-white">
//                                         Quick Stats
//                                     </h2>
//                                 </div>
//                                 <div className="space-y-5">
//                                     <div className="flex justify-between items-center pb-5 border-b border-slate-600/50">
//                                         <span className="text-slate-300 font-medium">Total Contacts:</span>
//                                         <span className="font-bold text-blue-300 text-2xl">{stats.total}</span>
//                                     </div>
//                                     <div className="flex justify-between items-center pb-5 border-b border-slate-600/50">
//                                         <span className="text-slate-300 font-medium">Spam Messages:</span>
//                                         <span className="font-bold text-red-400 text-2xl">{stats.spam}</span>
//                                     </div>
//                                     <div className="flex justify-between items-center">
//                                         <span className="text-slate-300 font-medium">Response Rate:</span>
//                                         <span className="font-bold text-green-400 text-2xl">
//                                             {stats.total > 0
//                                                 ? (((stats.read + stats.replied) / stats.total) * 100).toFixed(2)
//                                                 : 0}
//                                             %
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Status Breakdown */}
//                             <div className="admin-card p-8 border border-blue-500/30">
//                                 <div className="flex items-center gap-3 mb-8">
//                                     <FiTrendingUp className="text-3xl text-green-400" />
//                                     <h2 className="text-2xl font-bold text-white">
//                                         Status Breakdown
//                                     </h2>
//                                 </div>
//                                 <div className="space-y-5">
//                                     <div>
//                                         <div className="flex justify-between mb-2">
//                                             <span className="text-slate-300 font-medium">New</span>
//                                             <span className="text-yellow-300 font-bold">{stats.new}</span>
//                                         </div>
//                                         <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
//                                             <div
//                                                 className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 transition-all"
//                                                 style={{ width: stats.total > 0 ? `${(stats.new / stats.total) * 100}%` : '0%' }}
//                                             ></div>
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="flex justify-between mb-2">
//                                             <span className="text-slate-300 font-medium">Read</span>
//                                             <span className="text-blue-300 font-bold">{stats.read}</span>
//                                         </div>
//                                         <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
//                                             <div
//                                                 className="h-full bg-gradient-to-r from-blue-400 to-blue-300 transition-all"
//                                                 style={{ width: stats.total > 0 ? `${(stats.read / stats.total) * 100}%` : '0%' }}
//                                             ></div>
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="flex justify-between mb-2">
//                                             <span className="text-slate-300 font-medium">Replied</span>
//                                             <span className="text-green-300 font-bold">{stats.replied}</span>
//                                         </div>
//                                         <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
//                                             <div
//                                                 className="h-full bg-gradient-to-r from-green-400 to-green-300 transition-all"
//                                                 style={{ width: stats.total > 0 ? `${(stats.replied / stats.total) * 100}%` : '0%' }}
//                                             ></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </MainLayout>
//     );
// };



import { useEffect, useState, Suspense } from 'react';
import { FiMail, FiCheck, FiAlertCircle, FiEye, FiTrendingUp, FiTarget } from 'react-icons/fi';
import { MainLayout } from '../layouts/MainLayout';
import { contactService } from '../services/contactService';
import { AdminBackground3D } from '../components/3D/AdminBackground3D';
import styles from '../styles/dashboard.module.css';

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
            <div className={styles.dashboardContainer}>
                <div className={styles.contentWrapper}>
                    {/* Header */}
                    <div className={styles.headerSection}>
                        <h1 className={styles.pageTitle}>Dashboard</h1>
                        <p className={styles.pageSubtitle}>
                            Welcome to Bhavana Technology Admin Panel
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center h-96">
                            <div className={styles.loadingSpinner}></div>
                        </div>
                    ) : (
                        <>
                            {/* Statistics Grid */}
                            <div className={styles.statsGrid}>
                                {statCards.map((card, index) => {
                                    const Icon = card.icon;
                                    return (
                                        <div key={index} className={styles.statCard}>
                                            <div className={styles.statIcon}>
                                                <Icon />
                                            </div>
                                            <div className={styles.statLabel}>{card.title}</div>
                                            <div className={styles.statValue}>{card.value}</div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Main Content Grid */}
                            <div className={styles.mainGrid}>
                                {/* Quick Stats Card */}
                                <div className={styles.tableCard}>
                                    <div className={styles.tableHeader}>
                                        <div className={styles.tableTitle}>
                                            <FiTarget style={{ marginRight: '0.5rem', display: 'inline' }} />
                                            Quick Stats
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className={styles.tableRow}>
                                            <span className={styles.tableCell}>Total Contacts</span>
                                            <span className={styles.tableCell} style={{ color: '#60a5fa', fontWeight: '600' }}>{stats.total}</span>
                                        </div>
                                        <div className={styles.tableRow}>
                                            <span className={styles.tableCell}>Spam Messages</span>
                                            <span className={styles.tableCell} style={{ color: '#fca5a5', fontWeight: '600' }}>{stats.spam}</span>
                                        </div>
                                        <div className={styles.tableRow}>
                                            <span className={styles.tableCell}>Response Rate</span>
                                            <span className={styles.tableCell} style={{ color: '#86efac', fontWeight: '600' }}>
                                                {stats.total > 0
                                                    ? (((stats.read + stats.replied) / stats.total) * 100).toFixed(2)
                                                    : 0}
                                                %
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Breakdown Card */}
                                <div className={styles.tableCard}>
                                    <div className={styles.tableHeader}>
                                        <div className={styles.tableTitle}>
                                            <FiTrendingUp style={{ marginRight: '0.5rem', display: 'inline' }} />
                                            Status Breakdown
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {/* New */}
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className={styles.tableCell}>New</span>
                                                <span style={{ color: '#fbbf24', fontWeight: '600' }}>{stats.new}</span>
                                            </div>
                                            <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 transition-all"
                                                    style={{ width: stats.total > 0 ? `${(stats.new / stats.total) * 100}%` : '0%' }}
                                                ></div>
                                            </div>
                                        </div>
                                        {/* Read */}
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className={styles.tableCell}>Read</span>
                                                <span style={{ color: '#60a5fa', fontWeight: '600' }}>{stats.read}</span>
                                            </div>
                                            <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-blue-400 to-blue-300 transition-all"
                                                    style={{ width: stats.total > 0 ? `${(stats.read / stats.total) * 100}%` : '0%' }}
                                                ></div>
                                            </div>
                                        </div>
                                        {/* Replied */}
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className={styles.tableCell}>Replied</span>
                                                <span style={{ color: '#86efac', fontWeight: '600' }}>{stats.replied}</span>
                                            </div>
                                            <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-green-400 to-green-300 transition-all"
                                                    style={{ width: stats.total > 0 ? `${(stats.replied / stats.total) * 100}%` : '0%' }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

