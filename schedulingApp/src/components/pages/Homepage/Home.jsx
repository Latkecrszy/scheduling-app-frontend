import React from "react";
import Lesson from "../../../assets/images/Lesson-rafiki.svg"
import Chat from "../../../assets/images/chat-bubbles.svg"
import Calendar from "../../../assets/images/calendar-pen.svg"
import BackAndForth from "../../../assets/images/people-arrows.svg"
import ChatDemo from "./ChatDemo.jsx";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-100 via-white to-green-50 text-green-900 flex flex-col">
            <nav className="flex justify-between items-center px-6 md:px-16 py-4 border-b-1 border-b-green-300">
                <div className="text-2xl font-extrabold text-green-800 tracking-tight"></div>
                <div className="flex items-center space-x-6">
                    <a href="/conversations" className="text-green-700 hover:text-green-900 font-medium transition-colors">Conversations</a>
                    <a href="/availability" className="text-green-700 hover:text-green-900 font-medium transition-colors">Availability</a>
                    <a href="/login" className="text-green-700 hover:text-green-900 font-medium transition-colors">Log In</a>
                    <a href="/signup" className="ml-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600
                    hover:to-green-700 text-white px-4 py-2 rounded-full shadow-md transition-colors font-semibold">Sign Up</a>
                </div>
            </nav>
            {/* Hero Section */}
            <header className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12">
                <div className="max-w-xl space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">Connect, Chat, and Schedule Effortlessly</h1>
                    <p className="text-green-700 text-base md:text-lg">A sleek scheduling and chat platform designed to keep rescheduling quick and simple.</p>
                    <div className="flex space-x-4 justify-center">
                        <a href="/signup" className="flex items-center bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl shadow transition-colors">Get Started</a>
                        <a href="/login" className="flex items-center border border-green-500 text-green-700 px-5 py-2 rounded-xl hover:bg-green-100 transition-colors">Log In</a>
                    </div>
                </div>
                <div className="mt-8 md:mt-0 md:ml-12 flex-shrink-0">
                    <ChatDemo />
                </div>
            </header>

            {/* Features Section */}
            <section className="grid md:grid-cols-3 gap-8 px-6 md:px-16 py-12">
                <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition-shadow">
                    <img src={Calendar} alt="Calendar" className="w-24 h-24 mb-4 mx-auto" />
                    <h3 className="text-xl font-semibold mb-2 text-center">Smart Scheduling</h3>
                    <p className="text-green-700 text-center">Quickly find times that work for everyone with an interactive calendar and real-time updates.</p>
                </div>
                <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition-shadow">
                    <img src={Chat} alt="Chat" className="w-24 h-24 mb-4 mx-auto" />
                    <h3 className="text-xl font-semibold mb-2 text-center">Real-Time Chat</h3>
                    <p className="text-green-700 text-center">Stay connected with fast, secure messaging built right into the scheduling experience.</p>
                </div>
                <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition-shadow">
                    <img src={BackAndForth} alt="Back and forth" className="w-24 h-24 mb-4 mx-auto" />
                    <h3 className="text-xl font-semibold mb-2 text-center">Back and Forth Planning</h3>
                    <p className="text-green-700 text-center">Suggest, modify, and accept meeting times without lengthy emails or messages.</p>
                </div>
            </section>



            {/* Call to Action Section */}
            <footer className="mt-auto px-6 md:px-16 py-12 bg-green-100 rounded-t-2xl shadow-inner flex flex-col md:flex-row items-center justify-between">
                <h2 className="text-2xl font-semibold mb-4 md:mb-0">Ready to simplify your scheduling?</h2>
                <a href="/signup" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow transition-colors">Create Your Account</a>
            </footer>
        </div>
    );
}
