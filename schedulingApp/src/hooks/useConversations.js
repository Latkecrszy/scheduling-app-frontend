import { useEffect, useState } from "react";


export default function useConversations(conversationCreated) {
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8000/messages/get-conversations`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(async res => {
                const data = await res.json()
                setConversations(data)
            })
            .catch(() => {
                fetch('http://localhost:8000/refresh', {
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