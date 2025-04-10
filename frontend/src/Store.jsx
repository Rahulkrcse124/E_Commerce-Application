import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import {
  productReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducer";

import {
  userReducer,
  profileReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducers/userReducers";


import { cartReducer } from "./reducers/cartReducer";
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  orderReducer,
  allOrdersReducer,
} from "./reducers/orderReducer";

const getLocalStorageItem = (key, defaultValue) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : defaultValue;
  }
  return defaultValue;
};

const preloadedState = {
  cart: {
    cartItems: getLocalStorageItem("cartItems", []),
    shippingInfo: getLocalStorageItem("shippingInfo", {}),
  },
};

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
