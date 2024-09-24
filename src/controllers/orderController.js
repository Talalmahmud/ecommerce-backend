import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export const createOrder = async (req, res) => {
  const { products } = req.body;
  try {
    const productDetails = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.productId);

        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }

        // Return product details including the price
        product.stockQuantity = product.stockQuantity - item.quantity;
        await product.save();
        return {
          productId: product._id,
          quantity: item.quantity,
          price: product.price, // Fetch price from the Product model
        };
      })
    );

    // Step 2: Calculate total price based on the fetched product details
    const totalPrice = productDetails.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);

    const userId = req.user._id;

    const newOrder = await Order.create({
      userId: userId,
      products: productDetails,
      totalPrice: totalPrice,
      status: "pending",
    });

    return res.status(200).json({ data: newOrder });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const upadteOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body);
    return res.status(200).json({ data: upadteOrder });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const cancelOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const deleteOrder = await Order.findOneAndDelete(orderId);

    return res.status(200).json({ data: deleteOrder });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const deleteOrder = await Order.delete(orderId);
    return res.status(200).json({ data: deleteOrder });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};
