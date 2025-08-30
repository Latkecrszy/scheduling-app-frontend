import { useEffect } from "react";

export default function useMessageLoader(memHash, messages, setMessages, loadRef, chatContainerRef, bottomRef,
                                         messageContainerHeight, setMessageContainerHeight, messageReceived, setMessageReceived) {
    useEffect(() => {
        if (!loadRef.current) return;

        const observer = new IntersectionObserver(
            async (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    try {
                        const res = await fetch(
                            `http://localhost:8000/messages/load-messages?mem_hash=${memHash}&skip=${messages.length}`,
                            {
                                method: 'GET',
                                credentials: 'include',
                            }
                        );
                        if (res.ok) {
                            const newMessages = await res.json();
                            if (newMessages.length > 0) {
                                setMessages((prev) => [...newMessages, ...prev])
                            }
                        }
                    } catch (err) {
                        console.error('Error loading messages:', err);
                    }
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 1.0,
            }
        );

        observer.observe(loadRef.current);

        // Keep chat in the same position after loading messages
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight - messageContainerHeight + window.innerHeight*0.3;
        setMessageContainerHeight(chatContainerRef.current.scrollHeight);

        // If someone sends a new message, scroll down to the bottom
        if (messageReceived) {
            bottomRef.current.scrollIntoView({ behavior: "auto" });
            setMessageReceived(false);
        }


        return () => observer.disconnect();
    }, [messages.length]);
}