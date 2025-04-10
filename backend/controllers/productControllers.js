const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const CatchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// POST Create product --Admin
exports.createProduct = CatchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;

  req.body.user = req.user.id;

  const product = req.body;

  const newProduct = new productModel(product);
  const response = await newProduct.save();

  if (!response) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({
    sucess: true,
    product: response,
  });
});

// GET METHOD : GET ALL PRODUCT
exports.getAllProduct = CatchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productCount = await productModel.countDocuments();

  const apiFeature = new ApiFeatures(productModel.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const response = await apiFeature.query;

  res.status(200).json({
    success: true,
    product: response,
    productCount,
    resultPerPage,
  });
});

// GET product details
exports.getProductDetails = CatchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;
  const product = await productModel.findById(productId);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.json({
    sucess: true,
    product,
  });
});

// update --admin (UPDATE_PRODUCT)
exports.updateProduct = CatchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  const response = await productModel.findByIdAndUpdate(
    productId,
    updatedProduct,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < response.images.length; i++) {
      await cloudinary.v2.uploader.destroy(response.images[i].public_id);
    }
  }

  // delete image from cloudnary
  for (let i = 0; i < response.images.length; i++) {
    await cloudinary.v2.uploader.destroy(response.images[i].public_id);
  }

  const imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;

  if (!response) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({
    sucess: true,
    product: response,
  });
});

// DELETE --ADMIN  (DELETE PRODUCT)
exports.deleteProduct = CatchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;
  const response = await productModel.findByIdAndDelete(productId);

  if (!response) {
    return next(new ErrorHandler("product not found", 404));
  }

  for (let i = 0; i < response.images.length; i++) {
    await cloudinary.v2.uploader.destroy(response.images[i].public_id);
  }

  // deleting images from cloudnary
  for (let i = 0; i < response.images.length; i++) {
    await cloudinary.v2.uploader.destroy(response.images[i].public_id);
  }

  await response.remove();

  res.status(200).json({
    sucess: true,
    message: "product deleted sucessfully",
  });
});

// create product and reveiew
exports.createProductReview = CatchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await productModel.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// get all review of product
exports.getAllReview = CatchAsyncErrors(async (req, res, next) => {
  const product = await productModel.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler(` not found product`, Error.message));
  }

  res.json({
    sucess: true,
    reviews: product.reviews,
  });
});

// delete review
exports.deleteReview = CatchAsyncErrors(async (req, res, next) => {
  const product = await productModel.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("product not found", 400));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() != req.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;

  const numOfReviews = reviews.length;

  await product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },

    {
      run: true,
      validators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    suecss: true,
  });
});
