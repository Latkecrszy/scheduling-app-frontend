import React from 'react'


export default function LocationInput({value, onChange}) {
    return (
        <div>
            <label htmlFor="location" className="text-left block text-sm font-medium text-green-800">
                Location
            </label>
            <input
                type="text"
                required={true}
                value={value}
                placeholder='e.g., Zoom, school'
                onChange={onChange}
                id="location"
                className="mt-1 block w-full rounded-lg border border-green-300 p-2
                            focus:border-green-500 focus:ring-green-500 focus:outline-none"
            />
        </div>
    )
}