'use server';
import { cookies } from 'next/headers';

export async function getCookie(name: string): Promise<string | null> {
  const cookieStore = cookies();
  const cookie = cookieStore.get(name);
  return cookie ? cookie.value : null;
}

export async function setCookie(name: string, value: string, expires: Date): Promise<void> {
  const cookieStore = cookies();
  cookieStore.set({
    name,
    value,
    expires,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
}

export async function deleteCookie(name: string): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(name);
}

export async function getToken(): Promise<string | null> {
  return await getCookie('token');
}

export async function getUserId(): Promise<string | null> {
  return await getCookie('userId');
}