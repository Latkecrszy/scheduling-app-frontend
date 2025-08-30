import {createContext, useCallback, useContext, useState} from 'react';
import { useMemberContext } from "./MemberContext.jsx";
import useWebSocket from "../../../../hooks/useWebSocket.js";
import { useUserContext } from "./UserContext.jsx";


const MessageContext = createContext();
export function useMessageContext() {
    return useContext(MessageContext);
}

export function MessageProvider({ children }) {
    const [messages, setMessages] = useState([]);
    const { user, loading } = useUserContext();
    const {url} = useMemberContext();
    const email = loading ? null : user.email;
    const [messageReceived, setMessageReceived] = useState(false);
    const handleReceive = useCallback((data) => {
        const originalData = data;
        if (originalData.type === 'message_deleted') {
            setMessages(prevMessages => prevMessages.filter(
                (message) => message.id !== originalData.message_id
            ))
        }
        else if (originalData.type === 'event_modified') {
            setMessages(prevMessages => prevMessages.map(message => {
                    if (message.id === originalData.event_id) {
                        message.modified = true
                    }
                    return message
                }
            ))
        } else {
            setMessageReceived(true);
        }

        if (!Array.isArray(data)) data = [data];


        setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            const seenIds = new Set(prevMessages.map(msg => msg.id));

            for (let message of data) {
                if (!seenIds.has(message.id)) {
                    newMessages.push(message);
                    seenIds.add(message.id);
                }
            }

            return newMessages;
        });
    }, [email]);

    const { sendMessage } = useWebSocket(url, handleReceive);
    let loadMessage;
    loadMessage = messages[Math.floor(messages.length/4)]


    return (
        <MessageContext.Provider value={{messages, setMessages, handleReceive, sendMessage, loadMessage, messageReceived, setMessageReceived}}>
            {children}
        </MessageContext.Provider>
    )
}