const mongoose = require("mongoose");

const ContactSchema =
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
            },

            email: {
                type: String,
                required: true,
            },

            phone: {
                type: String,
                required: false,
            },

            message: {
                type: String,
                required: true,
            },

            status: {
                type: String,
                enum: ['new', 'read', 'replied'],
                default: 'new',
            },

            isSpam: {
                type: Boolean,
                default: false,
            },
        },
        {
            timestamps: true,
        }
    );

module.exports =
    mongoose.model(
        "Contact",
        ContactSchema
    );