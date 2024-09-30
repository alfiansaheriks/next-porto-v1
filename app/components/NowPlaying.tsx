"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Playlist {
  name: string;
  images: { url: string }[];
  external_urls: { spotify: string };
}

const Playlist = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const fetchPlaylists = async () => {
    try {
      const response = await fetch('/api/spotify', {
        cache: 'no-store',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch playlists');
      }
      const data = await response.json();
      setPlaylists(data.items || []);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  useEffect(() => {
    fetchPlaylists(); // Initial fetch
  }, []);

  if (!playlists.length) {
    return <p className="text-center text-gray-500">No playlists available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {playlists.map((playlist) => (
        <a
          key={playlist.name}
          href={playlist.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center space-y-2 p-4 bg-transparent rounded-lg"
        >
          {playlist.images[0] && (
            <Image
              src={playlist.images[0].url}
              alt={playlist.name}
              width={50}
              height={50}
              className="rounded-lg"
            />
          )}
          <p className="text-black font-semibold">{playlist.name}</p>
        </a>
      ))}
    </div>
  );
};

export default Playlist;
