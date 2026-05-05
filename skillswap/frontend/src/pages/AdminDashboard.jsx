import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { 
    Users, FileText, Activity, Trash2, ShieldAlert, Edit, X, 
    LayoutDashboard, Search, TrendingUp, UserCheck, Clock, Settings, Star, MessageSquare
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ users: 0, requests: 0, activeRequests: 0 });
    const [usersList, setUsersList] = useState([]);
    const [requestsList, setRequestsList] = useState([]);
    const [reviewsList, setReviewsList] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [userSearchQuery, setUserSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    // Edit User Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '', email: '', isAdmin: false });

    useEffect(() => {
        if (user && user.isAdmin) {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const statsRes = await axios.get('/admin/stats');
            setStats(statsRes.data);
            
            const usersRes = await axios.get('/admin/users');
            setUsersList(usersRes.data);
            
            const requestsRes = await axios.get('/admin/requests');
            setRequestsList(requestsRes.data);
            
            const reviewsRes = await axios.get('/admin/reviews');
            setReviewsList(reviewsRes.data);
        } catch (err) {
            toast.error('Failed to load admin data');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
        try {
            await axios.delete(`/admin/users/${id}`);
            setUsersList(usersList.filter(u => u._id !== id));
            setStats(prev => ({ ...prev, users: prev.users - 1 }));
            toast.success('User deleted successfully', {
                style: { borderRadius: '10px', background: '#333', color: '#fff' }
            });
        } catch (err) {
            toast.error('Failed to delete user');
        }
    };

    const handleDeleteReview = async (id) => {
        if (!window.confirm('Are you sure you want to remove this review?')) return;
        try {
            await axios.delete(`/admin/reviews/${id}`);
            setReviewsList(reviewsList.filter(r => r._id !== id));
            toast.success('Review removed successfully');
        } catch (err) {
            toast.error('Failed to remove review');
        }
    };

    const openEditModal = (userToEdit) => {
        setEditingUser(userToEdit);
        setEditFormData({
            name: userToEdit.name,
            email: userToEdit.email,
            isAdmin: userToEdit.isAdmin || false
        });
        setIsEditModalOpen(true);
    };

    const handleEditUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`/admin/users/${editingUser._id}`, editFormData);
            setUsersList(usersList.map(u => (u._id === editingUser._id ? res.data.user : u)));
            toast.success('User details updated!', {
                style: { borderRadius: '10px', background: '#10B981', color: '#fff' },
                iconTheme: { primary: '#fff', secondary: '#10B981' }
            });
            setIsEditModalOpen(false);
        } catch (err) {
            toast.error('Failed to update user. Please try again.');
        }
    };

    const handleRequestStatusUpdate = async (reqId, newStatus) => {
        try {
            const res = await axios.put(`/admin/requests/${reqId}`, { status: newStatus });
            setRequestsList(requestsList.map(r => r._id === reqId ? res.data : r));
            
            // Update active requests count if necessary
            if (newStatus === 'Accepted') {
                setStats(prev => ({ ...prev, activeRequests: prev.activeRequests + 1 }));
            } else {
                // Technically it could be transitioning from Accepted to something else,
                // but let's just refresh stats for accuracy
                const statsRes = await axios.get('/admin/stats');
                setStats(statsRes.data);
            }
            toast.success(`Request status changed to ${newStatus}`);
        } catch (err) {
            toast.error('Failed to update status');
        }
    };

    if (!user || !user.isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] pt-16">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center bg-white p-12 rounded-[2rem] shadow-2xl border border-gray-100 max-w-md w-full"
                >
                    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert size={48} className="text-red-500" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Access Denied</h2>
                    <p className="text-gray-500 font-medium">You don't have the required administrative clearance to view this dashboard.</p>
                </motion.div>
            </div>
        );
    }

    const navItems = [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'users', label: 'Manage Users', icon: Users },
        { id: 'requests', label: 'Exchanges', icon: FileText },
        { id: 'reviews', label: 'Platform Reviews', icon: Star },
    ];

    return (
        <div className="min-h-screen bg-[#F4F7FE] pt-16 flex font-sans">
            
            {/* Premium Glassmorphism Sidebar */}
            <motion.aside 
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                className="w-72 bg-white/80 backdrop-blur-xl border-r border-white/40 shadow-[10px_0_30px_rgba(0,0,0,0.02)] hidden md:flex flex-col z-10 sticky top-16 h-[calc(100vh-4rem)]"
            >
                <div className="p-8">
                    <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Admin Panel</h2>
                    <nav className="space-y-3">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 relative overflow-hidden group ${
                                        isActive 
                                            ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200' 
                                            : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div 
                                            layoutId="activeTab" 
                                            className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600" 
                                            style={{ zIndex: -1 }}
                                        />
                                    )}
                                    <Icon size={22} className={isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'} />
                                    <span className="font-bold text-sm tracking-wide">{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
                
                {/* Admin Profile Snippet */}
                <div className="mt-auto p-8 border-t border-gray-100">
                    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                            {user.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                            <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">Super Admin</p>
                        </div>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-12 overflow-x-hidden">
                
                {loading ? (
                    <div className="h-full flex flex-col items-center justify-center">
                        <div className="relative w-20 h-20">
                            <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
                        </div>
                        <p className="mt-6 text-gray-500 font-bold tracking-widest uppercase text-sm animate-pulse">Loading Platform Data...</p>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        
                        {/* ---------------- DASHBOARD OVERVIEW ---------------- */}
                        {activeTab === 'dashboard' && (
                            <motion.div 
                                key="dashboard"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="max-w-6xl mx-auto"
                            >
                                <div className="mb-10">
                                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Platform Overview</h1>
                                    <p className="text-gray-500 mt-2 text-lg font-medium">Welcome back, here's what's happening today.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* Stat Card 1 */}
                                    <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out"></div>
                                        <div className="relative z-10">
                                            <div className="w-14 h-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                                                <Users size={28} />
                                            </div>
                                            <p className="text-gray-400 font-bold tracking-wider text-xs uppercase mb-2">Total Users</p>
                                            <h3 className="text-5xl font-black text-gray-900">{stats.users}</h3>
                                        </div>
                                    </div>
                                    
                                    {/* Stat Card 2 */}
                                    <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out"></div>
                                        <div className="relative z-10">
                                            <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-200">
                                                <Activity size={28} />
                                            </div>
                                            <p className="text-gray-400 font-bold tracking-wider text-xs uppercase mb-2">Active Exchanges</p>
                                            <div className="flex items-end gap-3">
                                                <h3 className="text-5xl font-black text-gray-900">{stats.activeRequests}</h3>
                                                <span className="flex items-center text-emerald-500 text-sm font-bold mb-1 bg-emerald-50 px-2 py-1 rounded-lg">
                                                    <TrendingUp size={16} className="mr-1" /> +12%
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stat Card 3 */}
                                    <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-violet-50 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out"></div>
                                        <div className="relative z-10">
                                            <div className="w-14 h-14 bg-violet-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-200">
                                                <Star size={28} />
                                            </div>
                                            <p className="text-gray-400 font-bold tracking-wider text-xs uppercase mb-2">Total Reviews</p>
                                            <h3 className="text-5xl font-black text-gray-900">{reviewsList.length}</h3>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Quick Stats Section */}
                                <div className="mt-10 bg-gradient-to-r from-gray-900 to-indigo-900 rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden">
                                    <div className="absolute right-0 top-0 opacity-10">
                                        <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="#FFFFFF" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.6,-46.3C91.4,-33.5,98,-18.1,97.4,-2.9C96.8,12.3,89,27.3,79.5,40.7C70,54.1,58.8,65.9,45.4,74.5C32,83.1,16,88.5,-0.6,89.5C-17.2,90.5,-34.4,87.1,-48.6,78.8C-62.8,70.5,-74,57.3,-82.1,42.5C-90.2,27.7,-95.2,11.3,-92.9,-4C-90.6,-19.3,-81,-33.5,-70.6,-45.5C-60.2,-57.5,-49,-67.3,-36.2,-75C-23.4,-82.7,-9,-88.3,2.8,-92.9C14.6,-97.5,29.2,-101.1,44.7,-76.4Z" transform="translate(100 100)" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Platform Health is Excellent</h3>
                                    <p className="text-indigo-200 font-medium max-w-xl">Your skill-swap community is growing rapidly. Users are actively exchanging skills and engaging with the platform.</p>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 border-t border-white/10 pt-8">
                                        <div>
                                            <p className="text-white/60 text-sm font-bold uppercase tracking-wider mb-1">Server Status</p>
                                            <p className="text-emerald-400 font-bold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div> Online</p>
                                        </div>
                                        <div>
                                            <p className="text-white/60 text-sm font-bold uppercase tracking-wider mb-1">Active Users</p>
                                            <p className="text-xl font-bold">100%</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ---------------- USERS MANAGEMENT ---------------- */}
                        {activeTab === 'users' && (
                            <motion.div 
                                key="users"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="max-w-6xl mx-auto h-full flex flex-col"
                            >
                                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                                    <div>
                                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Manage Users</h1>
                                        <p className="text-gray-500 mt-2 text-lg font-medium">Control access and moderate your community.</p>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500">
                                            <Search size={20} />
                                        </div>
                                        <input 
                                            type="text" 
                                            value={userSearchQuery}
                                            onChange={(e) => setUserSearchQuery(e.target.value)}
                                            placeholder="Search by name or email..." 
                                            className="w-full md:w-80 pl-12 pr-4 py-3.5 bg-white border-none shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-gray-700"
                                        />
                                    </div>
                                </div>

                                <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex-1 overflow-hidden flex flex-col">
                                    <div className="overflow-x-auto flex-1">
                                        <table className="min-w-full divide-y divide-gray-100">
                                            <thead className="bg-gray-50/80 backdrop-blur-sm sticky top-0 z-10">
                                                <tr>
                                                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">User Details</th>
                                                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Contact Info</th>
                                                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Role Status</th>
                                                    <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Controls</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {usersList
                                                    .filter(u => u._id !== user._id) // Hide current super admin
                                                    .filter(u => 
                                                        u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) || 
                                                        u.email.toLowerCase().includes(userSearchQuery.toLowerCase())
                                                    )
                                                    .map((u) => (
                                                    <tr key={u._id} className="hover:bg-gray-50/50 transition-colors group">
                                                        <td className="px-8 py-5 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center text-indigo-700 font-bold text-lg border border-indigo-100 shadow-sm">
                                                                    {u.name.charAt(0).toUpperCase()}
                                                                </div>
                                                                <div className="ml-5">
                                                                    <div className="text-base font-bold text-gray-900">{u.name}</div>
                                                                    <div className="text-sm font-medium text-gray-400 flex items-center gap-1 mt-0.5">
                                                                        <Clock size={12} /> Joined {new Date(u.createdAt).toLocaleDateString()}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-600 font-medium">
                                                            {u.email}
                                                        </td>
                                                        <td className="px-8 py-5 whitespace-nowrap">
                                                            {u.isAdmin ? (
                                                                <span className="px-4 py-1.5 inline-flex items-center gap-1.5 text-xs font-bold rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                                    <ShieldAlert size={14} /> Admin
                                                                </span>
                                                            ) : (
                                                                <span className="px-4 py-1.5 inline-flex items-center gap-1.5 text-xs font-bold rounded-xl bg-gray-50 text-gray-600 border border-gray-200">
                                                                    <UserCheck size={14} /> Member
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button 
                                                                    onClick={() => openEditModal(u)} 
                                                                    className="text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 p-2.5 rounded-xl transition-all duration-300 shadow-sm"
                                                                    title="Edit User"
                                                                >
                                                                    <Edit size={18} />
                                                                </button>
                                                                {!u.isAdmin && (
                                                                    <button 
                                                                        onClick={() => handleDeleteUser(u._id)} 
                                                                        className="text-red-500 hover:text-white bg-red-50 hover:bg-red-500 p-2.5 rounded-xl transition-all duration-300 shadow-sm"
                                                                        title="Delete User"
                                                                    >
                                                                        <Trash2 size={18} />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ---------------- REQUESTS MANAGEMENT ---------------- */}
                        {activeTab === 'requests' && (
                            <motion.div 
                                key="requests"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="max-w-6xl mx-auto"
                            >
                                <div className="mb-8">
                                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Exchange Requests</h1>
                                    <p className="text-gray-500 mt-2 text-lg font-medium">Monitor all skill exchange activities.</p>
                                </div>

                                <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-100">
                                            <thead className="bg-gray-50/80">
                                                <tr>
                                                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Exchange Journey</th>
                                                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Skill Requested</th>
                                                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
                                                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {requestsList.map((req) => (
                                                    <tr key={req._id} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="px-8 py-6 whitespace-nowrap">
                                                            <div className="flex items-center gap-3">
                                                                <span className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">{req.sender?.name || 'Unknown'}</span>
                                                                <span className="text-gray-400 text-sm">→</span>
                                                                <span className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">{req.receiver?.name || 'Unknown'}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6 whitespace-nowrap">
                                                            <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
                                                                {req.receiver?.skillsOffered?.[0]?.name || req.skillName || 'General Exchange'}
                                                            </span>
                                                        </td>
                                                        <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-500 font-medium">
                                                            {new Date(req.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-8 py-6 whitespace-nowrap">
                                                            <select
                                                                value={req.status}
                                                                onChange={(e) => handleRequestStatusUpdate(req._id, e.target.value)}
                                                                className={`px-3 py-1.5 text-xs font-bold rounded-xl border focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                                                                    req.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-emerald-500' : 
                                                                    req.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200 focus:ring-amber-500' : 
                                                                    'bg-red-50 text-red-700 border-red-200 focus:ring-red-500'
                                                                }`}
                                                            >
                                                                <option value="Pending">Pending</option>
                                                                <option value="Accepted">Accepted</option>
                                                                <option value="Rejected">Rejected</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ---------------- REVIEWS MANAGEMENT ---------------- */}
                        {activeTab === 'reviews' && (
                            <motion.div 
                                key="reviews"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="max-w-6xl mx-auto"
                            >
                                <div className="mb-8">
                                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Platform Reviews</h1>
                                    <p className="text-gray-500 mt-2 text-lg font-medium">Monitor user feedback and maintain community standards.</p>
                                </div>

                                <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-100">
                                            <thead className="bg-gray-50/80">
                                                <tr>
                                                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Review Connection</th>
                                                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Feedback</th>
                                                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Rating</th>
                                                    <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {reviewsList.map((review) => (
                                                    <tr key={review._id} className="hover:bg-gray-50/50 transition-colors group">
                                                        <td className="px-8 py-6 whitespace-nowrap">
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-bold text-gray-900">{review.reviewer?.name || 'Unknown'} <span className="text-gray-400 mx-1 font-medium">rated</span> {review.reviewee?.name || 'Unknown'}</span>
                                                                <span className="text-xs text-gray-400 mt-1">{new Date(review.createdAt).toLocaleDateString()}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <p className="text-sm text-gray-600 font-medium max-w-xs truncate" title={review.comment}>
                                                                <MessageSquare size={14} className="inline mr-2 text-gray-400" />
                                                                {review.comment}
                                                            </p>
                                                        </td>
                                                        <td className="px-8 py-6 whitespace-nowrap">
                                                            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100 inline-flex">
                                                                <Star size={16} className="text-amber-500 fill-amber-500" />
                                                                <span className="font-bold text-amber-700">{review.rating} / 5</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6 whitespace-nowrap text-right">
                                                            <button 
                                                                onClick={() => handleDeleteReview(review._id)} 
                                                                className="text-red-500 hover:text-white bg-red-50 hover:bg-red-500 p-2.5 rounded-xl transition-all duration-300 shadow-sm opacity-0 group-hover:opacity-100"
                                                                title="Remove Review"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {reviewsList.length === 0 && (
                                                    <tr>
                                                        <td colSpan="4" className="px-8 py-12 text-center text-gray-400 font-medium">
                                                            No reviews found on the platform yet.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </main>

            {/* Premium Edit User Modal */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden border border-white/20"
                        >
                            <div className="p-8 border-b border-gray-100 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white">
                                <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
                                <h3 className="text-2xl font-black text-gray-900 relative z-10">Edit User</h3>
                                <p className="text-sm font-medium text-gray-500 mt-1 relative z-10">Modify account details and permissions</p>
                                <button 
                                    onClick={() => setIsEditModalOpen(false)} 
                                    className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 bg-white hover:bg-gray-100 p-2 rounded-full transition-all shadow-sm z-10"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <form onSubmit={handleEditUser} className="p-8 space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-900"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        value={editFormData.email}
                                        onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                                        className="w-full px-5 py-3.5 bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 font-medium cursor-not-allowed"
                                        required
                                        disabled
                                    />
                                    <p className="text-[11px] font-bold text-gray-400 mt-2 tracking-wide uppercase">Email modification disabled</p>
                                </div>

                                <div className="relative group mt-2">
                                    <label className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${editFormData.isAdmin ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-200 hover:border-indigo-300'}`}>
                                        <div className="flex items-center h-6">
                                            <input 
                                                type="checkbox" 
                                                checked={editFormData.isAdmin}
                                                onChange={(e) => setEditFormData({...editFormData, isAdmin: e.target.checked})}
                                                disabled={editingUser._id === user._id}
                                                className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600 cursor-pointer disabled:opacity-50"
                                            />
                                        </div>
                                        <div>
                                            <p className={`font-bold ${editFormData.isAdmin ? 'text-indigo-900' : 'text-gray-900'}`}>Administrator Privileges</p>
                                            <p className="text-xs font-medium text-gray-500 mt-1 leading-relaxed">
                                                Grant full access to the admin dashboard, user management, and platform settings.
                                            </p>
                                        </div>
                                    </label>
                                    {editingUser._id === user._id && (
                                        <p className="text-xs font-bold text-red-500 mt-3 pl-1 flex items-center gap-1">
                                            <ShieldAlert size={14} /> You cannot modify your own role
                                        </p>
                                    )}
                                </div>

                                <div className="pt-6 flex gap-4">
                                    <button 
                                        type="button" 
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="flex-1 px-4 py-3.5 border-2 border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-1 px-4 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-[0_8px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_8px_25px_rgba(79,70,229,0.4)] transition-all hover:-translate-y-0.5"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
