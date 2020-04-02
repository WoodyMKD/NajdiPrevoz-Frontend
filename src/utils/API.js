import { ACCESS_TOKEN } from './constants';

export const request = (options, additionalHeaders) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        ...additionalHeaders
    });
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    headers.forEach((value, key) => console.log(value + ":" + key));
    console.log(options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};