import { API_BASE_URL } from '../utils/constants';
import { request } from '../utils/API';

const appTripService = {
    getTrips: (status, page, size) => {
        page = page || 0;
        size = size || 10;

        const headers = {
            'page': page.valueOf(),
            'size': size
        };

        return request({
            url: API_BASE_URL + "/appTrips?status=" + status,
            method: 'GET'
        }, headers);
    },

    getUserTrips: (status, page, size) => {
        page = page || 0;
        size = size || 10;

        const headers = {
            'page': page.valueOf(),
            'size': size
        };

        return request({
            url: API_BASE_URL + "/appTrips/byUser?status=" + status,
            method: 'GET'
        }, headers);
    },

    getTripsByCity: (cityFrom, cityTo, status, page) => {
        page = page || 0;
        const size = 10;

        const headers = {
            'page': page.valueOf(),
            'size': size
        };

        return request({
            url: API_BASE_URL + "/appTrips/byCity?cityFrom=" + cityFrom + "&cityTo=" + cityTo + "&status=" + status,
            method: 'GET'
        }, headers);
    },

    createTrip: (newTrip) => {
        return request({
            url: API_BASE_URL + "/appTrips",
            method: 'POST',
            body: JSON.stringify(newTrip)
        }, {});
    }
};

export default appTripService;