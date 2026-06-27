import { useEffect, useState } from 'react';
import { FiArrowLeft, FiEdit2, FiTrash2, FiMail, FiUser, FiPhone, FiMessageSquare } from 'react-icons/fi';
import { MainLayout } from '../layouts/MainLayout';
import { contactService } from '../services/contactService';
import { motion } from 'framer-motion';
import { Breadcrumb, CustomBreadcrumb } from '../components/Breadcrumb';
import { RouteTransition } from '../components/RouteTransition';
import { useDynamicRoute } from '../hooks/useNestedRoutes';

export const ContactDetail = () => {
  const { id, navigate, navigateToParent, navigateToEdit, isEditMode } = useDynamicRoute();
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!id) {
      navigateToParent();
      return;
    }

    fetchContactDetail();
  }, [id]);

  const fetchContactDetail = async () => {
    setIsLoading(true);
    try {
      const response = await contactService.getContactById(id);
      setContact(response);
    } catch (error) {
      console.error('[v0] Failed to fetch contact:', error);
      setActionMessage({
        type: 'error',
        text: 'Failed to load contact details.',
      });
      setTimeout(() => navigateToParent(), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this contact? This action cannot be undone.')) {
      return;
    }

    try {
      await contactService.deleteContact(id);
      setActionMessage({ type: 'success', text: 'Contact deleted successfully.' });
      setTimeout(() => navigateToParent(), 1500);
    } catch (error) {
      console.error('[v0] Failed to delete contact:', error);
      setActionMessage({
        type: 'error',
        text: 'Failed to delete contact. Please try again.',
      });
    }
  };

  const customBreadcrumbs = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Contacts', path: '/contacts' },
    { label: contact?.name || 'Loading...', path: null },
  ];

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-yellow-400"></div>
        </div>
      </MainLayout>
    );
  }

  if (!contact) {
    return (
      <MainLayout>
        <RouteTransition>
          <div className="w-full">
            <motion.button
              whileHover={{ x: -4 }}
              onClick={navigateToParent}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
            >
              <FiArrowLeft size={20} />
              Back to Contacts
            </motion.button>
            <div className="text-center py-16">
              <p className="text-slate-400 text-lg">Contact not found.</p>
            </div>
          </div>
        </RouteTransition>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <RouteTransition>
        <div className="w-full space-y-8">
          {/* Custom Breadcrumb */}
          <CustomBreadcrumb items={customBreadcrumbs} />

          {/* Action Message */}
          {actionMessage.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`px-4 py-3 rounded-lg flex items-center justify-between ${
                actionMessage.type === 'success'
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

          {/* Header with Actions */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start justify-between mb-8"
          >
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">{contact.name}</h1>
              <p className="text-slate-400 text-base">Contact Details</p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={navigateToEdit}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                <FiEdit2 size={18} />
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDelete}
                className="flex items-center gap-2 px-6 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/50 rounded-lg transition-colors font-medium"
              >
                <FiTrash2 size={18} />
                Delete
              </motion.button>
              <motion.button
                whileHover={{ x: 4 }}
                onClick={navigateToParent}
                className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors font-medium"
              >
                Back
              </motion.button>
            </div>
          </motion.div>

          {/* Contact Details Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Basic Information */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-slate-800 to-slate-700 border border-blue-500/20 rounded-lg p-8 hover:shadow-lg hover:shadow-blue-500/10 transition-all"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <FiUser className="text-blue-400" />
                    <label className="text-sm uppercase tracking-wider font-semibold text-slate-400">Name</label>
                  </div>
                  <p className="text-slate-200 text-lg ml-7">{contact.name}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <FiMail className="text-green-400" />
                    <label className="text-sm uppercase tracking-wider font-semibold text-slate-400">Email</label>
                  </div>
                  <p className="text-slate-200 text-lg ml-7">{contact.email}</p>
                </motion.div>

                {contact.phone && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <FiPhone className="text-yellow-400" />
                      <label className="text-sm uppercase tracking-wider font-semibold text-slate-400">Phone</label>
                    </div>
                    <p className="text-slate-200 text-lg ml-7">{contact.phone}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Status Information */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-slate-800 to-slate-700 border border-green-500/20 rounded-lg p-8 hover:shadow-lg hover:shadow-green-500/10 transition-all"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Status Information</h2>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <label className="text-sm uppercase tracking-wider font-semibold text-slate-400 block mb-2">Status</label>
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                      contact.status === 'new'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : contact.status === 'read'
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-green-500/20 text-green-300'
                    }`}
                  >
                    {contact.status?.charAt(0).toUpperCase() + contact.status?.slice(1)}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="text-sm uppercase tracking-wider font-semibold text-slate-400 block mb-2">Spam Status</label>
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                      contact.isSpam ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
                    }`}
                  >
                    {contact.isSpam ? 'Marked as Spam' : 'Not Spam'}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <label className="text-sm uppercase tracking-wider font-semibold text-slate-400 block mb-2">Created Date</label>
                  <p className="text-slate-200">{new Date(contact.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/20 rounded-lg p-8 hover:shadow-lg hover:shadow-purple-500/10 transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <FiMessageSquare className="text-purple-400 text-2xl" />
              <h2 className="text-2xl font-bold text-white">Message</h2>
            </div>
            <p className="text-slate-300 leading-relaxed">{contact.message}</p>
          </motion.div>
        </div>
      </RouteTransition>
    </MainLayout>
  );
};

export default ContactDetail;
