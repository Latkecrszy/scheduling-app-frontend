import React from 'react'
import { useUIContext } from "../contexts/UIContext.jsx";

export default function OverlappingTimePopup({scheduleFunction}) {
    const { activePopup, setActivePopup } = useUIContext();
    return (activePopup === 'overlappingTime' && (
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4 transform transition-transform
        duration-300 ease-out translate-y-4 opacity-0 animate-fade-in-up -mt-30">
            <h2 className="text-2xl font-bold text-green-700 text-center">Override Existing Event?</h2>
            <p className="text-green-900 text-center">
                Someone in this conversation has a conflict during this time. Do you still want to proceed?
            </p>
            <div className="flex justify-between pt-2 space-x-2">
                <button
                    type="button"
                    className="flex-1 px-4 py-2 rounded-lg border border-green-600 text-green-700 hover:bg-green-50 font-semibold cursor-pointer"
                    onClick={scheduleFunction}
                >
                    Schedule
                </button>
                <button
                    type="button"
                    className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 cursor-pointer"
                    onClick={() => {
                        setActivePopup('chooseDate')
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    ));
}
