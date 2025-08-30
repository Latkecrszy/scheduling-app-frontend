import React, { useState } from "react";
import ConversationsList from "./ConversationsList";
import CreateConversationPopup from "./CreateConversationPopup";
import { useUIContext } from "../MessagePage/contexts/UIContext.jsx";
import SideBar from "../../parts/SideBar.jsx";


export default function ConversationsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [conversationCreated, setConversationCreated] = useState(false);
    const { setActivePopup } = useUIContext();

    return (
        <div className="min-h-screen flex">
            <SideBar page="conversations" />
            <div className="p-6 max-w-2xl mx-auto space-y-4 w-full">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-green-800">Your Conversations</h2>
                    <button className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 cursor-pointer"
                            onClick={() => {setActivePopup('createConversation')}}
                    >
                        + New Conversation
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-green-300 rounded-xl transition duration-100 focus:outline-none focus:ring-1 focus:ring-green-300 placeholder-green-700 text-green-900"
                />
                <ConversationsList searchQuery={searchQuery} conversationCreated={conversationCreated}/>
                <CreateConversationPopup setConversationCreated={setConversationCreated} />

            </div>
        </div>
    );
}