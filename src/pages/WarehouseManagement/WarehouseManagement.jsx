import React, { useState, useEffect } from 'react';
import {Table, Button, Modal, Form, Select, message, InputNumber} from 'antd';
import {addProductToWarehouse, getAllProductsWarehouse} from "../../api/ProductWarehouseApi";
import {getAllProducts} from "../../api/productsApi";
import {getAllWarehouses} from "../../api/warehousesApi";
 // Ваши функции для получения данных

const WarehouseManagement = () => {
    const [productsWarehouse, setProductsWarehouse] = useState([]);
    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [quantity, setQuantity] = useState(1); // Начальное значение для количества продукта
    const [form] = Form.useForm();
    useEffect(() => {
        fetchProductsWarehouse();
        fetchProducts();
        fetchWarehouses();
    }, []);

    const fetchProductsWarehouse = async () => {
        try {
            const productsWarehouseData = await getAllProductsWarehouse();
            setProductsWarehouse(productsWarehouseData);
        } catch (error) {
            console.error('Error fetching products in warehouse:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const productsData = await getAllProducts();
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchWarehouses = async () => {
        try {
            const warehousesData = await getAllWarehouses();
            setWarehouses(warehousesData);
        } catch (error) {
            console.error('Error fetching warehouses:', error);
        }
    };

    const handleAddProduct = async () => {
        try {
            const values = await form.validateFields(); // Получение значений из формы
            await addProductToWarehouse(values); // Передача объекта values
            message.success('Продукт успешно добавлен на склад');
            setModalVisible(false);
            form.resetFields(); // Очистка значений формы после успешного добавления
            fetchProductsWarehouse();
        } catch (error) {
            console.error('Error adding product to warehouse:', error);
            message.error('Ошибка при добавлении продукта на склад');
        }
    };

    const columns = [
        {
            title: 'Product ID',
            dataIndex: 'product_id',
            key: 'product_id',
        },
        {
            title: 'Warehouse ID',
            dataIndex: 'warehouse_id',
            key: 'warehouse_id',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button onClick={() => handleSellProduct(record.product_id)}>Продать</Button>
            ),
        },
    ];

    const handleSellProduct = async (productId) => {
        try {
            // Логика для продажи продукта со склада с использованием API
            // await sellProductFromWarehouse(productId);
            message.success('Продукт успешно продан');
            fetchProductsWarehouse();
        } catch (error) {
            console.error('Error selling product from warehouse:', error);
            message.error('Ошибка при продаже продукта');
        }
    };

    return (
        <div className={'w-full p-4'}>
            <div>
                <Button onClick={() => setModalVisible(true)}>Добавить продукт</Button>
                <Button onClick={() => handleSellProduct(selectedProduct)}>Продать продукт</Button>
            </div>
            <Table dataSource={productsWarehouse} columns={columns} />
            <Modal
                title="Добавить продукт на склад"
                visible={modalVisible}

                onCancel={() => {
                    setModalVisible(false);
                    setSelectedProduct(null);
                    setSelectedWarehouse(null);
                    form.resetFields();
                }}
                onOk={handleAddProduct}
            >
                <Form form={form}>
                    <Form.Item label="Выберите продукт" name={'product_id'}>
                        <Select
                            value={selectedProduct}
                            onChange={(value) => setSelectedProduct(value)}
                        >
                            {products.map(product => (
                                <Select.Option key={product.id} value={product.id}>
                                    {product.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Выберите склад" name={'warehouse_id'}>
                        <Select
                            value={selectedWarehouse}
                            onChange={(value) => setSelectedWarehouse(value)}
                        >
                            {warehouses.map(warehouse => (
                                <Select.Option key={warehouse.id} value={warehouse.id}>
                                    {warehouse.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Количество" name={'quantity'}>
                        <InputNumber
                            min={1}
                            value={quantity}
                            onChange={(value) => setQuantity(value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default WarehouseManagement;
