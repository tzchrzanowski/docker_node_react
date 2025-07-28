import api from './api';

export const fetchPlanets = async () => {
    const response = await api.get('/planets');
    return response.data;
}

export const createPlanet = async (planetData) => {
    const response = await api.post('/planets', planetData);
    return response.data;
}

export const deletePlanet = async (id) => {
    const response = await api.delete(`/planets/${id}`);
    return response.data;
}

export const updatePlanet = async (id, updatedData) => {
    const response = await api.put(`/planets/${id}`, updatedData);
    return response.data;
}