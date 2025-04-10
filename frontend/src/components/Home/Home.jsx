import { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./ProductCard.jsx";
import MetaDeta from "../layout/MetaData.jsx";
import { getProduct , clearErrors} from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader.jsx";
import { useAlert } from 'react-alert';


const Home = () => {
  const alert = useAlert();

  const dispatch = useDispatch();
  const { loading, error, products} = useSelector(
    (state) => state.products
  );


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error,alert]);
   

  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : (
        <Fragment>
          <MetaDeta title="PRODUCTS--ECOMMERCE" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>Find Amazing Products Below</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeheading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => <Product key={product._id} product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;