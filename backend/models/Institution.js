// models/Institution.js
const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        code: {
            type: String,
            required: true,
            unique: true, // institution code
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        phone: {
            type: String,
            required: true,
        },

        address: {
            type: String,
        },

        collegeAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // role = collegeAdmin
        },

        status: {
            type: String,
            enum: ["active", "inactive", "blocked"],
            default: "active",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Admin (super admin)
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Institution", institutionSchema);
