const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const upload = require("../middleware/multer");

router.use(bodyParser.json());

// import controllers
const {
  createProduct,
  updateProduct,
  getAllProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllReview,
  deleteReview,
} = require("../controllers/productControllers");

const { isAuthenticatedUser, isAdmin } = require("../middleware/auth");

// GET ALL PRODUCT
router.get("/products", getAllProduct);

// ADMIN CAN ONLY CREATE PRODUCT
// router.post("/admin/product/new", isAuthenticatedUser, isAdmin, createProduct);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, isAdmin, createProduct);

// ADMIN CAN ONLY UPDATE PRODUCT
router.put("/product/:id", isAuthenticatedUser, isAdmin, updateProduct);

// ADMIN CAN ONLY DELETE PRODUCT
router.delete("/product/:id", isAuthenticatedUser, isAdmin, deleteProduct);

// Get product details
router.get("/product/:id", getProductDetails);

// create product  update reveiews
router.put("/review", isAuthenticatedUser, createProductReview);

// get all reviews of product
router.get("/reviews", getAllReview);

// delete product reviews

router.delete("/reviews", isAuthenticatedUser, deleteReview);

module.exports = router;
