import React from 'react'


export function SubmitButton({children, onClick}) {
    return (
        <button
            type="submit"
            formAction={() => {}}
            onClick={onClick}
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 cursor-pointer"
        >
            {children}
        </button>
    )
}

export function CancelButton({children, onClick}) {
    return (
        <button
            type="button"
            className="px-4 py-2 rounded-lg text-green-600 border border-green-600 hover:bg-green-50 cursor-pointer"
            onClick={onClick}
        >
            {children}
        </button>
    )
}