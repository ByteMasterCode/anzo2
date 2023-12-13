
import axios from 'axios';

const baseURL = process.env.REACT_APP_URL;

const authAPI = axios.create({
    baseURL,
});

export const login = async (credentials) => {
    try {
        const response = await authAPI.post('/login', credentials);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Ошибка входа');
    }
};

