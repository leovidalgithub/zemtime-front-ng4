const SERVER_PORT = process.env.SERVER_PORT || 5005;
const PROTOCOL    = window.location.protocol;
const HOSTNAME    = window.location.hostname;

let API_base = `${PROTOCOL}//${HOSTNAME}:${SERVER_PORT}/`;
let API_paths = {
    // TESTING
    testing: 'fill/test',
    // LOGIN
    // login: 'auth/login'
};

export const buildURL = (path) => {
    'use strict';
    return API_base + API_paths[path];
};
