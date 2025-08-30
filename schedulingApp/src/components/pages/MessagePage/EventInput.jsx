import React, { useRef, useState } from 'react'
import eventInput from '../../../assets/images/create-event.svg'
import createEvent from '../../../assets/images/calendar-plus-light.svg'
import rescheduleEvent from '../../../assets/images/calendar-exclamation-light.svg'
import cancelEvent from '../../../assets/images/calendar-xmark-light.svg'
import useClickOutside from "../../../hooks/useClickOutside.js";
import { useEventContext } from './contexts/EventContext.jsx'
import { useUIContext } from "./contexts/UIContext.jsx";


export default function EventInput() {
    const { setActivePopup } = useUIContext();
    const { setEventDefaults, setRescheduleEventDefaults } = useEventContext();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef();
    useClickOutside(menuRef, () => setShowMenu(false))

    return (
        <div className="relative">
            {showMenu && (
                <div className="absolute bottom-20 bg-green-50 border border-green-300 rounded-xl shadow-md w-40"
                     ref={menuRef}
                >
                    <button className="flex items-center w-full h-[40px] px-3 py-2 text-green-900 hover:bg-green-100 rounded-t-xl cursor-pointer"
                            onClick={() => {
                                setActivePopup('createEvent')
                                setShowMenu(false)
                            }}
                    >
                        <img src={createEvent}
                             className='w-[20px] h-[20px] mr-[15px] ml-[5px] mb-[2px]'
                             alt='Calendar with plus sign'
                        />
                        <span className="text-sm font-medium">Schedule</span>
                    </button>
                    <button className="flex items-center w-full h-[40px] px-3 py-2 text-green-900 hover:bg-green-100 cursor-pointer"
                            onClick={() => {
                                setRescheduleEventDefaults((prev) =>
                                    ({...prev, nextPopup: 'chooseDate', submitButtonText: 'Reschedule'}))
                                setActivePopup('chooseEvent')
                                setShowMenu(false)
                            }}
                    >
                        <img src={rescheduleEvent}
                             className='w-[20px] h-[20px] mr-[15px] ml-[5px] mb-[2px]'
                             alt='Calendar with exclamation point'
                        />
                        <span className="text-sm font-medium">Reschedule</span>
                    </button>
                    <button className="flex items-center w-full h-[40px] px-3 py-2 text-green-900 hover:bg-green-100 rounded-b-xl cursor-pointer"
                            onClick={() => {
                                setRescheduleEventDefaults((prev) =>
                                    ({...prev, nextPopup: 'cancelEvent', submitButtonText: 'Cancel'}))
                                setActivePopup('cancelEvent')
                                setShowMenu(false)
                            }}
                    >
                        <img src={cancelEvent}
                             className='w-[20px] h-[20px] mr-[15px] ml-[5px] mb-[2px]'
                             alt='Calendar with x'
                        />
                        <span className="text-sm font-medium">Cancel</span>
                    </button>
                </div>
            )}
            <div className="mt-3 mr-2 px-3 py-2 text-nowrap bg-green-500 text-white text-sm rounded-xl
            hover:bg-green-600 transition-colors font-medium cursor-pointer"
                         onClick={() => {
                     setEventDefaults({
                         name: '',
                         day: 0,
                         location: '',
                         frequency: 1,
                         start: '',
                         attending: [],
                         scheduleButtonText: 'Schedule',
                         startTime: '',
                         endTime: ''
                     })
                     setShowMenu(prev => !prev)}
                 }
            >
                <span>+ New Event</span>
            </div>
        </div>
    )
}