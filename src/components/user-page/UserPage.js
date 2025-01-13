import React from "react";
import Header from "../header/Header";
import MyArtists from "../user-page/my-artists/MyArtists"
import MyPlaylists from "../user-page/my-playlists/MyPlaylists"
import GetNewReleases from "../user-page/new-releases/GetNewReleases"
import SaveNewReleases from "../user-page/new-releases/SaveNewReleases";
import DeleteAllTracksFromChosenPlaylist from "../user-page/tracks/DeleteAllTracks";
import "./UserPage.css";

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
                <div className="col-md-5 d-flex justify-content-center">
                    <SaveNewReleases />
                </div>
                <div className="col-md-5 d-flex justify-content-center">
                    <DeleteAllTracksFromChosenPlaylist />
                </div>
            </div>
        </div>
        </>
    )
}

export default UserPage;