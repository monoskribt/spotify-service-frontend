export const getUserInfo = async () => {
    const response = await fetch("/api/user/info");

    if(!response.ok) {
        throw new Error("Failed to get artists");
    }
    const userInfo = await response.json(); 
    return userInfo;
}