import { useMemberContext } from "../components/pages/MessagePage/contexts/MemberContext.jsx";
import { useEffect, useState } from "react";
import {toLocalTime} from "../components/parts/Functions.jsx";


export default function useConversationUnavailableTimes() {
    const { members } = useMemberContext();
    const [unavailableTimes, setUnavailableTimes] = useState({});

    useEffect(() => {
        if (!members?.emails || members.emails.length === 0) return;

        const queryString = 'http://localhost:8000/get-conversation-unavailable-times?' +
            members.emails.map(email => `emails=${encodeURIComponent(email)}`).join('&');
        fetch(queryString, {
            method: 'GET',
            credentials: 'include',
        })
            .then(async res => {
                const data = await res.json();
                if (data.reschedule) {
                    data.reschedule.forEach(event => {
                        const date = new Date(`${event.date}T${event.start_time}Z`)
                        const dateLocale = date.toLocaleDateString("en-US", {
                            year: 'numeric', month: 'long', day: 'numeric'
                        })
                        if (data[dateLocale]) {
                            data[dateLocale].push(event)
                        } else {
                            data[dateLocale] = [event]
                        }
                    })
                }
                console.log(data.regular_availability)
                if (data.regular_availability) {
                    const regular_availability_object = {}
                    data.regular_availability.forEach(availability => {
                        availability.forEach(slot => {
                            slot.start_time = toLocalTime(slot.start_time)
                            slot.end_time = toLocalTime(slot.end_time)
                            if (regular_availability_object[slot.day]) {
                                regular_availability_object[slot.day].push(slot)
                            } else {
                                regular_availability_object[slot.day] = [slot]
                            }
                        })
                    })
                    data.regular_availability = regular_availability_object
                    console.log(data.regular_availability)
                }

                setUnavailableTimes(data);
            })
            .catch(() => {
                fetch('http://localhost:8000/refresh', {
                    method: 'GET',
                    credentials: 'include',
                })
                    .then(res => {
                        if (!res.ok) {
                            location.reload()
                        }
                    })
                    .catch(err => console.error('Auto refresh error:', err));
            });
    }, [members]);
    return unavailableTimes;
}