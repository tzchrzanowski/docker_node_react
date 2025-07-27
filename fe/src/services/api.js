import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5031',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;