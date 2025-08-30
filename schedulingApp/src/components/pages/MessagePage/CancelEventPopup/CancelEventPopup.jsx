import React, { useState } from "react";
import { useUIContext } from "../contexts/UIContext.jsx";
import GetEvents from '../RescheduleEventPopup/GetEvents.js';
import Calendar from '../RescheduleEventPopup/Calendar.jsx';
import MonthSelector from "../RescheduleEventPopup/MonthSelector.jsx";
import EventSelector from "../RescheduleEventPopup/EventSelector.jsx";
import Blur from "../../../parts/Blur.jsx"
import Switch from "../../../parts/Switch.jsx"
import SearchBar from "../../../parts/SearchBar.jsx";
import { useMessageContext } from "../contexts/MessageContext.jsx";
import { useMemberContext } from "../contexts/MemberContext.jsx";
import { useUserContext } from "../contexts/UserContext.jsx";
import { toLocalISODate } from "../../../parts/Functions.jsx";
import ActionButtons from "../../../parts/ActionButtons.jsx";
import NoActionPopup from "../../../parts/NoActionPopup.jsx";


export default function ChooseEventPopup() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { activePopup, setActivePopup } = useUIContext();
    const [permanent, setPermanent] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const events = GetEvents();
    const { sendMessage } = useMessageContext();
    const { memHash } = useMemberContext();
    const { user } = useUserContext();

    const todayString = selectedDate.toLocaleDateString("en-US", {
        year: 'numeric', month: 'long', day: 'numeric'
    })
    const cancelEventFunction = () => {
        const dateISO = toLocalISODate(selectedDate)
        const cancelDate = new Date(`${dateISO}T${selectedEvent.startTime24}`)
        sendMessage({
            type: 'cancel',
            mem_hash: memHash,
            cancel_id: selectedEvent.id,
            permanent: permanent,
            sender: user.email,
            cancel_date: cancelDate.toISOString().slice(0, 10)
        })
        console.log(selectedEvent.id)
        if (permanent) {
            setActivePopup('cancelSuccess')
        } else {
            cancelFunction()
        }
    }


    const cancelFunction = () => {
        setSelectedDate(new Date())
        setPermanent(false)
        setActivePopup('')
        setSelectedEvent(null)
    }

    return ((activePopup === 'cancelEvent' || activePopup === 'cancelSuccess') && (
        <Blur>
            {(activePopup === 'cancelEvent' && (
                <div className="bg-red-50 rounded-2xl shadow-2xl p-4 w-96 z-50 transform transition-transform -mt-10
                duration-300 ease-out translate-y-4 opacity-0 animate-fade-in-up">
                    <h2 className="text-2xl font-semibold text-red-800 mb-4">Choose an event to cancel</h2>
                    <MonthSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} color='red' />
                    <Calendar events={events} selectedDate={selectedDate} setSelectedDate={setSelectedDate}
                              setSelectedEvent={setSelectedEvent} todayString={todayString} color='red'/>
                    <SearchBar value={searchValue} setValue={setSearchValue} color="red"/>
                    <EventSelector events={events} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent}
                                   todayString={todayString} selectedDate={selectedDate} searchValue={searchValue} color='red' />
                    <div className="flex items-center justify-between bg-red-200 p-2 rounded-lg mt-3">
                        <span className="text-red-800 text-sm">Cancel all future events</span>
                        <Switch isOn={permanent} setIsOn={setPermanent} color='red' />
                    </div>
                    <ActionButtons submitFunction={cancelEventFunction} cancelFunction={cancelFunction} color='red'
                                   submitButtonText='Cancel' cancelButtonText='Back' completed={selectedEvent}
                    />
                </div>
            ))}
            <NoActionPopup name='cancelSuccess' headerText='Event Cancelled' closeFunction={cancelFunction} color='red'
                           subText={`${selectedEvent?.name} has been successfully cancelled.`} buttonText='Close'
            />
        </Blur>
    ));
}
