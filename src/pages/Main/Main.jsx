// Main.js
import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Sidebar from "../../components/SideBar/SideBar";
import Login from "../Auth/Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import {useDispatch, useSelector} from "react-redux";
import Layout from "antd/es/layout/layout";
import {setIsLoggedIn} from "../../store/actions/actions";
import UsersTable from "../uses/UsersTable";
import ClientsStable from "../uses/ClientsTable";
import AdminsTable from "../uses/AdminsTable";
import SelletsTable from "../uses/SelletsTable";
import ManagersTable from "../uses/ManagersTable";
import Categories from "../categories/Categories";
import ProductsTable from "../products/ProductsTable";
import WarehousesTable from "../warehouses/WarehousesTable";
import WarehouseManagement from "../WarehouseManagement/WarehouseManagement";
import Loans from "../loans/Loans";
import OverloansTable from "../Overloans/OverloansTable";
import LoansHistory from "../loansHistory/LoansHistory";

export default function Main() {
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(setIsLoggedIn(true));

        } else {
            dispatch(setIsLoggedIn(false));

        }
    }, [isLoggedIn])
    return (
        <div>
            {
                isLoggedIn ? (
                    <>
                        <Layout style={{minHeight: '100vh'}}>
                            <Sidebar/>

                            <Routes>
                                <Route path="/users" element={<UsersTable/>}/>
                            </Routes>
                            <Routes>
                                <Route path="/dashboard" element={<Dashboard/>}/>
                            </Routes>
                            <Routes>
                                <Route path="/clients" element={<ClientsStable/>}/>
                            </Routes>
                            <Routes>
                                <Route path="/admins" element={<AdminsTable/>}/>
                            </Routes>
                            <Routes>
                                <Route path="/sellers" element={<SelletsTable/>}/>
                            </Routes>
                            <Routes>
                                <Route path="/managers" element={<ManagersTable/>}/>
                            </Routes>

                            <Routes>
                                <Route path="/categories" element={<Categories/>}/>
                            </Routes>
                            <Routes>
                                <Route path="/products" element={<ProductsTable/>}/>
                            </Routes>
                            <Routes>
                                <Route path="/warehouses" element={<WarehousesTable/>}/>
                            </Routes>
                            <Routes>
                                <Route path="/product-warehouse" element={<WarehouseManagement/>}/>
                            </Routes>
                            <Routes>
                                <Route path="/loans" element={<Loans/>}/>
                            </Routes>
                            <Routes>
                                <Route path="/over-loans" element={<OverloansTable/>}/>
                            </Routes>
                            <Routes>
                                <Route path="/loans-history" element={<LoansHistory/>}/>
                            </Routes>
                        </Layout>
                    </>
                ) : (
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        {/* Другие маршруты для неавторизованного пользователя */}
                    </Routes>
                )
            }
        </div>
    );
}
