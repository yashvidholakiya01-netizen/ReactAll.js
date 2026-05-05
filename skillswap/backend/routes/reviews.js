const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// @route   POST api/reviews
// @desc    Add a review
// @access  Private
router.post('/', auth, async (req, res) => {
    const { reviewee, rating, comment, skillSwapped } = req.body;
    try {
        const newReview = new Review({
            reviewer: req.user.id,
            reviewee,
            rating,
            comment,
            skillSwapped
        });
        const review = await newReview.save();
        res.json(review);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/reviews/:userId
// @desc    Get all reviews for a user
// @access  Public
router.get('/:userId', async (req, res) => {
    try {
        const reviews = await Review.find({ reviewee: req.params.userId })
            .populate('reviewer', 'name')
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
