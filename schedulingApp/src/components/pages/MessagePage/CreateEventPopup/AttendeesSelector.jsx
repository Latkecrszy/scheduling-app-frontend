import React, { useRef } from "react";


export default function AttendeesSelector({memberNames, confirmedAttending, setConfirmedAttending, attending, setAttending}) {
    const inputRef = useRef(null);

    return (
        <div>
            <label htmlFor="attendees" className="text-left block text-sm font-medium text-green-800">
                Who's Attending
            </label>
            <div
                className="mt-1 w-full rounded-lg border border-green-300 p-2 flex flex-col items-start
                            focus:border-green-500 focus:ring-green-500 focus:outline-none justify-center"
            >
                <div className={`${confirmedAttending.length > 0 ? "mb-1" : undefined} flex flex-wrap` }>
                    {confirmedAttending.map((name, index) => (
                        <span
                            key={`${name}-${index}`}
                            data-name={name}
                            className="mr-2 mb-1 bg-green-50 pt-1 pb-1 pl-2 pr-2 w-fit border-1
                                        border-green-300 text-center rounded-lg hover:text-red-500 hover:line-through cursor-pointer"
                            onClick={(e) => {
                                setConfirmedAttending(prev => (prev.filter(name => name !== e.target.dataset.name)))
                            }}
                        >
                            {name}
                        </span>
                    ))}
                </div>

                <input
                    type="text"
                    ref={inputRef}
                    value={attending}
                    autoComplete="off"
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            e.preventDefault()
                            setConfirmedAttending(prev => ([...prev, attending]))
                            setAttending('')
                        }
                    }}
                    onChange={e => setAttending(e.target.value)}
                    id="attendees"
                    placeholder="e.g., John, Sarah"
                    className='border-0 bg-none focus:outline-0 w-full'
                />
            </div>
            {memberNames && memberNames.map((name, index) => {
                if ((name.toLowerCase().includes(attending.toLowerCase()) && attending !== '' && !confirmedAttending.includes(name))) {
                    return (
                        <div
                            key={`${name}-${index}`}
                            className="mt-1 block w-full rounded-lg border border-green-300 p-2
                                        focus:border-green-500 focus:ring-green-500 focus:outline-none cursor-pointer
                                        hover:bg-green-50"
                            onClick={() => {
                                setConfirmedAttending(prev => ([...prev, name]))
                                setAttending('')
                                inputRef.current?.focus()
                            }}
                        >{name}</div>
                    )
                }
            })}
        </div>
    )
}