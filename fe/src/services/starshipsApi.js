import api from './api';

export const fetchStarships = async () => {
    const response = await api.get('/starships');
    return response.data;
}

export const createStarship = async (planetData) => {
    const response = await api.post('/starships', planetData);
    return response.data;
}

export const deleteStarship = async (id) => {
    const response = await api.delete(`/starships/${id}`);
    return response.data;
}

export const updateStarship = async (id, updatedData) => {
    const response = await api.put(`/starships/${id}`, updatedData);
    return response.data;
}