const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "Please Enter Product description"],
  },

  price: {
    type: Number,
    required: [true, "please enter product price"],
    maxLength: [8, "price cannot exceed 8 character"],
  },

  ratings: {
    type: Number,
    default: 0,
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "please enter the product category"],
  },

  stock: {
    type: Number,
    required: [true, "please enter the product stock"],
    maxLength: [4, "stock cannot exceed 4 character"],
    default: 0,
  },

  numOfReviews: [
    {
      name: {
        type: String,
        required: true,
      },

      rating: {
        type: String,
        required: true,
      },

      comment: {
        type: String,
        required: true,
      },
    },
  ],

  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
      },

      name: {
        type: String,
        required: true,
      },

      rating: {
        type: String,
        required: true,
      },

      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
