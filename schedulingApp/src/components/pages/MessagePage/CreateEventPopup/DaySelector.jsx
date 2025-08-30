import React from "react";


export default function DaySelector({onChange}) {
    return (
        <div>
            <label htmlFor="day" className="text-left block text-sm font-medium text-green-800">
                Day of the Week
            </label>
            <select
                id="day"
                required={true}
                onChange={onChange}
                className="mt-1 block w-full rounded-lg border border-green-300 p-2
                            focus:border-green-500 focus:ring-green-500 cursor-pointer focus:outline-none"
            >
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
                    (day, index) => (
                    <option key={day} value={index}>{day}</option>
                ))}
            </select>
        </div>
    )
}