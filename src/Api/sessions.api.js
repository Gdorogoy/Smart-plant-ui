import { axiosSendRequest } from "./axios.calls"

const SESSIONS_URL = "http://localhost:3000/sessions";


export const getAllSessions = async (userId, token) => {
    const response = await axiosSendRequest(
        "GET",
        `${SESSIONS_URL}/${userId}`,
        null,
        token,

    );
    return response;
}