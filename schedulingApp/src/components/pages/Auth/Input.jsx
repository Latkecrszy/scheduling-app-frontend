import React from "react";

export default function Input({label, type, name, form, handleChange, emailError=''}) {
    return (
        <div>
            <label className="block text-left text-green-700 text-sm mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full border border-green-300 rounded-lg px-3 py-2 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {emailError && <p className="text-left text-red-600 text-xs mt-1">{emailError}</p>}
        </div>
    )
}