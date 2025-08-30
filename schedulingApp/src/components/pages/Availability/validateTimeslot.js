import {to24Hour} from "../../parts/Functions.jsx";


export default function validateTimeslot(availability, startTime, endTime, day) {
    const start = new Date(`2000-01-01T${startTime}`)
    const end = new Date(`2000-01-01T${endTime}`)

    return availability.some(slot => {
        if (slot.day !== day) return;
        const slotStart = new Date(`2000-01-01T${to24Hour(slot.start_time)}`)
        const slotEnd = new Date(`2000-01-01T${to24Hour(slot.end_time)}`)
        return start < slotEnd && end > slotStart
    })
}