import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import {getOverloans} from "../../api/loanApi";


const OverloansTable = () => {
    const [overloansData, setOverloansData] = useState([]);

    useEffect(() => {
        fetchOverloansData();
    }, []);

    const fetchOverloansData = async () => {
        try {
            const data = await getOverloans();
            setOverloansData(data);
        } catch (error) {
            console.error('Error fetching overloans:', error);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'ID пользователя',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: 'Сумма',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'К цене',
            dataIndex: 'toPrice',
            key: 'toPrice',
        },
        {
            title: 'ID продукта',
            dataIndex: 'product_id',
            key: 'product_id',
        },
        {
            title: 'Дата окончания',
            dataIndex: 'end_date',
            key: 'end_date',
        },
        {
            title: 'Дата начала',
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: 'Срок',
            dataIndex: 'term',
            key: 'term',
        },
        {
            title: 'Цена в месяц',
            dataIndex: 'price_month',
            key: 'price_month',
        },
        {
            title: 'ID склада',
            dataIndex: 'warehouses_id',
            key: 'warehouses_id',
        },
        {
            title: 'Погашено',
            dataIndex: 'repaid',
            key: 'repaid',
        },
        {
            title: 'Дата погашения',
            dataIndex: 'repaid_at',
            key: 'repaid_at',
        },
        {
            title: 'Дата создания',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Дата обновления',
            dataIndex: 'updated_at',
            key: 'updated_at',
        },
        {
            title: 'Оставшийся платеж',
            dataIndex: 'remainingPayment',
            key: 'remainingPayment',
        },
    ];


    return (
        <Table className={'w-full'} dataSource={overloansData} columns={columns} />
    );
};

export default OverloansTable;
