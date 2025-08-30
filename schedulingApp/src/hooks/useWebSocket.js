import {useEffect, useRef} from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';


export default function useWebSocket(url, handleReceive) {
    const socketRef = useRef(null);

    useEffect(() => {
        if (!url || !handleReceive) return
        const webSocket = new ReconnectingWebSocket(url);
        socketRef.current = webSocket;

        webSocket.onopen = () => {
            console.log('WebSocket connected');
        };

        webSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            handleReceive(data)
        };

        webSocket.onerror = (err) => {
            console.error('WebSocket error:', err);
        };

        return () => {
            webSocket.close();
        };
    }, [url, handleReceive]);

    const sendMessage = (data) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(data));
            // See if there's significant delay between hitting send and the message showing up
            // If there is, put function in here to temporarily show a message before we receive a response back from the websocket
        }
    };

    return { sendMessage };
}