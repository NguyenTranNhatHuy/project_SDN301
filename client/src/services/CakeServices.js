/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const CAKE_API_BASE_URL =
    "http://localhost:3000/cakes";

class CakeServices {
    getCake() {
        return axios.get(CAKE_API_BASE_URL);
    }

    getCakebyId(cakeid) {
        return axios.get(CAKE_API_BASE_URL + "/" + cakeid);
    }

    deleteCake(cakeId, cake, accessToken) {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        };
        return axios.delete(
            `${CAKE_API_BASE_URL}` + "/" + cakeId,
            cake,
            config
        );
    }

    addCake(cake, accessToken) {

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        };

        return axios.post(
            `${CAKE_API_BASE_URL}`,
            cake,
            config
        );
    }


}

export default new CakeServices();
