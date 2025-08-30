import Blur from "../../../parts/Blur.jsx"
import React, { useState, useEffect } from "react";
import Calendar from './Calendar.jsx';
import MonthSelector from "./MonthSelector.jsx";
import TimeInput from "../CreateEventPopup/TimeInput.jsx"
import LocationInput from "../CreateEventPopup/LocationInput.jsx"
import { useUIContext } from "../contexts/UIContext.jsx";
import { useEventContext } from "../contexts/EventContext.jsx";
import GetEvents from "./GetEvents.js";
import ShowUnavailableTimes from "./ShowUnavailableTimes.jsx";
import useConversationUnavailableTimes from "../../../../hooks/useConversationUnavailableTimes.js"
import {validateTimeOverlap, validateProposedTimes} from "./validateDates.js";
import OverlappingTimePopup from "./OverlappingTimePopup.jsx";
import filterEvents from "./filterEvents.js";
import useScheduleFunction from "./useScheduleFunction.js";
import ActionButtons from "../../../parts/ActionButtons.jsx";


export default function ChooseDatePopup() {
    const [completed, setCompleted] = useState(false);
    const { activePopup, setActivePopup } = useUIContext();
    const { rescheduleEventDefaults, setRescheduleEventDefaults } = useEventContext();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [values, setValues] = useState({...rescheduleEventDefaults})
    const events = GetEvents();
    const unavailableTimes = useConversationUnavailableTimes();
    const [timeError, setTimeError] = useState(false);
    const todayString = selectedDate.toLocaleDateString("en-US", {
        year: 'numeric', month: 'long', day: 'numeric'
    })
    const dayKey = selectedDate.getDay();
    const unavailableTimesToday = [...(unavailableTimes[todayString] || []), ...(unavailableTimes[dayKey] || [])];
    const uncancelledEvents = filterEvents(unavailableTimesToday, todayString, selectedDate)
    useEffect(() => {
        setValues({...rescheduleEventDefaults})
        setSelectedDate(prev => (rescheduleEventDefaults.modifyDate || prev))
    }, [rescheduleEventDefaults])

    useEffect(() => {
        if (values.startTime24 && values.endTime24 && values.location && selectedDate) {
            setCompleted(true)
        } else {
            setCompleted(false);
        }
    }, [values, selectedDate])

    const cancelFunction = () => {
        setSelectedDate(new Date())
        setActivePopup('')
        setRescheduleEventDefaults({day: 0, startTime: '', endTime: '', startTime24: '', endTime24: '', location: '', name: '', id: ''})
        setCompleted(false)
        setValues({day: 0, startTime: '', endTime: '', startTime24: '', endTime24: '', location: '', name: ''})
        setTimeError(false)
    }

    const { scheduleFunction } = useScheduleFunction(
        {selectedDate, values, rescheduleEventDefaults, cancelFunction})

    const validateTimes = () => {
        if (uncancelledEvents.length > 0 && !validateTimeOverlap(selectedDate, values, uncancelledEvents)) {
            setActivePopup('overlappingTime')
        } else if (!validateProposedTimes(selectedDate, values)) {
            setTimeError(true)
        } else {
            scheduleFunction()
        }
    }

    return ((activePopup === 'chooseDate' || activePopup === 'overlappingTime') && (
        <Blur>
            {(activePopup === 'chooseDate' && (
                <div className=" bg-green-50 rounded-2xl shadow-2xl p-4 w-96 z-50 transform transition-transform -mt-10
                duration-300 ease-out translate-y-4 opacity-0 animate-fade-in-up space-y-4">
                    <h2 className="text-2xl font-semibold text-green-800 mb-4">Choose a New Date</h2>
                    <MonthSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    <Calendar events={events} selectedDate={selectedDate} setSelectedDate={setSelectedDate}
                              setSelectedEvent={setCompleted} todayString={todayString}
                              selectedEventId={rescheduleEventDefaults.id} dayBorders={false} />
                    <ShowUnavailableTimes selectedDate={selectedDate} unavailableTimesToday={unavailableTimesToday}
                                          rescheduleEventDefaults={rescheduleEventDefaults} regularAvailability={unavailableTimes.regular_availability} />
                    <TimeInput startValue={values.startTime24 ?? ''} endValue={values.endTime24 ?? ''} onStartChange={e => {
                        setValues(prev => ({...prev, startTime24: e.target.value}))}} onEndChange={e => {
                        setValues(prev => ({...prev, endTime24: e.target.value}))}} timeError={timeError}/>
                    <LocationInput value={values.location} onChange={e => {
                        setValues(prev => ({...prev, location: e.target.value}))
                    }}/>
                    <ActionButtons submitFunction={validateTimes} cancelFunction={cancelFunction}
                                   submitButtonText='Reschedule' cancelButtonText='Cancel' completed={completed}
                    />
                </div>
            ))}
            <OverlappingTimePopup scheduleFunction={scheduleFunction} />
        </Blur>
    ))
}
