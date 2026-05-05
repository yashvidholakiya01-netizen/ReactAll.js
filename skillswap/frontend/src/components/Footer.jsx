import { Link as RouterLink } from 'react-router-dom';
import { Mail, Globe, Users, MessageCircle, Share2 } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-gray-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <RouterLink to="/" className="text-3xl font-extrabold text-white mb-4 block">
                            Skill<span className="text-indigo-400">Swap</span>
                        </RouterLink>
                        <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
                            The ultimate peer-to-peer learning platform. Connect, share knowledge, and learn anything from anyone, entirely for free.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all">
                                <Globe size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all">
                                <Share2 size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all">
                                <Users size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                                <MessageCircle size={18} />
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><RouterLink to="/browse" className="text-gray-400 hover:text-indigo-400 transition-colors">Browse Skills</RouterLink></li>
                            <li><RouterLink to="/login" className="text-gray-400 hover:text-indigo-400 transition-colors">Login</RouterLink></li>
                            <li><RouterLink to="/signup" className="text-gray-400 hover:text-indigo-400 transition-colors">Create Account</RouterLink></li>
                            <li><a href="#how-it-works" className="text-gray-400 hover:text-indigo-400 transition-colors">How it Works</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Support & Legal</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">FAQ</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} SkillSwap Platform. All rights reserved.
                    </p>
                    <div className="flex items-center text-gray-400 text-sm gap-2 font-medium">
                        <Mail size={16} /> support@skillswap.com
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
