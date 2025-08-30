import {toLocalISODate} from "../../../parts/Functions.jsx";
import {useMemberContext} from "../contexts/MemberContext.jsx";
import {useUserContext} from "../contexts/UserContext.jsx";
import {useMessageContext} from "../contexts/MessageContext.jsx";



export default function useScheduleFunction({selectedDate, values, rescheduleEventDefaults, cancelFunction}) {
    const { sendMessage } = useMessageContext();
    const { user } = useUserContext();
    const { memHash } = useMemberContext();

    const scheduleFunction = () => {
        const dateISO = toLocalISODate(selectedDate); // Get the local ISO format of the date to be rescheduled without the time
        const proposedStart = new Date(`${dateISO}T${values.startTime24}`); // Make a new date with the UTC date and the correct start time
        const proposedEnd = new Date(`${dateISO}T${values.endTime24}`); // Do the same with the end time
        const cancelDateISO = toLocalISODate(rescheduleEventDefaults.date); // Get the local ISO format of the date to be cancelled without the time
        const cancelDate = new Date(`${cancelDateISO}T${rescheduleEventDefaults.startTime24}`); // Make a new date with the UTC date to be cancelled and the correct time
        const rescheduleDate = new Date(`${dateISO}T${values.startTime24}`); // Make a new date with the UTC date to be rescheduled and the correct time
        const toSend = {
            ...values,
            start_time: proposedStart.toISOString().slice(11, 16), // Get just the UTC time from the date for the start time
            end_time: proposedEnd.toISOString().slice(11, 16), // Get just the UTC time from the date for the end time
            sender: user.email,
            mem_hash: memHash,
            type: 'event',
            subtype: 'reschedule',
            reschedule_date: rescheduleDate.toISOString().slice(0, 10), // Get just the UTC date for the date to be rescheduled
            original_event_id: rescheduleEventDefaults.id
        }
        if (rescheduleEventDefaults.prev_id) {
            toSend.prev_id = rescheduleEventDefaults.prev_id
        } else {
            // Only add the cancel date if we're rescheduling for the first time (not modifying it)
            toSend.cancel_date = cancelDate.toISOString().slice(0, 10) // Get just the UTC date for the date to be cancelled
        }
        sendMessage(toSend)
        cancelFunction()
    }

    return { scheduleFunction }
}