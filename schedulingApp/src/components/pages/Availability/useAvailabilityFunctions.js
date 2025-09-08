import {toUTCTime} from "../../parts/Functions.jsx";
import validateTimeslot from "./validateTimeslot.js";
import axios from "axios";


export default function useAvailabilityFunctions({newAvailabilitySlot, setNewAvailabilitySlot, user, setActivePopup,
                                                     refreshAvailability, setRefreshAvailability, refreshUnavailableTimes,
                                                     setRefreshUnavailableTimes, newUnavailableTime, setNewUnavailableTime,
                                                     selectedDate, availability}) {
    const changeAvailability = async (type, id) => {
        if (validateTimeslot(availability['regular'], newAvailabilitySlot.start_time, newAvailabilitySlot.end_time, newAvailabilitySlot.day)) {
            setActivePopup('timeslotOverlap')
            return
        }
        let url = 'https://scheduling-app-backend-b4fcac504465.herokuapp.com/'
        if (type === 'add') url += 'add-availability'
        else if (type === 'remove') url += 'remove-availability'
        else if (type === 'edit') url += 'edit-availability'
        const start_time = toUTCTime(newAvailabilitySlot.start_time)
        const end_time = toUTCTime(newAvailabilitySlot.end_time)
        await axios.post(url, {
            start_time: start_time,
            end_time: end_time,
            day: newAvailabilitySlot.day,
            email: user.email,
            id: id
        })
            .then(res => {
                if (res.status === 200) {
                    setNewAvailabilitySlot({
                        day: 'Monday',
                        start_time: '',
                        end_time: ''
                    })
                    setActivePopup('')
                    setRefreshAvailability(!refreshAvailability)
                }
            })
    }

    const changeUnavailability = async (type, id, data) => {
        if (!data) {
            data = newUnavailableTime
        }
        let url = 'https://scheduling-app-backend-b4fcac504465.herokuapp.com/'
        if (type === 'add') url += 'add-unavailable-time'
        else if (type === 'remove') url += 'remove-unavailable-time'
        else if (type === 'edit') url += 'edit-unavailable-time'
        const [startHours, startMinutes] = data.start_time.split(':').map(Number)
        selectedDate.setHours(startHours, startMinutes)
        const utcStringStart = selectedDate.toISOString()
        const [endHours, endMinutes] = data.end_time.split(':').map(Number)
        selectedDate.setHours(endHours, endMinutes)
        const utcStringEnd = selectedDate.toISOString()
        const date = utcStringStart.slice(0, 10)
        const start_time = utcStringStart.slice(11, 16)
        const end_time = utcStringEnd.slice(11, 16)
        console.log(start_time, end_time, date)
        await axios.post(url, {
            start_time: start_time,
            end_time: end_time,
            date: date,
            reason: data.reason,
            email: user.email,
            id: id
        })
            .then(res => {
                if (res.status === 200) {
                    setNewUnavailableTime({
                        reason: '',
                        start_time: '',
                        end_time: ''
                    })
                    setActivePopup('')
                    setRefreshUnavailableTimes(!refreshUnavailableTimes)
                }
            })

    }

    return {changeAvailability, changeUnavailability}
}