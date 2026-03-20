import { axiosSendRequest } from "./axios.calls"

const DASHBOARD_URL = "http://localhost:3010/dashboard"


export const getDashboardInfo = async (userId, token) => {
    const res = await axiosSendRequest(
        "GET",
        `${DASHBOARD_URL}/${userId}`,
        null,
        token
    )
    return res;
}

