import React from 'react';
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    AppstoreOutlined,
    ShoppingCartOutlined,
    DashboardFilled,
    DashboardOutlined,
    TeamOutlined,
    CrownOutlined,
    ShopOutlined,
    SolutionOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png'
const { Sider } = Layout;

const Sidebar = () => {
    return (
        <Sider style={{backgroundColor:'white'}} width={200} className="site-layout-background">
            <div className="flex flex-row items-center justify-center h-20 border-b border-gray-300 rounded-b-lg shadow-md">
                <img src={logo} alt="Logo" className="w-1/5 mb-2 rounded" />
                <span className="text-black text-lg font-bold">Anzo Admin Panel</span>
            </div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item key="9" icon={<DashboardOutlined />}>
                    <Link to="/Dashboard">Dashboard</Link>
                </Menu.Item>
                <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="Пользователи">
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to="/users">Все пользователи</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<TeamOutlined />}>
                        <Link to="/clients">Клиенты</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<CrownOutlined />}>
                        <Link to="/admins">Администраторы</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<ShopOutlined />}>
                        <Link to="/sellers">Продавцы</Link>
                    </Menu.Item>
                    <Menu.Item key="13" icon={<SolutionOutlined />}>
                        <Link to="/managers">Менеджеры</Link>
                    </Menu.Item>
                </Menu.SubMenu>


                <Menu.Item key="5" icon={<AppstoreOutlined />}>
                    <Link to="/categories">Categories</Link>
                </Menu.Item>

                <Menu.Item key="6" icon={<ShoppingCartOutlined />}>
                    <Link to="/products">Products</Link>
                </Menu.Item>

                <Menu.SubMenu key="sub2" icon={<LaptopOutlined />} title="Warehouses">
                    <Menu.Item key="7" icon={<LaptopOutlined />}>
                        <Link to="/warehouses">Warehouses</Link>
                    </Menu.Item>
                    <Menu.Item key="8" icon={<LaptopOutlined />}>
                        <Link to="/product-warehouse">Product Warehouse</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="sub3" icon={<LaptopOutlined />} title="Loans">
                    <Menu.Item key="10" icon={<LaptopOutlined />}>
                        <Link to="/loans">Loans</Link>
                    </Menu.Item>
                    <Menu.Item key="11" icon={<LaptopOutlined />}>
                        <Link to="/over-loans">overloans</Link>
                    </Menu.Item>
                    <Menu.Item key="12" icon={<LaptopOutlined />}>
                        <Link to="/loans-history">loanshistory</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
