import React, { useState } from 'react';
import RecurringEvent from './RecurringEvent';
import RescheduleEvent from './RescheduleEvent';
import CancelEvent from './CancelEvent';
import { useUIContext } from '../../pages/MessagePage/contexts/UIContext.jsx'
import { formatDate } from '../Functions.jsx'


export default function Event({ eventInfo, user, eventRef }) {
    const { openMenu } = useUIContext();
    const {startDate, endDate, formattedDate} = formatDate(eventInfo);
    const convertedInfo = {
        startDate: startDate.toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'}),
        startTime: startDate.toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric', hour12: true}),
        endTime: endDate.toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric', hour12: true}),
        startTimePopup: startDate.toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric', hour12: false}),
        endTimePopup: endDate.toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric', hour12: false}),
        startDatePopup: formattedDate
    }
    const isOwn = eventInfo.sender === user.email
    const className = `event m-2 w-70 ${eventInfo.modified ? 'opacity-50' : ''} ${isOwn ? 'self-end' : 'self-start'}`

    if (eventInfo.subtype === 'recurring') {
        return (
            <div ref={eventRef}
                className={className}
                 onContextMenu={(e) => {openMenu(e, eventInfo)}}
                 data-menu-target
                 id={eventInfo.id}>
                <RecurringEvent eventInfo={eventInfo} userEmail={user.email} convertedInfo={convertedInfo}/>
                <div className={`text-xs text-green-600 mt-0.5 ${isOwn ? 'text-right' : 'text-left'}`}>
                    {!isOwn && <span className="font-medium">{eventInfo.sender} • </span>}
                    {new Date(eventInfo.timestamp * 1000).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})}
                </div>
            </div>
        )
    } else if (eventInfo.subtype === 'reschedule') {
        return (
                <div ref={eventRef}
                     className={className}
                     onContextMenu={(e) => {openMenu(e, eventInfo)}}
                     data-menu-target
                     id={eventInfo.reschedule_event_id}>
                    <RescheduleEvent eventInfo={eventInfo} userEmail={user.email} convertedInfo={convertedInfo}/>
                    <div className={`text-xs text-green-600 mt-0.5 ${isOwn ? 'text-right' : 'text-left'}`}>
                        {!isOwn && <span className="font-medium">{eventInfo.sender} • </span>}
                        {new Date(eventInfo.timestamp * 1000).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})}
                    </div>
                </div>
        )
    } else if (eventInfo.subtype === 'cancel') {
        return (
            <div ref={eventRef}
                 className={className}
                 onContextMenu={(e) => {openMenu(e, eventInfo)}}
                 data-menu-target
                 id={eventInfo.cancel_event_id}>
                <CancelEvent eventInfo={eventInfo} convertedInfo={convertedInfo}/>
                <div className={`text-xs text-green-600 mt-0.5 ${isOwn ? 'text-right' : 'text-left'}`}>
                    {!isOwn && <span className="font-medium">{eventInfo.sender} • </span>}
                    {new Date(eventInfo.timestamp * 1000).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})}
                </div>
            </div>
        )
    }
}