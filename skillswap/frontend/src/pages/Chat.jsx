import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';
import { Send, ArrowLeft, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Chat = () => {
    const { receiverId } = useParams();
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [receiver, setReceiver] = useState(null);
    const socket = useRef();
    const scrollRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReceiver = async () => {
            try {
                const res = await axios.get(`/users/${receiverId}`);
                setReceiver(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchReceiver();
    }, [receiverId]);

    useEffect(() => {
        socket.current = io('http://localhost:5000'); // Ensure this matches your server port
        socket.current.emit('join', user?._id || user?.id);

        const fetchMessages = async () => {
            try {
                const res = await axios.get(`/chat/${receiverId}`);
                setMessages(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMessages();

        socket.current.on('message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.current.disconnect();
        };
    }, [receiverId, user?._id, user?.id]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        socket.current.emit('sendMessage', {
            senderId: user?._id || user?.id,
            receiverId,
            text
        });
        setText('');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
            <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col bg-white shadow-xl border-x border-gray-100 overflow-hidden">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-100 flex items-center gap-4 bg-white sticky top-0 z-10">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                        {receiver?.name?.charAt(0).toUpperCase() || <User size={20} />}
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-900">{receiver?.name}</h2>
                        <p className="text-xs text-green-500 font-medium">Online</p>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50/50">
                    {messages.map((msg, idx) => {
                        const isMine = msg.sender === (user?._id || user?.id);
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={idx}
                                className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm text-sm ${
                                    isMine 
                                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                }`}>
                                    <p>{msg.text}</p>
                                    <p className={`text-[10px] mt-1.5 opacity-60 ${isMine ? 'text-indigo-100' : 'text-gray-500'}`}>
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                    <div ref={scrollRef}></div>
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-white flex gap-3 items-center">
                    <input
                        type="text"
                        className="flex-grow px-5 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-gray-50 transition-all"
                        placeholder="Type your message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button 
                        type="submit"
                        className="bg-indigo-600 text-white p-3.5 rounded-full hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 flex items-center justify-center"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
