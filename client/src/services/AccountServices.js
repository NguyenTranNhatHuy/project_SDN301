import axios from "axios";
const ACCOUNT_API_BASE_URL = "http://localhost:3000/users/";

export const getAccountById = (id, accessToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    return axios.get(ACCOUNT_API_BASE_URL + id, config);
};