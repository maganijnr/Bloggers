import axios from "axios";
import { useRouter } from "next/router";
import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
} from "../types";

const baseURL = "http://localhost:8000/api";

export const loginUser = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });
		const config = { headers: { "Content-Type": "application/json" } };
		const user = await axios.post(
			`${baseURL}/auth/login`,
			{ email, password },
			config
		);

		dispatch({ type: USER_LOGIN_SUCCESS, payload: user.data });

		localStorage.setItem("blogUser", JSON.stringify(user.data));
	} catch (e) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				e.response && e.response.data.message
					? e.response.data.message
					: e.message,
		});
	}
};

export const registerUser = (name, email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });
		const config = { headers: { "Content-Type": "application/json" } };

		const user = await axios.post(
			`${baseURL}/auth/register`,
			{ name, email, password },
			config
		);

		dispatch({ type: USER_REGISTER_SUCCESS, payload: user.data });
		localStorage.setItem("blogUser", JSON.stringify(user.data));
	} catch (e) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				e.response && e.response.data.message
					? e.response.data.message
					: e.message,
		});
	}
};
