"use client";

import { useEffect, useState } from "react";
import { FaHeadphonesAlt } from 'react-icons/fa';

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
      <div className="flex items-center gap-3 bg-dark-100/50 p-4 rounded-xl w-full max-w-sm shadow-sm">
      <div className="bg-dark-200 p-2 rounded-full">
        <FaHeadphonesAlt size={24} className="text-primary" />
      </div>
      <div className="flex flex-col">
        <p className="text-sm text-primary font-semibold">
          Nothing is playing right now
        </p>
        <p className="text-xs text-gray-500">
          Enjoy the silence 🎶
        </p>
      </div>
    </div>
    );

  return (
    <div className="flex items-center space-x-4 bg-transparent p-4 rounded w-full max-w-sm cursor-pointer" onClick={() => window.open(track.songUrl, "_blank")}>
      <img
        src={track.albumImageUrl}
        alt="Album Art"
        className="w-14 h-14 rounded-lg"
      />
      <div className="overflow-hidden">
        <p className="text-[15px] text-[#111827] font-semibold truncate">
          {track.title}
        </p>
        <p className="text-[13px] text-[#6B7280] truncate">{track.artist}</p>
      </div>
    </div>
  );
}
