import axios from 'axios';

export const request = () => {
    return axios.create({
        baseURL: 'https://droom-pg.herokuapp.com/',
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const requestWithToken = token => {
    return axios.create({
        baseURL: 'https://droom-pg.herokuapp.com/',
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            authorization: token,
        },
    });
};
