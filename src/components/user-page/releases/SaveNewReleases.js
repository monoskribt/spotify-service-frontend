import React, { useEffect, useState } from "react";
import {
  getPlaylists,
  saveReleasesToPlaylist
} from "../../../service/SpotifyAction"
import "./SaveNewReleases.css";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const SaveNewReleases = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [releaseOfDay, setReleaseOfDay] = useState("");
  const [message, setMessage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [stompClient, setStompClient] = useState(null);

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


  useEffect(() => {
    const socket = new SockJS("https://spotify.algorithm-challenge.com/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("Connected to WebSocket");
        client.subscribe("/topic/progress", (message) => {
          try {
            const { processed, total } = JSON.parse(message.body);
            setProgress(processed);
            setTotal(total);
          } catch (error) {
            console.error("Error parsing progress message:", error);
          }
        });
      },
      onDisconnect: () => console.log("Disconnected from WebSocket"),
      onStompError: (frame) => console.error("Broker error:", frame),
    });

    client.activate();
    setStompClient(client);

    return () => {
      if (client) client.deactivate();
    };
  }, []);

  const handleSaveReleases = async () => {
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

      {error && <p className="releases-error">{error}</p>}

      {total > 0 && (
        <p style={{ color: "white" }}>
          Processed: {progress} / {total}
        </p>
      )}
    </div>
  );
}

export default SaveNewReleases;