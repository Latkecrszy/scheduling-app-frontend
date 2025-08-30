import React from 'react'
import { UserProvider } from '../MessagePage/contexts/UserContext.jsx'
import { UIProvider } from '../MessagePage/contexts/UIContext.jsx'
import ConversationsPage from "./ConversationsPage.jsx";

export default function MessagePageProvider() {
    return (
        <UserProvider>
            <UIProvider>
                <ConversationsPage/>
            </UIProvider>
        </UserProvider>

    )
}