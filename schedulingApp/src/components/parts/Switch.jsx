export default function Switch({isOn, setIsOn, color}) {
    return (
        <label className="flex items-center cursor-pointer select-none space-x-2">
            <div className="relative w-10 h-6">
                <input
                    type="checkbox"
                    checked={isOn}
                    onChange={() => setIsOn(!isOn)}
                    className="sr-only"
                />
                <div
                    className={`absolute inset-0 rounded-full ${isOn ? "bg-"+color+"-600" : "bg-"+color+"-300"} 
                    transition-colors duration-300`}
                ></div>
                <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transform
        transition-transform duration-300 ${
                        isOn ? "translate-x-4" : "translate-x-0"
                    }`}
                ></div>
            </div>
        </label>
    )
}