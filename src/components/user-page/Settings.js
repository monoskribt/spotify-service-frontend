import { useState } from "react";
import { manageSubscribeStatus } from "../../service/UserAction";
import "./Settings.css"

const Settings = () => {
    const [subscribeState, setSubscribeState] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);


    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            await manageSubscribeStatus(subscribeState);
            setMessage("Subscription status updated successfully");
        } catch (error) {
            console.error("Error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="settings-container">
            <h5>Do you want to obtain information about new releases on telegram?</h5>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="SUBSCRIBE"
                        checked={subscribeState === "Yes"}
                        onChange={(e) => setSubscribeState(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Yes
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        value="UNSUBSCRIBE"
                        checked={subscribeState === "No"}
                        onChange={(e) => setSubscribeState(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        No
                    </label>
                </div>
            </div>
            <div className="py-1"></div>
            <div className="save-subscribe-button-container">
                <button className="save-subscribe-button" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
            <div className="py-1"></div>
            <div className="answer-container-message">
                {message && <p style={{ color: "green" }}>{message}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>

    );
}

export default Settings;
