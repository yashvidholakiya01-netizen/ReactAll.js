import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, BookOpen, Plus, X, Save, Code, Briefcase, Globe, Clock, Star, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [bio, setBio] = useState('');
    const [skillsOffered, setSkillsOffered] = useState([]);
    const [skillsWanted, setSkillsWanted] = useState([]);
    const [offerInput, setOfferInput] = useState('');
    const [offerLevel, setOfferLevel] = useState('Intermediate');
    const [wantInput, setWantInput] = useState('');
    const [availability, setAvailability] = useState('');
    const [socialLinks, setSocialLinks] = useState({ github: '', linkedin: '', website: '' });
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('/auth/me');
                setProfile(res.data);
                setBio(res.data.bio || '');
                setSkillsOffered(res.data.skillsOffered || []);
                setSkillsWanted(res.data.skillsWanted || []);
                setAvailability(res.data.availability || '');
                if (res.data.socialLinks) setSocialLinks(res.data.socialLinks);
                
                // Fetch reviews
                const reviewsRes = await axios.get(`/reviews/${res.data._id}`);
                setReviews(reviewsRes.data);
            } catch (err) {
                console.error(err);
                toast.error('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async (dataOverride) => {
        const isEvent = dataOverride && dataOverride.nativeEvent;
        
        let finalSkillsOffered = [...skillsOffered];
        let finalSkillsWanted = [...skillsWanted];
        
        if (isEvent || !dataOverride) {
            // Only auto-add if we are clicking "Save Changes" (which passes an event)
            if (offerInput.trim()) {
                finalSkillsOffered.push({ name: offerInput.trim(), level: offerLevel });
                setOfferInput('');
                setSkillsOffered(finalSkillsOffered);
            }
            if (wantInput.trim()) {
                finalSkillsWanted.push({ name: wantInput.trim() });
                setWantInput('');
                setSkillsWanted(finalSkillsWanted);
            }
        }

        const payload = (isEvent || !dataOverride) ? {
            bio,
            skillsOffered: finalSkillsOffered,
            skillsWanted: finalSkillsWanted,
            availability,
            socialLinks
        } : dataOverride;

        const loadingToast = toast.loading('Saving changes...');
        try {
            const res = await axios.put('/users/profile', payload);
            setProfile(res.data);
            setUser({ ...user, bio: res.data.bio });
            toast.success('Profile updated successfully!', { id: loadingToast });
        } catch (err) {
            toast.error('Failed to update profile.', { id: loadingToast });
        }
    };

    const handleAddSkill = async (type) => {
        if (type === 'offer' && offerInput.trim()) {
            const newSkills = [...skillsOffered, { name: offerInput.trim(), level: offerLevel }];
            setSkillsOffered(newSkills);
            setOfferInput('');
            await handleSave({ bio, skillsWanted, socialLinks, availability, skillsOffered: newSkills });
        } else if (type === 'want' && wantInput.trim()) {
            const newSkills = [...skillsWanted, { name: wantInput.trim() }];
            setSkillsWanted(newSkills);
            setWantInput('');
            await handleSave({ bio, skillsOffered, socialLinks, availability, skillsWanted: newSkills });
        }
    };

    const handleRemoveSkill = async (type, index) => {
        if (type === 'offer') {
            const newSkills = skillsOffered.filter((_, i) => i !== index);
            setSkillsOffered(newSkills);
            await handleSave({ bio, skillsWanted, socialLinks, availability, skillsOffered: newSkills });
        } else {
            const newSkills = skillsWanted.filter((_, i) => i !== index);
            setSkillsWanted(newSkills);
            await handleSave({ bio, skillsOffered, socialLinks, availability, skillsWanted: newSkills });
        }
    };

    const handleSocialChange = (e) => {
        setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
    };

    const getAvatarLetter = () => profile?.name ? profile.name.charAt(0).toUpperCase() : 'U';

    if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
                >
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-40"></div>
                    <div className="px-8 pb-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-20 mb-8 relative z-10 w-full">
                            <div className="bg-white p-2 rounded-full border-4 border-white shadow-lg shrink-0">
                                <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-5xl font-bold shadow-inner">
                                    {getAvatarLetter()}
                                </div>
                            </div>

                            <div className="flex-1 text-center sm:text-left mb-2 sm:mb-0">
                                <h1 className="text-3xl font-extrabold text-gray-900">{profile?.name}</h1>
                                <p className="text-gray-500 flex items-center justify-center sm:justify-start gap-2 mt-1 font-medium">
                                    <Mail size={16} /> {profile?.email}
                                </p>
                            </div>

                            <button 
                                onClick={handleSave}
                                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-sm shadow-indigo-200 shrink-0 sm:mb-2 w-full sm:w-auto"
                            >
                                <Save size={18} /> Save Changes
                            </button>
                        </div>

                        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* Left Column - Bio & Socials */}
                            <div className="space-y-8 lg:col-span-1">
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">About Me</label>
                                    <textarea
                                        rows="5"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none text-gray-700"
                                        placeholder="Tell others about yourself..."
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <Clock size={16} className="text-indigo-600" /> Availability
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700"
                                        placeholder="e.g. Weekends, 6pm-9pm weekdays"
                                        value={availability}
                                        onChange={(e) => setAvailability(e.target.value)}
                                    />
                                </div>

                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-900 mb-4">Social Links</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Code className="text-gray-600" size={20} />
                                            <input 
                                                type="text" name="github" value={socialLinks.github} onChange={handleSocialChange}
                                                placeholder="GitHub Profile URL" 
                                                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Briefcase className="text-blue-600" size={20} />
                                            <input 
                                                type="text" name="linkedin" value={socialLinks.linkedin} onChange={handleSocialChange}
                                                placeholder="LinkedIn Profile URL" 
                                                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Globe className="text-green-600" size={20} />
                                            <input 
                                                type="text" name="website" value={socialLinks.website} onChange={handleSocialChange}
                                                placeholder="Personal Website URL" 
                                                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Skills */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Skills I Can Teach */}
                                <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm shadow-indigo-50">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <BookOpen className="text-indigo-500" size={20} /> Skills I Can Teach
                                    </h3>
                                    
                                    <div className="flex flex-col sm:flex-row gap-2 mb-6">
                                        <input 
                                            type="text"
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            placeholder="e.g. React.js"
                                            value={offerInput}
                                            onChange={(e) => setOfferInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill('offer')}
                                        />
                                        <select 
                                            className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
                                            value={offerLevel}
                                            onChange={(e) => setOfferLevel(e.target.value)}
                                        >
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Expert">Expert</option>
                                        </select>
                                        <button 
                                            onClick={() => handleAddSkill('offer')}
                                            className="bg-indigo-100 text-indigo-700 p-2 rounded-lg hover:bg-indigo-200 transition-colors flex items-center justify-center min-w-[40px]"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {skillsOffered.map((skill, index) => (
                                            <div key={index} className="bg-white border border-indigo-200 text-indigo-900 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm">
                                                <span>{skill.name}</span>
                                                <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                                    skill.level === 'Expert' ? 'bg-indigo-600 text-white' : 
                                                    skill.level === 'Intermediate' ? 'bg-indigo-100 text-indigo-700' : 
                                                    'bg-gray-100 text-gray-600'
                                                }`}>
                                                    {skill.level}
                                                </span>
                                                <button onClick={() => handleRemoveSkill('offer', index)} className="text-gray-400 hover:text-red-500 ml-1">
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        {skillsOffered.length === 0 && <p className="text-gray-400 text-sm">Add some skills you can teach others.</p>}
                                    </div>
                                </div>

                                {/* Skills I Want to Learn */}
                                <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm shadow-purple-50">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <BookOpen className="text-purple-500" size={20} /> Skills I Want to Learn
                                    </h3>
                                    
                                    <div className="flex gap-2 mb-6">
                                        <input 
                                            type="text"
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                            placeholder="e.g. Python"
                                            value={wantInput}
                                            onChange={(e) => setWantInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill('want')}
                                        />
                                        <button 
                                            onClick={() => handleAddSkill('want')}
                                            className="bg-purple-100 text-purple-700 p-2 rounded-lg hover:bg-purple-200 transition-colors flex items-center justify-center min-w-[40px]"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {skillsWanted.map((skill, index) => (
                                            <div key={index} className="bg-white border border-purple-200 text-purple-900 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm">
                                                <span>{skill.name}</span>
                                                <button onClick={() => handleRemoveSkill('want', index)} className="text-purple-400 hover:text-red-500 ml-1">
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        {skillsWanted.length === 0 && <p className="text-gray-400 text-sm">Add skills you're interested in learning.</p>}
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Reviews Section */}
                        <div className="mt-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Star className="text-amber-400 fill-amber-400" size={24} /> My Reviews ({reviews.length})
                            </h3>
                            
                            {reviews.length === 0 ? (
                                <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
                                    <MessageSquare className="mx-auto text-gray-300 mb-2" size={32} />
                                    <p className="text-gray-500 font-medium">You don't have any reviews yet.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {reviews.map((rev) => (
                                        <div key={rev._id} className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xs">
                                                        {rev.reviewer?.name?.charAt(0) || 'U'}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-sm">{rev.reviewer?.name || 'Anonymous'}</p>
                                                        <p className="text-[10px] text-gray-400 font-medium uppercase">{new Date(rev.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                                                    <Star size={12} className="text-amber-500 fill-amber-500" />
                                                    <span className="text-xs font-bold text-amber-700">{rev.rating}/5</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm italic">"{rev.comment}"</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
