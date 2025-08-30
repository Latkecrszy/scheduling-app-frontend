import {formatDate, weeksBetweenDates} from "../../../parts/Functions.jsx";
import {useEventContext} from "../contexts/EventContext.jsx";

export default function filterEvents(events, todayString, selectedDate) {
    const { rescheduleEventDefaults } = useEventContext() || [];
    let uncancelledEvents = []
    events.forEach(event => {
        // Check if the event is a cancellation
        if (event.subtype === 'cancel') {
            // If it is, find its corresponding recurring event and tag it as cancelled for this date
            events.map(e => {
                if (e.id === event.original_event_id) {
                    e.cancelled = todayString
                }
            })
        }
    })

    events.forEach(event => {
        // Check if the event has a corresponding cancellation event for this date
        if (event.cancelled === todayString) return;
        // Check if the event is a cancellation
        if (event.subtype === 'cancel') return;

        // Compute the weeks between the event's start date and today
        const start = event.dateString || event.start || event.date
        const startTime = event.startTimeUTC || event.start_time
        const endTime = event.endTimeUTC || event.start_time
        const eventInfo =
            {start: start, start_time: startTime, end_time: endTime}
        const {startDate} = formatDate(eventInfo);
        if (rescheduleEventDefaults && rescheduleEventDefaults.modifyDate?.getTime() === startDate.getTime()) {
            return
        }

        // Check if the event skips weeks and lands on today
        if (event.frequency !== 1 && event.subtype === 'recurring' && events.includes(event)) {
            const weeksBetween = weeksBetweenDates(startDate, selectedDate)
            // If it's not the right week, don't show it
            if (event.frequency !== 5 && weeksBetween % event.frequency !== 0) {
                return
            }
            // If the event repeats every month, check that the day of the week is the same and that it's the same week of the month
            else if (event.frequency === 5) {
                if (startDate.getDay() !== selectedDate.getDay()) return false;
                const weekIndex = d => Math.floor((d.getDate() - 1) / 7)+1;
                if (weekIndex(startDate) !== weekIndex(selectedDate)) return false;
            }
        }

        uncancelledEvents.push(event)
    })

    return uncancelledEvents
}