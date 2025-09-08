import { useEffect, useState } from "react";


export default function useConversations(conversationCreated) {
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        fetch(`https://scheduling-app-backend-b4fcac504465.herokuapp.com/messages/get-conversations`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(async res => {
                const data = await res.json()
                setConversations(data)
            })
            .catch(() => {
                fetch('https://scheduling-app-backend-b4fcac504465.herokuapp.com/refresh', {
                    method: 'GET',
                    credentials: 'include',
                })
                    .then(res => {
                        if (!res.ok) {
                            location.reload()
                        }
                    })
                    .catch(err => console.error('Auto refresh error:', err));
            });
    }, [conversationCreated])

    return conversations
}