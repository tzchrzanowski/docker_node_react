import api from './api';

export const fetchPlanets = async () => {
    const response = await api.get('/planets');
    return response.data;
}