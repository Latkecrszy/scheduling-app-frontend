import React, { useState, useEffect } from "react";
import TimeInput from "./TimeInput.jsx";
import DaySelector from "./DaySelector.jsx";
import FrequencySelector from "./FrequencySelector.jsx";
import DateInput from "./DateInput.jsx";
import AttendeesSelector from "./AttendeesSelector.jsx";
import CreateEvent from "./CreateEvent.js"
import LocationInput from "./LocationInput.jsx";
import NameInput from "./NameInput.jsx";
import { useEventContext } from '../contexts/EventContext.jsx';
import { useUIContext } from "../contexts/UIContext.jsx";
import { useUserContext } from "../contexts/UserContext.jsx";
import { useMessageContext } from "../contexts/MessageContext.jsx";
import { useMemberContext } from "../contexts/MemberContext.jsx";
import Blur from "../../../parts/Blur.jsx";
import ActionButtons from "../../../parts/ActionButtons.jsx";
import NoActionPopup from "../../../parts/NoActionPopup.jsx";


export default function CreateEventPopup() {
    const { activePopup, setActivePopup } = useUIContext();
    const { eventDefaults } = useEventContext();
    const [values, setValues] = useState(eventDefaults)
    console.log(values)
    const [attending, setAttending] = useState('')
    const { user } = useUserContext();
    const { sendMessage } = useMessageContext();
    const { memHash, members } = useMemberContext();
    const memberNames = members.names
    const [confirmedAttending, setConfirmedAttending] = useState(eventDefaults.attending)
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        setValues(eventDefaults);
        setConfirmedAttending(eventDefaults.attending)
    }, [eventDefaults]);

    useEffect(() => {
        if (Object.values(values).every(value => value !== '') && confirmedAttending.length > 0) {
            setCompleted(true)
        } else {
            setCompleted(false);
        }
    }, [values, confirmedAttending])

    const createEventFunction = () => {
        const date = new Date(`${values.start}T00:00:00`).getDay()
        console.log(date)
        console.log(values.start)
        console.log(values.day)
        if (date.toString() !== values.day.toString()) {
            setActivePopup('mismatchedDate')
            return
        }
        CreateEvent({...values, attending: confirmedAttending}, members, memHash, user, eventDefaults, sendMessage)
        setActivePopup('')
    }


    return ((activePopup === 'createEvent' || activePopup === 'mismatchedDate') && (
        <Blur>
            {(activePopup === 'createEvent' && (
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-dvh p-6 space-y-4 transform transition-transform
            duration-300 ease-out translate-y-4 opacity-0 animate-fade-in-up overflow-scroll">
                <h2 className="text-2xl font-bold text-green-700 text-center">{eventDefaults.scheduleButtonText} an Event</h2>

                <div className="space-y-4">
                    <NameInput value={values.name} onChange={e => (setValues(prev => ({...prev, name: e.target.value})))}/>
                    <TimeInput startValue={values.startTime} endValue={values.endTime}
                               onStartChange={e => (setValues(prev => ({...prev, startTime: e.target.value})))}
                               onEndChange={e => (setValues(prev => ({...prev, endTime: e.target.value})))}
                    />
                    <DaySelector onChange={e => (setValues(prev => ({...prev, day: e.target.value})))}/>
                    <FrequencySelector onChange={e => (setValues(prev => ({...prev, frequency: parseInt(e.target.value)})))}/>
                    <LocationInput value={values.location} onChange={e => (setValues(prev => ({...prev, location: e.target.value})))}/>
                    <DateInput value={values.start} onChange={e => (setValues(prev => ({...prev, start: e.target.value})))}/>
                    <AttendeesSelector memberNames={memberNames} attending={attending} setAttending={setAttending}
                                       confirmedAttending={confirmedAttending} setConfirmedAttending={setConfirmedAttending}/>
                    <ActionButtons cancelFunction={() => {setActivePopup('')}} submitFunction={createEventFunction}
                                   submitButtonText={eventDefaults.scheduleButtonText} cancelButtonText='Cancel' completed={completed} color='green'/>
                </div>
            </div>
            ))}
            <NoActionPopup name='mismatchedDate' headerText='Mismatched Dates'
                           subText="Your event's start date and day of the week do not match up." buttonText='Return'
                           closeFunction={() => {setActivePopup('createEvent')}} color='red'
            />
            <NoActionPopup name='incompleteForm' headerText='Incomplete Form'
                           subText="Please fill out all the fields in this form." buttonText='Return'
                           closeFunction={() => {setActivePopup('createEvent')}} color='red'
            />
        </Blur>
    ));
}
