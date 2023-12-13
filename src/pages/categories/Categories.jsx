import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { getAllCategories, addCategory, editCategory, deleteCategory } from '../../api/categoriesApi';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        setLoading(false);
    };

    const onFinish = async (values) => {
        try {
            if (selectedCategory) {
                await editCategory(selectedCategory.id, values);
                message.success('Категория успешно обновлена');
            } else {
                await addCategory(values);
                message.success('Категория успешно добавлена');
            }
            form.resetFields();
            setModalVisible(false);
            fetchCategories();
        } catch (error) {
            console.error('Error:', error);
            message.error('Произошла ошибка');
        }
    };

    const handleEdit = (record) => {
        setSelectedCategory(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteCategory(id);
            message.success('Категория успешно удалена');
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            message.error('Ошибка при удалении категории');
        }
    };

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
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record.id)}>Delete</Button>
                </span>
            ),
        },
    ];

    return (
        <div className={'w-full p-4'}>
            <Button onClick={() => setModalVisible(true)}>Добавить категорию</Button>
            <Modal
                title={selectedCategory ? 'Редактировать категорию' : 'Добавить категорию'}
                visible={modalVisible}
                onCancel={() => {
                    form.resetFields();
                    setSelectedCategory(null);
                    setModalVisible(false);
                }}
                footer={null}
            >
                <Form form={form} onFinish={onFinish}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Введите название категории' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {selectedCategory ? 'Обновить' : 'Добавить'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table dataSource={categories} columns={columns} loading={loading} />
        </div>
    );
};

export default Categories;
