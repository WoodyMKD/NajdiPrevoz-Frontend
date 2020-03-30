import { API_BASE_URL } from '../utils/constants';
import { request } from '../utils/API';

const fbTripService = {
    getTrips: (page, size) => {
        page = page || 0;
        size = size || 10;

        const headers = {
            'page': page.valueOf(),
            'size': size
        };

        return request({
            url: API_BASE_URL + "/fbTrips",
            method: 'GET'
        }, headers);
    }
};

export default fbTripService;