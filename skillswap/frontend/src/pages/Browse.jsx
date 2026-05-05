import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, User, CheckCircle, Clock, Code, Briefcase, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

const Browse = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [level, setLevel] = useState('');
    const [language, setLanguage] = useState('');
    const [mode, setMode] = useState('');
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            let params = new URLSearchParams();
            if (search) params.append('skill', search);
            if (category) params.append('category', category);
            if (level) params.append('level', level);
            if (language) params.append('language', language);
            if (mode) params.append('mode', mode);

            const res = await axios.get(`/users?${params.toString()}`);
            setUsers(res.data);
            
            // Also fetch current requests to show status
            const reqRes = await axios.get('/requests');
            setRequests([...reqRes.data.sentRequests, ...reqRes.data.receivedRequests]);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [category, level, language, mode]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchUsers();
    };

    const handleSendRequest = async (receiverId) => {
        const loadingToast = toast.loading('Sending request...');
        try {
            await axios.post('/requests', { receiverId });
            toast.success('Swap request sent!', { id: loadingToast });
            fetchUsers(); // Refresh list
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to send request', { id: loadingToast });
        }
    };

    const getRequestStatus = (userId) => {
        const req = requests.find(r => 
            (r.receiver?._id === userId || r.receiver === userId) ||
            (r.sender?._id === userId || r.sender === userId)
        );
        return req ? req.status : null;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Find Your Learning Partner</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Search for specific skills, filter by category or language, and connect with expert swappers.</p>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-12">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="lg:col-span-2 relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-indigo-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 text-gray-900"
                                placeholder="Search skills (e.g. React)..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        
                        <select 
                            className="px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50 text-gray-700 font-medium focus:ring-2 focus:ring-indigo-500"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="Programming">Programming</option>
                            <option value="Design">Design</option>
                            <option value="Music">Music</option>
                            <option value="Business">Business</option>
                            <option value="Languages">Languages</option>
                        </select>

                        <select 
                            className="px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50 text-gray-700 font-medium focus:ring-2 focus:ring-indigo-500"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                        >
                            <option value="">All Levels</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>

                        <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
                            Apply Search
                        </button>
                    </form>
                    
                    <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mode:</span>
                            {['Online', 'Offline', 'Both'].map(m => (
                                <button 
                                    key={m}
                                    onClick={() => setMode(mode === m ? '' : m)}
                                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                                        mode === m ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                                    }`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                        
                        <div className="flex items-center gap-2 ml-auto">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Language:</span>
                            <select 
                                className="text-xs font-bold text-gray-600 border-none bg-transparent focus:ring-0 cursor-pointer"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="">All Languages</option>
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                            </select>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-500 text-lg flex items-center justify-center gap-3">
                        <div className="w-6 h-6 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div> Loading amazing people...
                    </div>
                ) : users.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
                        <User className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No users found</h3>
                        <p className="text-gray-500">Try adjusting your search terms.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {users.map((u) => {
                            const status = getRequestStatus(u._id);
                            return (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={u._id}
                                    whileHover={{ y: -5 }}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-indigo-50 transition-all flex flex-col"
                                >
                                    <div className="p-6 flex-grow">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-indigo-700 text-xl font-bold shadow-inner">
                                                {u.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">{u.name}</h3>
                                                <div className="flex gap-2 mt-1">
                                                    {u.socialLinks?.github && <a href={u.socialLinks.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900"><Code size={16} /></a>}
                                                    {u.socialLinks?.linkedin && <a href={u.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600"><Briefcase size={16} /></a>}
                                                    {u.socialLinks?.website && <a href={u.socialLinks.website} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-600"><Globe size={16} /></a>}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-600 text-sm mb-6 line-clamp-2 min-h-[40px]">
                                            {u.bio || "No bio provided."}
                                        </p>

                                        <div className="mb-4">
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Can Teach</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {u.skillsOffered?.length > 0 ? u.skillsOffered.map((s, i) => (
                                                    <span key={i} className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                                                        {s.name} <span className="text-[9px] opacity-70 uppercase">({s.level || 'Intermediate'})</span>
                                                    </span>
                                                )) : <span className="text-gray-400 text-xs italic">Nothing listed</span>}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Wants to Learn</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {u.skillsWanted?.length > 0 ? u.skillsWanted.map((s, i) => (
                                                    <span key={i} className="bg-purple-50 border border-purple-100 text-purple-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                                                        {s.name}
                                                    </span>
                                                )) : <span className="text-gray-400 text-xs italic">Nothing listed</span>}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-5 bg-gray-50 border-t border-gray-100">
                                        {status === 'Pending' ? (
                                            <button disabled className="w-full py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 bg-gray-200 text-gray-600 cursor-not-allowed">
                                                <Clock size={18} /> Request Pending
                                            </button>
                                        ) : status === 'Accepted' ? (
                                            <button disabled className="w-full py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 bg-green-100 text-green-700 cursor-not-allowed border border-green-200">
                                                <CheckCircle size={18} /> Connected
                                            </button>
                                        ) : status === 'Rejected' ? (
                                            <button disabled className="w-full py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 bg-red-50 text-red-400 cursor-not-allowed">
                                                Request Declined
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => handleSendRequest(u._id)}
                                                className="w-full py-2.5 rounded-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                                            >
                                                Send Swap Request
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Browse;
