import React from "react";
import Header from "../header/Header";
import MyArtists from "./my-artists/MyArtists";
import MyPlaylists from "./my-playlists/MyPlaylists";
import GetNewReleases from "./get-new-releases/GetNewReleases";
import SpotifyActions from "./SpotifyAction";

const UserPage = () => {
    return (
        <>
        <Header />
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4 d-flex justify-content-center">
                    <MyArtists />
                </div>
                <div className="col-md-4 d-flex justify-content-center">
                    <MyPlaylists />
                </div>
                <div className="col-md-4 d-flex justify-content-center">
                    <GetNewReleases />
                </div>
                <div className="col-md-10 d-flex justify-content-center">
                    <SpotifyActions />
                </div>
            </div>
        </div>
        </>
    )
}

export default UserPage;