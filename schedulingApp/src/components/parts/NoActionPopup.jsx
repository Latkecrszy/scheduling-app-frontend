import React from "react";
import { useUIContext } from "../pages/MessagePage/contexts/UIContext.jsx";
import Blur from "./Blur.jsx"

export default function NoActionPopup({name, headerText, subText, buttonText, closeFunction, color='green'}) {
    const { activePopup } = useUIContext()
    return (activePopup === name && (
        <Blur>
            <div className={`bg-red-50 border border-${color}-300 rounded-2xl p-6 w-80 space-y-4 text-center transform transition-transform -mt-40
            duration-300 ease-out translate-y-4 opacity-0 animate-fade-in-up`}>
                <h3 className={`text-lg font-semibold text-${color}-800`}>{headerText}</h3>
                <p className={`text-${color}-700 text-sm`}>{subText}</p>
                <button className={`mt-2 px-4 py-1 bg-${color}-600 text-white rounded-lg hover:bg-${color}-700 text-sm font-medium cursor-pointer`}
                        onClick={closeFunction}
                >
                    {buttonText}
                </button>
            </div>
        </Blur>
    ))
}
