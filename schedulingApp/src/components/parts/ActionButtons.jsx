export default function ActionButtons({submitFunction, cancelFunction, submitButtonText, cancelButtonText, completed, color='green'}) {
    return (
        <div className="mt-8 flex justify-between gap-2 box-border w-full">
            <button
                onClick={cancelFunction}
                className={`px-4 py-2 border bg-white border-${color}-600 text-${color}-700 rounded-xl hover:bg-${color}-50 cursor-pointer`}
            >
                {cancelButtonText}
            </button>
            <button
                onClick={submitFunction}
                className={`px-4 py-2 bg-${color}-600 text-white rounded-xl transition-colors
                        ${completed ? 'hover:bg-'+color+'-700 cursor-pointer' : 'opacity-50 pointer-events-none'}`}
            >
                {submitButtonText}
            </button>
        </div>
    )
}