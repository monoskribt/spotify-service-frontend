import React, { useState, useEffect } from "react";
import { getPlaylists } from "../spotify-action/SpotifyAction";
import "./MyPlaylists.css";

const MyPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await getPlaylists();
        setPlaylists(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);


  if (loading) return <p className="loading-info">Loading playlists...</p>;
  if (error) return <p>Error: {error}</p>;



  return (
    <div className="playlist-container">
      <h1>My Playlists</h1>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyPlaylists;
