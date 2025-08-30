import React, { useState, useEffect, useRef } from 'react';
import Calendar from "../../../assets/images/calendar.svg"
import CalendarDay from "../../../assets/images/day.svg"
import Clock from "../../../assets/images/clock.svg"
import MapPin from "../../../assets/images/location.svg"
import Users from "../../../assets/images/attending.svg"
import Repeat from "../../../assets/images/frequency.svg"

export default function ChatDemo () {
    const [messages, setMessages] = useState([]);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const chatContainerRef = useRef(null);

    const demoMessages = [
        {
            id: 1,
            type: 'text',
            sender: 'Sarah',
            content: 'Hey! Our usual meeting time won\'t work this week, can you do Sunday?',
            timestamp: '2:15 PM',
            isOwn: false
        },
        {
            id: 2,
            type: 'text',
            sender: 'You',
            content: 'Let me check my schedule...',
            timestamp: '2:16 PM',
            isOwn: true
        },
        {
            id: 3,
            type: 'event',
            sender: 'Sarah',
            timestamp: '2:17 PM',
            isOwn: false,
            event: {
                title: 'Piano Lesson',
                location: 'FaceTime',
                date: 'July 13, 2025',
                day: 'Sunday',
                time: '2:30 PM - 3:30 PM',
                participants: 'Sarah, You',
                recurring: 'Weekly',
                status: 'proposed'
            }
        },
        {
            id: 4,
            type: 'text',
            sender: 'You',
            content: 'Perfect timing! I can do 2:30 PM',
            timestamp: '2:18 PM',
            isOwn: true
        },
        {
            id: 5,
            type: 'event',
            sender: 'You',
            timestamp: '2:19 PM',
            isOwn: true,
            event: {
                title: 'Piano Lesson',
                location: 'FaceTime',
                date: 'July 13, 2025',
                day: 'Sunday',
                time: '2:30 PM - 3:30 PM',
                participants: 'Sarah, You',
                recurring: 'Weekly',
                status: 'accepted'
            }
        },
        {
            id: 6,
            type: 'text',
            sender: 'Sarah',
            content: 'Great! See you then 🎹',
            timestamp: '2:20 PM',
            isOwn: false
        }
    ];

    useEffect(() => {
        if (currentMessageIndex < demoMessages.length) {
            const timer = setTimeout(() => {
                setMessages(prev => [...prev, demoMessages[currentMessageIndex]]);
                setCurrentMessageIndex(prev => prev + 1);
            }, currentMessageIndex === 0 ? 500 : 1500);

            return () => clearTimeout(timer);
        }
    }, [currentMessageIndex, demoMessages.length]);

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const restartDemo = () => {
        setMessages([]);
        setCurrentMessageIndex(0);
    };

    const EventMessage = ({ event, isOwn, timestamp }) => (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-xs ${isOwn ? 'mr-2' : 'ml-2'}`}>
                <div className="w-full bg-green-50 border border-green-300 rounded-xl p-4 text-left shadow-md">
                    <div className="flex flex-col items-start justify-center mb-3">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                event.status === 'accepted'
                    ? 'text-emerald-600 bg-emerald-100'
                    : event.status === 'proposed'
                        ? 'text-orange-600 bg-orange-100'
                        : 'text-emerald-600 bg-emerald-100'
            }`}>
              {event.status === 'accepted' ? 'Accepted' : event.status === 'proposed' ? 'Proposed' : 'Recurring'}
            </span>
                        <h3 className="text-green-800 text-lg mt-2 font-semibold truncate">{event.title}</h3>
                    </div>

                    <div className="flex items-center text-sm text-green-900 mb-2">
                        <img src={MapPin} alt="Map Pin" className="h-4 w-4 mr-2" />
                        <span className="truncate">{event.location}</span>
                    </div>

                    <div className="flex items-center text-sm text-green-900 mb-2">
                        <img src={Calendar} alt="Calendar" className="h-4 w-4 mr-2" />
                        <span>{event.date}</span>
                    </div>

                    <div className="text-sm text-green-900 mb-2">
                        <img src={CalendarDay} alt="Calendar" className="h-4 w-4 inline mr-2" />
                        {event.day}
                    </div>

                    <div className="flex items-center text-sm text-green-900 mb-2">
                        <img src={Clock} alt="Clock" className="h-4 w-4 mr-2" />
                        <span>{event.time}</span>
                    </div>

                    <div className="flex items-center text-sm text-green-900 mb-2">
                        <img src={Users} alt="People" className="h-4 w-4 mr-2" />
                        <span>{event.participants}</span>
                    </div>

                    <div className="flex items-center text-sm text-green-900 mb-2">
                        <img src={Repeat} alt="Repeat arrows" className="h-4 w-4 mr-2" />
                        <span>{event.recurring}</span>
                    </div>

                    {event.status === 'proposed' && (
                        <div className="flex space-x-2 pt-2">
                            <button className="flex-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium cursor-pointer">
                                Accept
                            </button>
                            <button className="flex-1 px-3 py-1 bg-green-300 text-green-900 rounded-lg hover:bg-green-400 text-sm font-medium cursor-pointer">
                                Modify
                            </button>
                            <button className="flex-1 px-3 py-1 bg-white text-green-700 border border-green-600 rounded-lg hover:bg-green-100 text-sm font-medium cursor-pointer">
                                Decline
                            </button>
                        </div>
                    )}
                </div>
                <div className={`text-xs text-green-600 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                    {timestamp}
                </div>
            </div>
        </div>
    );

    const TextMessage = ({ message, isOwn, sender, timestamp }) => (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-xs ${isOwn ? 'mr-2' : 'ml-2'}`}>
                <div className={`px-4 py-2 rounded-2xl ${
                    isOwn
                        ? 'bg-green-500 text-white'
                        : 'bg-white border border-green-200 text-green-900'
                }`}>
                    <p className="text-sm text-left">{message}</p>
                </div>
                <div className={`text-xs text-green-600 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                    {!isOwn && <span className="font-medium">{sender} • </span>}
                    {timestamp}
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-green-800">Chat with Sarah</h3>
                <button
                    onClick={restartDemo}
                    className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-full transition-colors cursor-pointer"
                >
                    Restart Demo
                </button>
            </div>

            <div ref={chatContainerRef} className="h-96 overflow-y-auto bg-green-50 rounded-xl p-4 space-y-2 scroll-smooth">
                {messages.map((message) => (
                    <div key={message.id} className="animate-fade-in">
                        {message.type === 'text' ? (
                            <TextMessage
                                message={message.content}
                                isOwn={message.isOwn}
                                sender={message.sender}
                                timestamp={message.timestamp}
                            />
                        ) : (
                            <EventMessage
                                event={message.event}
                                isOwn={message.isOwn}
                                timestamp={message.timestamp}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-4 p-3 bg-green-100 rounded-xl">
                <div className="flex items-center space-x-2">
                    <div className="flex-1 text-left bg-white rounded-full px-4 py-2 text-sm text-green-700">
                        Type a message...
                    </div>
                    <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}