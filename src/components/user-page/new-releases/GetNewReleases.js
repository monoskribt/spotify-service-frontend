import React, { useState } from "react";
import { getReleases } from "../spotify-action/SpotifyAction";
import "./GetNewReleases.css";

const GetNewReleases = () => {
  const [releases, setReleases] = useState([]);
  const [releaseOfDay, setReleaseOfDay] = useState(null);
  const [error, setError] = useState(null);

  const handleGetReleases = async () => {
    if (!releaseOfDay && releaseOfDay !== 0) {
      setError("Please enter a valid release day");
      return;
    }

    try {
      const result = await getReleases(releaseOfDay); 
      setReleases(result);
      setError(null); 
    } catch (error) {
      console.error("Error getting releases:", error);
      setError("Failed to get releases");
    }
  };

  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setReleaseOfDay(value);
      setError(null);
    } else {
      setError("Release day cannot be less than 0");
    }
  };

  return (
    <div className="releases-container">
      <h1 className="releases-title">Spotify Releases</h1>

      <input
        type="number"
        className="releases-input"
        value={releaseOfDay || ""}
        onChange={handleInputChange}
        placeholder="Enter release day"
        min="0"
      />
      <button className="releases-button" onClick={handleGetReleases}>
        Load Releases
      </button>

      {error && <p className="releases-error">{error}</p>}

      {releases.length > 0 && (
        <ul className="releases-list">
          {releases.map((release) => (
            <li className="releases-item" key={release.id}>
              <strong>{release.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetNewReleases;
