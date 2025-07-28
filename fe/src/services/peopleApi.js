import api from './api';

export const fetchPeople = async () => {
    const response = await api.get('/people');
    return response.data;
}

export const createPerson = async (personData) => {
    const response = await api.post('/people', personData);
    return response.data;
}