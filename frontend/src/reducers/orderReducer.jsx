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
  UPDATE_ORDER_RESET,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, loading: true };

    case CREATE_ORDER_SUCCESS:
      console.log("Order Created Successfully:", action.payload);
      return { loading: false, order: action.payload };

    case CREATE_ORDER_FAIL:
      console.error("Order Creation Failed:", action.payload);
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};


export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return { ...state, loading: true };

    case MY_ORDERS_SUCCESS:
      console.log("Fetched My Orders:", action.payload);
      return { loading: false, orders: action.payload };

    case MY_ORDERS_FAIL:
      console.error("Fetching My Orders Failed:", action.payload);
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

//  Fetch All Orders Reducer (Admin)
export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return { ...state, loading: true };

    case ALL_ORDERS_SUCCESS:
      console.log("Fetched All Orders:", action.payload);
      return { loading: false, orders: action.payload };

    case ALL_ORDERS_FAIL:
      console.error("Fetching All Orders Failed:", action.payload);
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

//  Update & Delete Order Reducer
export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return { ...state, loading: true };

    case UPDATE_ORDER_SUCCESS:
      console.log("Order Updated:", action.payload);
      return { ...state, loading: false, isUpdated: action.payload };

    case DELETE_ORDER_SUCCESS:
      console.log("Order Deleted:", action.payload);
      return { ...state, loading: false, isDeleted: action.payload };

    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      console.error("Order Action Failed:", action.payload);
      return { ...state, loading: false, error: action.payload };

    case UPDATE_ORDER_RESET:
      return { ...state, isUpdated: false };

    case DELETE_ORDER_RESET:
      return { ...state, isDeleted: false };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};


export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case ORDER_DETAILS_SUCCESS:
      console.log("Fetched Order Details:", action.payload);
      return { loading: false, order: action.payload };

    case ORDER_DETAILS_FAIL:
      console.error("Fetching Order Details Failed:", action.payload);
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};