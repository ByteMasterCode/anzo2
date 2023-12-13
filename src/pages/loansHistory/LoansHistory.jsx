import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import {getRemaymnentHistory} from "../../api/loanApi";


const LoansHistory = () => {
    const [remaymnentHistory, setRemaymnentHistory] = useState([]);

    const remaymnentHistoryColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Loan ID',
            dataIndex: 'loan_id',
            key: 'loan_id',
        },
        {
            title: 'Repayment Amount',
            dataIndex: 'repayment_amount',
            key: 'repayment_amount',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
        },
    ];

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getRemaymnentHistory(); // Получение данных
                setRemaymnentHistory(data);
            } catch (error) {
                console.error('Error fetching remaymnent history:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className={'w-full'}>
            <h2>Таблица платежей</h2>
            <Table columns={remaymnentHistoryColumns} dataSource={remaymnentHistory} />
        </div>
    );
};

export default LoansHistory;
