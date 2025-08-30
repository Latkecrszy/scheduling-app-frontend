import React, { useState } from 'react';
import useAvailability from "../../../hooks/useAvailability.jsx";
import useUnavailableTimes from "../../../hooks/useUnavailableTimes.js"
import { useUserContext } from "../MessagePage/contexts/UserContext.jsx"
import { useUIContext } from "../MessagePage/contexts/UIContext.jsx"
import AvailabilityCalendar from "./AvailabilityCalendar.jsx";
import RegularAvailability from "./RegularAvailability.jsx";
import SideBar from "../../parts/SideBar.jsx";
import ShowEvents from "./ShowEvents.jsx";
import useAvailabilityFunctions from "./useAvailabilityFunctions.js";
import NoActionPopup from "../../parts/NoActionPopup.jsx";


export default function AvailabilityPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const todayString = selectedDate.toLocaleDateString("en-US", {
        year: 'numeric', month: 'long', day: 'numeric'
    })
    const [refreshAvailability, setRefreshAvailability] = useState(false);
    const [refreshUnavailableTimes, setRefreshUnavailableTimes] = useState(false);
    const [newAvailabilitySlot, setNewAvailabilitySlot] = useState({
        day: 'Monday',
        start_time: '',
        end_time: ''
    })
    const [newUnavailableTime, setNewUnavailableTime] = useState({
        reason: '',
        start_time: '',
        end_time: ''
    })
    const { user } = useUserContext();
    const { setActivePopup } = useUIContext();
    const availability = useAvailability(refreshAvailability);
    const unavailableTimes = useUnavailableTimes(refreshUnavailableTimes)


    const { changeAvailability, changeUnavailability } = useAvailabilityFunctions({
        newAvailabilitySlot, setNewAvailabilitySlot, user, setActivePopup, refreshAvailability, setRefreshAvailability,
        refreshUnavailableTimes, setRefreshUnavailableTimes, newUnavailableTime, setNewUnavailableTime, selectedDate, availability})

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <SideBar page="availability" />
            <div className="px-6 flex w-full">
                <div className="max-w-4xl mx-auto w-full mt-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="min-h-screen bg-green-50 p-6 rounded-2xl">
                            <div className="max-w-6xl mx-auto">
                                {/* Header */}
                                <div className="text-center mb-10">
                                    <h1 className="text-4xl font-bold text-green-900 mb-2">Manage Your Availability</h1>
                                    <p className="text-green-700 text-md">Set your regular hours and mark dates when you're unavailable</p>
                                </div>
                            </div>
                            <RegularAvailability availability={availability['regular'] || []} newAvailabilitySlot={newAvailabilitySlot}
                                                 setNewAvailabilitySlot={setNewAvailabilitySlot} changeAvailability={changeAvailability} />
                            <AvailabilityCalendar setSelectedDate={setSelectedDate} selectedDate={selectedDate}
                                                  availability={availability['events']} todayString={todayString} unavailableTimes={unavailableTimes} />
                            <ShowEvents availability={availability['events']} todayString={todayString}
                                        selectedDate={selectedDate} newUnavailableTime={newUnavailableTime}
                                        setNewUnavailableTime={setNewUnavailableTime} changeUnavailability={changeUnavailability} unavailableTimes={unavailableTimes} />
                        </div>
                    </div>
                </div>
            </div>
            <NoActionPopup name='timeslotOverlap' headerText='Timeslot Overlap' subText='This timeslot overlaps with one on the same day.'
                           buttonText='Close' closeFunction={() => setActivePopup('')} color='red' />
        </div>
    );
}