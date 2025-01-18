export const getArtists = async () => {
    const response = await fetch("/api/spotify/artists");

    if(!response.ok) {
        throw new Error("Failed to get artists");
    }
    return await response.json();
}

export const getPlaylists = async () => {
    const response = await fetch("/api/spotify/playlists");
    if (!response.ok) {
      throw new Error("Failed to get playlists");
    }
    return await response.json();
};

export const getReleases = async (releaseOfDay) => {
    const response = await fetch(`/api/spotify/releases?releaseOfDay=${releaseOfDay}`);

    if (!response.ok) {
      throw new Error("Failed to get releases");
    }

    return await response.json();
  };  
  
export const saveReleasesToPlaylist = async (playlistId, releaseOfDay) => {
    const response = await fetch(
      `/api/spotify/playlists/${playlistId}/releases?releaseOfDay=${releaseOfDay}`, 
      { method: "POST" } 
    );
    if (!response.ok) {
      throw new Error("Failed to save releases to playlist");
    }
    return await response.text();
};
  
export const deleteAllFromPlaylist = async (playlistId) => {
    const response = await fetch(
      `/api/spotify/playlists/${playlistId}/items`,
      { method: "DELETE" }
    );
    if (!response.ok) {
      throw new Error("Failed to delete items from playlist");
    }
    return await response.text();
};
  