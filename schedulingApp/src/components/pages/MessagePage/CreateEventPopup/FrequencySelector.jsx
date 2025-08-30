import React from "react";


export default function FrequencySelector({onChange}) {
    return (
        <div>
            <label htmlFor="frequency" className="text-left block text-sm font-medium text-green-800">
                Frequency
            </label>
            <select
                id="frequency"
                required={true}
                onChange={onChange}
                className="mt-1 block w-full rounded-lg border border-green-300 p-2
                            focus:border-green-500 focus:ring-green-500 cursor-pointer focus:outline-none"
            >
                {['Weekly', 'Biweekly', 'Every 3 weeks', 'Every 4 weeks', 'Monthly'].map((frequency, index) => (
                    <option key={frequency} value={index+1}>{frequency}</option>
                ))}
            </select>
        </div>
    )
}