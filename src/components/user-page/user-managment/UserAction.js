export const getUserInfo = async () => {
    const response = await fetch("/api/user/info");

    if(!response.ok) {
        throw new Error("Failed to get artists");
    }
    const userInfo = await response.json(); 
    return userInfo;
}


export const manageSubscribeStatus = async(subscribeState) => {
    const response = await fetch("/api/user/subscribe?subscribeStatus=" + subscribeState.toUpperCase(), {
        method: "PUT",
    });
    
    if (!response.ok) {
        throw new Error("Something is wrong. Update your page and try again!");
    }

    return await response.json();
};