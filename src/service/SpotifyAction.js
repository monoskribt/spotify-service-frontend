const getAuthHeaders = () => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    throw new Error("Access token is missing. Please log in.");
  }

  return {
    Authorization: `access_token ${accessToken}`,
  };
};


export const getArtists = async () => {
  const url = `https://spotify.algorithm-challenge.com/api/spotify/artists`;

  const response = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(), 
    credentials: "include", 
  });

  if (response.status === 401) {
    throw new Error("Unauthorized: Access token is invalid or expired.");
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch artists: ${response.statusText}`);
  }

  const newToken = response.headers.get("x-new-access-token");
  if (newToken) {
    localStorage.setItem("access_token", newToken); 
  }

  return await response.json();
};


export const getPlaylists = async () => {
  const url = `https://spotify.algorithm-challenge.com/api/spotify/playlists`;

  const response = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(), 
  });

  if (!response.ok) {
    throw new Error("Failed to get playlists");
  }

  return await response.json();
};


export const getReleases = async (releaseOfDay) => {

  const response = await fetch(`https://spotify.algorithm-challenge.com/api/spotify/releases?releaseOfDay=${releaseOfDay}`, {
    method: "GET",
    headers: getAuthHeaders(), 
    credentials: "include", 
  });

  if (!response.ok) {
    throw new Error("Failed to get releases");
  }

  return await response.json();
};


export const saveReleasesToPlaylist = async (playlistId, releaseOfDay) => {
  const url = `https://spotify.algorithm-challenge.com/api/spotify/playlists/${playlistId}/releases?releaseOfDay=${releaseOfDay}`;
  console.log("Request URL:", url); 
  console.log("Headers:", getAuthHeaders()); 

  const response = await fetch(url, {
      method: "POST",
      headers: getAuthHeaders(),
      credentials: "include",
  });

  const statusCode = await response.json();

  if (statusCode === 204) {
      return "There are no new releases to save";
  }
  if (statusCode === 200) {
      return "Releases successfully added to playlist";
  }
};



export const deleteAllFromPlaylist = async (playlistId) => {
  const response = await fetch(`https://spotify.algorithm-challenge.com/api/spotify/playlists/${playlistId}/items`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const statusCode = await response.json();

  if (statusCode === 500) {
    return "Failed to delete items from playlist. Try again later";
  }
  if (statusCode === 204) {
    return "Playlist is already empty";
  }
  if (statusCode === 200) {
    return "Tracks successfully removed from playlist";
  }
};

