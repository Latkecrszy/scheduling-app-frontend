import Clock from "../../../assets/images/clock-green.svg";
import TimeInput from "./TimeInput.jsx";
import React from "react";
import Check from "../../../assets/images/check.svg";
import { useUIContext } from "../MessagePage/contexts/UIContext.jsx";


export default function UnavailableTimeInput({newUnavailableTime, setNewUnavailableTime, changeUnavailability}) {
    const { activePopup, setActivePopup } = useUIContext();

    return (activePopup === 'addUnavailableTime' && (
        <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-dashed border-green-200 relative">
            <div className="flex items-center space-x-3">
                <img src={Clock} alt="Clock" className="w-4 h-4" />
                <input value={newUnavailableTime.reason}
                       onChange={e => {setNewUnavailableTime(prev => ({...prev, reason: e.target.value}))}}
                       className="font-medium text-green-800 border border-green-300 p-2 rounded-lg outline-none focus:border-green-500 focus:ring-green-500"
                       placeholder='Reason' />
                <TimeInput startValue={newUnavailableTime.start_time} endValue={newUnavailableTime.end_time}
                           setValues={setNewUnavailableTime} timeError={false} />

                <div className="flex items-center gap-1 absolute right-4">
                    <button
                        onClick={() => {changeUnavailability('add', 0)}}
                        className="ml-auto p-1.5 rounded-lg hover:bg-green-200 transition-colors cursor-pointer"
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
        </div>
    ))
}