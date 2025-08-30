import { useState, useEffect } from 'react';
import {formatDate} from "../components/parts/Functions.jsx";


export default function useAvailability(refreshUnavailableTimes) {
    const [unavailableTimes, setUnavailableTimes] = useState([])
    useEffect(() => {
        fetch('http://localhost:8000/get-unavailable-times', {
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

                const convertTimes = slot => {
                    const eventInfo =
                        {start: slot.date, start_time: slot.start_time, end_time: slot.end_time}
                    const {startDate, endDate} = formatDate(eventInfo);
                    const startTime = startDate.toLocaleTimeString("en-US",
                        {hour: 'numeric', minute: 'numeric', hour12: true})
                    const endTime = endDate.toLocaleTimeString("en-US",
                        {hour: 'numeric', minute: 'numeric', hour12: true})
                    slot.startTimeUTC = `${slot.start_time}`
                    slot.endTimeUTC = `${slot.end_time}`
                    slot.dateString = `${slot.date}`
                    slot.start_time = startTime;
                    slot.end_time = endTime;
                    slot.date = startDate
                    return slot
                }

                data.forEach(slot => convertTimes(slot))

                const unavailableTimesObject = {}
                data.forEach(slot => {
                    const date = slot.date.toLocaleDateString("en-US", {
                        year: 'numeric', month: 'long', day: 'numeric'
                    })
                    if (unavailableTimesObject[date]) {
                        unavailableTimesObject[date].push(slot)
                    } else {
                        unavailableTimesObject[date] = [slot]
                    }
                })

                setUnavailableTimes(unavailableTimesObject)
            })
    }, [refreshUnavailableTimes])

    return unavailableTimes
}