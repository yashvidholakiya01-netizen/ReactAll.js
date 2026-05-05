const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   POST api/requests
// @desc    Send a swap request
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { receiverId } = req.body;
        console.log(`Attempting to send request from ${req.user.id} to ${receiverId}`);

        // Check if receiver exists
        const receiver = await User.findById(receiverId);
        if (!receiver) {
            console.log('Receiver not found');
            return res.status(404).json({ message: 'Receiver not found' });
        }

        // Prevent self-request
        if (receiverId === req.user.id) {
            return res.status(400).json({ message: 'Cannot send request to yourself' });
        }

        // Check if request already exists
        const existingRequest = await Request.findOne({
            sender: req.user.id,
            receiver: receiverId
        });

        if (existingRequest) {
            console.log('Request already exists');
            return res.status(400).json({ message: 'Request already sent' });
        }

        const newRequest = new Request({
            sender: req.user.id,
            receiver: receiverId
        });

        const request = await newRequest.save();
        console.log('Request saved successfully:', request._id);
        res.json(request);
    } catch (err) {
        console.error('Error in POST /api/requests:', err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/requests
// @desc    Get user requests (sent and received)
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        console.log(`Fetching requests for user: ${req.user.id}`);
        const receivedRequests = await Request.find({ receiver: req.user.id }).populate('sender', 'name email bio skillsOffered').sort({ createdAt: -1 });
        const sentRequests = await Request.find({ sender: req.user.id }).populate('receiver', 'name email bio skillsOffered').sort({ createdAt: -1 });
        
        console.log(`Found ${receivedRequests.length} received and ${sentRequests.length} sent requests`);
        res.json({ receivedRequests, sentRequests });
    } catch (err) {
        console.error('Error in GET /api/requests:', err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/requests/:id
// @desc    Accept or Reject a request
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const { status } = req.body; // 'Accepted' or 'Rejected'
        
        if (!['Accepted', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        let request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Make sure user owns the request (is the receiver)
        if (request.receiver.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        request.status = status;
        await request.save();

        res.json(request);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
