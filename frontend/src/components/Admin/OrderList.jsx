import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import Loader from "../layout/Loader/Loader";

import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, orders = [] } = useSelector((state) => state.allOrders || {});
  const { error: deleteError, isDeleted } = useSelector((state) => state.order || {});

  useEffect(() => {
    console.log("Fetching all orders...");

    dispatch(getAllOrders());

    if (error) {
      console.error("Error fetching orders:", error);
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      console.error("Error deleting order:", deleteError);
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const deleteOrderHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(id));
    }
  };

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) =>
        params.row.status === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/order/${params.row.id}`}>
            <EditIcon style={{ color: "blue", marginRight: "10px" }} />
          </Link>
          <Button onClick={() => deleteOrderHandler(params.row.id)}>
            <DeleteIcon style={{ color: "red" }} />
          </Button>
        </Fragment>
      ),
    },
  ];

  const rows = orders.map((item) => ({
    id: item._id,
    itemsQty: item.orderItems ? item.orderItems.length : 0,
    amount: item.totalPrice || 0,
    status: item.orderStatus || "Processing",
  }));

  console.log("Orders to be displayed:", rows);

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          {loading ? (
            <Loader />
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;

