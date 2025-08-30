import Clock from "../../../assets/images/clock-green.svg";
import Trash from "../../../assets/images/trash.svg";
import React from "react";
import TimeInput from "./TimeInput.jsx"
import Check from "../../../assets/images/check.svg";
import {to24Hour} from "../../parts/Functions.jsx";


export default function AvailabilityList({daysOfWeek, availability, removeAvailability, editAvailability, newAvailabilitySlot, setNewAvailabilitySlot}) {
    const availabilityList = (daysOfWeek.map((day) => {
        const slots = availability.filter((slot) => slot.day === day)
        console.log(newAvailabilitySlot)
        const completed = newAvailabilitySlot.start_time !== '' && newAvailabilitySlot.end_time !== '';
        const timeSlots = slots.map((slot) => (
            <div key={slot.id} title="Click to edit"
                 onClick={() => {
                     const slot24 = {...slot, start_time: to24Hour(slot.start_time), end_time: to24Hour(slot.end_time)}
                     if (newAvailabilitySlot.id !== slot.id) setNewAvailabilitySlot(slot24)
                 }}
                 className="flex items-center justify-between bg-green-50 p-4 rounded-xl border border-green-200 cursor-pointer"
            >

                <div className="flex items-center gap-1">
                    <img src={Clock} alt="Clock" className="w-4 h-4" />
                    {newAvailabilitySlot.id === slot.id ? (
                        <TimeInput startValue={to24Hour(newAvailabilitySlot.start_time)} endValue={to24Hour(newAvailabilitySlot.end_time)} setValues={setNewAvailabilitySlot} />
                    ) : (
                        <span className="text-green-700 ml-2">{slot.start_time} - {slot.end_time}</span>
                    )}


                </div>
                {newAvailabilitySlot.id === slot.id ? (
                    <>
                        <button
                            onClick={() => {editAvailability(slot.id)}}
                            className={`ml-auto p-1.5 rounded-lg hover:bg-green-200 transition-colors cursor-pointer
                            ${completed ? '' : 'opacity-50 pointer-events-none'}`}
                        >
                            <img src={Check} alt="Check" className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => {setNewAvailabilitySlot({
                                day: 'Monday',
                                start_time: '08:00',
                                end_time: '17:00'
                            })}}
                            className="p-2 text-red-500 hover:text-red-700 rounded-lg
                            hover:bg-red-100 transition-colors cursor-pointer"
                        >
                            ✕
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => removeAvailability(slot.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                    >
                        <img src={Trash} alt="Trash" className="w-4 h-4" />
                    </button>
                )}

            </div>
        ))

        return (slots.length > 0 && (
            <div key={day} className="flex flex-col gap-4">
                <span className="text-left text-md font-semibold text-green-700">{day}</span>
                {timeSlots}
            </div>
        ))
    }))
    return availability.length > 0 ? availabilityList : <div className="text-center text-green-700">No availability set.</div>
}