import React, { useState } from "react";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);

  const fetchArtists = () => {
    setError(null); 

    fetch("/api/spotify/artist")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch artists");
        }
        return res.json();
      })
      .then((result) => {
        setArtists(result); 
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
        setError("Failed to fetch artists."); 
      });
  };

  return (
    <div>
      <h1>Spotify Artists</h1>

      <button onClick={fetchArtists}>Load Artists</button>

      {error && <p>{error}</p>}

      {artists.length > 0 && (
        <ul>
          {artists.map((artist) => (
            <li key={artist.id}>
              <strong>{artist.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Artists;
