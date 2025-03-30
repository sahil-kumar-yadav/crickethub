// src/pages/login.js
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from 'next-auth/react';


export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            alert('Invalid credentials');
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" required className="w-full mb-3 border p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="mt-2" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Sign In</button>
            </form>
        </div>
    );
}
