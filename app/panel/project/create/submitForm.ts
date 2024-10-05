'use server';
import { getToken } from '@/utils/cookie';

export async function submitForm(data: any): Promise<any> {
  const token = await getToken();
  console.log('Token:', token);

  if (!token) {
    throw new Error('No token found');
  }

  const requests = await fetch('http://localhost:3333/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!requests.ok) {
    const errorData = await requests.json();
    throw new Error(errorData.message || 'Network response was not ok');
  }

  return await requests.json();
}