import { formatDate, toLocalISODate } from "../../../parts/Functions.jsx";


export function validateTimeOverlap(selectedDate, values, unavailableTimesToday) {
    const dateISO = toLocalISODate(selectedDate);

    // Build Date objects for proposed start/end
    const proposedStart = new Date(`${dateISO}T${values.startTime24}`);
    const proposedEnd = new Date(`${dateISO}T${values.endTime24}`);

    // Check against each unavailable event
    return unavailableTimesToday.every(event => {
        const eventInfo =
            {start: dateISO, start_time: event.start_time, end_time: event.end_time}
        let {startDate, endDate} = formatDate(eventInfo);
        const eventStart = new Date(`${dateISO}T${startDate.toLocaleTimeString("en-US", {
            hour: 'numeric', minute: 'numeric', hour12: false
        })}`)
        const eventEnd = new Date(`${dateISO}T${endDate.toLocaleTimeString("en-US", {
            hour: 'numeric', minute: 'numeric', hour12: false
        })}`)

        if (eventEnd <= eventStart) {
            eventEnd.setDate(eventEnd.getDate() + 1);
        }
        // Check for overlap
        const overlaps = proposedStart < eventEnd && proposedEnd > eventStart;

        if (overlaps) {
            console.log('invalid dates');
            return false;
        } else {
            console.log('valid dates');
            return true;
        }
    });
};


export function validateProposedTimes(selectedDate, values) {
    const dateISO = toLocalISODate(selectedDate);
    const proposedStart = new Date(`${dateISO}T${values.startTime24}`);
    const proposedEnd = new Date(`${dateISO}T${values.endTime24}`);

    return proposedStart < proposedEnd;
}