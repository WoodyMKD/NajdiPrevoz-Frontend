import { API_BASE_URL } from '../utils/constants';
import { request } from '../utils/API';

const appTripService = {
    getTrips: (page, size) => {
        page = page || 0;
        size = size || 10;

        const headers = {
            'page': page,
            'size': size
        };

        return request({
            url: API_BASE_URL + "/appTrips",
            method: 'GET'
        }, headers);
    }
};

export default appTripService;