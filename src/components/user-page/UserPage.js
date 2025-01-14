import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import MyArtists from "../user-page/my-artists/MyArtists";
import MyPlaylists from "../user-page/my-playlists/MyPlaylists";
import GetNewReleases from "../user-page/new-releases/GetNewReleases";
import SaveNewReleases from "../user-page/new-releases/SaveNewReleases";
import DeleteAllTracksFromChosenPlaylist from "../user-page/tracks/DeleteAllTracks";
import "./UserPage.css";
import userLogo from "./public/user-logo-1.jpg";
import { useHandleAuth } from "../authentication/HandleAuthenticaion";

const UserPage = () => {
    const { logout } = useHandleAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return (
        <>
        <div className="user-page-container">
            <div className="user-page-dashboard">
                <h1>Dashboard</h1>
                <div className="user-page-dashboard-info-user">
                    <div className="user-page-dashboard-user-image">
                        <img src={userLogo} alt="User Logo"/>
                    </div>
                    <div className="user-page-dashboard-log-off">
                        <button onClick={handleLogout}>Log out</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default UserPage;
