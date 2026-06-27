import api from './api';

export const contactService = {
    getAllContacts: async (params = {}) => {
        try {
            const response = await api.get('/admin/contacts', { params });
            if (!response.data) {
                throw new Error('No data returned from server');
            }
            return response.data;
        } catch (error) {
            console.error('[v0] Error fetching contacts:', error.message);
            throw error;
        }
    },

    getContactById: async (id) => {
        try {
            if (!id) throw new Error('Contact ID is required');
            const response = await api.get(`/admin/contacts/${id}`);
            return response.data;
        } catch (error) {
            console.error('[v0] Error fetching contact:', error.message);
            throw error;
        }
    },

    updateContactStatus: async (id, status) => {
        try {
            if (!id || !status) throw new Error('ID and status are required');
            const validStatuses = ['new', 'read', 'replied'];
            if (!validStatuses.includes(status)) {
                throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
            }
            const response = await api.put(`/admin/contacts/${id}/status`, { status });
            return response.data;
        } catch (error) {
            console.error('[v0] Error updating contact status:', error.message);
            throw error;
        }
    },

    markAsSpam: async (id, isSpam) => {
        try {
            if (!id) throw new Error('Contact ID is required');
            if (typeof isSpam !== 'boolean') throw new Error('isSpam must be a boolean');
            const response = await api.put(`/admin/contacts/${id}/spam`, { isSpam });
            return response.data;
        } catch (error) {
            console.error('[v0] Error marking as spam:', error.message);
            throw error;
        }
    },

    deleteContact: async (id) => {
        try {
            if (!id) throw new Error('Contact ID is required');
            const response = await api.delete(`/admin/contacts/${id}`);
            return response.data;
        } catch (error) {
            console.error('[v0] Error deleting contact:', error.message);
            throw error;
        }
    },

    getStats: async () => {
        try {
            const response = await api.get('/admin/contacts/stats');
            if (!response.data) {
                throw new Error('No stats data returned from server');
            }
            return response.data;
        } catch (error) {
            console.error('[v0] Error fetching stats:', error.message);
            // Return default stats on error to prevent UI crashes
            return {
                stats: {
                    total: 0,
                    new: 0,
                    read: 0,
                    replied: 0,
                    spam: 0
                }
            };
        }
    },
};
