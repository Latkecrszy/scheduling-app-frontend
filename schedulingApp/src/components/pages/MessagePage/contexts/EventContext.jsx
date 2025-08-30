import React, {createContext, useContext, useState} from "react";



const EventContext = createContext()

export function EventProvider({ children }) {
    const [eventDefaults, setEventDefaults] = useState({
        name: '',
        startTime: '',
        endTime: '',
        day: 0,
        location: '',
        frequency: 1,
        start: '',
        attending: [],
        scheduleButtonText: 'Schedule'
    });

    const [rescheduleEventDefaults, setRescheduleEventDefaults] = useState({
        day: 0,
        startTime: '',
        endTime: '',
        location: '',
        name: '',
        id: '',
        nextPopup: '',
        submitButtonText: 'Reschedule'
    })

    return (
        <EventContext.Provider value={{ eventDefaults, setEventDefaults, rescheduleEventDefaults, setRescheduleEventDefaults }}>
            {children}
        </EventContext.Provider>
    );
}

export function useEventContext() {
    return useContext(EventContext);
}