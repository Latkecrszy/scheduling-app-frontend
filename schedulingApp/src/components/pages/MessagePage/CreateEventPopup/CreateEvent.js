export default function CreateEvent(data, members, memHash, user, eventDefaults, sendMessage) {
    const localDateTimeStart = new Date(`${data.start}T${data.startTime}`)
    const localDateTimeEnd = new Date(`${data.start}T${data.endTime}`)
    const utcStringStart = localDateTimeStart.toISOString()
    const utcStringEnd = localDateTimeEnd.toISOString()
    data.start = utcStringStart.slice(0, 10)
    data.start_time = utcStringStart.slice(11, 16)
    data.end_time = utcStringEnd.slice(11, 16)
    const toSend = {
        ...data,
        mem_hash: memHash,
        sender: user.email,
        type: 'event',
        subtype: 'recurring',
    }

    if (eventDefaults.id) {
        toSend.prev_id = eventDefaults.id
    }

    sendMessage(toSend);
}