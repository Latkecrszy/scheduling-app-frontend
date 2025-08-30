import React, { useState } from "react";
import { useUIContext } from "./contexts/UIContext.jsx";
import { useEventContext } from "./contexts/EventContext.jsx";
import GetEvents from './RescheduleEventPopup/GetEvents.js';
import Calendar from './RescheduleEventPopup/Calendar.jsx';
import MonthSelector from "./RescheduleEventPopup/MonthSelector.jsx";
import EventSelector from "./RescheduleEventPopup/EventSelector.jsx";
import SearchBar from "../../parts/SearchBar.jsx";
import Blur from "../../parts/Blur.jsx"
import ActionButtons from "../../parts/ActionButtons.jsx";


export default function ChooseEventPopup() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { activePopup, setActivePopup } = useUIContext();
    const { setRescheduleEventDefaults } = useEventContext();
    const [searchValue, setSearchValue] = useState('')
    const events = GetEvents();

    const todayString = selectedDate.toLocaleDateString("en-US", {
        year: 'numeric', month: 'long', day: 'numeric'
    })

    const chooseEventFunction = () => {
        setRescheduleEventDefaults(prev => (
            { ...prev, name: `${selectedEvent.name} at ${selectedEvent.startTime}`, date: selectedDate,
                startTime: selectedEvent.startTime, endTime: selectedEvent.endTime, id: selectedEvent.id,
                startTime24: selectedEvent.startTime24, endTime24: selectedEvent.endTime24, location: selectedEvent.location}))
        setSelectedDate(new Date())
        setSelectedEvent(null)
        setActivePopup('chooseDate')
    }


    const cancelFunction = () => {
        setSelectedDate(new Date())
        setSelectedEvent(null)
        setActivePopup('')
    }

    return (activePopup === 'chooseEvent' && (
        <Blur>
            <div className=" bg-green-50 rounded-2xl shadow-2xl p-4 w-96 z-50 transform transition-transform -mt-10
            duration-300 ease-out translate-y-4 opacity-0 animate-fade-in-up">
                <h2 className="text-2xl font-semibold text-green-800 mb-4">Choose an event</h2>
                <MonthSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <Calendar events={events} selectedDate={selectedDate} setSelectedDate={setSelectedDate}
                          setSelectedEvent={setSelectedEvent} todayString={todayString}/>
                <SearchBar value={searchValue} setValue={setSearchValue} color="green"/>
                {/* TODO: Add a search bar for events by event name or student name because teachers will have hella*/}
                <EventSelector events={events} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent}
                               todayString={todayString} selectedDate={selectedDate} searchValue={searchValue} />
                <ActionButtons submitFunction={chooseEventFunction} cancelFunction={cancelFunction}
                               submitButtonText='Reschedule' cancelButtonText='Cancel' completed={selectedEvent}
                />
            </div>
        </Blur>
    ));
}
