import React, { useState } from "react";
import "./MyPlaylists.css";

const MyPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);

  const fetchPlaylists = () => {
    setError(null);

    fetch("/api/spotify/my-playlists")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch playlists");
        }
        return res.json();
      })
      .then((result) => {
        setPlaylists(result);
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
        setError("Failed to fetch playlists");
      });
  };

  return (
    <div className="playlists-container">
      <h1 className="playlists-title">My Playlists</h1>

      <button className="playlists-button" onClick={fetchPlaylists}>
        Load My Playlists
      </button>

      {error && <p className="playlists-error">{error}</p>}

      {playlists.length > 0 && (
        <ul className="playlists-list">
          {playlists.map((playlist) => (
            <li className="playlists-item" key={playlist.id}>
              <strong>{playlist.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyPlaylists;
