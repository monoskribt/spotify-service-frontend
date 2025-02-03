import React, { useEffect, useState } from "react";
import {
    getPlaylists,
    saveReleasesToPlaylist
} from "../spotify-action/SpotifyAction"
import "./SaveNewReleases.css";

const SaveNewReleases = () => {
    const [playlists, setPlaylists] = useState([]); 
    const [selectedPlaylist, setSelectedPlaylist] = useState(null); 
    const [releaseOfDay, setReleaseOfDay] = useState("");
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const loadPlaylists = async () => {
            try {
                const result = await getPlaylists();
                setPlaylists(result);
            } catch (error) {
                console.error("Error getting playlists:", error);
            }
        };
        loadPlaylists();
    }, []);

    const handleSaveReleases = async() => {
        if (!selectedPlaylist) {
            setMessage("Please select a playlist.");
            return;
        }
        
        setMessage(null);

        try {
            const result = await saveReleasesToPlaylist(selectedPlaylist, releaseOfDay);
            setMessage(result);
        } catch (error) {
            console.error("Error getting playlists:", error);
            setMessage("Something went wrong: " + error.message);
        }
    }

    const handlePlaylistChange = (e) => {
        setSelectedPlaylist(String(e.target.value));
    };
    
    const handleInputChange = (e) => {
      setReleaseOfDay(Number(e.target.value)); 
    };
  


    return (
        <div className="save-releases-container">
          <h1 className="save-releases-title">Save Releases to Playlist</h1>
          <div className="save-releases-playlists">
            <select
              className="save-releases-select"
              value={selectedPlaylist || ""}
              onChange={handlePlaylistChange}
            >
              <option value=""> **Select Playlist** </option>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>
    
          <div className="save-releases-input">
            <input
              type="number"
              className="save-releases-input-field"
              value={releaseOfDay || ""}
              onChange={handleInputChange}
              placeholder="Enter release day"
              min="0"
            />
          </div>
    
          <button className="save-releases-button" onClick={handleSaveReleases}>
            Save
          </button>
    
          {message && <p className="save-releases-message">{message}</p>}
        </div>
      );
}

export default SaveNewReleases;