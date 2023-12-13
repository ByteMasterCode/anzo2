import axios from "axios";

export const CreateUzcard = async (userData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/uzcard`, userData, {
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

export const CreateHumoCard = async (userData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/humocard`, userData, {
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
export const opAccept = async (userData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/optaccept`, userData, {
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


export const CheckScroing = async (userData, id) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_URL}/users/${id}/check-scoring`,
            userData,
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
