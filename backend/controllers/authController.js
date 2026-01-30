const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/* ================= REGISTER USER ================= */
exports.registerUser = async (req, res) => {
    try {
        const { name, email, phone, password, userType } = req.body;

        if (!name || !email || !phone || !password || !userType) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // hash password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            phone,
            hashedPassword,
            userType,
        });

        res.status(201).json({
            message: 'User registered successfully',
            userId: user._id,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* ================= REGISTER ADMIN ================= */
exports.registerAdmin = async (req, res) => {
    try {
        const { name, email, phone, password, adminSecret } = req.body;

        // 🔐 SECURITY: admin secret key
        if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
            return res.status(403).json({ message: 'Unauthorized admin registration' });
        }

        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = await User.create({
            name,
            email,
            phone,
            hashedPassword,
            userType: 'admin',
        });

        res.status(201).json({
            message: 'Admin registered successfully',
            adminId: admin._id,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* ================= LOGIN ================= */
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (user.status !== 'active') {
            return res.status(403).json({ message: 'Account is inactive' });
        }

        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                userType: user.userType,
                status: user.status,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
