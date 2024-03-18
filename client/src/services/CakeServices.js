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



}

export default new CakeServices();
