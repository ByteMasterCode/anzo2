import axios from 'axios';

export const getAllProductsWarehouse = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/product-warehouse`, {
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

export const addProductToWarehouse = async (data) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/product-warehouse`, data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response.data;
    } catch (error) {
        console.error('Error adding product to warehouse:', error);
        throw error;
    }
};


export const sellProductFromWarehouse = async (productId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_URL}/product-warehouse/${productId}/sell`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
        }
        throw error;
    }
};
export const getProductHistoryInWarehouse = async (productId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_URL}/product-warehouse/${productId}/history`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
        }
        throw error;
    }
};
