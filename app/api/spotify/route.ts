import { NextResponse } from 'next/server';
import axios from 'axios';
import querystring from 'querystring';

const {
  SPOTIFY_CLIENT_ID: clientId,
  SPOTIFY_CLIENT_SECRET: clientSecret,
  SPOTIFY_REFRESH_TOKEN: refreshToken,
} = process.env;

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const PLAYLIST_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';
const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

// Function to get access token
const getAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.post(
      TOKEN_ENDPOINT,
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      {
        headers: {
          Authorization: `Basic ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data.access_token;
  } catch (error: any) {
    console.error('Error fetching access token:', error.response?.data || error.message);
    throw new Error('Failed to get access token');
  }
};

// Function to fetch user's playlists
const getUserPlaylists = async (accessToken: string) => {
  try {
    const response = await axios.get(PLAYLIST_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching playlists:', error.response?.data || error.message);
    throw new Error('Failed to get playlists');
  }
};

// GET request handler to get playlists
export async function GET() {
  try {
    const accessToken = await getAccessToken();
    const playlists = await getUserPlaylists(accessToken);

    return NextResponse.json(playlists, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
        Pragma: 'no-cache',
      },
    });
  } catch (error: any) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: 'Failed to fetch playlists from Spotify' }, { status: 500 });
  }
}
