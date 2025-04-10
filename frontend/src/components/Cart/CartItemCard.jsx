import "./CartItemCard.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image ?? "/fallback.jpg"} alt={item.name || "Product"} />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <button onClick={() => deleteCartItems(item.product)} className="removeBtn">
          Remove
        </button>
      </div>
    </div>
  );
};

CartItemCard.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    product: PropTypes.string,
  }).isRequired,
  deleteCartItems: PropTypes.func.isRequired,
};

export default CartItemCard;