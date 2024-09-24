import { NextResponse } from 'next/server';
import axios from 'axios';
import querystring from 'querystring';

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const token = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  try {
    const response = await axios.post(
      TOKEN_ENDPOINT,
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token,
      }),
      {
        headers: {
          Authorization: `Basic ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    // console.log('Access token fetched successfully');
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', (error as any).response?.data || (error as any).message);
    throw new Error('Failed to get access token');
  }
};

const getNowPlaying = async (access_token: string) => {
  try {
    const response = await axios.get(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    // console.log('Now Playing data fetched successfully');
    return response;
  } catch (error) {
    console.error('Error fetching Now Playing data:', (error as any).response?.data || (error as any).message);
    throw new Error('Failed to get Now Playing data');
  }
};

export async function GET() {
  try {
    const access_token = await getAccessToken();
    const response = await getNowPlaying(access_token);

    if (response.status === 204 || response.status > 400) {
      // console.log('No song is currently playing or error occurred');
      return NextResponse.json({ isPlaying: false }, { status: 200 });
    }

    const song = response.data.item;
    const isPlaying = response.data.is_playing;
    const title = song.name;
    const artist = song.artists.map((artist: any) => artist.name).join(', ');
    const album = song.album.name;
    const albumImageUrl = song.album.images[0].url;
    const songUrl = song.external_urls.spotify;

    // console.log('Song data:', { title, artist, album });

    return NextResponse.json(
      {
        isPlaying,
        title,
        artist,
        album,
        albumImageUrl,
        songUrl,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=180, stale-while-revalidate=9',
        },
      }
    );
  } catch (error) {
    console.error('Error:', (error as Error).message);
    return NextResponse.json({ error: 'Failed to fetch data from Spotify' }, { status: 500 });
  }
}