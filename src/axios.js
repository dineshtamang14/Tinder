import axios from "axios";
// https://tinder-api.herokuapp.com

const instance = axios.create({
    baseURL: "https://tinder-api.herokuapp.com"
})

export default instance;
