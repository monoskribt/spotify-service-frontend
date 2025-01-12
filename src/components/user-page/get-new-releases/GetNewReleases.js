import React, { useState } from "react";
import "./GetNewReleases.css";

const GetNewReleases = () => {
  const [releases, setReleases] = useState([]);
  const [releaseOfDay, setReleaseOfDay] = useState(null);
  const [error, setError] = useState(null);

  const fetchReleases = () => {
    setError(null);

    if (releaseOfDay < 0) {
      setError("Release day cannot be less than 0");
      return;
    }

    fetch(`/api/spotify/release?releaseOfDay=${releaseOfDay}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch releases");
        }
        return res.json();
      })
      .then((result) => {
        setReleases(result);
      })
      .catch((error) => {
        console.error("Error fetching releases:", error);
        setError("Failed to fetch releases");
      });
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
      <button className="releases-button" onClick={fetchReleases}>
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
