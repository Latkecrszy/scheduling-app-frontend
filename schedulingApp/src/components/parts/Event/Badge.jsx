import React from "react";


export default function Badge({text, color}) {
    return (
        <span className={`text-${color}-600 font-semibold text-xs -m-1 bg-${color}-100 px-2 py-0.5 rounded-full`}>
            {text}
        </span>
    )
}