import React, { useState, useEffect } from "react";
import { getReleases } from "../../../service/SpotifyAction";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import "./GetNewReleases.css";

const GetNewReleases = () => {
  const [releases, setReleases] = useState([]);
  const [releaseOfDay, setReleaseOfDay] = useState(null);
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    console.log("Progress updated:", progress, "Total:", total);
  }, [progress, total]);

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

  const handleGetReleases = async () => {
    if (releaseOfDay === null || releaseOfDay < 0) {
      setError("Please enter a valid release day");
      return;
    }

    setProgress(0);
    setTotal(0);
    setReleases([]);
    setError(null);

    try {
      const newReleases = await getReleases(releaseOfDay);
      setReleases(newReleases);
    } catch (error) {
      console.error("Error getting releases:", error);
      setError(error.message || "Failed to get releases");
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
      <h1>Spotify Releases</h1>

      <div className="py-2"></div>

      <div className="releases-tools">
        <input
          type="number"
          className="releases-input"
          value={releaseOfDay || ""}
          onChange={handleInputChange}
          placeholder="Enter release day"
          min="0"
        />
        <button className="releases-button" onClick={handleGetReleases}>
          Load
        </button>
      </div>

      <div className="py-2"></div>

      {error && <p className="releases-error">{error}</p>}

      {total > 0 && (
        <p style={{ color: "white" }}>
          Processed: {progress} / {total}
        </p>
      )}

      {releases.length > 0 ? (
        <ul className="releases-list">
          {releases.map((release) => (
            <li className="releases-item" key={release.id}>
              <strong>{release.name}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p className="releases-no-results">No releases found</p>
      )}
    </div>
  );
};

export default GetNewReleases;
