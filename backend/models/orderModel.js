const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // info
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
  },
  pincode: {
    type: Number,
    required: true,
  },

  phoneNo: {
    type: Number,
    required: true,
  },

  // start items
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      image: {
        type: String,
        required: true,
      },

      product: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
        required: true,
      },
    },
  ],

  // payment info
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },

  paymentInfo: {
    id: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
  },

  paidAt: {
    type: Date,
    required: true,
  },

  // price

  itemPrice: {
    type: Number,
    default: 0,
  },

  taxPrice: {
    type: Number,
    default: 0,
    required: true,
  },

  shippingPrice: {
    type: Number,
    default: 0,
    required: true,
  },

  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },

  orderStatus: {
    type: String,
    default: "processing",
    required: true,
  },

  deliveredAt: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("order", orderSchema);
