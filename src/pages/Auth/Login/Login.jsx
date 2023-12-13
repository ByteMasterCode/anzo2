// src/Login.js
import React, {useEffect, useState} from 'react';
import { Form, Input, Button, message } from 'antd';
import styles from './style.module.css';
import logo from '../../../assets/img/logo.png';
import { login } from '../../../api/auth';
import {useSelector,useDispatch} from "react-redux";
import {setIsLoggedIn} from "../../../store/actions/actions"; // Импорт функции login из файла auth.js

const Login = () => {
    const [loading, setLoading] = useState(false);
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const dispatch = useDispatch();
        useEffect(()=>{
            console.log(isLoggedIn)
        })
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await login(values);
            const { token } = response;

            localStorage.setItem('token', token);


            dispatch(setIsLoggedIn(true));

            message.success('Успешный вход!', 1);
        } catch (error) {
            message.error('Ошибка входа. Пожалуйста, проверьте введенные данные.');
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className={`${styles.loginForm}`}>
                <img src={logo} alt="Логотип" className="mx-auto mb-6" style={{ maxWidth: '100px' }} />
                <h1 className="text-3xl font-bold mb-6 text-center">Вход в админ панель</h1>
                <Form
                    name="loginForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="phone_number"
                        rules={[{ required: true, message: 'Пожалуйста, введите номер телефона!' }]}
                        className={`${styles.loginInput}`}
                    >
                        <Input placeholder="Номер телефона" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
                        className={`${styles.loginInput}`}
                    >
                        <Input.Password placeholder="Пароль" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} className={`${styles.loginButton}`}>
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
