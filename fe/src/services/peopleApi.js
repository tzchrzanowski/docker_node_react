import api from './api';

export const fetchPeople = async () => {
    const response = await api.get('/people');
    return response.data;
}