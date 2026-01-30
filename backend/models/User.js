const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        phone: {
            type: String,
            required: true,
        },

        hashedPassword: {
            type: String,
            required: true,
        },

        userType: {
            type: String,
            enum: ['admin', 'college_admin', 'faculty', 'student'],
            required: true,
        },

        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
