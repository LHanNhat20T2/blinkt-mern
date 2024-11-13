import axios from "axios";
import { baseUrl } from "../commom/SummaryApi";
const Axios = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

export default Axios;
