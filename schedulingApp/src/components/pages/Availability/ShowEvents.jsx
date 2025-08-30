import Clock from "../../../assets/images/clock-green.svg";
import Trash from "../../../assets/images/trash.svg";
import React from "react";
import filterEvents from "../MessagePage/RescheduleEventPopup/filterEvents.js";
import { useUIContext } from "../MessagePage/contexts/UIContext.jsx";
import UnavailableTimeInput from "./UnavailableTimeInput.jsx";
import {to24Hour} from "../../parts/Functions.jsx";
import Badge from "../../parts/Event/Badge.jsx";


export default function ShowEvents({availability, selectedDate, todayString, newUnavailableTime, setNewUnavailableTime, changeUnavailability, unavailableTimes}) {
    const { setActivePopup } = useUIContext();
    const eventsToday = [...(availability[todayString] || []), ...(availability['days'][selectedDate.getDay()] || [])];
    const uncancelledEvents = filterEvents(eventsToday, todayString, selectedDate)
    const allEvents = [...uncancelledEvents, ...unavailableTimes[todayString] || []]
    console.log(unavailableTimes)
    console.log(todayString)

    return (
        <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-green-800">
                    {new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </h3>
                <button
                    onClick={() => setActivePopup('addUnavailableTime')}
                    className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors text-sm cursor-pointer"
                >
                    <span>+ Add Unavailable Time</span>
                </button>
            </div>

            <div className="space-y-2">
                <UnavailableTimeInput newUnavailableTime={newUnavailableTime} setNewUnavailableTime={setNewUnavailableTime} changeUnavailability={changeUnavailability} />
                {allEvents.length > 0 && allEvents.map((event) => {
                    const color = event.subtype === 'recurring' ? 'emerald' : 'yellow';
                    let text = event.subtype === 'recurring' ? 'Recurring' : 'Rescheduled';

                    return (
                        <div key={event.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-green-200">
                            <div className="flex items-center space-x-3">
                                <img src={Clock} alt="Clock" className="w-4 h-4" />
                                <span className="font-medium text-green-800">{event.name || event.reason}</span>
                                <span className="text-green-600">{event.start_time} - {event.end_time}</span>
                            </div>
                            {event.type === 'event' && (
                                <Badge color={color} text={text} />
                            )}
                            {event.type !== 'event' && (
                                <button
                                    onClick={() => {
                                        changeUnavailability('remove', event.id, {
                                            reason: event.reason,
                                            start_time: to24Hour(event.start_time),
                                            end_time: to24Hour(event.end_time)
                                        })
                                    }}
                                    className="text-red-500 p-2 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                                >
                                    <img src={Trash} alt="Trash" className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    )}) || (
                    <div className="text-green-700 text-center py-4">
                        No events scheduled for this day.
                    </div>
                )}
            </div>
        </div>
    )
}