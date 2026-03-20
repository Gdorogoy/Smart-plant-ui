
const USER_URL = "http://localhost:3001/user"

export const getUserInfo = async (userId, token) => {
    const response = await axiosSendRequest(
        "GET",
        `${USER_URL}/get/${userId}`,
        null,
        token,

    );

    return response;

}