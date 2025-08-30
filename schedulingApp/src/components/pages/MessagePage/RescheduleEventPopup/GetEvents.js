import { useMemo } from 'react';
import { useMessageContext } from "../contexts/MessageContext.jsx";

export default function GetEvents() {
    const { messages } = useMessageContext();
    return useMemo(() => {
        const eventsObject = {};
        messages.forEach(message => {
            if (message.type !== 'event' || message.modified) return;
            let startDate, endDate;
            if (message.subtype === 'recurring') {
                startDate = new Date(`${message.start}T${message.start_time}Z`);
                endDate = new Date(`${message.start}T${message.end_time}Z`);
            } else if (message.subtype === 'reschedule' || message.subtype === 'cancel') {
                startDate = new Date(`${message.date}T${message.start_time}Z`);
                endDate = new Date(`${message.date}T${message.end_time}Z`);
            }

            const formattedStartTime = startDate.toLocaleTimeString("en-US", {
                hour: 'numeric', minute: 'numeric', hour12: true
            });
            const formattedEndTime = endDate.toLocaleTimeString("en-US", {
                hour: 'numeric', minute: 'numeric', hour12: true
            });
            const formattedStartTime24 = startDate.toLocaleTimeString("en-US", {
                hour: 'numeric', minute: 'numeric', hour12: false
            });
            const formattedEndTime24 = endDate.toLocaleTimeString("en-US", {
                hour: 'numeric', minute: 'numeric', hour12: false
            });

            const eventInfo = {
                startTimeUTC: message.start_time,
                endTimeUTC: message.end_time,
                startTime: formattedStartTime,
                endTime: formattedEndTime,
                startTime24: formattedStartTime24,
                endTime24: formattedEndTime24,
                name: message.name,
                attending: message.attending || [],
                id: message.id,
                original_event_id: message.original_event_id,
                subtype: message.subtype,
                location: message.location,
                frequency: parseInt(message.frequency),
                date: startDate,
                dateString: message.start || message.date
            };

            if (message.subtype === 'reschedule' || message.subtype === 'cancel') {
                const formattedDate = startDate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
                if (!eventsObject[formattedDate]) {
                    eventsObject[formattedDate] = [];
                }
                eventsObject[formattedDate].push(eventInfo);
            }
            else if (message.subtype === 'recurring') {
                const dayOfWeek = startDate.getDay() + 1;
                if (!eventsObject[dayOfWeek]) {
                    eventsObject[dayOfWeek] = [];
                }
                eventsObject[dayOfWeek].push(eventInfo);
            }
        });
        return eventsObject;

    }, [messages]);
}

// TODO: Make (or have chatgpt make) an algorithm to combine the unavailable times (if there's 5:30pm-6:30pm and 6:00pm-11:59pm, make it 5:30pm-11:59pm)
// TODO: Make decline do something
// TODO: Make accept make it show up in availability calendar
// TODO: Make it not highlight a day when changing months if it's in the past
// TODO: Change the right click menu for events so they can't just be deleted


// TODO: NEXT STEPS:
// TODO: Begin integration with apple/google calendar
// TODO: Use React Native and NativeWind to turn it into a mobile app


// TODO: Way down the line when doing calendar integration, detect changes on the apple/google calendar,
// TODO: and the next time the person opens the app, prompt them with whether they want to add it to this calendar