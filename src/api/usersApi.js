// usersApi.js
import axios from 'axios';

export const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
       if (error.response.status === 401 ){
           localStorage.removeItem('token')
       }
        throw error;
    }
};

export const getAllAdmins = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/users/admins`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response.status === 401 ){
            localStorage.removeItem('token')
        }
        throw error;
    }
};

export const getAllSellers = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/users/sellers`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response.status === 401 ){
            localStorage.removeItem('token')
        }
        throw error;
    }
};

export const getAllManagers = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/users/managers`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response.status === 401 ){
            localStorage.removeItem('token')
        }
        throw error;
    }
};

export const getAllClients = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/users/clients`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response.status === 401 ){
            localStorage.removeItem('token')
        }
        throw error;
    }
};


export const addUser = async (userData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/users/create`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response.status === 401 ){
            localStorage.removeItem('token')
        }
        throw error;
    }
};

export const deleteUserById = async (userId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.delete(`${process.env.REACT_APP_URL}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response.status === 401 ){
            localStorage.removeItem('token')
        }
        throw error;
    }
};

export const editUser = async (id, data) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.put(`${process.env.REACT_APP_URL}/users/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response.status === 401 ){
            localStorage.removeItem('token')
        }
        throw error;
    }
};

