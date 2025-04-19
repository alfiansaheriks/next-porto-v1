"use client";

import { useEffect, useState } from "react";

export default function NowPlaying() {
  interface Track {
    isPlaying: boolean;
    albumImageUrl: string;
    title: string;
    artist: string;
    songUrl: string;
  }

  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch("/api/spotify");
        const data = await res.json();
        setTrack(data);
      } catch (err) {
        console.error("Failed to fetch now playing", err);
      }
    };

    fetchNowPlaying();

    // Optional: auto refresh setiap 30 detik
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!track?.isPlaying)
    return (
      <div className="flex items-center space-x-4 bg-transparent p-4 rounded w-full max-w-sm">
        <p className="text-sm text-gray-400 font-semibold">
          Nothing is playing right now
        </p>
      </div>
    );

  return (
    <div className="flex items-center space-x-4 bg-transparent p-4 rounded w-full max-w-sm">
      <img
        src={track.albumImageUrl}
        alt="Album Art"
        className="w-14 h-14 rounded-lg"
      />
      <div className="overflow-hidden">
        <p className="text-sm text-gray-400 font-semibold truncate">
          {track.title}
        </p>
        <p className="text-xs text-gray-400 truncate">{track.artist}</p>
        <a
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:underline"
        >
          Listen now!
        </a>
      </div>
    </div>
  );
}
