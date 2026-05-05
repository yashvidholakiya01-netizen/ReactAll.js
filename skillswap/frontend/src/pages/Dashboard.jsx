import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Mail, Users, ArrowRight, Code, Briefcase, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [received, setReceived] = useState([]);
    const [sent, setSent] = useState([]);
    const [suggestedMatches, setSuggestedMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('received'); // 'received', 'sent', 'connections'

    const fetchData = async () => {
        try {
            const [reqRes, matchesRes] = await Promise.all([
                axios.get('/requests'),
                axios.get('/users/matches')
            ]);
            setReceived(reqRes.data.receivedRequests);
            setSent(reqRes.data.sentRequests);
            setSuggestedMatches(matchesRes.data.slice(0, 3)); 
        } catch (err) {
            console.error(err);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        const loadingToast = toast.loading('Updating request...');
        try {
            await axios.put(`/requests/${id}`, { status });
            toast.success(`Request ${status.toLowerCase()}!`, { id: loadingToast });
            fetchData();
        } catch (err) {
            console.error(err);
            toast.error('Failed to update request', { id: loadingToast });
        }
    };

    const connections = [
        ...received.filter(req => req.status === 'Accepted').map(req => ({ ...req, partner: req.sender, type: 'received' })),
        ...sent.filter(req => req.status === 'Accepted').map(req => ({ ...req, partner: req.receiver, type: 'sent' }))
    ];

    const pendingReceived = received.filter(req => req.status === 'Pending');
    const pendingSent = sent.filter(req => req.status === 'Pending' || req.status === 'Rejected');

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading dashboard...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
                        <p className="text-gray-500 mt-2 font-medium">Welcome back! Here's what's happening with your learning swaps.</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 flex gap-1">
                            <TabButton active={activeTab === 'received'} onClick={() => setActiveTab('received')} icon={<Mail size={18} />} label={`Inbox (${pendingReceived.length})`} />
                            <TabButton active={activeTab === 'sent'} onClick={() => setActiveTab('sent')} icon={<Clock size={18} />} label={`Sent (${pendingSent.length})`} />
                            <TabButton active={activeTab === 'connections'} onClick={() => setActiveTab('connections')} icon={<Users size={18} />} label={`Connections (${connections.length})`} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'received' && (
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-bold text-gray-900 mb-4 px-1">Pending Invitations</h2>
                                        {pendingReceived.length === 0 ? (
                                            <EmptyState icon={<Mail size={48} />} title="No pending requests" desc="When someone wants to learn from you, their request will appear here." />
                                        ) : (
                                            pendingReceived.map(req => (
                                                <RequestCard 
                                                    key={req._id} 
                                                    user={req.sender} 
                                                    status={req.status}
                                                    type="received"
                                                    onAccept={() => handleUpdateStatus(req._id, 'Accepted')}
                                                    onReject={() => handleUpdateStatus(req._id, 'Rejected')}
                                                />
                                            ))
                                        )}
                                    </div>
                                )}

                                {activeTab === 'sent' && (
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-bold text-gray-900 mb-4 px-1">Sent Requests</h2>
                                        {pendingSent.length === 0 ? (
                                            <EmptyState icon={<Clock size={48} />} title="No sent requests" desc="You haven't sent any requests recently. Start browsing to find skills!" />
                                        ) : (
                                            pendingSent.map(req => (
                                                <RequestCard 
                                                    key={req._id} 
                                                    user={req.receiver} 
                                                    status={req.status}
                                                    type="sent"
                                                />
                                            ))
                                        )}
                                    </div>
                                )}

                                {activeTab === 'connections' && (
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-bold text-gray-900 mb-4 px-1">Your Learning Partners</h2>
                                        {connections.length === 0 ? (
                                            <EmptyState icon={<Users size={48} />} title="No connections yet" desc="Accept requests or get your requests accepted to build your learning network." />
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {connections.map(req => (
                                                    <ConnectionCard key={req._id} user={req.partner} type={req.type} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Sidebar Area - Suggested Matches & Notifications */}
                    <div className="lg:col-span-1 order-1 lg:order-2 space-y-8">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-indigo-50">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Users size={20} className="text-indigo-600" /> Suggested for You
                            </h3>
                            <div className="space-y-4">
                                {suggestedMatches.map(u => (
                                    <div key={u._id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
                                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold shrink-0">
                                            {u.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-gray-900 truncate">{u.name}</p>
                                            <p className="text-xs text-gray-500 truncate">Teaches: {u.skillsOffered[0]?.name || 'Skills'}</p>
                                        </div>
                                        <Link to="/browse" className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                            <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                ))}
                                <Link to="/browse" className="block text-center text-sm font-bold text-indigo-600 hover:text-indigo-700 mt-4 pt-4 border-t border-gray-50">
                                    View all partners
                                </Link>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200">
                            <h3 className="text-lg font-bold mb-2">Learning Streak</h3>
                            <p className="text-indigo-100 text-sm mb-4">You've connected with 2 people this week. Keep it up!</p>
                            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                                <div className="bg-white h-full w-[60%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
            active ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
        }`}
    >
        {icon} {label}
    </button>
);

const EmptyState = ({ icon, title, desc }) => (
    <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center shadow-sm flex flex-col items-center justify-center">
        <div className="text-gray-300 mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 max-w-md">{desc}</p>
    </div>
);

const RequestCard = ({ user, status, type, onAccept, onReject }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex-shrink-0 flex items-center justify-center text-indigo-700 text-2xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex-grow">
            <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
                {type === 'sent' && <StatusBadge status={status} />}
            </div>
            <p className="text-sm text-gray-500 mb-3">
                {type === 'received' 
                    ? "Wants to swap skills with you. They can teach:" 
                    : "You requested to swap skills with them."}
            </p>
            
            {type === 'received' && user?.skillsOffered?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.map((s, i) => (
                        <span key={i} className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-md font-medium border border-indigo-100">
                            {s.name} <span className="opacity-70">({s.level || 'Intermediate'})</span>
                        </span>
                    ))}
                </div>
            )}
        </div>

        {type === 'received' && status === 'Pending' && (
            <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                <button 
                    onClick={onAccept}
                    className="flex-1 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                >
                    <CheckCircle size={18} /> Accept
                </button>
                <button 
                    onClick={onReject}
                    className="flex-1 bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl font-medium hover:bg-red-50 hover:text-red-600 transition flex items-center justify-center gap-2"
                >
                    <XCircle size={18} /> Reject
                </button>
            </div>
        )}
    </div>
);

const ConnectionCard = ({ user, type }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-600 text-xl font-bold border border-green-100">
                {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-900">{user?.name}</h3>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                    Connected
                </span>
            </div>
        </div>

        <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3 text-gray-700 font-medium mb-1">
                    <Mail size={18} className="text-indigo-500" />
                    <a href={`mailto:${user?.email}`} className="hover:text-indigo-600 transition-colors">{user?.email}</a>
                </div>
                <p className="text-xs text-gray-500 ml-7">Reach out to schedule your learning session!</p>
            </div>

            <Link 
                to={`/chat/${user?._id}`}
                className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-sm shadow-indigo-100"
            >
                <Mail size={18} /> Message Partner
            </Link>

            {(user?.socialLinks?.github || user?.socialLinks?.linkedin || user?.socialLinks?.website) && (
                <div className="flex gap-3 pt-2 border-t border-gray-50">
                    {user.socialLinks.github && <a href={user.socialLinks.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900"><Code size={18} /></a>}
                    {user.socialLinks.linkedin && <a href={user.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600"><Briefcase size={18} /></a>}
                    {user.socialLinks.website && <a href={user.socialLinks.website} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-600"><Globe size={18} /></a>}
                </div>
            )}
        </div>
    </div>
);

const StatusBadge = ({ status }) => {
    switch(status) {
        case 'Rejected':
            return <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded-md text-xs font-bold tracking-wide uppercase border border-red-100">Declined</span>;
        default:
            return <span className="bg-yellow-50 text-yellow-600 px-2.5 py-1 rounded-md text-xs font-bold tracking-wide uppercase border border-yellow-100">Pending</span>;
    }
}

export default Dashboard;
