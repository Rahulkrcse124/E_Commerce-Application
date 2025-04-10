import "./sidebar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Sidebar = () => {
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <div className="sidebar">
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      <div className="sidebar-dropdown">
        <p onClick={() => setProductsOpen(!productsOpen)}>
          <ShoppingCartIcon /> Products {productsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </p>
        {productsOpen && (
          <div className="sidebar-submenu">
            <Link to="/admin/products">
              <p>
                <ListIcon /> All Products
              </p>
            </Link>
            <Link to="/admin/product/new">
              <p>
                <AddIcon /> Create Product
              </p>
            </Link>
          </div>
        )}
      </div>

      <Link to="/admin/orders">
        <p>
          <ShoppingCartIcon /> Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;