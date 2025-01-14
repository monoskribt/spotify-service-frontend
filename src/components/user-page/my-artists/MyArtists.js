import React, { useState } from "react";
import "./MyArtists.css";

const MyArtists = () => {
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
    <div className="artists-container">
      <h1 className="artists-title">My Artists</h1>

      <button className="artists-button" onClick={fetchArtists}>
        Load Artists
      </button>

      {error && <p className="artists-error">{error}</p>}

      {artists.length > 0 && (
        <ul className="artists-list">
          {artists.map((artist) => (
            <li className="artists-item" key={artist.id}>
              <strong>{artist.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyArtists;
