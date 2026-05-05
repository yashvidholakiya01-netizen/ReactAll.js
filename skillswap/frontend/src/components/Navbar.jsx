import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, Code, LogOut, User, LayoutDashboard, Search, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-indigo-600 p-2 rounded-xl text-white group-hover:scale-105 transition-transform">
                            <Code size={20} />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900">SkillSwap</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {user ? (
                            <>
                                <Link to="/browse" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors flex items-center gap-2">
                                    <Search size={18} /> Browse
                                </Link>
                                <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors flex items-center gap-2">
                                    <LayoutDashboard size={18} /> Dashboard
                                </Link>
                                {user.isAdmin && (
                                    <Link to="/admin" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors flex items-center gap-2">
                                        <ShieldAlert size={18} /> Admin
                                    </Link>
                                )}
                                <Link to="/profile" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors flex items-center gap-2">
                                    <User size={18} /> Profile
                                </Link>
                                <button onClick={logout} className="text-red-500 hover:text-red-600 font-medium transition-colors flex items-center gap-2">
                                    <LogOut size={18} /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Login</Link>
                                <Link to="/signup" className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all">Sign Up</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600">
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-16 w-full bg-white shadow-lg border-t"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {user ? (
                                <>
                                    <Link to="/browse" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">Browse</Link>
                                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">Dashboard</Link>
                                    {user.isAdmin && (
                                        <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">Admin</Link>
                                    )}
                                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">Profile</Link>
                                    <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">Login</Link>
                                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 bg-indigo-50">Sign Up</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
