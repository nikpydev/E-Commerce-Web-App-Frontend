import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./core/Home";
import Home2 from "./core/Home2";
import Register from "./user/Register";
import Login from "./user/Login";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import ManageProducts from "./admin/ManageProducts"
import AddProduct from "./admin/AddProduct";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";

function Routes(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/Shoppersonic"} exact component={Home2}/>
                <Route path={"/register"} exact component={Register}/>
                <Route path={"/login"} exact component={Login}/>
                <Route path={"/cart"} exact component={Cart}/>
                <PrivateRoute path={"/user/dashboard"} exact component={UserDashboard}/>
                <AdminRoute path={"/admin/dashboard"} exact component={AdminDashboard}/>
                <AdminRoute path={"/admin/create/category"} exact component={AddCategory}/>
                <AdminRoute path={"/admin/categories"} exact component={ManageCategories}/>
                <AdminRoute path={"/admin/create/category"} exact component={AddCategory}/>
                <AdminRoute path={"/admin/create/product"} exact component={AddProduct}/>
                <AdminRoute path={"/admin/products"} exact component={ManageProducts}/>
                <AdminRoute path={"/admin/product/update/:productId"} exact component={UpdateProduct}/>
                <AdminRoute path={"/admin/category/update/:categoryId"} exact component={UpdateCategory}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;