import React, {useEffect, useRef} from 'react';
import {Card, Row, Col, Table, Slider, Carousel} from 'antd';
import { UserOutlined, TeamOutlined, SolutionOutlined, ToolOutlined, ClockCircleOutlined, DollarCircleOutlined, CreditCardOutlined } from '@ant-design/icons';
import {Pie} from "react-chartjs-2";
import Chart from 'chart.js/auto';


const Dashboard = () => {
    // Моковые данные для примера
    const sellersCount = 15;
    const clientsCount = 100;
    const adminsCount = 5;
    const managersCount = 20;

    const chartContainer1 = useRef(null);
    const chartContainer2 = useRef(null);



    const overdueData = [
        {
            key: '1',
            client: 'Имя Клиента 1',
            overdueAmount: 5000,
            daysOverdue: 30,
        },
        // Другие просрочки...
    ];

    const lastCreditsData = [
        {
            key: '1',
            client: 'Имя Клиента 1',
            creditAmount: 10000,
            date: '01.12.2023',
        },
        // Другие последние кредиты...
    ];

    const lastPaymentsData = [
        {
            key: '1',
            client: 'Имя Клиента 1',
            paymentAmount: 2000,
            date: '05.12.2023',
        },
        // Другие последние платежи...
    ];

    return (
        <div className="bg-gray-100 p-8 w-full">
            <Row gutter={16}>
                <Col span={6}>
                    <Card title="Продавцы" extra={<UserOutlined />} bordered={false} className="bg-blue-200">
                        <p>{sellersCount}</p>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Клиенты" extra={<TeamOutlined />} bordered={false} className="bg-green-200">
                        <p>{clientsCount}</p>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Админы" extra={<SolutionOutlined />} bordered={false} className="bg-yellow-200">
                        <p>{adminsCount}</p>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Менеджеры" extra={<ToolOutlined />} bordered={false} className="bg-red-200">
                        <p>{managersCount}</p>
                    </Card>
                </Col>
            </Row>
            <div className={'flex flex-row w-full'}>
            <div className="mt-8 w-[50%]">
                <Card title="Просрочки" className="bg-white rounded-lg shadow-md">
                    <Table dataSource={overdueData.slice(0, 5)} className="rounded-lg overflow-hidden">
                        <Table.Column title="Клиент" dataIndex="client" key="client" />
                        <Table.Column title="Сумма просрочки" dataIndex="overdueAmount" key="overdueAmount" />
                        <Table.Column title="Дней просрочки" dataIndex="daysOverdue" key="daysOverdue" />
                    </Table>
                </Card>

            </div>

            </div>
            <Row className="mt-8" gutter={16}>
                <Col span={12}>
                    <Card title="Последние кредиты" className="bg-white rounded-lg shadow-md">
                        <Table dataSource={lastCreditsData.slice(0, 5)} className="rounded-lg overflow-hidden">
                            <Table.Column title="Клиент" dataIndex="client" key="client" />
                            <Table.Column title="Сумма кредита" dataIndex="creditAmount" key="creditAmount" />
                            <Table.Column title="Дата" dataIndex="date" key="date" />
                        </Table>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Последние платежи" className="bg-white rounded-lg shadow-md">
                        <Table dataSource={lastPaymentsData.slice(0, 5)} className="rounded-lg overflow-hidden">
                            <Table.Column title="Клиент" dataIndex="client" key="client" />
                            <Table.Column title="Сумма платежа" dataIndex="paymentAmount" key="paymentAmount" />
                            <Table.Column title="Дата" dataIndex="date" key="date" />
                        </Table>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
