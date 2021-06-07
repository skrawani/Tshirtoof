import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import Orders from "./admin/Orders";
import Cart from "./core/Cart";
import OrderDetail from "./admin/OrderDetail";
import { CartCountContext } from "./CartCountContext";

const Routes = () => {
  const [cartCount, setCartCount] = useState(0);

  const value = useMemo(() => ({ cartCount, setCartCount }), [
    cartCount,
    setCartCount,
  ]);
  return (
    <Router>
      <Switch>
        <CartCountContext.Provider value={value}>
          <Route path="/" exact component={Home}></Route>
          <Route path="/cart" exact component={Cart} />

          <Route path="/signup" exact component={Signup}></Route>
          <Route path="/signin" exact component={Signin}></Route>
          <AdminRoute
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />
          <PrivateRoute
            path="/user/dashboard"
            exact
            component={UserDashboard}
          />

          <AdminRoute
            path="/admin/create/category"
            exact
            component={AddCategory}
          />
          <AdminRoute
            path="/admin/categories"
            exact
            component={ManageCategories}
          />
        </CartCountContext.Provider>
      </Switch>
      <AdminRoute path="/admin/create/product" exact component={AddProduct} />
      <AdminRoute path="/admin/products" exact component={ManageProducts} />
      <AdminRoute path="/admin/orders" exact component={Orders} />
      <AdminRoute
        path="/admin/order/details/:orderId"
        exact
        component={OrderDetail}
      />
      <AdminRoute
        path="/admin/product/update/:productId"
        exact
        component={UpdateProduct}
      />
    </Router>
  );
};
export default Routes;
