import React, {useEffect, useRef, useState} from 'react';

import styles from './styles.module.css';
import {CheckOutlined, CreditCardOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Form, Input, message, Select, Switch} from "antd";
import {addUser, editUser, getAllClients} from "../../api/usersApi";
import {CheckScroing, CreateUzcard, opAccept} from "../../api/cardApi";
import {getAllProductsWarehouse} from "../../api/ProductWarehouseApi";
import {createLoan} from "../../api/loanApi";
import Modal from "antd/es/modal/Modal";
import Webcam from "react-webcam";

const Loans = () => {
    const [selectedUser, setSelectedUSer] = useState();
    const [selectedCard, setSelectedCard] = useState(''); // Состояние выбранной карты
    const [isCreateUser, setCreateUser] = useState(false);
    const [isProduct,setIsProduct] = useState(false)
    const [isHumo, setHumo] = useState(false)
    const [users, setUsers] = useState([]);
    const [photo, setPhoto] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [videoStream, setVideoStream] = useState(null);
    let videoRef = useRef(null);
    const [productWarehouses,setProductWarehouses]=useState([])
    const [form] = Form.useForm();
    const [scoringForm] = Form.useForm();
    const [cardForm] = Form.useForm();
    const [loanForm] = Form.useForm();
    const [optForm] = Form.useForm();
    const [selectedProductId, setSelectedProductId] = useState(''); // Хранит выбранный item.id
    const [selectedWarehouseId, setSelectedWarehouseId] = useState(''); // Хранит выбранный item.warehouse_id
    const filterOptions = (input, option) => {
        return (
            option.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0 || // Изменение в этой строке
            option.props.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0    // Изменение в этой строке
        );
    };

    useEffect(() => {

            fetchUsers();

        if (productWarehouses.length === 0){
            fetchProducts();
        }


    }, [selectedUser, isCreateUser, selectedCard, isProduct, productWarehouses, selectedWarehouseId, selectedWarehouseId]);





    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setVideoStream(stream);
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
        setIsModalVisible(true);
    };

    const captureImage = () => {
        if (videoRef.current) {
            const imageSrc = videoRef.current.getScreenshot();
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const img = new Image();
            img.src = imageSrc;

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const capturedImage = canvas.toDataURL('image/png');
                setPhoto(capturedImage);
            };

            setIsModalVisible(false);
        }
    };

    const onFinish = async (values) => {
        try {
            const response = await addUser(values);

            message.success('Пользователь успешно добавлен');
            form.resetFields();
            setCreateUser(false)
            fetchUsers();
        } catch (error) {
            console.error('Error:', error);
            message.error('Произошла ошибка');
        }
    };

    const scroringOnFinish = async (values) => {
        try {
            values.card_id = selectedCard;
            const response = await CheckScroing(values,users[selectedUser].id);
                console.log(response)
            message.success(' успешно  отправлен на скоринг');
        } catch (error) {
            console.error('Error:', error);
            message.error('Произошла ошибка');
        }
    };

    const optOnFinish = async (values) => {
        try {
            values.user_id = users[selectedUser].id;
            const response = await opAccept(values);
            console.log(response)
            message.success('Пользователь успешно добавлен');
            optForm.resetFields();
        } catch (error) {
            console.error('Error:', error);
            message.error('Произошла ошибка');
        }
    };

    const cardOnfinish = async (values) => {
        try {
            values.user_id = users[selectedUser].id;
            const response = await CreateUzcard(values);
            message.success('на карту пользователя отправлен код');
            console.log(response)
            cardForm.resetFields();
        } catch (error) {
            console.error('Error:', error);
            message.error('Произошла ошибка');
        }
    };

    const loanOnFinish = async (values) => {
        try {
            console.log(users[selectedUser].id)
            console.log(selectedWarehouseId)
            values.warehouses_id = selectedWarehouseId;
            values.product_id = selectedProductId;
            values.user_id = users[selectedUser].id;
            const response = await createLoan(values);
            message.success('на карту пользователя отправлен код');
            console.log(response)
            loanForm.resetFields();
        } catch (error) {
            console.error('Error:', error);
            message.error('Произошла ошибка');
        }
    };




    const fetchUsers = async () => {

        try {
            const data = await getAllClients();
            console.log(data)
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchProducts = async () => {

        try {
            const data = await getAllProductsWarehouse();
            console.log(data)
            setProductWarehouses(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    const handleCardChange = (value) => {
        setSelectedCard(users[selectedUser].uzcards[value].id);
    };

    const handleUserChange = (index) => {
        setSelectedUSer(index);
        setSelectedCard('');
    };


    return (
        <div className={styles.loanContainer}>
            <div className={styles.title}>
                <h1 className={'text-2xl bg-blue-800 rounded-t-lg text-white  p-2'}>Страница оформления кредита</h1>
                <h1 onClick={()=>setIsProduct(false)} className={`${styles.steps} bg-blue-800 cursor-pointer`}> пользовател </h1>
                <div  className={`${styles.steps} ${users[selectedUser]?.scoring > 0 ? 'bg-blue-800' : 'bg-gray-800'} flex flex-row cursor-pointer `}>
               <CheckOutlined className={`${users[selectedUser]?.scoring > 0 ? 'text-green-400' : 'text-white'} text-xl`} />       <h1 className={` `}> скоринг</h1>
                </div>
                <h1 onClick={()=>setIsProduct(true)} className={`${styles.steps} bg-gray-800 cursor-pointer`}> продукт</h1>
                <h1 className={`${styles.steps} bg-gray-800 cursor-pointer`}> оформлено</h1>
            </div>

            <div className={styles.loanCard}>

                {!isProduct ?  <div className={'w-full flex flex-row justify-between pr-10'}>
                  <div
                        className={`${isCreateUser ? 'h-[500px] p-2' : 'h-[370px]'}  overflow-hidden duration-[2s] p-2 flex flex-col h-[200px] mt-12 ml-4 rounded-lg bg-white`}>
                        <div className={'flex flex-row mt-1'}>
                            <UserOutlined
                                className={`${selectedUser ? 'text-green-400' : 'text-blue-800'} text-2xl ml-2 duration-[2s]`}/>
                            <Button onClick={() => setCreateUser(false)}
                                    type={"primary w-fit h-[40px] bg-blue-400 p-1"}> выбрать пользователя</Button>
                            <Button onClick={() => setCreateUser(true)}
                                    type={"primary w-fit h-[40px] bg-orange-400 ml-2 p-1"}> создать
                                пользователя</Button>
                        </div>
                        <Select
                            className={'m-4'}
                            showSearch
                            disabled={isCreateUser}
                            value={selectedUser}
                            onChange={(value, option) => handleUserChange(option.key)}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {users.map((user, index) => (
                                <Select.Option key={index} value={user.id}>
                                    {user.name}
                                </Select.Option>
                            ))}
                        </Select>
                        {

                            isCreateUser ?
                                <Form form={form} onFinish={onFinish} layout="vertical">
                                    <Form.Item
                                        name="name"
                                        label="Имя"
                                        rules={[{required: true, message: 'Введите имя пользователя'}]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        name="role"
                                        label="Роль"
                                        rules={[{required: true, message: 'Выберите роль пользователя'}]}
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
                                        rules={[{required: true, message: 'Введите пароль'}]}
                                    >
                                        <Input.Password/>
                                    </Form.Item>
                                    <Form.Item
                                        name="phone_number"
                                        label="Номер телефона"
                                        rules={[{required: true, message: 'Введите номер телефона'}]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    {/* Добавьте другие поля формы */}
                                    <Form.Item>
                                        <Button className={'bg-blue-800'} type="primary" htmlType="submit">
                                            Добавить пользователя
                                        </Button>
                                    </Form.Item>
                                </Form> :
                                <div className={'flex flex-col rounded h-[420px]  w-full'}>
                                  <div className={'flex flex-row w-full justify-between'}>
                                      <CreditCardOutlined className={'text-2xl text-blue-800'}/>
                                      <h1 className={'ml-2'}> {!isHumo ? 'Uzcard ' : 'Humo '}</h1>
                                      <Switch className={'self-end bg-blue-800'} onChange={() => {
                                          setHumo(!isHumo)
                                      }}/>
                                  </div>
                                    <Form form={scoringForm} onFinish={scroringOnFinish}>

                                    <Select
                                        value={selectedCard}
                                        className={'w-full mt-4'}
                                        onChange={handleCardChange}
                                    >
                                        {(isHumo ? users[selectedUser]?.humocards : users[selectedUser]?.uzcards)
                                            ?.filter((value) => value.id_in_api !== null)
                                            ?.map((value, index) => (
                                                <Select.Option
                                                    key={index}
                                                    value={index} // Передаем id карты в значение Select.Option
                                                >
                                                    {value.card_number}
                                                </Select.Option>
                                            ))
                                        }
                                    </Select>
                                        <Form.Item
                                             className={'mt-4'}
                                            name="beginDate"
                                            label="дата начало"
                                            rules={[{required: true, message: 'Введите дата начало'}]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item
                                            name="endDate"
                                            label="дата конца"
                                            rules={[{required: true, message: 'Введите дата конца'}]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item className={'mt-4'}>
                                            <Button className={'bg-orange-400'} type="primary" htmlType="submit">
                                               скоринг
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                        }

                    </div>

                    <div className={'w-[400px] h-[620px] flex flex-col p-4 rounded-lg bg-white mt-12 ml-6'}>
                        <div className={'w-full flex flex-row justify-between p-2'}>
                            <CreditCardOutlined className={'text-2xl text-blue-800'}/>
                            <h1 className={'ml-2'}>Создать {isHumo ? 'Uzcard карту' : 'Humo кату'}</h1>
                            <Switch className={'self-end bg-blue-800'} onChange={() => {
                                setHumo(!isHumo)
                            }}/>
                        </div>
                        <Form form={cardForm} onFinish={cardOnfinish} layout="vertical">
                            <Form.Item
                                name="user_id"
                                label={selectedUser ? users[selectedUser]?.name || 'пользователь' : 'пользователь'}

                            >
                                <Input placeholder={users[selectedUser]?.name} disabled={selectedUser} value={selectedUser ? users[selectedUser]?.id || '' : ''} />
                            </Form.Item>


                            <Form.Item
                                name="phone_number"
                                label='телефон'
                                rules={[{required: true, message: 'телефон номер'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="card_number"
                                label='номер карты'
                                rules={[{required: true, message: 'номер карты'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="expire_date_year"
                                label='год карты'
                                rules={[{required: true, message: 'год карты'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="expire_date_month"
                                label='месяц карты'
                                rules={[{required: true, message: 'месяц карты'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="status"
                                label='довериться'
                                rules={[{required: true, message: '0 или 1'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item>
                                <Button className={'bg-blue-800'} type="primary" htmlType="submit">
                                    создать карту
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                    <div className={'w-[200px] h-[260px] flex flex-col bg-white rounded-lg mt-12 ml-6 p-4'}>
                            <h1 > Смс потверждения</h1>
                        <Form form={optForm} onFinish={optOnFinish} layout="vertical">
                            <Form.Item
                                name="user_id"
                                label={users[selectedUser]?.name || 'пользователь'}
                            >
                                <Input placeholder={users[selectedUser]?.name} disabled value={users[selectedUser]?.id || ''} />
                            </Form.Item>
                            <Form.Item
                                name="opt"
                                label='код потверждения'
                                rules={[{required: true, message: 'код потверждения'}]}
                            >
                                <Input/>

                            </Form.Item>
                            <Form.Item>
                                <Button className={'bg-blue-800 mt-2'} type="primary" htmlType="submit">
                                    потвердить
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div> :
                    // Product start
                    <div className={'w-full flex flex-row justify-between pr-10'}>
                        <Form className={'w-[500px] mt-12 ml-6'} onFinish={loanOnFinish} form={loanForm}>
                            <Form.Item
                            className={'bg-white rounded-lg pl-1'}
                                style={{color:'white'}}
                                name="user_id"
                                label={selectedUser ? users[selectedUser]?.name || 'пользователь' : 'пользователь'}

                            >
                                <Input placeholder={users[selectedUser]?.name} disabled={selectedUser} value={selectedUser ? users[selectedUser]?.id || '' : ''} />
                            </Form.Item>
                            <h1 className={'text-white mb-2'}> продукт</h1>
                        <Select
                            className={'w-full'}
                            onChange={(value, option) => {
                                setSelectedProductId(value);
                                setSelectedWarehouseId(option.warehouse_id);
                                console.log(option.warehouse_id)
                            }}
                            showSearch
                            value={selectedProductId}
                        >
                            {/* Отображение данных из массива */}
                            {productWarehouses.map((item) => (
                                <Select.Option
                                    key={item.id}
                                    value={item.id}
                                    disabled={users[selectedUser]?.max_limit < item?.product.price? true : false}
                                    warehouse_id={item.warehouse_id}
                                >
                                    <div>
                                        <span>{item.product.name}</span>
                                        <span>{item.product.price} ({item.warehouse.name})</span>
                                    </div>
                                </Select.Option>
                            ))}
                        </Select>
                            <Form.Item
                                name="term"
                                className={'bg-white rounded-lg mt-2'}
                                label='срок в месяцах'
                                rules={[{required: true, message: 'срок в месяцах от 1 до 12'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <button onClick={openCamera}>Открыть вебкамеру</button>

                            <Form.Item>
                                <Button disabled={photo === null } className={'bg-white text-blue-800 mt-2'} type="primary" htmlType="submit">
                                    потвердить
                                </Button>
                            </Form.Item>
                        </Form>

                        <Modal
                            title="Заголовок модального окна"
                            visible={isModalVisible}
                            onCancel={() => setIsModalVisible(false)}
                            footer={null}
                        >
                            <Webcam
                                audio={false}
                                ref={videoRef}
                                screenshotFormat="image/jpeg"
                            />
                            <button  onClick={captureImage}>Сделать снимок</button>
                        </Modal>
                        <div className={'w-fit bg-white h-fit rounded-lg p-2 mt-12 ml-2'}>
                            <img className={'object-cover'} src={photo}/>
                        </div>
                    </div>
                    // Product end
                }

            </div>

        </div>
    );
};

export default Loans;
