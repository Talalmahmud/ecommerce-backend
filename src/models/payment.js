import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    transctionId: { type: String, required: true },
    paymentMethod: {
      type: String,
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const paymentModel = mongoose.model("Payment", paymentSchema);
export default paymentModel;
