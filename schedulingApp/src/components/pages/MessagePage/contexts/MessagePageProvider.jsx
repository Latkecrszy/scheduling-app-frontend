import React from 'react'
import { EventProvider } from './EventContext.jsx'
import { MessageProvider } from './MessageContext.jsx'
import { UIProvider } from './UIContext.jsx'
import { UserProvider } from './UserContext.jsx'
import { MemberProvider } from './MemberContext.jsx'
import MessagePage from '../MessagePage.jsx'


export default function MessagePageProvider() {
    return (
        <UserProvider>
            <UIProvider>
                <EventProvider>
                    <MemberProvider>
                        <MessageProvider>
                            <MessagePage/>
                        </MessageProvider>
                    </MemberProvider>
                </EventProvider>
            </UIProvider>
        </UserProvider>

    )
}