"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface NowPlayingSong {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

const NowPlaying = () => {
  const [song, setSong] = useState<NowPlayingSong | null>(null);
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleString());

  const fetchNowPlaying = async () => {
    const response = await fetch('http://localhost:3000/api/spotify', {
      cache: 'no-store',
    });
    const data = await response.json();
    setSong(data);
  };

  useEffect(() => {
    fetchNowPlaying(); // Initial fetch
  }, []);

  if (!song?.isPlaying) {
    return <p className="text-center text-gray-500">No song is currently playing.</p>;
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-transparent">
      <div className="flex items-center space-x-4">
        <Image
          width={64}
          height={64}
          src={song.albumImageUrl}
          alt={song.album}
          className="w-16 h-16 rounded-md"
        />
        <div>
          <p className="text-black font-semibold">{song.title}</p>
          <p className="text-gray-400">{song.artist}</p>
        </div>
      </div>
      <p className="text-gray-500">{currentTime}</p>
    </div>
  );
};

export default NowPlaying;