import React from 'react';
import Search from "../../assets/images/search.svg";


export default function SearchBar({value, setValue, color='green'}) {
    return (
        <div className={`flex items-center bg-white rounded-lg border border-${color}-300 px-3 py-2 shadow-inner mt-3`}>
            <img src={Search} className="h-3 w-3 opacity-60 mr-2" alt="Search"/>
            <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Search events or attendees..."
                className={`flex-1 text-sm text-${color}-800 placeholder-${color}-500 bg-transparent focus:outline-none`}
            />

        </div>
    )
}

