import React from "react";
import { useUIContext } from "./contexts/UIContext.jsx";
import { deleteMessage } from "../../parts/Functions.jsx"
import { useUserContext } from "./contexts/UserContext.jsx";


export default function OptionMenu() {
    const { menuPosition, menuRef, eventInfo, activePopup, setActivePopup } = useUIContext();
    const { user } = useUserContext();
    return (activePopup === 'optionMenu' && (
        <div
            ref={menuRef}
            style={{ top: menuPosition.y, left: menuPosition.x }}
            className="absolute z-50 w-[100px] rounded-xl shadow-xl border border-green-400 bg-gradient-to-b  from-green-50 to-white/90 backdrop-blur-sm"
        >
            { user.email === eventInfo.sender && (
                <>
                    <button
                        className="px-4 py-2 w-full text-green-900 font-medium hover:bg-green-100 border-b border-green-200 first:rounded-t-xl cursor-pointer"
                        onClick={() => {
                            deleteMessage(eventInfo)
                            setActivePopup('')
                        }}
                    >
                        Delete
                    </button>
                    <button className="px-4 py-2 w-full text-green-900 font-medium hover:bg-green-100 border-b border-green-200 cursor-pointer">
                        Edit
                    </button>
                </>
            )}

            <button className={`px-4 py-2 w-full text-green-900 font-medium hover:bg-green-100 ${user.email === eventInfo.sender ? 'last:rounded-b-xl' : 'rounded-xl'} cursor-pointer`}>
                Reply
            </button>
        </div>

    ));
}
