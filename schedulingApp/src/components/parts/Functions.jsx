import axios from "axios";


export async function deleteMessage(message) {
    console.log(message)
    await axios.post('https://scheduling-app-backend-b4fcac504465.herokuapp.com/messages/delete', {
        message_id: message.id,
        sender_email: message.sender,
        mem_hash: message.mem_hash,
    }, {
        withCredentials: true,
    })
}


export function formatDate(eventInfo) {
    const date = eventInfo.start ? eventInfo.start : eventInfo.date
    let startDate = new Date(`${date}T${eventInfo.start_time}Z`)
    let endDate = new Date(`${date}T${eventInfo.end_time}Z`)
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, '0');
    const day = String(startDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return {startDate, endDate, formattedDate}
}


export function weeksBetweenDates(startDate, endDate) {
    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 7);
}

export function toLocalISODate(date) {
    if (!date) return null
    const pad = (n) => String(n).padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // months are 0-based
    const day = pad(date.getDate());
    return `${year}-${month}-${day}`;
}

export function toUTCTime(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    const localDate = new Date();
    localDate.setHours(hours+1, minutes, 0, 0);
    return `${String(localDate.getUTCHours()).padStart(2, '0')}:${String(localDate.getUTCMinutes()).padStart(2, '0')}`
}


export function toLocalTime(timeString) {
    return new Date(`2000-01-01T${timeString}Z`)
        .toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric', hour12: true})
}


export function to24Hour(time12h) {
    try {
        const [time, modifier] = time12h.trim().split(" ");

        let [hours, minutes] = time.split(":").map(Number);
        if (modifier.toLowerCase() === "pm" && hours !== 12) {
            hours += 12;
        }
        if (modifier.toLowerCase() === "am" && hours === 12) {
            hours = 0;
        }
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    } catch {
        return time12h
    }

}