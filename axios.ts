import axios from 'axios';

const URL_RENDER = 'https://techchallenge-fase02.onrender.com/api';
const URL_LOCAL = 'http://192.168.100.107:3030/api';

export const clienteAxios = axios.create({
    baseURL: URL_LOCAL,
    validateStatus: (status) => [200, 201, 400, 401, 422].includes(status),
});