import { useEffect, useState, useContext, createContext } from 'react';


const UserContext = createContext()

export function useUserContext() {
    return useContext(UserContext)
}

export function UserProvider({ children }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8000/users/me', {
            method: 'GET',
            credentials: 'include',
        })
            .then(async res => {
                if (!res.ok) {
                    fetch('http://localhost:8000/refresh', {
                        method: 'GET',
                        credentials: 'include',
                    }).then(async () => {
                        setRefresh(true);
                    })
                        .catch (() => {
                            location.replace('/login')
                        })
                }
                const data = await res.json();
                setUser(data);
            })
            .finally(() => setLoading(false));

        const interval = setInterval(() => {
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
        }, 14 * 60 * 1000); // every 14 minutes

        return () => clearInterval(interval);
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, refresh }}>
            {children}
        </UserContext.Provider>
    )
}
