import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyArtists from "../user-page/my-artists/MyArtists";
import MyPlaylists from "../user-page/my-playlists/MyPlaylists";
import GetNewReleases from "../user-page/new-releases/GetNewReleases";
import SaveNewReleases from "../user-page/new-releases/SaveNewReleases";
import DeleteAllTracksFromChosenPlaylist from "../user-page/tracks/DeleteAllTracks";
import "./UserPage.css";
import userLogo from "./public/user-logo-1.jpg";
import { useHandleAuth } from "../authentication/HandleAuthenticaion";
import { getUserInfo } from "./user-managment/UserAction";
import Modal from "./modal/Modal";
import logoArtist from "./public/logo-artist.png";
import logoPlaylist from "./public/logo-playlist.png";
import logoRelease from "./public/logo-release.png";


const UserPage = () => {
    const { logout } = useHandleAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [selectedAction, setSelectedAction] = useState('get');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const cards = [
        { title: 'My Artists', content: 'artists', image: logoArtist },
        { title: 'My Playlists', content: 'playlists', image: logoPlaylist },
        { title: 'Releases', content: 'releases', image: logoRelease },
    ];


    useEffect(() => {
        const callUserInfo = async () => {
            try {
                const userInfo = await getUserInfo();
                setUser(userInfo);
            } catch (error) {
                console.log("Happened is somethins error: " + error);
            }
        };

        callUserInfo();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    const handleSelecredAction = (action) => {
        setSelectedAction(action);
    }

    const handleShowModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setModalContent(null);
    }

    return (
        <>
            <div className="container user-page-container">
                <div className="user-page-dashboard">
                    <h1>Dashboard</h1>
                    <div className="row user-page-dashboard-info-user">
                        <div className="col-md-6 user-page-dashboard-image-username">
                            <div className="user-page-dashboard-user-image">
                                <img src={userLogo} alt="User Logo" />
                            </div>
                            <div className="px-2"></div>
                            <div>
                                {user && (
                                    <div className="user-page-dashboard-username">
                                        <p>{user.nickname}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-md-4 user-page-dashboard-button-family align-items-end">
                            <div className="user-page-dashboard-log-off">
                                <button onClick={handleLogout}>LOG OUT</button>
                            </div>
                            <div className="py-1"></div>
                            <div className="user-page-dashboard-settings">
                                <button>SETTINGS</button>
                            </div>
                        </div>
                    </div>

                    <div className="py-1"></div>
                    <div className="divider"> </div>
                    <div className="py-1"></div>

                    <div className="row spotify-action-buttons-container justify-content-center">
                        <div className="col-12">
                            <div className="btn-container d-flex flex-wrap justify-content-center">
                                <button
                                    className="custom-action-button m-1"
                                    onClick={() => handleSelecredAction('get')}>
                                    Get
                                </button>
                                <button
                                    className="custom-action-button m-1"
                                    onClick={() => handleSelecredAction('save')}>
                                    Save
                                </button>
                                <button
                                    className="custom-action-button m-1"
                                    onClick={() => handleSelecredAction('delete')}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="py-1"></div>

                    {selectedAction === 'get' && (
                        <div className="row action-cards col-md-12 d-flex flex-direction-column">
                        {cards.map((card, index) => (
                            <div key={index} className={`col-md-4`}>
                                <div className={`card ${index % 2 === 0 ? 'card-even' : 'card-odd'}`}>
                                    <div className="card-body d-flex flex-column justify-content-between align-items-center">
                                        <h5 className="card-title">{card.title}</h5>
                                        <img
                                            src={card.image}
                                            alt={card.title}
                                            className="img-fluid"  
                                        />
                                        <button
                                            onClick={() => handleShowModal(card.content)}
                                            className={`custom-action-button mt-auto ${index % 2 === 0 ? 'btn-custom-even' : 'btn-custom-odd'}`}>
                                            Obtain
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>                    
                    )}





                    {selectedAction === 'save' && (
                        <div className="row action-card justify-content-center">
                            <div className="col-12 mb-3">
                                <SaveNewReleases />
                            </div>
                        </div>
                    )}


                    {selectedAction === 'delete' && (
                        <div className="row action-card justify-content-center">
                            <div className="col-12 mb-3">
                                <DeleteAllTracksFromChosenPlaylist />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Modal show={showModal} onClose={handleCloseModal}>
                {modalContent === 'artists' && <MyArtists />}
                {modalContent === 'playlists' && <MyPlaylists />}
                {modalContent === 'releases' && <GetNewReleases />}
            </Modal>
        </>
    );
}

export default UserPage;
