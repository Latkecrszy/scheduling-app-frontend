import filterEvents from "./filterEvents.js";
import {useEventContext} from "../contexts/EventContext.jsx";

export default function Calendar({events, selectedDate, setSelectedEvent, todayString, setSelectedDate, dayBorders=true, color='green'}) {
    const { rescheduleEventDefaults } = useEventContext();
    console.log(events)
    const firstDayOfWeek = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate()

    return (
        <>
            <div className="grid grid-cols-7 gap-1 mb-2">
                {["Su", "M", "Tu", "W", "Th", "F", "Sa"].map((day) => (
                    <div key={day} className={`text-center text-${color}-700 font-medium`}>{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayOfWeek }).map((_, index) => (
                    <div key={"empty" + index} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), index + 1);
                    const dateString = date.toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'})
                    const eventsToday = [...(events[dateString] || []), ...(events[(index+1+firstDayOfWeek) % 7] || [])];
                    // Don't give the date a border if the only event is the selected one to be rescheduled
                    const uncancelledEvents = filterEvents(eventsToday, dateString, date)
                        .filter(event => {return !(event.id === rescheduleEventDefaults.id &&
                            rescheduleEventDefaults.date?.getTime() === date.getTime())})
                    if (index === 19) {
                        console.log(uncancelledEvents)
                    }
                    const today = new Date();
                    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    return (
                        <button
                            key={index}
                            onClick={() => {
                                setSelectedEvent(null)
                                setSelectedDate(date)
                            }}
                            className={`p-1 rounded-lg text-sm text-center cursor-pointer
                ${todayString === dateString ? 'bg-'+color+'-200' : 'hover:bg-'+color+'-100'}
                ${dayBorders && uncancelledEvents.length > 0 ? 'border border-'+color+'-500' : ''}
                ${date < todayDate ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>
        </>
    )
}