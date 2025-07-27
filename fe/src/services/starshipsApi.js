import api from './api';

export const fetchStarships = async () => {
    const response = await api.get('/starships');
    return response.data;
}