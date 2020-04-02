import {ACCESS_TOKEN, API_BASE_URL} from '../utils/constants';
import { request } from '../utils/API';

const authService = {
	login: (loginRequest) => {
		return request({
			url: API_BASE_URL + "/auth/signin",
			method: 'POST',
			body: JSON.stringify(loginRequest)
		});
	},

	signup: (signupRequest) => {
		return request({
			url: API_BASE_URL + "/auth/signup",
			method: 'POST',
			body: JSON.stringify(signupRequest)
		});
	},

	checkUsernameAvailability: (username) => {
		return request({
			url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
			method: 'GET'
		});
	},

	checkEmailAvailability: (email) => {
		return request({
			url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
			method: 'GET'
		});
	},

	getCurrentUser: () => {
		if(!localStorage.getItem(ACCESS_TOKEN)) {
			return Promise.reject("Не најавен корисник!");
		}

		return request({
			url: API_BASE_URL + "/user/me",
			method: 'GET'
		});
	},

	getUserCars: () => {
		if(!localStorage.getItem(ACCESS_TOKEN)) {
			return Promise.reject("Не најавен корисник!");
		}

		return request({
			url: API_BASE_URL + "/user/cars",
			method: 'GET'
		});
	},

	addUserCar: (car) => {
		if(!localStorage.getItem(ACCESS_TOKEN)) {
			return Promise.reject("Не најавен корисник!");
		}

		return request({
			url: API_BASE_URL + "/user/cars",
			method: 'POST',
			body: JSON.stringify(car)
		});
	},

	updateUserCar: (car) => {
		if(!localStorage.getItem(ACCESS_TOKEN)) {
			return Promise.reject("Не најавен корисник!");
		}

		return request({
			url: API_BASE_URL + "/user/cars/" + car.id,
			method: 'PATCH',
			body: JSON.stringify(car)
		});
	},

	addUserTelNumber: (number) => {
		if(!localStorage.getItem(ACCESS_TOKEN)) {
			return Promise.reject("Не најавен корисник!");
		}

		return request({
			url: API_BASE_URL + "/user/telNumbers",
			method: 'POST',
			body: JSON.stringify(number)
		});
	},

	getUserTelNumbers: () => {
		if(!localStorage.getItem(ACCESS_TOKEN)) {
			return Promise.reject("Не најавен корисник!");
		}

		return request({
			url: API_BASE_URL + "/user/telNumbers",
			method: 'GET'
		});
	}
};

export default authService;