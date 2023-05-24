import axios from "axios";
// http://localhost:8000

const instance = axios.create({
    baseURL: "http://localhost:8000"
})

export default instance;
