import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllWarehouses, createWarehouse, updateWarehouse, deleteWarehouse } from '../../api/warehousesApi';

const WarehousesTable = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchWarehouses();
    }, []);

    const fetchWarehouses = async () => {
        try {
            const warehousesData = await getAllWarehouses();
            setWarehouses(warehousesData);
        } catch (error) {
            console.error('Error fetching warehouses:', error);
        }
    };

    const handleCreateOrUpdate = async (values) => {
        try {
            if (values.id) {
                await updateWarehouse(values.id, { name: values.name });
                message.success('Warehouse updated successfully');
            } else {
                await createWarehouse({ name: values.name });
                message.success('Warehouse added successfully');
            }
            setModalVisible(false);
            form.resetFields();
            fetchWarehouses();
        } catch (error) {
            console.error('Error:', error);
            message.error('Failed to perform operation');
        }
    };

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleDelete = async (warehouseId) => {
        try {
            await deleteWarehouse(warehouseId);
            message.success('Warehouse deleted successfully');
            fetchWarehouses();
        } catch (error) {
            console.error('Error deleting warehouse:', error);
            message.error('Failed to delete warehouse');
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger>
                        Delete
                    </Button>
                </span>
            ),
        },
    ];

    return (
        <div className={'w-full p-4'}>
            <Button type="primary" onClick={() => setModalVisible(true)}>
                Add Warehouse
            </Button>
            <Modal
                title="Add/Edit Warehouse"
                visible={modalVisible}
                onCancel={() => {
                    setModalVisible(false);
                    form.resetFields();
                }}
                onOk={() => {
                    form.submit();
                }}
            >
                <Form form={form} onFinish={handleCreateOrUpdate}>
                    <Form.Item name="id" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter warehouse name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form>
            </Modal>
            <Table dataSource={warehouses} columns={columns} rowKey="id" />
        </div>
    );
};

export default WarehousesTable;
