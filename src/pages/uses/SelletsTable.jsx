import React, { useState, useEffect } from 'react';
import {
    Table,
    Menu,
    Dropdown,
    Form,
    Input,
    Button,
    message,
    Modal,
    Select,
    DatePicker,
    InputNumber,
    Switch
} from 'antd';
import logo from '../../assets/img/logo.png'
import {getAllUsers, addUser, deleteUserById, editUser, getAllSellers} from '../../api/usersApi';
import {
    CalendarOutlined, CheckCircleOutlined,
    DollarCircleOutlined, ExclamationCircleOutlined,
    IdcardOutlined,
    PercentageOutlined, PhoneOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";

const SelletsTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null); // Добавим состояние для хранения ID выбранного пользователя

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllSellers();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        setLoading(false);
    };

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            if (editingUser) {
                console.log(values)
                await editUser(selectedUserId,values)
                message.success('Информация о пользователе успешно обновлена');
            } else {
                // Иначе добавляем нового пользователя
                console.log('aadd')
                await addUser(values);
                message.success('Пользователь успешно добавлен');
            }

            form.resetFields();
            setEditModalVisible(false)
            setModalVisible(false);
            fetchUsers(); // Запросить обновленный список пользователей
        } catch (error) {
            console.error('Error:', error);
            message.error('Произошла ошибка');
        }
    };

    const renderMenu = (record) => (
        <Menu>
            <Menu.Item>
        <span className="flex items-center">
            <span className="mr-2">
                <PhoneOutlined />
            </span>
            Phone Number: {record.phone_number}
        </span>
            </Menu.Item>
            <Menu.Item>
        <span className="flex items-center">
            <span className="mr-2">
                {record.isBlackList ? (
                    <ExclamationCircleOutlined style={{ color: 'red' }} />
                ) : (
                    <CheckCircleOutlined style={{ color: 'green' }} />
                )}
            </span>
            Is BlackList: {record.isBlackList.toString()}
        </span>
            </Menu.Item>
            <Menu.Item>
        <span className="flex items-center">
            <span className="mr-2">
                <DollarCircleOutlined style={{ color: record.max_limit > 20000000 ? 'green' : record.max_limit === 10000000 ? 'yellow' : 'red' }} />
            </span>
            Max Limit: {record.max_limit}
        </span>
            </Menu.Item>
            <Menu.Item>
        <span className="flex items-center">
            <span className="mr-2">
                <PercentageOutlined style={{ color: record.scoring > 70 ? 'green' : record.scoring >= 50 ? 'yellow' : 'red' }} />
            </span>
            Scoring: {record.scoring}
        </span>
            </Menu.Item>
            <Menu.Item>
        <span className="flex items-center">
            <span className="mr-2">
                <IdcardOutlined style={{ color: 'blue' }} />
            </span>
            PINFL: {record.pinfl}
        </span>
            </Menu.Item>
            <Menu.Item>
        <span className="flex items-center">
            <span className="mr-2">
                <IdcardOutlined style={{ color: 'blue' }} />
            </span>
            Loan ID: {record.loan_id}
        </span>
            </Menu.Item>
            <Menu.Item>
        <span className="flex items-center">
            <span className="mr-2">
                <UnorderedListOutlined style={{ color: 'blue' }} />
            </span>
            Loans List: {record.loans_list}
        </span>
            </Menu.Item>
            <Menu.Item>
        <span className="flex items-center">
            <span className="mr-2">
                <IdcardOutlined style={{ color: 'blue' }} />
            </span>
            Passport Number: {record.passportNumber}
        </span>
            </Menu.Item>
            <Menu.Item>
        <span className="flex items-center">
            <span className="mr-2">
                <CalendarOutlined style={{ color: 'blue' }} />
            </span>
            Passport Expiration Date: {record.passportExpirationDate}
        </span>
            </Menu.Item>
            <Menu.Item>
        <span className="flex items-center">
            <span className="mr-2">
                <CalendarOutlined style={{ color: 'blue' }} />
            </span>
            Passport Issue Date: {record.passportIssueDate}
        </span>
            </Menu.Item>
        </Menu>

    );

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Details',
            dataIndex: '',
            key: 'details',
            render: (_, record) => (
                <Dropdown overlay={renderMenu(record)}>
                    <a href="/#" onClick={(e) => e.preventDefault()}>
                        Show Details
                    </a>
                </Dropdown>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <span>
                <a onClick={() => handleEdit(record)}>Edit</a>
                <span style={{ margin: '0 8px' }}>|</span>
                <a  onClick={() => handleDelete(record.id)}>Delete</a>
            </span>
            ),
        },
    ];

    const handleEdit = (record) => {
        setSelectedUserId(record.id);
        setEditingUser(record);
        form.setFieldsValue(record); // Заполнить поля данными выбранного пользователя
        setEditModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteUserById(id);
            message.success('Пользователь успешно удален');
            fetchUsers(); // Запросить обновленный список пользователей после удаления
        } catch (error) {
            console.error('Error deleting user:', error);
            message.error('Ошибка при удалении пользователя');
        }
    };
    return (
        <div className={'w-full p-4'}>
            <div className={'w-full flex flex-col items-center justify-start bg-gray-100 rounded-lg'}>
                <div className="flex items-center justify-between w-full">
                    <h1 className={'text-lg font-bold bg-blue-600 text-white mt-4 py-1 px-3 rounded-t-lg'}>
                        Таблица всех продовцов
                    </h1>
                    <img className="mx-auto" width={48} height={48} src={logo} alt="Logo"/>
                    <Button className={'bg-blue-600 mt-4 '}  type="primary" onClick={() => setModalVisible(true)}>
                        Добавить пользователя
                    </Button>
                </div>

            </div>

            <Modal
                title="Добавить пользователя"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Имя"
                        rules={[{ required: true, message: 'Введите имя пользователя' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Роль"
                        rules={[{ required: true, message: 'Выберите роль пользователя' }]}
                    >
                        <Select>
                            <Select.Option value="client">Client</Select.Option>
                            <Select.Option value="seller">Seller</Select.Option>
                            <Select.Option value="admin">Admin</Select.Option>
                            <Select.Option value="manager">Manager</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[{ required: true, message: 'Введите пароль' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="phone_number"
                        label="Номер телефона"
                        rules={[{ required: true, message: 'Введите номер телефона' }]}
                    >
                        <Input />
                    </Form.Item>
                    {/* Добавьте другие поля формы */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Добавить пользователя
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Редактировать пользователя"
                visible={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Имя"
                        rules={[{ required: true, message: 'Введите имя пользователя' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Роль"
                        rules={[{ required: true, message: 'Выберите роль пользователя' }]}
                    >
                        <Select>
                            <Select.Option value="client">Client</Select.Option>
                            <Select.Option value="seller">Seller</Select.Option>
                            <Select.Option value="admin">Admin</Select.Option>
                            <Select.Option value="manager">Manager</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[{ required: true, message: 'Введите пароль' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="phone_number"
                        label="Номер телефона"
                        rules={[{ required: true, message: 'Введите номер телефона' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="system"
                        label="Система"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="session"
                        label="Сессия"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="card_id"
                        label="ID карты"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="isBlackList"
                        label="Черный список"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                    <Form.Item
                        name="pinfl"
                        label="PINFL"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="scoring"
                        label="Оценка"
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item
                        name="max_limit"
                        label="Максимальный лимит"
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="passportNumber"
                        label="Номер паспорта"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="passportExpirationDate"
                        label="Срок действия паспорта"
                    >
                        <input type="date" />
                    </Form.Item>
                    <Form.Item
                        name="passportIssueDate"
                        label="Дата выдачи паспорта"
                    >
                        <input type="date" />
                    </Form.Item>
                    <Form.Item>
                        <Button className={'bg-orange-400'} type="primary" htmlType="submit">
                            редактировать пользователя
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table className={'w-full'} dataSource={users} columns={columns} loading={loading} />
        </div>
    );
};

export default SelletsTable;
