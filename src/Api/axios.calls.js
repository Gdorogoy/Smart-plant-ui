import axios from "axios";

const REFRESH_URL = "http://localhost:3002/auth/refresh";


export const axiosSendRequest = async (method, url, data, token) => {
    try {
        const res = await axios({
            method,
            url,
            data,
            headers: {
                Authorization: token
            },
            withCredentials: true
        });

        return res.data;
    } catch (error) {

        if (error.status === 401) {
            try {

                const newToken = await refreshToken();

                const retry = await axios({
                    method,
                    url,
                    data,
                    headers: {
                        Authorization: newToken
                    },
                    withCredentials: true
                });
                return retry.data;

            } catch {
                window.location.href = '/login';
            }
        }
        throw error;
    }
}

const refreshToken = async (refreshToken) => {
    try {
        const res = await axios({
            method: "POST",
            url: REFRESH_URL,
            headers: {
                Authorization: refreshToken
            }
        });
        return res.data;
    } catch (error) {
        throw error
    }
}