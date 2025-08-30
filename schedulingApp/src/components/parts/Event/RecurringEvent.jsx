import React from 'react'
import location from '../../../assets/images/location.svg'
import frequency from '../../../assets/images/frequency.svg'
import calendar from '../../../assets/images/calendar.svg'
import clock from '../../../assets/images/clock.svg'
import day from '../../../assets/images/day.svg'
import attending from '../../../assets/images/attending.svg'
import { useEventContext } from '../../pages/MessagePage/contexts/EventContext.jsx'
import { useUIContext } from '../../pages/MessagePage/contexts/UIContext.jsx'
import Badge from './Badge.jsx'


export default function RecurringEvent({ eventInfo, userEmail, convertedInfo }) {
    const { setEventDefaults } = useEventContext();
    const { setActivePopup } = useUIContext();
    const className = eventInfo.modified ? 'pointer-events-none' : ''
    return (
        <div className="md:max-w-sm bg-green-50 border border-green-300 rounded-xl p-4 text-left shadow-md">
            <div className="flex flex-col items-start justify-center mb-3">
                <Badge color='emerald' text={eventInfo.modified ? 'Modified' : 'Recurring'} />
                <h3 className="text-green-800 text-lg mt-2 font-semibold text-wrap">{eventInfo.name}</h3>
            </div>

            <div className="flex items-center text-sm text-green-900 mb-2">
                <img src={location} className="h-4 inline mr-2" alt="Location pin"/>
                <span className="truncate">{eventInfo.location}</span>
            </div>

            <div className="flex items-center text-sm text-green-900 mb-2">
                <img src={calendar} className="h-4 inline mr-2" alt="Calendar"/>
                <span>{convertedInfo.startDate}</span>
            </div>

            {eventInfo.subtype === 'recurring' && <div className="text-sm text-green-900 mb-2">
                <img src={day} className="h-4 inline mr-2" alt="Calendar with day selected"/>
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][eventInfo.day]}
            </div>}

            <div className="flex items-center text-sm text-green-900 mb-2">
                <img src={clock} className="h-4 inline mr-2" alt="Clock"/>
                <span>{convertedInfo.startTime}</span>-<span>{convertedInfo.endTime}</span>
            </div>


            <div className="flex items-center text-sm text-green-900 mb-2">
                <img src={attending} className="h-4 inline mr-2" alt="People"/>
                <span>{eventInfo.attending.join(", ")}</span>
            </div>

            {eventInfo.subtype === 'recurring' && <div className="flex items-center text-sm text-green-900 mb-2">
                <img src={frequency} className="h-4 inline mr-2" alt="Repeat sign"/>
                <span>{['Weekly', 'Biweekly', 'Every 3 weeks', 'Every 4 weeks', 'Monthly'][eventInfo.frequency-1]}</span>
            </div>}

            {eventInfo.sender !== userEmail &&
                <div className={`flex space-x-2 pt-2 ${className}`}>
                    <button
                        className="flex-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm
                        font-medium cursor-pointer">
                        Accept</button>
                    <button
                        className="flex-1 px-3 py-1 bg-green-300 text-green-900 rounded-lg hover:bg-green-400
                        text-sm font-medium cursor-pointer"
                        onClick={() => {
                            setEventDefaults({
                                ...eventInfo,
                                start: convertedInfo.startDatePopup,
                                startTime: convertedInfo.startTimePopup,
                                endTime: convertedInfo.endTimePopup,
                                scheduleButtonText: 'Modify'
                            });
                            setActivePopup('createEvent');
                        }}>Modify
                    </button>
                    <button
                        className="flex-1 px-3 py-1 bg-white text-green-700 border border-green-600 rounded-lg
                        hover:bg-green-100 text-sm font-medium cursor-pointer">
                        Decline
                    </button>
                </div>
            }
        </div>
    )
}
