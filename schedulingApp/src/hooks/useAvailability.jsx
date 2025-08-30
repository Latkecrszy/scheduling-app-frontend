import { useState, useEffect } from 'react';
import {formatDate, toLocalTime} from "../components/parts/Functions.jsx";


export default function useAvailability(refreshAvailability) {
    const [availability, setAvailability] = useState({'events': {'days': {}, 'reschedule': [], 'cancel': []}, 'regular': []})
    useEffect(() => {
        fetch('http://localhost:8000/get-availability', {
            method: 'GET',
            credentials: 'include',
        })
            .then(async res => {
                if (!res.ok) {
                    fetch('http://localhost:8000/refresh', {
                        method: 'GET',
                        credentials: 'include',
                    })
                        .catch (() => {
                            location.replace('/login')
                        })
                }
                const data = await res.json()

                const convertTimes = event => {
                    const eventInfo =
                        {start: event.start || event.date, start_time: event.start_time, end_time: event.end_time}
                    const {startDate, endDate} = formatDate(eventInfo);
                    const startTime = startDate.toLocaleTimeString("en-US",
                        {hour: 'numeric', minute: 'numeric', hour12: true})
                    const endTime = endDate.toLocaleTimeString("en-US",
                        {hour: 'numeric', minute: 'numeric', hour12: true})
                    event.startTimeUTC = `${event.start_time}`
                    event.endTimeUTC = `${event.end_time}`
                    event.dateString = `${event.start || event.date}`
                    event.start_time = startTime;
                    event.end_time = endTime;
                    if (event.start) {
                        event.start = startDate
                    } else if (event.date) {
                        event.date = startDate
                    }
                    return event
                }

                data.events.reschedule.forEach(event => {
                    event = convertTimes(event)
                    const date = (event.start || event.date).toLocaleDateString("en-US", {
                        year: 'numeric', month: 'long', day: 'numeric'
                    })
                    data.events[date] ? data.events[date].push(event) : data.events[date] = [event]
                    return event
                })
                data.events.cancel.forEach(event => {
                    event = convertTimes(event)
                    const date = (event.start || event.date).toLocaleDateString("en-US", {
                        year: 'numeric', month: 'long', day: 'numeric'
                    })
                    data.events[date] ? data.events[date].push(event) : data.events[date] = [event]
                    return event
                })
                data.events.days = {}
                data.events.recurring.forEach(event => {
                    event = convertTimes(event)
                    data.events.days[event.day] ? data.events.days[event.day].push(event) : data.events.days[event.day] = [event]
                    return event
                })
                data.regular.forEach(slot => {
                    slot.start_time = toLocalTime(slot.start_time)
                    slot.end_time = toLocalTime(slot.end_time)
                })

                setAvailability(data)
            })
    }, [refreshAvailability])

    return availability
}