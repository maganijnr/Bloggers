import Axios from "axios";

const axios = Axios.create({
	baseURL: process.env.NEXT_PUBLIC_AXIOS_BACKEND_BASE_URL,
	withCredentials: true,
});

export default axios;
