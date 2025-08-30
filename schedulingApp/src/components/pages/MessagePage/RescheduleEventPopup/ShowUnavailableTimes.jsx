import React from "react";
import { formatDate } from "../../../parts/Functions.jsx";
import filterEvents from "./filterEvents.js";
import combineUnavailableTimes from "../../Availability/combineUnavailableTimes.js";

export default function ShowUnavailableTimes({selectedDate, unavailableTimesToday, rescheduleEventDefaults, regularAvailability}) {
    // TODO: Potentially put logic for converting times into useConversationUnavailableTimes.js so it doesn't keep re-running
    const formattedDate = selectedDate.toLocaleDateString("en-US", {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    const day = selectedDate.toLocaleDateString("en-US", {weekday: 'long'})
    const unavailableTimeStrings = []
    const unavailableItems = []
    const unavailableTimeObjects = []
    console.log(regularAvailability)
    let uncancelledEvents = filterEvents(unavailableTimesToday, formattedDate, selectedDate)
    if (regularAvailability && regularAvailability[day] && regularAvailability[day].length > 0) {
        regularAvailability[day].forEach(slot => {
            let [startHour, startMinute] = slot.start_time.split(":")
            startHour = Number(startHour)
            startMinute = Number(startMinute.split(' ')[0])
            let [endHour, endMinute] = slot.end_time.split(":")
            endHour = Number(endHour)
            endMinute = Number(endMinute.split(' ')[0])
            if (startHour !== 12 || startMinute !== 0) {
                unavailableTimeStrings.push(`12:00 AM-${slot.start_time}`)
                unavailableItems.push(
                    <div
                        className="bg-red-100 text-red-600 w-fit text-sm rounded px-2 py-1 border border-red-300"
                    >
                        <span>12:00 AM</span>-<span>{slot.start_time}</span>
                    </div>
                )
            }
            if (endHour !== 11 || endMinute !== 59) {
                unavailableTimeStrings.push(`${slot.end_time}-11:59 PM`)
                unavailableItems.push(
                    <div
                        className="bg-red-100 text-red-600 w-fit text-sm rounded px-2 py-1 border border-red-300"
                    >
                        <span>{slot.end_time}</span>-<span>11:59 PM</span>
                    </div>
                )
            }
        })
    }
    uncancelledEvents.forEach((event, index) => {

        const eventInfo =
            {start: selectedDate.toISOString().slice(0, 10), start_time: event.start_time, end_time: event.end_time}
        const {startDate, endDate} = formatDate(eventInfo);
        const startTime = startDate.toLocaleTimeString("en-US",
            {hour: 'numeric', minute: 'numeric', hour12: true})
        const endTime = endDate.toLocaleTimeString("en-US",
            {hour: 'numeric', minute: 'numeric', hour12: true})
        if (unavailableTimeStrings.includes(`${startTime}-${endTime}`) ||
            (event.id === rescheduleEventDefaults.id && selectedDate.getTime() === rescheduleEventDefaults.date.getTime())) {
            return
        }
        unavailableTimeStrings.push(`${startTime}-${endTime}`)
        unavailableTimeObjects.push({startTime: startTime, endTime: endTime})
        unavailableItems.push(
            <div
                key={index}
                className="bg-red-100 text-red-600 w-fit text-sm rounded px-2 py-1 border border-red-300"
            >
                <span>{startTime}</span>-<span>{endTime}</span>
            </div>
        )
    })

    console.log(combineUnavailableTimes(unavailableTimeObjects))


    return (
        <div className="mt-4 bg-white rounded-lg p-3 shadow-inner max-h-[150px] overflow-scroll">
            <h3 className="text-red-800 font-medium mb-1">Unavailable times on {formattedDate}</h3>
            <div className="flex flex-wrap gap-3 mt-2">
                {unavailableItems.length > 0 ? (
                    unavailableItems
                ) : (
                    <p className="text-red-700 text-sm text-center w-full">No unavailable times.</p>
                )}
            </div>
        </div>
    )
}