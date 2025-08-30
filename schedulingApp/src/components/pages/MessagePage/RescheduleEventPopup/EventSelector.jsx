import React from "react";
import filterEvents from "./filterEvents.js";

export default function EventSelector({events, todayString, selectedEvent, setSelectedEvent, selectedDate, searchValue, clickable = true, color='green'}) {
    const dayKey = selectedDate.getDay() + 1;
    const eventsForToday = [...(events[todayString] || []), ...(events[dayKey] || [])]
    let uncancelledEvents = filterEvents(eventsForToday, todayString, selectedDate)
    const displayEvents = uncancelledEvents.flatMap((event, index) => {
        const isSelected = selectedEvent === event;
        if (searchValue && !(event.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            event.attending.some(e => e.toLowerCase().includes(searchValue.toLowerCase())) ||
            event.attending.some(e => searchValue.toLowerCase().includes(e.toLowerCase())))) {
            return []
        }
        return [
            <div
                key={index}
                onClick={() => {if (clickable) setSelectedEvent(isSelected ? null : event)}}
                className={`flex flex-col items-start w-fit rounded-lg text-${color}-900 text-sm border font-medium p-2 mr-3 my-1
                ${isSelected ? 'bg-'+color+'-200 border-'+color+'-400' : 'bg-'+color+'-50 border-'+color+'-300'}
                ${clickable ? 'cursor-pointer' : 'border-none'}`}>
                {/*<div className={`text-xs text-${color}-600 mb-1`}>Owner: {event.owner}</div>*/}
                <span className="text-left"><b className={`text-${color}-800`}>{event.name}</b>: {event.startTime} - {event.endTime}</span>
                {event.attending && event.attending.length > 0 && (
                    <span className={`text-xs text-${color}-700 mt-1`}>Attendees: {event.attending.join(", ")}</span>
                )}
            </div>
        ]
    })
    return (
        <div className="mt-4 bg-white rounded-lg p-3 shadow-inner">
            <h3 className={`text-${color}-700 font-semibold mb-1`}>
                Events on {todayString}
            </h3>
            {uncancelledEvents.length > 0 ? (
                <div className="w-full flex flex-wrap overflow-scroll p-1 box-border max-h-[150px]">
                    {displayEvents.length > 0 ? displayEvents : (
                        <p className={`text-center w-full text-${color}-700 text-sm`}>No events match your search.</p>
                    )}
                </div>
            ) : (<p className={`text-${color}-700 text-sm`}>No events scheduled.</p>)}
        </div>
    );
}