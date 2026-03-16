import { axiosSendRequest } from "./axios.calls"

const STATISTICS_URL = "http://localhost:3003/statistics";

export const getUserStatistics = async (userId, token, refreshToken) => {
    const response = await axiosSendRequest(
        "GET",
        `${STATISTICS_URL}/${userId}`,
        null,
        token,
        refreshToken
    );

    return response;

}