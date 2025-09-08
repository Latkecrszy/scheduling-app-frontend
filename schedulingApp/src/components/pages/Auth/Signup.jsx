import React, {useEffect, useState} from "react";
import Input from "./Input.jsx";
import axios from 'axios';

export default function SignupPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        phone: "",
        firstName: "",
        lastName: "",
        type: "student"
    });
    const [emailError, setEmailError] = useState("");
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (Object.values(form).every(value => value !== '') && emailError === '') {
            setCompleted(true)
        } else {
            setCompleted(false);
        }
    }, [form, emailError])

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value}));

        if (name === "email") {
            setEmailError(validateEmail(value) ? "" : "Please enter a valid email address.");
        }
    };

    const handleSubmit = async (e) => {
        console.log('handling')
        e.preventDefault();
        const toSend = {
            email: form.email,
            password: form.password,
            first_name: form.firstName,
            last_name: form.lastName,
            type: form.type,
            phone: form.phone
        }
        console.log(toSend)
        if (!validateEmail(form.email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }
        try {
            const response = await axios.post('https://scheduling-app-backend-b4fcac504465.herokuapp.com/create-account', toSend, {
                withCredentials: true,
            });
            console.log(response.data);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-green-50 px-4 py-2">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md space-y-4"
            >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-green-700 text-sm font-medium">
                    Already have an account?
                  </span>
                    <a
                        href="/login"
                        className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                    >
                        Log in
                    </a>
                </div>
                <h2 className="text-2xl font-semibold text-green-800 mb-2">Sign Up</h2>
                <Input name='firstName' type='text' label='First Name' form={form} handleChange={handleChange} />
                <Input name='lastName' type='text' label='Last Name' form={form} handleChange={handleChange} />
                <Input name='email' type='email' label='Email' form={form} handleChange={handleChange} emailError={emailError} />
                <Input name='password' type='password' label='Password' form={form} handleChange={handleChange} />
                <Input name='phone' type='tel' label='Phone Number' form={form} handleChange={handleChange} />

                <div>
                    <label className="block text-left text-green-700 text-sm mb-1">Account Type</label>
                    <select name='type'
                            value={form.type}
                            className="w-full border border-green-300 rounded-lg px-2 py-2 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                            onChange={handleChange}>
                        <option value='student'>Student</option>
                        <option value='teacher'>Teacher</option>
                        <option value='parent'>Parent</option>
                    </select>
                </div>

                <button
                    type="submit"
                    onClick={handleSubmit}
                    className={`w-full bg-green-500 text-white rounded-lg mt-3 py-2 font-medium hover:bg-green-600 
                    transition-colors cursor-pointer ${completed ? '' : 'opacity-50 pointer-events-none'}`}
                >
                    Create Account
                </button>
            </form>
        </div>
    );
}