const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'], default: 'Intermediate' }
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, default: '' },
    bio: { type: String, default: '' },
    availability: { type: String, default: '' },
    category: { type: String, default: 'General' },
    language: { type: String, default: 'English' },
    mode: { type: String, enum: ['Online', 'Offline', 'Both'], default: 'Online' },
    isAdmin: { type: Boolean, default: false },
    skillsOffered: [skillSchema],
    skillsWanted: [skillSchema],
    socialLinks: {
        github: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        website: { type: String, default: '' }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
