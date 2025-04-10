import axios from "axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/api/v1/order/new", order, config);

    console.log("Order created successfully:", data);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    console.error("Order creation failed:", error.response?.data?.message || error);
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response?.data?.message || "Failed to create order",
    });
  }
};

//  Get My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get("/api/v1/orders/me");

    console.log("Fetched my orders:", data.orders);

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    console.error("Fetching my orders failed:", error.response?.data?.message || error);
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response?.data?.message || "Failed to fetch orders",
    });
  }
};

//  Get All Orders (Admin)
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    console.log("Fetching all orders from API...");
    const { data } = await axios.get("/api/v1/admin/orders");

    console.log("Orders received:", data.orders);

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    console.error("Fetching all orders failed:", error.response?.data?.message || error);
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response?.data?.message || "Failed to fetch orders",
    });
  }
};

//  Update Order (Admin)
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/v1/admin/order/${id}`, order, config);

    console.log(`Order ID ${id} updated successfully`, data);

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    console.error(`Updating order ID ${id} failed:`, error.response?.data?.message || error);
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response?.data?.message || "Failed to update order",
    });
  }
};

//  Delete Order (Admin)
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    console.log(`Attempting to delete order ID: ${id}`);
    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

    console.log(`Order ID ${id} deleted successfully`, data);

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    console.error(`Deleting order ID ${id} failed:`, error.response?.data?.message || error);
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response?.data?.message || "Failed to delete order",
    });
  }
};

//  Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    console.log(`Fetching details for order ID: ${id}`);
    const { data } = await axios.get(`/api/v1/order/${id}`);

    console.log(`Order details received for ID ${id}:`, data.order);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    console.error(`Fetching details for order ID ${id} failed:`, error.response?.data?.message || error);
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response?.data?.message || "Failed to fetch order details",
    });
  }
};

//  Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

