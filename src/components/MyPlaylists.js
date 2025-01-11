import React, { useState } from "react";

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
    <div>
      <h1>My Playlists</h1>

      <button onClick={fetchPlaylists}>Load My Playlists</button>

      {error && <p>{error}</p>}

      {playlists.length > 0 && (
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <strong>{playlist.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyPlaylists;
