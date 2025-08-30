import React from "react";


export default function ({value, onChange}) {
    // TODO: Add validation that checks if start date and day of the week are the same

    return (
        <div>
            <label htmlFor="start-date" className="text-left block text-sm font-medium text-green-800">
                Start Date
            </label>
            <input
                type="date"
                required={true}
                value={value}
                onChange={onChange}
                id="start-date"
                className="mt-1 block w-full rounded-lg border border-green-300 p-2
                            focus:border-green-500 focus:ring-green-500 cursor-pointer focus:outline-none"
            />
        </div>
    )
}