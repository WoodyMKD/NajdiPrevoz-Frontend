import {ACCESS_TOKEN, API_BASE_URL} from '../utils/constants';
import { request } from '../utils/API';

const userService = {
	login: (loginRequest) => {
		return request({
			url: API_BASE_URL + "/auth/login",
			method: 'POST',
			body: JSON.stringify(loginRequest)
		});
	},

	register: (signupRequest) => {
		return request({
			url: API_BASE_URL + "/auth/register",
			method: 'POST',
			body: JSON.stringify(signupRequest)
		});
	},

	checkUsernameAvailability: (username) => {
		return request({
			url: API_BASE_URL + "/auth/checkUsernameAvailability?username=" + username,
			method: 'GET'
		});
	},

	checkEmailAvailability: (email) => {
		return request({
			url: API_BASE_URL + "/auth/checkEmailAvailability?email=" + email,
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

    deleteUserCar: (carId) => {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Не најавен корисник!");
        }
        return request({
            url: API_BASE_URL + "/user/cars",
            method: 'DELETE',
            body: JSON.stringify({
                id: carId
            })
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
	},

    deleteUserTelNumber: (number) => {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Не најавен корисник!");
        }
        return request({
            url: API_BASE_URL + "/user/telNumbers",
            method: 'DELETE',
            body: JSON.stringify({
				number: number
			})
        });
    },

    canCreateTrip: () => {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Не најавен корисник!");
        }

        return request({
            url: API_BASE_URL + "/user/canCreateTrip",
            method: 'GET'
        });
    }
};

export default userService;