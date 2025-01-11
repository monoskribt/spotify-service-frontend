import React, { useState } from "react";

const Release = () => {
  const [releases, setReleases] = useState([]);
  const [releaseOfDay, setReleaseOfDay] = useState(null);
  const [error, setError] = useState(null);

  const fetchReleases = () => {
    setError(null);

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

  return (
    <div>
      <h1>Spotify Releases</h1>

      <input
        type="number"
        value={releaseOfDay || ""}
        onChange={(e) => setReleaseOfDay(e.target.value)}
        placeholder="Enter release day"
      />
      <button onClick={fetchReleases}>Load Releases</button>

      {error && <p>{error}</p>}

      {releases.length > 0 && (
        <ul>
          {releases.map((release) => (
            <li key={release.id}>
              <strong>{release.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Release;
