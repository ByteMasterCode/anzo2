import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Select, Upload } from 'antd';
import {PlusOutlined, UploadOutlined} from '@ant-design/icons';
import {
    getAllProducts,
    addProduct,
    editProduct,
    deleteProduct
} from '../../api/productsApi';
import { getAllCategories } from '../../api/categoriesApi';

const ProductsTable = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [form] = Form.useForm();

    const storage_url = process.env.REACT_APP_URL.slice(0,-4);
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [image]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const productsData = await getAllProducts();
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setLoading(false);
    };

    const fetchCategories = async () => {
        try {
            const categoriesData = await getAllCategories();
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCreate = async (values) => {
            form
                .validateFields()
                .then(async (values) => {
                    try {
                        console.log(image)
                        values.photo = image;
                        await addProduct(values);
                        message.success('Product added successfully');
                        setModalVisible(false);
                        form.resetFields();
                        fetchProducts();
                    } catch (error) {
                        console.error('Error adding product:', error);
                        message.error('Failed to add product');
                    }
                })
                .catch((error) => {
                    console.error('Validation failed:', error);
                });
    };

    const handleEdit = async (values) => {
        try {
            await editProduct(values.id, values);
            message.success('Product updated successfully');
            setModalVisible(false);
            form.resetFields();
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
            message.error('Failed to update product');
        }
    };

    const handleDelete = async (productId) => {
        try {
            await deleteProduct(productId);
            message.success('Product deleted successfully');
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            message.error('Failed to delete product');
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
            title: 'Category ID',
            dataIndex: 'category_id',
            key: 'category_id',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Photo',
            dataIndex: 'photo',
            key: 'photo',
            render: (photo) => <img src={storage_url+photo} alt="Product" style={{ width: '50px', height: '50px' }} />,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <span>
                    {/* Добавьте кнопки для действий с продуктом */}
                    <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="danger" onClick={() => handleDelete(record.id)}>Delete</Button>
                </span>
            ),
        },
    ];
    const handleImage = (info) => {
             setImage(info.file)
    };


    return (
        <div className="w-full p-4">
            <Button type="primary" onClick={() => setModalVisible(true)}>
                Add Product
            </Button>
            <Modal
                title="Add/Edit Product"
                visible={modalVisible}
                onCancel={() => {
                    setModalVisible(false);
                    form.resetFields();
                }}
                footer={null}
            >
                <Form form={form} onFinish={form.getFieldValue('id') ? handleEdit : handleCreate}>
                    <Form.Item name="id" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter product name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please enter product price' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Изображение" name="photo" >
                        <Upload
                            accept="image/*"
                            maxCount={1}

                            beforeUpload={() => false}
                            listType="picture"
                            showUploadList={{
                                showRemoveIcon: false,
                            }}
                            onChange={handleImage}
                        >
                            <Button icon={<UploadOutlined />}>Загрузить</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="category_id"
                        label="Category"
                        rules={[{ required: true, message: 'Please select a category' }]}
                    >
                        <Select>
                            {categories.map(category => (
                                <Select.Option key={category.id} value={category.id}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {form.getFieldValue('id') ? 'Update' : 'Add'} Product
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table
                dataSource={products}
                columns={columns}
                loading={loading}
                // Other Table properties as needed
            />
        </div>
    );
};

export default ProductsTable;

