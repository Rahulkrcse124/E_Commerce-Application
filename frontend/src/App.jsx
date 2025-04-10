import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import WebFont from "webfontloader";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./Store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import Contact from "./components/layout/Contact/Contact";
import About from "./components/layout/About/About";
import NotFound from "./components/layout/NotFound/NotFound";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import  { useEffect, useState } from "react";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState(null);

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe API Key:", error);
    }
  }

  useEffect(() => {
    WebFont.load({
      google: { families: ["Roboto"] },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              isAuthenticated && user.role === "Admin" ? (
                <Dashboard />
              ) : (
                <LoginSignUp />
              )
            }
          />
          <Route
            path="/admin/products"
            element={
              isAuthenticated && user.role === "Admin" ? (
                <ProductList />
              ) : (
                <LoginSignUp />
              )
            }
          />
          <Route
            path="/admin/product/new"
            element={
              isAuthenticated && user.role === "Admin" ? (
                <NewProduct />
              ) : (
                <LoginSignUp />
              )
            }
          />
          <Route
            path="/admin/product/:id"
            element={
              isAuthenticated && user.role === "Admin" ? (
                <UpdateProduct />
              ) : (
                <LoginSignUp />
              )
            }
          />
          <Route
            path="/admin/orders"
            element={
              isAuthenticated && user.role === "Admin" ? (
                <OrderList />
              ) : (
                <LoginSignUp />
              )
            }
          />
          <Route
            path="/admin/order/:id"
            element={
              isAuthenticated && user.role === "Admin" ? (
                <ProcessOrder />
              ) : (
                <LoginSignUp />
              )
            }
          />
          <Route
            path="/admin/users"
            element={
              isAuthenticated && user.role === "Admin" ? (
                <UsersList />
              ) : (
                <LoginSignUp />
              )
            }
          />
          <Route
            path="/admin/user/:id"
            element={
              isAuthenticated && user.role === "Admin" ? (
                <UpdateUser />
              ) : (
                <LoginSignUp />
              )
            }
          />
          <Route
            path="/admin/reviews"
            element={
              isAuthenticated && user.role === "Admin" ? (
                <ProductReviews />
              ) : (
                <LoginSignUp />
              )
            }
          />
        </Route>

        {/* Stripe Payment Route */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/process/payment"
            element={
              stripeApiKey ? (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              ) : (
                <h2>Loading Stripe...</h2>
              )
            }
          />
        </Route>

        {/* Catch-All for Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
