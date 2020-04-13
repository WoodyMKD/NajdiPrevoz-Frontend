import { API_BASE_URL } from '../utils/constants';
import { request } from '../utils/API';

const appTripService = {
    getTrips: (page, size) => {
        page = page || 0;
        size = size || 10;

        const headers = {
            'page': page.valueOf(),
            'size': size
        };

        return request({
            url: API_BASE_URL + "/appTrips",
            method: 'GET'
        }, headers);
    },

    getTripsByCity: (cityFrom, cityTo, page) => {
        page = page || 0;
        const size = 10;

        const headers = {
            'page': page.valueOf(),
            'size': size
        };

        return request({
            url: API_BASE_URL + "/appTrips/byCity?cityFrom=" + cityFrom + "&cityTo=" + cityTo,
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