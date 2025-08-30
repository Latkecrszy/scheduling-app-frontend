import React from "react";

export default function TimeInput({ startValue, endValue, onStartChange, onEndChange, timeError }) {
    let className = `block w-full rounded-lg border p-2 cursor-pointer focus:outline-none 
    ${timeError ? 'border-red-500' : 'border-green-300 focus:border-green-500 focus:ring-green-500'}`
    return (
        <div>
            <div className="flex space-x-2">
                <div className="flex-1">
                    <label className="text-left block text-sm font-medium text-green-800 mb-1">
                        Start Time
                    </label>
                    <input
                        type="time"
                        required
                        value={startValue}
                        onChange={onStartChange}
                        className={className}
                    />
                </div>
                <div className="flex-1">
                    <label className="text-left block text-sm font-medium text-green-800 mb-1">
                        End Time
                    </label>
                    <input
                        type="time"
                        required
                        value={endValue}
                        onChange={onEndChange}
                        className={className}
                    />
                </div>
            </div>
        </div>
    );
}
