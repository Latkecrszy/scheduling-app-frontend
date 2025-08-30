import React from "react";
import calendar from '../../../assets/images/calendar.svg'
import attending from '../../../assets/images/attending.svg'
import clock from "../../../assets/images/clock.svg";
import Badge from './Badge.jsx'


export default function CancelEvent({ eventInfo, convertedInfo }) {
    return (
        <div className="md:max-w-sm bg-red-50 border border-red-300 rounded-xl p-4 text-left shadow-md">
            <div className="flex flex-col items-start justify-center mb-3">
                <Badge color='red' text='Cancelled' />
                <h3 className="text-red-800 mt-2 text-lg font-semibold text-wrap">{eventInfo.name}</h3>
            </div>
            <div className="flex items-center text-sm text-red-900 mb-2">
                <img src={calendar} className="h-4 inline mr-2" alt="Calendar"/>
                <span>{convertedInfo.startDate}</span>
            </div>

            <div className="flex items-center text-sm text-red-900 mb-2">
                <img src={clock} className="h-4 inline mr-2" alt="Clock"/>
                <span>{convertedInfo.startTime}</span>-<span>{convertedInfo.endTime}</span>
            </div>

            <div className="flex items-center text-sm text-red-900 mb-2">
                <img src={attending} className="h-4 inline mr-2" alt="People"/>
                <span>{eventInfo.attending.join(", ")}</span>
            </div>

            <p className="text-xs text-red-700 mt-2">
                This lesson was cancelled for the above date only.
            </p>
        </div>
    );
}