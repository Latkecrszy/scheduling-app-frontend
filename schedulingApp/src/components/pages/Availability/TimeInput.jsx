import React from "react";
import {to24Hour} from "../../parts/Functions.jsx";

export default function TimeInput({ startValue, endValue, setValues, timeError }) {
    let className = `block w-full rounded-lg border p-2 cursor-pointer focus:outline-none 
    ${timeError ? 'border-red-500' : 'border-green-300 focus:border-green-500 focus:ring-green-500'}`
    return (
        <div>
            <div className="flex space-x-2 items-center ml-2">
                <div className="flex-1">
                    <input
                        type="time"
                        required
                        value={to24Hour(startValue)}
                        onChange={e => {setValues(prev => ({...prev, start_time: e.target.value}))}}
                        className={className}
                    />
                </div>
                <span className="text-green-700">-</span>
                <div className="flex-1">
                    <input
                        type="time"
                        required
                        value={to24Hour(endValue)}
                        onChange={e => {setValues(prev => ({...prev, end_time: e.target.value}))}}
                        className={className}
                    />
                </div>
            </div>
        </div>
    );
}