const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Request = require('../models/Request');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// Middleware to check if user is admin
const adminAuth = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user && user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: 'Access denied. Admin only.' });
        }
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @route   GET api/admin/stats
// @desc    Get dashboard stats
// @access  Private/Admin
router.get('/stats', [auth, adminAuth], async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const requestsCount = await Request.countDocuments();
        const activeRequestsCount = await Request.countDocuments({ status: 'Accepted' });
        
        res.json({
            users: usersCount,
            requests: requestsCount,
            activeRequests: activeRequestsCount
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   GET api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', [auth, adminAuth], async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/admin/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/users/:id', [auth, adminAuth], async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        await Request.deleteMany({ $or: [{ sender: req.params.id }, { receiver: req.params.id }] });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/admin/users/:id
// @desc    Update user details
// @access  Private/Admin
router.put('/users/:id', [auth, adminAuth], async (req, res) => {
    try {
        const { name, email, isAdmin } = req.body;
        const user = await User.findById(req.params.id);
        
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = name || user.name;
        user.email = email || user.email;
        if (isAdmin !== undefined) {
            user.isAdmin = isAdmin;
        }

        await user.save();
        res.json({ message: 'User updated successfully', user });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   GET api/admin/requests
// @desc    Get all requests
// @access  Private/Admin
router.get('/requests', [auth, adminAuth], async (req, res) => {
    try {
        const requests = await Request.find()
            .populate('sender', 'name email skillsOffered skillsWanted')
            .populate('receiver', 'name email skillsOffered skillsWanted')
            .sort({ createdAt: -1 });
        res.json(requests);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/admin/requests/:id
// @desc    Update request status
// @access  Private/Admin
router.put('/requests/:id', [auth, adminAuth], async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Pending', 'Accepted', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        const request = await Request.findByIdAndUpdate(req.params.id, { status }, { new: true })
            .populate('sender', 'name email skillsOffered skillsWanted')
            .populate('receiver', 'name email skillsOffered skillsWanted');
        if (!request) return res.status(404).json({ message: 'Request not found' });
        res.json(request);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   GET api/admin/reviews
// @desc    Get all reviews
// @access  Private/Admin
router.get('/reviews', [auth, adminAuth], async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('reviewer', 'name email')
            .populate('reviewee', 'name email')
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/admin/reviews/:id
// @desc    Delete review
// @access  Private/Admin
router.delete('/reviews/:id', [auth, adminAuth], async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
