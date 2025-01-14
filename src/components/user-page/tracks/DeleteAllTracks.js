import React, { useEffect, useState } from "react";
import {
    getPlaylists,
    deleteAllFromPlaylist
} from "../spotify-action/SpotifyAction";
import "./DeleteAllTracks.css";

const DeleteAllTracksFromChosenPlaylist = () => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
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

    const handleDeleteTracksFromChosenPlaylist = async () => {
        if (!selectedPlaylist) {
            setMessage("Please select a playlist.");
            return;
        }

        setMessage(null);

        try {
            const result = await deleteAllFromPlaylist(selectedPlaylist);
            setMessage(result);
        } catch (error) {
            console.error("Error deleting tracks:", error);
            setMessage("Something went wrong: " + error.message);
        }
    };

    const handlePlaylistChange = (e) => {
        setSelectedPlaylist(e.target.value);
    };

    return (
        <div className="delete-tracks-container">
            <h1 className="delete-tracks-title">Delete All Tracks from Playlist</h1>
            <div className="delete-tracks-playlists">
                <select
                    className="delete-tracks-select"
                    value={selectedPlaylist || ""}
                    onChange={handlePlaylistChange}
                >
                    <option value="">-- Select Playlist --</option>
                    {playlists.map((playlist) => (
                        <option key={playlist.id} value={playlist.id}>
                            {playlist.name}
                        </option>
                    ))}
                </select>
            </div>

            <button
                className="delete-tracks-button"
                onClick={handleDeleteTracksFromChosenPlaylist}
            >
                Delete All Tracks
            </button>

            {message && <p className="delete-tracks-message">{message}</p>}
        </div>
    );
};

export default DeleteAllTracksFromChosenPlaylist;
