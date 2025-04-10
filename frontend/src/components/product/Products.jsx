import { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import ReactStars from "react-rating-stars-component";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [Ratings, setRatings] = useState(0);

  const { products, loading, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category, Ratings));
  }, [dispatch, keyword, currentPage, price, category, Ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-label="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => {
                    setCategory(category);
                    setCurrentPage(1);
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>

            <Typography component="legend">Ratings Above</Typography>
            <ReactStars
              count={5}
              value={Ratings}
              onChange={(newRating) => setRatings(newRating)}
              size={24}
              activeColor="tomato"
              isHalf={true}
            />

            <button
              className="clearFiltersBtn"
              onClick={() => {
                setPrice([0, 25000]);
                setCategory("");
                setRatings(0);
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </button>
          </div>

          {resultPerPage < productCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                pageRangeDisplayed={5}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;

















// import { Fragment, useEffect, useState } from "react";
// import "./Products.css";
// import { useSelector, useDispatch } from "react-redux";
// import {getProduct } from "../../actions/productAction";
// import Loader from "../layout/Loader/Loader";
// import ProductCard from "../Home/ProductCard";
// import { useParams } from "react-router-dom";
// import Pagination from "react-js-pagination";
// import Slider from "@mui/material/Slider";
// import { Typography } from "@mui/material";
// import ReactStars from "react-rating-stars-component";

// const categories = [
//   "Laptop",
//   "Footwear",
//   "Bottom",
//   "Tops",
//   "Attire",
//   "Camera",
//   "SmartPhones",
// ];

// const Products = () => {
//   const dispatch = useDispatch();
//   const { keyword } = useParams();

//   const [currentPage, setCurrentPage] = useState(1);
//   const [price, setPrice] = useState([0, 25000]);
//   const [category, setCategory] = useState("");
//   const [Ratings, setRatings] = useState(0);
 

//   const { products, loading, productCount, resultPerPage } = useSelector(
//     (state) => state.products
//   );

//   const setCurrentPageNo = (e) => {
//     setCurrentPage(e);
//   };

//   const priceHandler = (event, newPrice) => {
//     setPrice(newPrice);
//   };

//   useEffect(() => {
    
//     dispatch(getProduct(keyword, currentPage, price, category, Ratings));
//   }, [dispatch, keyword, currentPage, price, category, Ratings]);

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <h2 className="productsHeading">Products</h2>
//           <div className="products">
//             {products &&
//               products.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//           </div>

//           <div className="filterBox">
//             <Typography>Price</Typography>
//             <Slider
//               value={price}
//               onChange={priceHandler}
//               valueLabelDisplay="auto"
//               aria-label="range-slider"
//               min={0}
//               max={25000}
//               sx={{ height: "5%" }}
//             />

//             <Typography>Categories</Typography>
//             <ul className="categoryBox">
//               {categories.map((category) => (
//                 <li
//                   className="category-link"
//                   key={category}
//                   onClick={() => {
//                     setCategory(category);
//                     setCurrentPage(1);
//                   }}
//                 >
//                   {category}
//                 </li>
//               ))}
//             </ul>

//             <Typography component="legend">Ratings Above</Typography>
//             <ReactStars
//               count={5}
//               value={Ratings}
//               onChange={(newRating) => setRatings(newRating)}
//               size={24}
//               activeColor="tomato"
//               isHalf={true}
//             />
//           </div>

//           {resultPerPage < productCount && (
//             <div className="paginationBox">
//               <Pagination
//                 activePage={currentPage}
//                 itemsCountPerPage={resultPerPage}
//                 totalItemsCount={productCount}
//                 pageRangeDisplayed={5}
//                 onChange={setCurrentPageNo}
//                 nextPageText="Next"
//                 prevPageText="Prev"
//                 firstPageText="1st"
//                 lastPageText="Last"
//                 itemClass="page-item"
//                 linkClass="page-link"
//                 activeClass="pageItemActive"
//                 activeLinkClass="pageLinkActive"
//               />
//             </div>
//           )}
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default Products;