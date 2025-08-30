import angleLeft from "../../../../assets/images/angle-left.svg";
import angleRight from "../../../../assets/images/angle-right.svg";


export default function MonthSelector({selectedDate, setSelectedDate, color='green'}) {
    return (
        <div className="flex items-center justify-between my-4 mx-2">
            <button
                className={`p-2 rounded-full hover:bg-${color}-100 transition-colors cursor-pointer`}
                onClick={() => {
                    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))
                }}
            >
                <img src={angleLeft} className="h-5 w-5" alt="Previous month" />
            </button>
            <h4 className={`text-lg font-semibold text-${color}-800`}>
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h4>
            <button
                className={`p-2 rounded-full hover:bg-${color}-100 transition-colors cursor-pointer`}
                onClick={() => {
                    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))
                }}
            >
                <img src={angleRight} className="h-5 w-5" alt="Next month" />
            </button>
        </div>
    )
}