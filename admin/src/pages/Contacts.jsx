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
import { Breadcrumb } from '../components/Breadcrumb';
import { RouteTransition } from '../components/RouteTransition';
import { useUrlSearch, useUrlPagination } from '../hooks/useUrlSync';

export const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [stats, setStats] = useState({ total: 0, new: 0, read: 0, replied: 0, spam: 0 });
    const [showStatusDropdown, setShowStatusDropdown] = useState(null);
    const [loadingActions, setLoadingActions] = useState({});
    const [actionMessage, setActionMessage] = useState({ type: '', text: '' });
    const [actionDebounce, setActionDebounce] = useState({});
    const [statusOptions] = useState(['new', 'read', 'replied']);

    // URL sync hooks for search, filter, and pagination
    const { search, filter, setSearch, setFilter } = useUrlSearch();
    const { page, limit, setPage, setLimit } = useUrlPagination(10);

    useEffect(() => {
        fetchContacts();
        fetchStats();
    }, [page, filter, search]);

    const fetchContacts = async () => {
        setIsLoading(true);
        try {
            const params = {
                page,
                limit,
                ...(filter && { status: filter }),
                ...(search && { search }),
            };
            const response = await contactService.getAllContacts(params);
            setContacts(response.contacts);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('[v0] Failed to fetch contacts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await contactService.getStats();
            setStats(response.stats);
        } catch (error) {
            console.error('[v0] Failed to fetch stats:', error);
        }
    };

    const handleStatusChange = async (contactId, newStatus) => {
        // Validate inputs
        if (!contactId || !newStatus) {
            console.error('[v0] Invalid contact ID or status');
            setActionMessage({ type: 'error', text: 'Invalid status selection' });
            return;
        }

        // Debounce check
        if (actionDebounce[`status-${contactId}`]) {
            console.log('[v0] Debounced status change for:', contactId);
            return;
        }

        // Validate status is one of the allowed values
        const validStatuses = ['new', 'read', 'replied'];
        if (!validStatuses.includes(newStatus)) {
            console.error('[v0] Invalid status value:', newStatus);
            setActionMessage({ type: 'error', text: 'Invalid status value' });
            return;
        }

        setLoadingActions(prev => ({ ...prev, [contactId]: 'status' }));
        setActionMessage({ type: '', text: '' });
        setActionDebounce(prev => ({ ...prev, [`status-${contactId}`]: true }));

        try {
            console.log('[v0] Updating contact status:', { contactId, newStatus });
            const response = await contactService.updateContactStatus(contactId, newStatus);
            console.log('[v0] Status update response:', response);

            setShowStatusDropdown(null);
            setActionMessage({ type: 'success', text: `Status updated to ${newStatus}` });

            // Refresh data with a slight delay
            setTimeout(() => {
                fetchContacts();
                fetchStats();
            }, 300);
        } catch (error) {
            console.error('[v0] Failed to update status:', {
                contactId,
                newStatus,
                errorMessage: error.message,
                errorResponse: error.response?.data
            });
            setActionMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to update status. Please try again.'
            });
        } finally {
            setLoadingActions(prev => ({ ...prev, [contactId]: null }));

            // Remove debounce after 1 second to allow retry
            setTimeout(() => {
                setActionDebounce(prev => {
                    const newDebounce = { ...prev };
                    delete newDebounce[`status-${contactId}`];
                    return newDebounce;
                });
            }, 1000);
        }
    };

    const handleMarkSpam = async (contactId, isSpam) => {
        // Validate inputs
        if (!contactId || typeof isSpam !== 'boolean') {
            console.error('[v0] Invalid contact ID or spam flag');
            setActionMessage({ type: 'error', text: 'Invalid operation' });
            return;
        }

        // Debounce check
        if (actionDebounce[`spam-${contactId}`]) {
            console.log('[v0] Debounced spam action for:', contactId);
            return;
        }

        setLoadingActions(prev => ({ ...prev, [contactId]: 'spam' }));
        setActionMessage({ type: '', text: '' });
        setActionDebounce(prev => ({ ...prev, [`spam-${contactId}`]: true }));

        try {
            console.log('[v0] Marking as spam:', { contactId, isSpam });
            await contactService.markAsSpam(contactId, isSpam);
            setActionMessage({ type: 'success', text: `Marked as ${isSpam ? 'spam' : 'not spam'} successfully` });

            setTimeout(() => {
                fetchContacts();
                fetchStats();
            }, 300);
        } catch (error) {
            console.error('[v0] Failed to mark spam:', error);
            setActionMessage({ type: 'error', text: 'Failed to update spam status. Please try again.' });
        } finally {
            setLoadingActions(prev => ({ ...prev, [contactId]: null }));

            setTimeout(() => {
                setActionDebounce(prev => {
                    const newDebounce = { ...prev };
                    delete newDebounce[`spam-${contactId}`];
                    return newDebounce;
                });
            }, 1000);
        }
    };

    const handleDelete = async (contactId) => {
        if (!window.confirm('Are you sure you want to delete this contact? This action cannot be undone.')) {
            return;
        }

        // Debounce check
        if (actionDebounce[`delete-${contactId}`]) {
            return;
        }

        setLoadingActions(prev => ({ ...prev, [contactId]: 'delete' }));
        setActionMessage({ type: '', text: '' });
        setActionDebounce(prev => ({ ...prev, [`delete-${contactId}`]: true }));

        try {
            await contactService.deleteContact(contactId);
            setActionMessage({ type: 'success', text: 'Contact deleted successfully' });

            setTimeout(() => {
                fetchContacts();
                fetchStats();
            }, 300);
        } catch (error) {
            console.error('[v0] Failed to delete contact:', error);
            setActionMessage({ type: 'error', text: 'Failed to delete contact. Please try again.' });
        } finally {
            setLoadingActions(prev => ({ ...prev, [contactId]: null }));

            setTimeout(() => {
                setActionDebounce(prev => {
                    const newDebounce = { ...prev };
                    delete newDebounce[`delete-${contactId}`];
                    return newDebounce;
                });
            }, 1000);
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
            <RouteTransition>
                <div className="w-full space-y-8">
                    {/* Breadcrumb */}
                    <Breadcrumb />

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-5xl font-bold text-white mb-2">Contacts Management</h1>
                    <p className="text-slate-400 text-base">Manage and track all client inquiries</p>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
                >
                    <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-blue-500/30 rounded-lg p-6 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all cursor-pointer">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Total Contacts</p>
                                <p className="text-white text-4xl font-bold mt-3">{stats.total}</p>
                            </div>
                            <FiMail className="text-4xl text-blue-400 opacity-30" />
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-yellow-500/30 rounded-lg p-6 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-500/20 transition-all cursor-pointer">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">New Messages</p>
                                <p className="text-yellow-300 text-4xl font-bold mt-3">{stats.new}</p>
                            </div>
                            <FiAlertTriangle className="text-4xl text-yellow-400 opacity-30" />
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all cursor-pointer">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Read Messages</p>
                                <p className="text-purple-300 text-4xl font-bold mt-3">{stats.read}</p>
                            </div>
                            <FiEye className="text-4xl text-purple-400 opacity-30" />
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-green-500/30 rounded-lg p-6 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20 transition-all cursor-pointer">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Replied Messages</p>
                                <p className="text-green-300 text-4xl font-bold mt-3">{stats.replied}</p>
                            </div>
                            <FiCheck className="text-4xl text-green-400 opacity-30" />
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-red-500/30 rounded-lg p-6 hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/20 transition-all cursor-pointer">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Spam Messages</p>
                                <p className="text-red-300 text-4xl font-bold mt-3">{stats.spam}</p>
                            </div>
                            <FiX className="text-4xl text-red-400 opacity-30" />
                        </div>
                    </div>
                </motion.div>

                {/* Action Message Display */}
                {actionMessage.text && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`mx-2 px-4 py-3 rounded-lg flex items-center justify-between ${actionMessage.type === 'success'
                            ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                            : 'bg-red-500/20 border border-red-500/50 text-red-300'
                            }`}
                    >
                        <span>{actionMessage.text}</span>
                        <button
                            onClick={() => setActionMessage({ type: '', text: '' })}
                            className="ml-4 text-lg hover:opacity-70"
                        >
                            ✕
                        </button>
                    </motion.div>
                )}

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
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
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
                            <span>{filter ? filter.charAt(0).toUpperCase() + filter.slice(1) : 'All Status'}</span>
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
                                        setFilter('');
                                        setShowStatusDropdown(false);
                                        setPage(1);
                                    }}
                                    className="block w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors first:rounded-t-lg"
                                >
                                    All Status
                                </button>
                                <button
                                    onClick={() => {
                                        setFilter('new');
                                        setShowStatusDropdown(false);
                                        setPage(1);
                                    }}
                                    className="block w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-yellow-300 transition-colors"
                                >
                                    New
                                </button>
                                <button
                                    onClick={() => {
                                        setFilter('read');
                                        setShowStatusDropdown(false);
                                        setPage(1);
                                    }}
                                    className="block w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-blue-300 transition-colors"
                                >
                                    Read
                                </button>
                                <button
                                    onClick={() => {
                                        setFilter('replied');
                                        setShowStatusDropdown(false);
                                        setPage(1);
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
                    className="bg-gradient-to-br from-slate-800 to-slate-700 border border-blue-500/20 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all"
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
                                                        onClick={() => {
                                                            setSelectedContact(contact);
                                                            setShowModal(true);
                                                        }}
                                                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                                                        title="View details"
                                                    >
                                                        <FiEye size={18} />
                                                    </motion.button>

                                                    {/* Status Change Dropdown */}
                                                    <div className="relative">
                                                        <motion.button
                                                            whileHover={loadingActions[contact._id] !== 'status' ? { scale: 1.1 } : {}}
                                                            whileTap={loadingActions[contact._id] !== 'status' ? { scale: 0.95 } : {}}
                                                            onClick={() => loadingActions[contact._id] !== 'status' && setShowStatusDropdown(showStatusDropdown === contact._id ? null : contact._id)}
                                                            disabled={loadingActions[contact._id] === 'status'}
                                                            className={`p-2 rounded-lg transition-colors ${loadingActions[contact._id] === 'status'
                                                                ? 'text-yellow-400 bg-yellow-500/30 opacity-50 cursor-not-allowed'
                                                                : 'text-yellow-400 hover:bg-yellow-500/20'
                                                                }`}
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
                                                        whileHover={loadingActions[contact._id] !== 'spam' ? { scale: 1.1 } : {}}
                                                        whileTap={loadingActions[contact._id] !== 'spam' ? { scale: 0.95 } : {}}
                                                        onClick={() => loadingActions[contact._id] !== 'spam' && handleMarkSpam(contact._id, !contact.isSpam)}
                                                        disabled={loadingActions[contact._id] === 'spam'}
                                                        className={`p-2 rounded-lg transition-colors ${loadingActions[contact._id] === 'spam'
                                                            ? 'text-red-400 bg-red-500/30 opacity-50 cursor-not-allowed'
                                                            : contact.isSpam
                                                                ? 'text-red-400 bg-red-500/20'
                                                                : 'text-slate-500 hover:bg-red-500/20 hover:text-red-400'
                                                            }`}
                                                        title={contact.isSpam ? 'Remove from spam' : 'Mark as spam'}
                                                    >
                                                        <FiAlertTriangle size={18} />
                                                    </motion.button>

                                                    {/* Delete */}
                                                    <motion.button
                                                        whileHover={loadingActions[contact._id] !== 'delete' ? { scale: 1.1 } : {}}
                                                        whileTap={loadingActions[contact._id] !== 'delete' ? { scale: 0.95 } : {}}
                                                        onClick={() => loadingActions[contact._id] !== 'delete' && handleDelete(contact._id)}
                                                        disabled={loadingActions[contact._id] === 'delete'}
                                                        className={`p-2 rounded-lg transition-colors ${loadingActions[contact._id] === 'delete'
                                                            ? 'text-red-400 bg-red-500/30 opacity-50 cursor-not-allowed'
                                                            : 'text-red-400 hover:bg-red-500/20'
                                                            }`}
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
                            onClick={() => setPage(Math.max(1, page - 1))}
                            disabled={page === 1}
                            className="px-6 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 hover:border-blue-500 hover:bg-slate-700 disabled:opacity-50 transition-all font-medium"
                        >
                            Previous
                        </button>
                        <span className="text-slate-300 font-semibold px-4 py-2.5 bg-slate-800/50 rounded-lg">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(Math.min(totalPages, page + 1))}
                            disabled={page === totalPages}
                            className="px-6 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 hover:border-blue-500 hover:bg-slate-700 disabled:opacity-50 transition-all font-medium"
                        >
                            Next
                        </button>
                    </motion.div>
                )}

                {/* Contact Details Modal */}
                {showModal && selectedContact && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowModal(false)}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gradient-to-br from-slate-800 to-slate-700 border border-blue-500/30 rounded-lg p-6 w-full max-w-md mx-auto shadow-2xl"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Contact Details</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-slate-400 hover:text-white transition-colors"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                                        <FiUser className="inline mr-2" />
                                        Name
                                    </label>
                                    <p className="text-white text-lg">{selectedContact.name}</p>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                                        <FiMail className="inline mr-2" />
                                        Email
                                    </label>
                                    <p className="text-white break-all">{selectedContact.email}</p>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                                        <FiMessageSquare className="inline mr-2" />
                                        Message
                                    </label>
                                    <p className="text-slate-300 bg-slate-900/50 p-3 rounded border border-slate-600 max-h-32 overflow-y-auto">
                                        {selectedContact.message}
                                    </p>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                                        Status
                                    </label>
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${selectedContact.status === 'new'
                                        ? 'bg-yellow-500/20 text-yellow-300'
                                        : selectedContact.status === 'read'
                                            ? 'bg-blue-500/20 text-blue-300'
                                            : 'bg-green-500/20 text-green-300'
                                        }`}>
                                        {selectedContact.status?.charAt(0).toUpperCase() + selectedContact.status?.slice(1)}
                                    </span>
                                </div>

                                {/* Spam Status */}
                                <div>
                                    <label className="block text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                                        Spam Status
                                    </label>
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${selectedContact.isSpam
                                        ? 'bg-red-500/20 text-red-300'
                                        : 'bg-green-500/20 text-green-300'
                                        }`}>
                                        {selectedContact.isSpam ? 'Marked as Spam' : 'Not Spam'}
                                    </span>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="mt-8 flex gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all font-semibold shadow-lg hover:shadow-blue-500/30"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
                </div>
            </RouteTransition>
        </MainLayout>
    );
};

export default Contacts;
