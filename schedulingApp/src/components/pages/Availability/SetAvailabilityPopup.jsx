import React from "react";
import { useUIContext} from "../MessagePage/contexts/UIContext.jsx";
import Blur from "../../parts/Blur.jsx"

export default function SetAvailabilityPopup({newAvailabilitySlot, setNewAvailabilitySlot}) {
    const { activePopup, setActivePopup } = useUIContext();

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    return (activePopup === 'setAvailability' && (
        <Blur>
            <div className="bg-green-50 border border-green-200 rounded-2xl shadow-md p-6 max-w-md w-full">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-green-800">Add Regular Availability</h3>
                </div>

                <div className="space-y-5">
                    {/* Day Selector */}
                    <div>
                        <label className="text-left block text-sm font-medium text-green-700 mb-2">Day of Week</label>
                        <select
                            value={newAvailabilitySlot.day}
                            onChange={(e) =>
                                setNewAvailabilitySlot({ ...newAvailabilitySlot, day: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-green-900"
                        >
                            {daysOfWeek.map((day) => (
                                <option key={day} value={day}>
                                    {day}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Time Range */}
                    <div>
                        <label className="text-left block text-sm font-medium text-green-700 mb-2">Time Range</label>
                        <div className="flex items-center gap-3">
                            <input
                                type="time"
                                value={newAvailabilitySlot.startTime}
                                onChange={(e) =>
                                    setNewAvailabilitySlot({ ...newAvailabilitySlot, startTime: e.target.value })
                                }
                                className="px-3 py-2 w-full border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-green-800"
                            />
                            <span className="text-green-600">to</span>
                            <input
                                type="time"
                                value={newAvailabilitySlot.endTime}
                                onChange={(e) =>
                                    setNewAvailabilitySlot({ ...newAvailabilitySlot, endTime: e.target.value })
                                }
                                className="px-3 py-2 w-full border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-green-800"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            onClick={() => {}}
                            className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium cursor-pointer"
                        >
                            Add Slot
                        </button>
                        <button
                            onClick={() => setActivePopup("")}
                            className="px-4 py-2 bg-white border border-green-300 text-green-700 rounded-xl hover:bg-green-100 transition-colors font-medium cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Blur>
    ))
}