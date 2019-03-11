import axios from 'axios';

export const request = () => {
    return axios.create({
        baseURL: 'https://droom-backend.herokuapp.com',
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const requestWithToken = token => {
    return axios.create({
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    });
};
