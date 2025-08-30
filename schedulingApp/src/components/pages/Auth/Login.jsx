import React, {useEffect, useState} from "react";
import Input from "./Input.jsx";
import axios from 'axios';

export default function LoginPage() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (Object.values(form).every(value => value !== '')) {
            setCompleted(true)
        } else {
            setCompleted(false);
        }
    }, [form])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value}));
    };

    const handleSubmit = async () => {
        const toSend = {
            email: form.email,
            password: form.password
        }
        await axios.post('http://localhost:8000/login', toSend, {
            withCredentials: true,
        })
            .then(response => {
                if (response.data.error) {
                    console.log(response.data.error)
                }
            })
        location.replace('/conversations')
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-green-50 px-4 py-2 -mt-20">
            <div
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md space-y-4"
            >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-green-700 text-sm font-medium">
                    Don't have an account?
                  </span>
                    <a
                        href="/signup"
                        className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                    >
                        Sign Up
                    </a>
                </div>
                <h2 className="text-2xl font-semibold text-green-800 mb-2">Log In</h2>
                <Input name='email' type='email' label='Email' form={form} handleChange={handleChange} />
                <Input name='password' type='password' label='Password' form={form} handleChange={handleChange} />

                <button
                    type="submit"
                    onClick={handleSubmit}
                    className={`w-full bg-green-500 text-white rounded-lg mt-3 py-2 font-medium hover:bg-green-600 
                    transition-colors cursor-pointer ${completed ? '' : 'opacity-50 pointer-events-none'}`}
                >
                    Log In
                </button>
            </div>
        </div>
    );
}