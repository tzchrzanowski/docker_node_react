import api from './api';

export const fetchPeople = async () => {
    const response = await api.get('/people');
    return response.data;
}

export const createPerson = async (personData) => {
    const response = await api.post('/people', personData);
    return response.data;
}

export const deletePerson = async (id) => {
    const response = await api.delete(`/people/${id}`);
    return response.data;
}

export const updatePerson = async (id, updatedData) => {
    const response = await api.put(`/people/${id}`, updatedData);
    return response.data;
}