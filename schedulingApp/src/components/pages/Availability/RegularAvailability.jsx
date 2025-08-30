import React from "react";
import { useUIContext } from "../MessagePage/contexts/UIContext.jsx";
import AvailabilityInput from "./AvailabilityInput.jsx";
import AvailabilityList from "./AvailabilityList.jsx";


export default function RegularAvailability({ availability, newAvailabilitySlot, setNewAvailabilitySlot, changeAvailability }) {
    const { setActivePopup } = useUIContext();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // TODO: I need to use newAvailabilitySlot to store the data for the edited availability slot or if won't work
    return (
        <div className="bg-white rounded-2xl shadow border border-green-200 p-6 mb-10">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-green-800">Regular Availability</h2>
                </div>
                <button
                    onClick={() => setActivePopup('setAvailability')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium cursor-pointer"
                >
                    + Add Time Slot
                </button>
            </div>

            <div className="max-w-2xl mx-auto flex flex-col gap-4">
                {/* Availability Input */}
                <AvailabilityInput daysOfWeek={daysOfWeek} newAvailabilitySlot={newAvailabilitySlot} availability={availability}
                                   setNewAvailabilitySlot={setNewAvailabilitySlot} addAvailability={() => {changeAvailability('add')}} />

                {/* Availability List */}
                <AvailabilityList daysOfWeek={daysOfWeek} availability={availability}
                                  removeAvailability={(id) => {changeAvailability('remove', id)}}
                                  editAvailability={(id) => {changeAvailability('edit', id)}}
                                  newAvailabilitySlot={newAvailabilitySlot} setNewAvailabilitySlot={setNewAvailabilitySlot} />
            </div>
        </div>
    );
}