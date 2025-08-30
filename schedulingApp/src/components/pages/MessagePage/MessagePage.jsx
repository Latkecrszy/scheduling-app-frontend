import React, {useState, useEffect, useRef} from 'react';
import MessageList from "./MessageList.jsx";
import { useUserContext } from "./contexts/UserContext.jsx";
import { useMemberContext } from "./contexts/MemberContext.jsx";
import MessageInput from "./MessageInput.jsx";
import EventInput from "./EventInput.jsx";
import CreateEventPopup from "./CreateEventPopup/CreateEventPopup.jsx";
import ChooseEventPopup from "./ChooseEventPopup.jsx";
import ChooseDatePopup from "./RescheduleEventPopup/ChooseDatePopup.jsx";
import CancelEventPopup from "./CancelEventPopup/CancelEventPopup.jsx";
import { useMessageContext } from "./contexts/MessageContext.jsx";
import OptionMenu from "./OptionMenu.jsx";
import useMessageLoader from "../../../hooks/useMessageLoader.jsx";
import SideBar from "../../parts/SideBar.jsx"


export default function MessagePage() {
    // Initialize information
    const { user } = useUserContext()
    const [messageText, setMessageText] = useState('');
    const bottomRef = useRef();
    const loadRef = useRef();
    const chatContainerRef = useRef();
    const [messageContainerHeight, setMessageContainerHeight] = useState(0)
    const { memHash } = useMemberContext();
    const { messages, setMessages, sendMessage, loadMessage, messageReceived, setMessageReceived } = useMessageContext();

    // Send the message and clear the input box when the user hits enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage({'text': messageText, 'sender': user.email, 'mem_hash': memHash, 'type': 'text'});
            setMessageText('');
        }
    };

    useMessageLoader(memHash, messages, setMessages, loadRef, chatContainerRef, bottomRef, messageContainerHeight,
        setMessageContainerHeight, messageReceived, setMessageReceived)

    return (
        <div className='flex'>
            <SideBar page="messages" />
            <div className="flex flex-col w-full h-screen p-5 no-scrollbar">
                <div className="flex-1 overflow-y-auto p-5 flex flex-col" ref={chatContainerRef}>
                    <MessageList user={user} loadRef={loadRef} loadMessage={loadMessage} />
                    <div ref={bottomRef}></div>
                </div>

                <div className="flex mt-2 -ml-12">
                    <EventInput />
                    <MessageInput value={messageText} setMessageText={setMessageText} onKeyDown={handleKeyDown}
                        memHash={memHash} sender={user.email} sendMessage={sendMessage}/>
                </div>
                <CreateEventPopup />
                <ChooseEventPopup />
                <CancelEventPopup />
                <OptionMenu />
                <ChooseDatePopup />
            </div>
        </div>
    )
}