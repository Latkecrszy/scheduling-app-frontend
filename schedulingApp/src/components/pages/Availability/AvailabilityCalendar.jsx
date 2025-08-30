import filterEvents from "../MessagePage/RescheduleEventPopup/filterEvents.js";
import angleLeft from "../../../assets/images/angle-left.svg";
import angleRight from "../../../assets/images/angle-right.svg";


export default function AvailabilityCalendar({availability, selectedDate, todayString, setSelectedDate, unavailableTimes}) {
    const firstDayOfWeek = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate()
    return (
        <>
            <div className="flex items-center justify-between my-4 mx-2">
                <button
                    className={`p-2 rounded-full hover:bg-green-100 transition-colors cursor-pointer`}
                    onClick={() => {
                        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))
                    }}
                >
                    <img src={angleLeft} className="h-5 w-5" alt="Previous month" />
                </button>
                <h4 className={`text-lg font-semibold text-green-800`}>
                    {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h4>
                <button
                    className={`p-2 rounded-full hover:bg-green-100 transition-colors cursor-pointer`}
                    onClick={() => {
                        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))
                    }}
                >
                    <img src={angleRight} className="h-5 w-5" alt="Next month" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
                {["Su", "M", "Tu", "W", "Th", "F", "Sa"].map((day) => (
                    <div key={day} className={`text-center text-green-700 font-medium`}>{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayOfWeek }).map((_, index) => (
                    <div key={"empty" + index} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), index + 1);
                    const dateString = date.toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'})
                    const eventsToday = [...(availability[dateString] || []), ...(availability['days'][(index+firstDayOfWeek) % 7] || [])];
                    // Don't give the date a border if the only event is the selected one to be rescheduled
                    const uncancelledEvents = filterEvents(eventsToday, dateString, date)
                    // Combine events with times the user marked as unavailable
                    const allEvents = [...uncancelledEvents, ...unavailableTimes[dateString] || []]
                    const today = new Date();
                    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    return (
                        <button
                            key={index}
                            onClick={() => {
                                setSelectedDate(date)
                            }}
                            className={`p-2 m-1 relative rounded-lg text-md text-left cursor-pointer flex flex-col h-30 border overflow-y-scroll 
                            text-green-800 border-green-500
                ${todayString === dateString ? 'bg-green-100' : 'bg-white hover:bg-green-100'}
                ${date < todayDate ? 'opacity-50' : ''}`}
                        >
                            {/* Show a red dot on the calendar day if it has an event */}
                            {allEvents.length > 0 && <div className="h-2.5 w-2.5 bg-red-400 rounded-full absolute top-2 right-2"></div>}
                            {/* Show calendar number */}
                            {index + 1}
                            {/* Show times of day's events */}
                            {allEvents.map(event => {
                                return (
                                    <div key={event.id} className="my-0.5 text-xs bg-red-100 text-red-700 px-1
                                    py-0.5 text-nowrap rounded truncate min-h-5">
                                        {event.start_time}-{event.end_time}
                                    </div>
                                )
                            })}
                        </button>
                    );
                })}
            </div>
        </>
    )
}