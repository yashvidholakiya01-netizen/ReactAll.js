const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET api/users
// @desc    Get all users (Browse) or search with filters
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const { skill, category, language, mode, level } = req.query;
        let query = { _id: { $ne: req.user.id }, isAdmin: { $ne: true } }; // Exclude current user and admins

        if (skill) {
            query['skillsOffered.name'] = { $regex: skill, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        if (language) {
            query.language = language;
        }
        if (mode) {
            query.mode = mode;
        }
        if (level) {
            query['skillsOffered.level'] = level;
        }

        const users = await User.find(query).select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/users/matches
// @desc    Get suggested matches for current user
// @access  Private
router.get('/matches', auth, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        if (!currentUser) return res.status(404).json({ message: 'User not found' });

        const offeredSkills = currentUser.skillsOffered.map(s => s.name);
        const wantedSkills = currentUser.skillsWanted.map(s => s.name);

        // Find users who teach what I want OR want what I teach
        const matches = await User.find({
            _id: { $ne: req.user.id },
            isAdmin: { $ne: true },
            $or: [
                { 'skillsOffered.name': { $in: wantedSkills } },
                { 'skillsWanted.name': { $in: offeredSkills } }
            ]
        }).select('-password').limit(10);

        // Sort by "Perfect Match"
        const sortedMatches = matches.sort((a, b) => {
            const aTeachesWhatIWant = a.skillsOffered.some(s => wantedSkills.includes(s.name));
            const aWantsWhatITeach = a.skillsWanted.some(s => offeredSkills.includes(s.name));
            const aScore = (aTeachesWhatIWant ? 1 : 0) + (aWantsWhatITeach ? 1 : 0);

            const bTeachesWhatIWant = b.skillsOffered.some(s => wantedSkills.includes(s.name));
            const bWantsWhatITeach = b.skillsWanted.some(s => offeredSkills.includes(s.name));
            const bScore = (bTeachesWhatIWant ? 1 : 0) + (bWantsWhatITeach ? 1 : 0);

            return bScore - aScore;
        });

        res.json(sortedMatches);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/users/:id
// @desc    Get user profile by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
             return res.status(404).json({ message: 'User not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
    const { bio, skillsOffered, skillsWanted, name, socialLinks, availability, category, language, mode } = req.body;

    // Build profile object
    const profileFields = {};
    if (name) profileFields.name = name;
    if (bio !== undefined) profileFields.bio = bio;
    if (skillsOffered) profileFields.skillsOffered = skillsOffered;
    if (skillsWanted) profileFields.skillsWanted = skillsWanted;
    if (socialLinks) profileFields.socialLinks = socialLinks;
    if (availability !== undefined) profileFields.availability = availability;
    if (category) profileFields.category = category;
    if (language) profileFields.language = language;
    if (mode) profileFields.mode = mode;

    try {
        let user = await User.findById(req.user.id);
        if (user) {
            user = await User.findByIdAndUpdate(
                req.user.id,
                { $set: profileFields },
                { new: true }
            ).select('-password');
            return res.json(user);
        }
        res.status(404).json({ message: 'User not found' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
