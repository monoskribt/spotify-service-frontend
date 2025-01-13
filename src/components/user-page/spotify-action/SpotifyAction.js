export const getArtists = async () => {
    const response = await fetch("/api/spotify/artist");

    if(!response.ok) {
        throw new Error("Failed to get artists");
    }
    return await response.json();
}

export const getPlaylists = async () => {
    const response = await fetch("/api/spotify/my-playlists");
    if (!response.ok) {
      throw new Error("Failed to get playlists");
    }
    return await response.json();
};

export const getReleases = async (releaseOfDay) => {
    const response = await fetch(`/api/spotify/release?releaseOfDay=${releaseOfDay}`);
    if (!response.ok) {
      throw new Error("Failed to get releases");
    }
    return await response.json();
  };  
  
export const saveReleasesToPlaylist = async (playlistId, releaseOfDay) => {
    const response = await fetch(
      `/api/spotify/save-releases?playlistId=${playlistId}&releaseOfDay=${releaseOfDay}`,
      { method: "POST" }
    );
    if (!response.ok) {
      throw new Error("Failed to save releases to playlist");
    }
    return await response.text();
};
  
export const deleteAllFromPlaylist = async (playlistId) => {
    const response = await fetch(
      `/api/spotify/delete-all-from-playlist?playlistId=${playlistId}`,
      { method: "DELETE" }
    );
    if (!response.ok) {
      throw new Error("Failed to delete items from playlist");
    }
    return await response.text();
};
  