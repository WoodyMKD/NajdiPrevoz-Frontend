import { API_BASE_URL } from '../utils/constants';
import { request } from '../utils/API';

const appTripService = {
    getTrips: (page, size) => {
        page = page || 0;
        size = size || 10;
        return request({
            url: API_BASE_URL + "/appTrips?page=" + page + "&size=" + size,
            method: 'GET'
        });
    }
};

export default appTripService;