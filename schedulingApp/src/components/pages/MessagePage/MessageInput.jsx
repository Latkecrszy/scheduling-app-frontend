import React, {useState} from 'react'
import Calendar from "./RescheduleEventPopup/Calendar.jsx"
import GetEvents from "./RescheduleEventPopup/GetEvents.js";


export default function MessageInput({value, setMessageText, onKeyDown, memHash, sender, sendMessage}) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const events = GetEvents();
    const todayString = selectedDate.toLocaleDateString("en-US", {
        year: 'numeric', month: 'long', day: 'numeric'
    })
    const dayKey = selectedDate.getDay();

    return (
        <div className="p-3 bg-green-100 rounded-xl w-full">
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    onChange={e => setMessageText(e.target.value)}
                    id="message-input"
                    value={value}
                    placeholder="Type a message..."
                    onKeyDown={onKeyDown}
                    autoComplete="off"
                    className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-green-700 focus:outline-none focus:ring-1 focus:ring-green-200"/>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors cursor-pointer"
                    onClick={() => {
                        sendMessage({'text': value, 'sender': sender, 'mem_hash': memHash, 'type': 'text'})
                        setMessageText('')
                }}
                >

                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </div>
        </div>
    )
}