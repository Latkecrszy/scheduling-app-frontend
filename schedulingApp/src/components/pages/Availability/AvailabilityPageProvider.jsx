import React from 'react'
import { UserProvider } from '../MessagePage/contexts/UserContext.jsx'
import { UIProvider } from '../MessagePage/contexts/UIContext.jsx'
import AvailabilityPage from "./Availability.jsx";

export default function MessagePageProvider() {
    return (
        <UserProvider>
            <UIProvider>
                <AvailabilityPage/>
            </UIProvider>
        </UserProvider>

    )
}