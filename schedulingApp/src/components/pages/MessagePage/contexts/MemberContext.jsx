import {useEffect, useState, useMemo, useContext, createContext} from "react";
import {useSearchParams} from "react-router-dom";
import { useUserContext } from "./UserContext.jsx"



const MemberContext = createContext()


export function useMemberContext() {
    return useContext(MemberContext)
}


export function MemberProvider({ children }) {
    const { user } = useUserContext();
    const [searchParams] = useSearchParams();
    const [memHash, setMemHash] = useState(searchParams.get('mem_hash'));
    const [members, setMembers] = useState({});

    // Check if the user is a part of this conversation
    useEffect(() => {
        if (!memHash) {
            fetch('https://scheduling-app-backend-b4fcac504465.herokuapp.com/get-mem-hash', {
                method: 'GET',
                credentials: 'include',
            }).then(async res => {
                if (!res.ok) {
                    fetch('https://scheduling-app-backend-b4fcac504465.herokuapp.com/refresh', {
                        method: 'GET',
                        credentials: 'include',
                    })
                        .catch (() => {
                            location.replace('/login')
                        })
                }
                const data = await res.json()
                setMemHash(data.mem_hash);
            })
        }
        function checkConversation () {
            if (!user?.email || !memHash) return;
            return fetch(`https://scheduling-app-backend-b4fcac504465.herokuapp.com/check-conversation?email=${user.email}&mem_hash=${memHash}`, {
                method: 'GET',
                credentials: 'include',
            }).then(async res => {
                const data = await res.json();
                if (!data.allowed) location.replace('/conversations')
                setMembers(data.members)
            })
        }
        checkConversation();
    }, [user, memHash])

    // Create websocket URL only if user info has loaded
    const url = useMemo(() => {
        if (!user?.email || !memHash) return null;
        return `wss://scheduling-app-backend-b4fcac504465.herokuapp.com/ws?email=${user.email}&mem_hash=${memHash}`;
    }, [user?.email, memHash]);

    return <MemberContext.Provider value={{url, members, memHash}}>
        {children}
    </MemberContext.Provider>
}
