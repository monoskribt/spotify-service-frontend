export const login = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/login", {
            method: "GET",
        });
        
        if (!response.ok) {
            throw new Error("Failed to get login URL");
        }
        
        const loginUrl = await response.text();
        console.log("Redirecting to:", loginUrl);
        window.location.href = loginUrl; 
    } catch (error) {
        console.error("Error during login:", error);
        alert("Failed to start Spotify login process.");
    }
};



export const getUserInfo = async () => {
    const response = await fetch("http://localhost:8080/api/user/info", {
        method: "GET",
        credentials: "include",
    });

    if(!response.ok) {
        throw new Error("Failed to get artists");
    }
    const userInfo = await response.json(); 
    return userInfo;
}


export const manageSubscribeStatus = async(subscribeState) => {
    const response = await fetch("http://localhost:8080/api/user/subscribe?subscribeStatus=" + subscribeState.toUpperCase(), {
        method: "PUT",
        credentials: "include",
    });
    
    if (!response.ok) {
        throw new Error("Something is wrong. Update your page and try again!");
    }

    return await response.text();
};