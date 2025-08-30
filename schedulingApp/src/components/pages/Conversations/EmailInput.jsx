import React from "react";


export default function EmailInput({emails, setEmails, emailValue, setEmailValue}) {
    return (
        <div
            className="w-full border border-green-300 rounded-lg px-3 py-2 duration-50 text-green-900 bg-green-50">
            <div className={`${emails.length > 0 ? "mb-1" : undefined} flex flex-wrap` }>
                {emails.map((email, index) => (
                    <span
                        key={`${email}-${index}`}
                        data-email={email}
                        className="mr-2 mb-1 py-1 px-2 w-fit border-1 border-green-300 text-center rounded-lg
                                cursor-pointer overflow-scroll max-w-full hover:text-red-500 hover:line-through"
                        onClick={(e) => {
                            setEmails(prev => (prev.filter(name => name !== e.target.dataset.email)))
                        }}
                    >
                            {email}
                        </span>
                ))}
            </div>

            <input
                className="w-full border-0 bg-none focus:outline-0"
                type="text"
                placeholder="alice@example.com, bob@example.com"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        e.preventDefault()
                        setEmails(prev => ([...prev, emailValue]))
                        setEmailValue('')
                    }
                }}
            />
        </div>
    )
}