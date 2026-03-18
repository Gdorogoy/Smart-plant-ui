import { axiosSendRequest } from "./axios.calls";

const PLANT_URL = "http://localhost:3005/plant/"

export const getAllPlants = async (userId, token) => {
    const response = await axiosSendRequest(
        "GET",
        `${PLANT_URL}/get/${userId}`,
        null,
        token,
    );
    return response;
}

export const createPlant = async (data, token) => {
    const response = await axiosSendRequest(
        "POST",
        `${PLANT_URL}/create`,
        data,
        token,
    );
    return response;
}