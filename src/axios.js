import axios from "axios";
// https://tinder-api.herokuapp.com

const instance = axios.create({
    baseURL: "http://web-api:8000"
})

export default instance;
