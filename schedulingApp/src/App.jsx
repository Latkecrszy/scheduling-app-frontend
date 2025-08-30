import Home from './components/pages/Homepage/Home.jsx'
import CreateConversation from './components/pages/CreateConversation.jsx'
import '/src/assets/styles/global.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MessagePageProvider from "./components/pages/MessagePage/contexts/MessagePageProvider.jsx"
import ConversationsPageProvider from "./components/pages/Conversations/ConversationsPageProvider.jsx";
import LoginPage from "./components/pages/Auth/Login.jsx";
import SignupPage from "./components/pages/Auth/Signup.jsx";
import AvailabilityPageProvider from "./components/pages/Availability/AvailabilityPageProvider.jsx";



// Schedule, reschedule, relax

// Remember, reschedule, relax

// Reschedule, remember, relax


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create-conversation" element={<CreateConversation />} />
                <Route path="/messages" element={<MessagePageProvider />} />
                <Route path="/conversations" element={<ConversationsPageProvider />} />
                <Route path="/availability" element={<AvailabilityPageProvider />} />
            </Routes>
        </Router>
    )
}

export default App
