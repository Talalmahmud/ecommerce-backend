import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: [30, "Characters must be in 30"],
      required: true,
    },
    imgUrl: {
      type: String,
    },
    description: {
      type: String,
      max: [200, "Characters must be in 200"],
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);
export default productModel;
