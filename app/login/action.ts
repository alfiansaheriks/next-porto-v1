'use server';
import { cookies } from 'next/headers';

export interface LoginData {
    email: string;
    password: string;
}

export async function loginUser(data: LoginData): Promise<any> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const result = await response.json();
        const token = result.token;
        const user = result.user;

        // Set the token in cookies with an expiration time of 1 hour
        const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

        cookies().set({
            name: 'token',
            value: token.token,
            expires,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        cookies().set({
            name: 'userId',
            value: user.id,
            expires,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        })

        return result; // Return the entire response data
    } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login Failed");
    }
}