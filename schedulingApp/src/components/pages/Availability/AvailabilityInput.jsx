import Check from "../../../assets/images/check.svg";
import React from "react";
import {useUIContext} from "../MessagePage/contexts/UIContext.jsx";
import validateTimeslot from "./validateTimeslot.js"


export default function AvailabilityInput({newAvailabilitySlot, setNewAvailabilitySlot, addAvailability, daysOfWeek, availability}) {
    const { activePopup, setActivePopup } = useUIContext();
    const completed = newAvailabilitySlot.start_time !== '' && newAvailabilitySlot.end_time !== '';

    return (
        activePopup === 'setAvailability' && (
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-dashed border-green-300 rounded-xl relative">
                <select
                    value={newAvailabilitySlot.day}
                    onChange={(e) => setNewAvailabilitySlot({ ...newAvailabilitySlot, day: e.target.value })}
                    className="px-3 py-2 border border-green-300 rounded-lg focus:outline-none
                            focus:ring-1 focus:ring-green-400 bg-white text-green-900 cursor-pointer"
                >
                    {daysOfWeek.map((day) => (
                        <option key={day} value={day}>{day}</option>
                    ))}
                </select>
                <div className="flex items-center gap-3">
                    <input
                        type="time"
                        value={newAvailabilitySlot.start_time}
                        onChange={(e) => setNewAvailabilitySlot({ ...newAvailabilitySlot, start_time: e.target.value })}
                        className="px-3 py-2 border border-green-300 rounded-lg focus:outline-none
                            focus:ring-1 focus:ring-green-400 text-green-800 cursor-pointer"
                    />

                    <span className="text-green-600">-</span>

                    <input
                        type="time"
                        value={newAvailabilitySlot.end_time}
                        onChange={(e) => setNewAvailabilitySlot({ ...newAvailabilitySlot, end_time: e.target.value })}
                        className="px-3 py-2 border border-green-300 rounded-lg focus:outline-none
                            focus:ring-1 focus:ring-green-400 text-green-800 cursor-pointer"
                    />
                </div>
                <div className="flex items-center gap-1 absolute right-4">
                    <button
                        onClick={addAvailability}
                        className={`ml-auto p-1.5 rounded-lg hover:bg-green-200 transition-colors cursor-pointer 
                        ${completed ? '' : 'opacity-50 pointer-events-none'}`}
                    >
                        <img src={Check} alt="Check" className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setActivePopup('')}
                        className="px-2 py-0.5 ml-auto text-red-500 hover:text-red-700 rounded-lg
                                hover:bg-red-100 transition-colors cursor-pointer"
                    >
                        ✕
                    </button>
                </div>
            </div>
        )
    )
}