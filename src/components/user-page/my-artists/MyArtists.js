import React, { useState, useEffect } from "react";
import { getArtists } from "../spotify-action/SpotifyAction"; 
import "./MyArtists.css"

const MyArtist = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const data = await getArtists();
                setArtists(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    if (loading) return <p className="loading-info">Loading artists...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="artist-container">
            <h1>My Artists</h1>
            <ul>
                {artists.map((artist) => (
                    <li key={artist.id}>{artist.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default MyArtist;
