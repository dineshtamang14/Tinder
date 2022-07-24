import axios from "axios";
// https://tinder-api.herokuapp.com

const instance = axios.create({
    baseURL: "http://localhost:8000"
})

export default instance;
