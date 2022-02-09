import axios from "axios";

const instance = axios.create({
    baseURL: "https://tinder-api.herokuapp.com"
})

export default instance;
