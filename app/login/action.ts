'use client'

import Cookies from 'js-cookie';

export interface LoginData {
    email: string;
    password: string;
}

export async function loginUser(data: LoginData): Promise<void> {
    const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const result = await response.json();
        const token = result.token;

        // Set the token in cookies with an expiration time of 1 hour
        const expires = 1 / 24; // 1 hour in days (js-cookie uses days for expiration)
        Cookies.set("token", token, {
            expires, // 1 hour from now
            secure: process.env.NODE_ENV === "production",
            sameSite: 'Strict',
        });

        console.log(token);
    } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login Failed");
    }
}
