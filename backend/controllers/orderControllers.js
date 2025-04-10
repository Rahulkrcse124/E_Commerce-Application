const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const CatchAsyncErrors = require("../middleware/catchAsyncErrors");
const { trusted } = require("mongoose");

// create new product
exports.newOrder = CatchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    phoneNo,
    pincode,
    itemsPrice,
    totalPrice,
  } = req.body;

  const order = await orderModel.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    phoneNo,
    pincode,
    itemsPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    sucess: true,
    order,
  });
});

// get single order
exports.getSingleOrder = CatchAsyncErrors(async (req, res, next) => {
  const orderId = req.params.id;
  const order = await orderModel.findById(orderId);
  // .populate("user", "name email");

  if (!order) {
    return next(new ErrorHandler("order not found:", 404));
  }
  res.status(200).json({
    sucess: true,
    order,
  });
});

// get all order of login  user
exports.myAllOrders = CatchAsyncErrors(async (req, res, next) => {
  const order = await orderModel.find({ user: req.user._id });

  if (!order) {
    return next(new ErrorHandler("order not found:", 404));
  }

  res.status(200).json({
    sucess: true,
    order,
  });
});

// get all orders (Admin)
exports.getAllOrders = CatchAsyncErrors(async (req, res, next) => {
  const orders = await orderModel.find();

  let totalAmmount = 0;
  orders.forEach((order) => {
    totalAmmount += order.totalPrice;
  });

  res.status(200).json({
    sucess: true,
    orders,
    totalAmmount: totalAmmount,
  });
});

// update order --(admin)
exports.updateOrder = CatchAsyncErrors(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(` order not found:`, 404));
  }

  if (order.orderStatus === "delivered") {
    return next(new ErrorHandler("you have already delived this order", 400));
  }

  if (req.body.status === "shipped") {
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });
  }

  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    sucess: true,
  });
});

async function updateStock(id, quantity) {
  const product = await productModel.find(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// delete order --(Admin)
exports.deleteOrder = CatchAsyncErrors(async (req, res, next) => {
  const orderId = req.params.id;
  const order = await orderModel.findById(orderId);

  if (!order) {
    return next(
      new ErrorHandler(`product is not found on id: ${orderId}`, 404)
    );
  }

  await order.deleteOne();

  res.status(200).json({
    sucess: true,
    message: "order deleted sucessfully",
  });
});
