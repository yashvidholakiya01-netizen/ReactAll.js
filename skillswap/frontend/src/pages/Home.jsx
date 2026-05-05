import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle, Search, RefreshCw, Star, Code, Camera, Music, Book, CheckCircle, Clock, Globe, Shield, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16 w-full">
            {/* Hero Section */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="bg-indigo-100 text-indigo-800 text-sm font-bold px-4 py-1.5 rounded-full inline-block mb-6 shadow-sm">
                        🚀 Zero Cost. Infinite Knowledge.
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
                        Learn Anything by <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Teaching Something</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto mb-10 leading-relaxed">
                        Exchange your skills with others around the world. No money involved—just pure peer-to-peer learning. You teach what you know, they teach what you want to learn.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/signup" className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2">
                            Start Swapping For Free
                        </Link>
                        <a href="#how-it-works" className="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2">
                            See How It Works
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Target Audience Section */}
            <div className="w-full bg-white border-y border-gray-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Our Community</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Who is SkillSwap For?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100 hover:shadow-lg transition-all hover:-translate-y-2 group">
                            <div className="w-12 h-12 bg-indigo-200 text-indigo-700 rounded-xl flex items-center justify-center font-bold text-xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                1
                            </div>
                            <h3 className="text-2xl font-bold text-indigo-900 mb-4">Students</h3>
                            <p className="text-indigo-700 leading-relaxed">Can't afford expensive tutors? Swap the skills you already have (like math or coding) to learn guitar, languages, or design from others.</p>
                        </div>
                        <div className="bg-purple-50 rounded-3xl p-8 border border-purple-100 hover:shadow-lg transition-all hover:-translate-y-2 group">
                            <div className="w-12 h-12 bg-purple-200 text-purple-700 rounded-xl flex items-center justify-center font-bold text-xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                2
                            </div>
                            <h3 className="text-2xl font-bold text-purple-900 mb-4">Professionals</h3>
                            <p className="text-purple-700 leading-relaxed">Want to switch careers or add a new skill to your resume? Trade your industry expertise for hands-on learning in an entirely new field.</p>
                        </div>
                        <div className="bg-pink-50 rounded-3xl p-8 border border-pink-100 hover:shadow-lg transition-all hover:-translate-y-2 group">
                            <div className="w-12 h-12 bg-pink-200 text-pink-700 rounded-xl flex items-center justify-center font-bold text-xl mb-6 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                                3
                            </div>
                            <h3 className="text-2xl font-bold text-pink-900 mb-4">Hobbyists</h3>
                            <p className="text-pink-700 leading-relaxed">Passionate about cooking, painting, or gardening? Share your hobbies and discover new passions from a worldwide community of creators.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* How it Works */}
            <div id="how-it-works" className="w-full bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Simple Process</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">How SkillSwap Works</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="flex flex-col items-center relative">
                            <div className="bg-indigo-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-sm rotate-3 hover:rotate-0 transition-transform">
                                <PlusCircle className="text-indigo-600" size={40} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">1. List Your Skills</h3>
                            <p className="text-gray-600 leading-relaxed">Create your profile. Tell us what you are good at (to teach) and what you want to learn.</p>
                            <div className="hidden md:block absolute top-10 right-[-30px] text-gray-300">
                                <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 10H58M58 10L49 1M58 10L49 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col items-center relative">
                            <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-sm -rotate-3 hover:rotate-0 transition-transform">
                                <Search className="text-purple-600" size={40} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">2. Find a Match</h3>
                            <p className="text-gray-600 leading-relaxed">Our system suggests users who want your skills and have what you need. Or just browse manually!</p>
                            <div className="hidden md:block absolute top-10 right-[-30px] text-gray-300">
                                <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 10H58M58 10L49 1M58 10L49 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-pink-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-sm rotate-3 hover:rotate-0 transition-transform">
                                <RefreshCw className="text-pink-600" size={40} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">3. Connect & Swap</h3>
                            <p className="text-gray-600 leading-relaxed">Send a swap request. Once accepted, chat to schedule your video calls and start learning.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us Features */}
            <div className="w-full bg-white py-24 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-purple-600 font-bold tracking-wider uppercase text-sm">Benefits</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Why Choose SkillSwap?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex gap-5 p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-lg hover:border-green-100 transition-all group">
                            <div className="shrink-0 bg-green-100 p-3 rounded-2xl h-14 w-14 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                                <CheckCircle className="text-green-600 group-hover:text-white transition-colors" size={28} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">100% Free Forever</h4>
                                <p className="text-gray-600 leading-relaxed">No hidden fees, no subscriptions. You pay with your knowledge, not your credit card.</p>
                            </div>
                        </div>
                        <div className="flex gap-5 p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all group">
                            <div className="shrink-0 bg-blue-100 p-3 rounded-2xl h-14 w-14 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                <Globe className="text-blue-600 group-hover:text-white transition-colors" size={28} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Global Community</h4>
                                <p className="text-gray-600 leading-relaxed">Connect with experts and beginners from different cultures around the world.</p>
                            </div>
                        </div>
                        <div className="flex gap-5 p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-lg hover:border-orange-100 transition-all group">
                            <div className="shrink-0 bg-orange-100 p-3 rounded-2xl h-14 w-14 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                                <Clock className="text-orange-600 group-hover:text-white transition-colors" size={28} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Flexible Scheduling</h4>
                                <p className="text-gray-600 leading-relaxed">Learn at your own pace. Decide times and dates directly with your learning partner.</p>
                            </div>
                        </div>
                        <div className="flex gap-5 p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-lg hover:border-red-100 transition-all group">
                            <div className="shrink-0 bg-red-100 p-3 rounded-2xl h-14 w-14 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                                <Shield className="text-red-600 group-hover:text-white transition-colors" size={28} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Safe & Secure</h4>
                                <p className="text-gray-600 leading-relaxed">Our rating and review system ensures you are connecting with genuine and helpful users.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Skills */}
            <div className="w-full bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-pink-600 font-bold tracking-wider uppercase text-sm">Explore Categories</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">What do you want to learn?</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-lg hover:-translate-y-2 transition-all cursor-pointer group">
                            <div className="bg-indigo-50 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors">
                                <Code className="text-indigo-600" size={36} />
                            </div>
                            <h4 className="font-bold text-xl text-gray-900">Programming</h4>
                            <p className="text-sm text-gray-500 mt-2">React, Python, JS</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-lg hover:-translate-y-2 transition-all cursor-pointer group">
                            <div className="bg-purple-50 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-100 transition-colors">
                                <Camera className="text-purple-600" size={36} />
                            </div>
                            <h4 className="font-bold text-xl text-gray-900">Photography</h4>
                            <p className="text-sm text-gray-500 mt-2">Editing, Lighting</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-lg hover:-translate-y-2 transition-all cursor-pointer group">
                            <div className="bg-pink-50 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:bg-pink-100 transition-colors">
                                <Music className="text-pink-600" size={36} />
                            </div>
                            <h4 className="font-bold text-xl text-gray-900">Music</h4>
                            <p className="text-sm text-gray-500 mt-2">Guitar, Vocals</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-lg hover:-translate-y-2 transition-all cursor-pointer group">
                            <div className="bg-blue-50 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                                <Book className="text-blue-600" size={36} />
                            </div>
                            <h4 className="font-bold text-xl text-gray-900">Languages</h4>
                            <p className="text-sm text-gray-500 mt-2">English, Spanish</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="w-full bg-indigo-900 py-24 text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-indigo-300 font-bold tracking-wider uppercase text-sm">Success Stories</span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-2">What Our Community Says</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-indigo-800 p-8 rounded-3xl border border-indigo-700 shadow-xl">
                            <div className="flex gap-1 text-yellow-400 mb-6">
                                {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                            </div>
                            <p className="italic mb-8 text-indigo-100 leading-relaxed text-lg">"I always wanted to learn React but couldn't afford courses. I taught conversational Spanish to a developer, and he taught me React. Best trade ever!"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-xl shadow-inner">R</div>
                                <div>
                                    <p className="font-bold text-lg">Rahul Verma</p>
                                    <p className="text-sm text-indigo-300">Swapped Spanish for React</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-indigo-800 p-8 rounded-3xl border border-indigo-700 shadow-xl">
                            <div className="flex gap-1 text-yellow-400 mb-6">
                                {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                            </div>
                            <p className="italic mb-8 text-indigo-100 leading-relaxed text-lg">"Matched with an amazing graphic designer. I helped him optimize his website's SEO, and he designed a complete logo and branding kit for me."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center font-bold text-xl shadow-inner">A</div>
                                <div>
                                    <p className="font-bold text-lg">Aditi Sharma</p>
                                    <p className="text-sm text-indigo-300">Swapped SEO for Design</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-indigo-800 p-8 rounded-3xl border border-indigo-700 shadow-xl">
                            <div className="flex gap-1 text-yellow-400 mb-6">
                                {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                            </div>
                            <p className="italic mb-8 text-indigo-100 leading-relaxed text-lg">"I was skeptical at first, but the community is so genuine. I've improved my guitar skills significantly just by teaching others how to bake cakes."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center font-bold text-xl shadow-inner">M</div>
                                <div>
                                    <p className="font-bold text-lg">Mike Johnson</p>
                                    <p className="text-sm text-indigo-300">Swapped Baking for Guitar</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="w-full bg-white py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Got Questions?</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-4">
                        <FAQItem question="Is it really 100% free?" answer="Yes! The currency on our platform is knowledge. You pay for learning a new skill by teaching a skill you already know. There are no hidden fees." />
                        <FAQItem question="What if I'm not an expert in my field?" answer="You don't need to be an absolute expert! Many users are looking for beginners or intermediate learners. As long as you know more than the person you are teaching, you can be incredibly helpful." />
                        <FAQItem question="How do we conduct the learning sessions?" answer="Once a swap is agreed upon, you can use our built-in chat to share Zoom or Google Meet links, or decide to meet in person if you happen to be in the same location." />
                        <FAQItem question="What if my partner doesn't show up?" answer="We have a rating and review system. If a user repeatedly fails to show up or provide a good experience, their rating will drop and their account may be restricted." />
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="w-full bg-indigo-50 py-24 text-center border-t border-indigo-100">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Ready to share your knowledge?</h2>
                    <p className="text-xl text-gray-600 mb-10 leading-relaxed">Join thousands of learners and teachers from around the world today. Build your profile, find a match, and start swapping skills.</p>
                    <Link to="/signup" className="bg-indigo-600 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-300 transition-all inline-block hover:-translate-y-1">
                        Create Your Free Account
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-5 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
                <span className="font-bold text-gray-900 text-lg">{question}</span>
                <ChevronDown className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-6 py-5 bg-white text-gray-600 text-lg leading-relaxed border-t border-gray-100">
                    {answer}
                </div>
            </div>
        </div>
    )
}

export default Home;
