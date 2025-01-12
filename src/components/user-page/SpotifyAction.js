import React, { useState, useEffect } from "react";

const SpotifyActions = () => {
  const [playlists, setPlaylists] = useState([]); // Список плейлистов
  const [selectedPlaylist, setSelectedPlaylist] = useState(null); // Выбранный плейлист
  const [releaseOfDay, setReleaseOfDay] = useState("");
  const [message, setMessage] = useState(null);

  
  useEffect(() => {
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
      });
  }, []);

  
  const saveReleasesToPlaylist = () => {
    if (!selectedPlaylist) {
      setMessage("Please select a playlist.");
      return;
    }

    setMessage(null);

    fetch(`/api/spotify/save-releases?playlistId=${selectedPlaylist}&releaseOfDay=${releaseOfDay}`, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to save releases to playlist");
        }
        return res.text();
      })
      .then((result) => {
        setMessage(result); 
      })
      .catch((error) => {
        console.error("Error saving releases to playlist:", error);
        setMessage("Something went wrong: " + error.message);
      });
  };

  
  const deleteAllFromPlaylist = () => {
    if (!selectedPlaylist) {
      setMessage("Please select a playlist.");
      return;
    }

    setMessage(null);

    fetch(`/api/spotify/delete-all-from-playlist?playlistId=${selectedPlaylist}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete items from playlist");
        }
        return res.text();
      })
      .then((result) => {
        setMessage(result); 
      })
      .catch((error) => {
        console.error("Error deleting items from playlist:", error);
        setMessage("Something went wrong: " + error.message);
      });
  };

  return (
    <div>
      <h1>Spotify Playlist Actions</h1>

      <div>
        <h2>Select a Playlist</h2>
        {playlists.length > 0 ? (
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                <label>
                  <input
                    type="radio"
                    name="playlist"
                    value={playlist.id}
                    onChange={() => setSelectedPlaylist(playlist.id)}
                  />
                  {playlist.name}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading playlists...</p>
        )}
      </div>

      <div>
        <label>
          Release of Day (for saving releases):
          <input
            type="number"
            value={releaseOfDay}
            onChange={(e) => setReleaseOfDay(e.target.value)}
            placeholder="Enter release day"
          />
        </label>
      </div>

      <button onClick={saveReleasesToPlaylist}>Save Releases to Playlist</button>
      <button onClick={deleteAllFromPlaylist}>Delete All Items from Playlist</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default SpotifyActions;
