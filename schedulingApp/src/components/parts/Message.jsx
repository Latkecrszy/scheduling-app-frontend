import React from 'react';
import { useUIContext } from '../pages/MessagePage/contexts/UIContext.jsx'
import { useUserContext } from '../pages/MessagePage/contexts/UserContext.jsx'



export default function Message({messageInfo, messageRef}) {
    const { openMenu } = useUIContext();
    const { user } = useUserContext();
    const isOwn = messageInfo.sender === user.email
    return (
        <div ref={messageRef} className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-xs ${isOwn ? 'mr-2' : 'ml-2'}`}
                 onContextMenu={e => {openMenu(e, messageInfo)}}
                 data-timestamp={messageInfo.timestamp}
                 data-id={messageInfo.id}
                 data-menu-target
            >
                <div className={`px-4 py-2 rounded-2xl w-fit ${
                    isOwn
                        ? 'bg-green-500 text-white'
                        : 'bg-white border border-green-200 text-green-900'
                }`}>
                    <p className="text-sm text-left">{messageInfo.text}</p>
                </div>
                <div className={`text-xs text-green-600 mt-0.5 ${isOwn ? 'text-right' : 'text-left'}`}>
                    {!isOwn && <span className="font-medium">{messageInfo.sender} • </span>}
                    {new Date(messageInfo.timestamp * 1000).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})}
                </div>
            </div>
        </div>
    )
}