import React from 'react'
import Message from "../../parts/Message.jsx";
import Event from "../../parts/Event/Event.jsx";
import { useMessageContext } from "./contexts/MessageContext.jsx"

export default function MessageList({user, loadRef, loadMessage}) {
    const { messages } = useMessageContext();
    const messageList = []
    messages.map(message => {
        if (message.type === 'text') {
            if (loadMessage.id === message.id) {
                messageList.push(<Message messageRef={loadRef} key={`${message.id}-message`} text={message.text} timestamp={message.timestamp} messageInfo={message} />)
            } else {
                messageList.push(<Message key={`${message.id}-message`} text={message.text} timestamp={message.timestamp} messageInfo={message} />)
            }
        } else if (message.type === 'event') {
            if (loadMessage.id === message.id) {
                messageList.push(<Event eventRef={loadRef} key={`${message.id}-event`} eventInfo={message} user={user}/>)
            } else {
                messageList.push(<Event key={`${message.id}-event`} eventInfo={message} user={user}/>)
            }
        }
    })
    return messageList
}