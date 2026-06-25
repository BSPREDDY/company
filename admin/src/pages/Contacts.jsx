import { useEffect, useState } from 'react';
import {
    FiSearch,
    FiFilter,
    FiTrash2,
    FiEye,
    FiCheck,
    FiX,
    FiAlertTriangle,
    FiMail,
    FiUser,
    FiMessageSquare,
    FiChevronDown,
} from 'react-icons/fi';
import { MainLayout } from '../layouts/MainLayout';
import { contactService } from '../services/contactService';
import { motion } from 'framer-motion';

export const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [stats, setStats] = useState({ total: 0, new: 0, read: 0, replied: 0, spam: 0 });
    const [showStatusDropdown, setShowStatusDropdown] = useState(null);

    useEffect(() => {
        fetchContacts();
        fetchStats();
    }, [currentPage, statusFilter]);

    const fetchContacts = async () => {
        setIsLoading(true);
        try {
            const params = {
                page: currentPage,
                limit: 10,
                ...(statusFilter && { status: statusFilter }),
            };
            const response = await contactService.getAllContacts(params);
            setContacts(response.contacts);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('Failed to fetch contacts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await contactService.getStats();
            setStats(response.stats);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    const handleStatusChange = async (contactId, newStatus) => {
        try {
            await contactService.updateContactStatus(contactId, newStatus);
            setShowStatusDropdown(null);
            fetchContacts();
            fetchStats();
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const handleMarkSpam = async (contactId, isSpam) => {
        try {
            await contactService.markAsSpam(contactId, isSpam);
            fetchContacts();
            fetchStats();
        } catch (error) {
            console.error('Failed to mark spam:', error);
        }
    };

    const handleDelete = async (contactId) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                await contactService.deleteContact(contactId);
                fetchContacts();
                fetchStats();
            } catch (error) {
                console.error('Failed to delete contact:', error);
            }
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            new: { bg: 'bg-yellow-500/20', text: 'text-yellow-300', border: 'border-yellow-500/30', label: 'New' },
            read: { bg: 'bg-blue-500/20', text: 'text-blue-300', border: 'border-blue-500/30', label: 'Read' },
            replied: { bg: 'bg-green-500/20', text: 'text-green-300', border: 'border-green-500/30', label: 'Replied' },
        };
        const config = statusConfig[status] || statusConfig.new;
        return (
            <span className={`${config.bg} ${config.text} ${config.border} border px-3 py-1 rounded-full text-xs font-semibold`}>
                {config.label}
            </span>
        );
    };

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
                    <h1 className="text-4xl font-bold text-white mb-2">Contacts Management</h1>
                    <p className="text-slate-400">Manage and track all client inquiries</p>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-5 gap-4"
                >
                    <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-blue-500/20 rounded-lg p-6 hover:border-blue-400/50 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-medium">Total</p>
                                <p className="text-white text-3xl font-bold mt-2">{stats.total}</p>
                            </div>
                            <FiMail className="text-3xl text-blue-400 opacity-20" />
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-yellow-500/20 rounded-lg p-6 hover:border-yellow-400/50 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-medium">New</p>
                                <p className="text-yellow-300 text-3xl font-bold mt-2">{stats.new}</p>
                            </div>
                            <FiAlertTriangle className="text-3xl text-yellow-400 opacity-20" />
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/20 rounded-lg p-6 hover:border-purple-400/50 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-medium">Read</p>
                                <p className="text-purple-300 text-3xl font-bold mt-2">{stats.read}</p>
                            </div>
                            <FiEye className="text-3xl text-purple-400 opacity-20" />
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-green-500/20 rounded-lg p-6 hover:border-green-400/50 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-medium">Replied</p>
                                <p className="text-green-300 text-3xl font-bold mt-2">{stats.replied}</p>
                            </div>
                            <FiCheck className="text-3xl text-green-400 opacity-20" />
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-red-500/20 rounded-lg p-6 hover:border-red-400/50 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-medium">Spam</p>
                                <p className="text-red-300 text-3xl font-bold mt-2">{stats.spam}</p>
                            </div>
                            <FiX className="text-3xl text-red-400 opacity-20" />
                        </div>
                    </div>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col md:flex-row gap-4"
                >
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or message..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Status Filter Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                            className="flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 hover:border-blue-500 transition-all whitespace-nowrap"
                        >
                            <FiFilter size={18} />
                            <span>{statusFilter ? statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1) : 'All Status'}</span>
                            <FiChevronDown size={16} className={`transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showStatusDropdown && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full mt-2 right-0 bg-slate-800 border border-slate-600 rounded-lg shadow-lg z-50 min-w-max"
                            >
                                <button
                                    onClick={() => {
                                        setStatusFilter('');
                                        setShowStatusDropdown(false);
                                        setCurrentPage(1);
                                    }}
                                    className="block w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors first:rounded-t-lg"
                                >
                                    All Status
                                </button>
                                <button
                                    onClick={() => {
                                        setStatusFilter('new');
                                        setShowStatusDropdown(false);
                                        setCurrentPage(1);
                                    }}
                                    className="block w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-yellow-300 transition-colors"
                                >
                                    New
                                </button>
                                <button
                                    onClick={() => {
                                        setStatusFilter('read');
                                        setShowStatusDropdown(false);
                                        setCurrentPage(1);
                                    }}
                                    className="block w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-blue-300 transition-colors"
                                >
                                    Read
                                </button>
                                <button
                                    onClick={() => {
                                        setStatusFilter('replied');
                                        setShowStatusDropdown(false);
                                        setCurrentPage(1);
                                    }}
                                    className="block w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-green-300 transition-colors last:rounded-b-lg"
                                >
                                    Replied
                                </button>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Table Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-gradient-to-br from-slate-800 to-slate-700 border border-blue-500/20 rounded-lg overflow-hidden"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center h-96">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-yellow-400"></div>
                        </div>
                    ) : contacts.length === 0 ? (
                        <div className="text-center py-16 px-6">
                            <FiMail className="w-16 h-16 text-slate-500 mx-auto mb-4 opacity-50" />
                            <p className="text-slate-400 text-lg">No contacts found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-900/50 border-b border-slate-600">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">Message</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-600">
                                    {contacts.map((contact, index) => (
                                        <motion.tr
                                            key={contact._id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className="hover:bg-slate-700/50 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-sm text-white font-medium">{contact.name}</td>
                                            <td className="px-6 py-4 text-sm text-slate-300 break-all">{contact.email}</td>
                                            <td className="px-6 py-4 text-sm text-slate-300 max-w-xs truncate">{contact.message}</td>
                                            <td className="px-6 py-4 text-sm">{getStatusBadge(contact.status)}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex items-center gap-3">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => setSelectedContact(contact)}
                                                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                                                        title="View details"
                                                    >
                                                        <FiEye size={18} />
                                                    </motion.button>

                                                    {/* Status Change Dropdown */}
                                                    <div className="relative">
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => setShowStatusDropdown(showStatusDropdown === contact._id ? null : contact._id)}
                                                            className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-colors"
                                                            title="Change status"
                                                        >
                                                            <FiCheck size={18} />
                                                        </motion.button>

                                                        {showStatusDropdown === contact._id && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: -10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="absolute top-full mt-1 right-0 bg-slate-800 border border-slate-600 rounded shadow-lg z-50"
                                                            >
                                                                {['new', 'read', 'replied'].map((status) => (
                                                                    <button
                                                                        key={status}
                                                                        onClick={() => handleStatusChange(contact._id, status)}
                                                                        className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors whitespace-nowrap first:rounded-t last:rounded-b"
                                                                    >
                                                                        Mark as {status.charAt(0).toUpperCase() + status.slice(1)}
                                                                    </button>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </div>

                                                    {/* Spam Toggle */}
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleMarkSpam(contact._id, !contact.isSpam)}
                                                        className={`p-2 rounded-lg transition-colors ${contact.isSpam ? 'text-red-400 bg-red-500/20' : 'text-slate-500 hover:bg-red-500/20 hover:text-red-400'}`}
                                                        title={contact.isSpam ? 'Remove from spam' : 'Mark as spam'}
                                                    >
                                                        <FiAlertTriangle size={18} />
                                                    </motion.button>

                                                    {/* Delete */}
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleDelete(contact._id)}
                                                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                                        title="Delete contact"
                                                    >
                                                        <FiTrash2 size={18} />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex justify-center items-center gap-4 mt-8"
                    >
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 hover:border-blue-500 disabled:opacity-50 transition-colors"
                        >
                            Previous
                        </button>
                        <span className="text-slate-300">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 hover:border-blue-500 disabled:opacity-50 transition-colors"
                        >
                            Next
                        </button>
                    </motion.div>
                )}
            </div>
        </MainLayout>
    );
};

export default Contacts;
