import axios from 'axios';

export const createWarehouse = async (warehouseData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/warehouses`, warehouseData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
        }
        throw error;
    }
};

export const getAllWarehouses = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/warehouses`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
        }
        throw error;
    }
};


export const updateWarehouse = async (warehouseId, updatedData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.put(`${process.env.REACT_APP_URL}/warehouses/${warehouseId}`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
        }
        throw error;
    }
};

export const deleteWarehouse = async (warehouseId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.delete(`${process.env.REACT_APP_URL}/warehouses/${warehouseId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
        }
        throw error;
    }
};
