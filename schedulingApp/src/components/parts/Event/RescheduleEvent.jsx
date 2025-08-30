import React from 'react'
import location from '../../../assets/images/location.svg'
import calendar from '../../../assets/images/calendar.svg'
import clock from '../../../assets/images/clock.svg'
import attending from '../../../assets/images/attending.svg'
import { useEventContext } from '../../pages/MessagePage/contexts/EventContext.jsx'
import { useUIContext } from '../../pages/MessagePage/contexts/UIContext.jsx'
import { formatDate } from '../Functions.jsx'
import Badge from './Badge.jsx'


export default function RecurringEvent({ eventInfo, userEmail, convertedInfo }) {
    const { setRescheduleEventDefaults } = useEventContext();
    const { setActivePopup } = useUIContext();
    const className = eventInfo.modified ? 'pointer-events-none' : ''
    return (
        <div className="md:max-w-sm border border-yellow-300 bg-yellow-50 rounded-2xl p-4 text-left shadow-md">
            <div className="flex flex-col items-start justify-center mb-3">
                <Badge color='yellow' text={eventInfo.modified ? 'Modified' : 'Rescheduled'} />
                <h3 className="text-yellow-800 text-lg mt-2 font-semibold text-wrap">{eventInfo.name}</h3>
            </div>

            <div className="flex items-center text-sm text-yellow-900 mb-2">
                <img src={location} className="h-4 inline mr-2" alt="Location pin"/>
                <span className="truncate">{eventInfo.location}</span>
            </div>

            <div className="flex items-center text-sm text-yellow-900 mb-2">
                <img src={calendar} className="h-4 inline mr-2" alt="Calendar"/>
                <span>{convertedInfo.startDate}</span>
            </div>

            <div className="flex items-center text-sm text-yellow-900 mb-2">
                <img src={clock} className="h-4 inline mr-2" alt="Clock"/>
                <span>{convertedInfo.startTime}</span>–<span>{convertedInfo.endTime}</span>
            </div>

            <div className="flex items-center text-sm text-yellow-900 mb-3">
                <img src={attending} className="h-4 inline mr-2" alt="People"/>
                <span className="truncate">{eventInfo.attending.join(", ")}</span>
            </div>

            {eventInfo.sender !== userEmail &&
                <div className={`flex space-x-2 pt-2 ${className}`}>
                    <button
                        className="flex-1 px-3 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm
                        font-medium cursor-pointer"
                        onClick={() => {}}>
                        Accept</button>
                    <button
                        className="flex-1 px-3 py-1 bg-yellow-300 text-yellow-900 rounded-lg hover:bg-yellow-400
                        text-sm font-medium cursor-pointer"
                        onClick={() => {
                            const { startDate } = formatDate(eventInfo)
                            setRescheduleEventDefaults({
                                ...eventInfo,
                                startTime24: convertedInfo.startTimePopup,
                                endTime24: convertedInfo.endTimePopup,
                                scheduleButtonText: 'Modify',
                                modifyDate: startDate,
                                date: undefined,
                                prev_id: eventInfo.id
                            })
                            setActivePopup('chooseDate');
                        }}>Modify
                    </button>
                    <button
                        className="flex-1 px-3 py-1 bg-white text-yellow-700 border border-yellow-600 rounded-lg
                        hover:bg-yellow-100 text-sm font-medium cursor-pointer">
                        Decline
                    </button>
                </div>
            }
        </div>
    )
}
