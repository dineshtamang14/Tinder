import axios from "axios";
// http://localhost:8000
const url = process.env.REACT_APP_API_URL;

const instance = axios.create({
    baseURL: `http://${url}`
})

export default instance;
