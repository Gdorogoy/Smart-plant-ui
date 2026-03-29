import { axiosSendRequest } from "./axios.calls";

const AUTH_URL = "http://localhost:3002/auth"


export const login = async (data) => {
    const response = await axiosSendRequest(
        "POST",
        `${AUTH_URL}/login`,
        data,
        null,
        null
    );
    return response;
}

export const register = async (data) => {
    const response = await axiosSendRequest(
        "POST",
        `${AUTH_URL}/register`,
        data,
        null,
        null
    );
    return response;
}

// ! DEPRACTED
// export const refresh = async (refreshToken) => {
//     const response = await axiosSendRequest(
//         "POST",
//         `${AUTH_URL}/refresh`,
//         null,
//         null,
//         refreshToken
//     );
//     return response;
// }

export const logout = async (data) => {
    const response = await axiosSendRequest(
        "POST",
        `${AUTH_URL}/logout`,
        null,
        null,
        null
    );
    return response;
}