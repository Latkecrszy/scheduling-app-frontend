import React from "react";
import useConversations from "../../../hooks/useConversations.js";


export default function ConversationsList({searchQuery, conversationCreated}) {
    const conversations = useConversations(conversationCreated);

    const filteredConversations = conversations.filter((conv) =>
        conv.users.some(user => {
            const name = user.first + " " + user.last;
            return !searchQuery || name.toLowerCase().includes(searchQuery.toLowerCase() || searchQuery.toLowerCase().includes(name.toLowerCase()))
        })
    );
    filteredConversations.sort((a, b) => {
        return (b.last_message?.timestamp ?? 0) - (a.last_message?.timestamp ?? 0)
    })
    return (
        <div className="flex flex-col space-y-2 mt-5">
            {filteredConversations.map((conv) => (
                <a key={conv.mem_hash} className="decoration-0" href={`/messages?mem_hash=${conv.mem_hash}`}>
                    <div
                        className="border border-green-300 rounded-xl px-4 py-3 bg-green-50 cursor-pointer hover:bg-green-100 transition">
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-green-900">{conv.names.join(', ')}</span>
                            {conv.last_message && (<span className="text-xs text-green-700">
                                    {new Date(conv.last_message.timestamp * 1000).toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric', hour12: true})}
                                </span>)}
                        </div>
                        <p className="text-sm text-left text-green-800 truncate">{conv.last_message?.text}</p>
                    </div>
                </a>
            ))}
            {filteredConversations.length === 0 && (
                <p className="text-green-700 text-sm">No conversations found.</p>
            )}
        </div>
    )
}