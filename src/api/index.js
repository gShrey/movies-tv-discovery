import axios from "axios";


const API_KEY  = "3a94078fb34b772a31d9a1348035bed7";

const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
    params: {
        api_key: API_KEY,
    }
});

export default axiosInstance;