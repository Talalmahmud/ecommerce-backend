import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  const { name } = req.body;

  try {
    const existItem = await Product.findOne({ name: name });
    if (existItem) {
      return res.status(301).json({ message: `${name} is already exist.` });
    }
    const productItem = await Product.create(req.body);
    return res.status(201).json({ data: productItem });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

export const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 users per page

  // Calculate how many documents to skip
  const skip = (page - 1) * limit;
  try {
    const products = await Product.find({})
      .skip(skip)
      .limit(limit)
      .populate({ path: "category", select: "name" });
    const totalPages = Math.ceil(products / limit);
    const totalProducts = await Product.countDocuments({});
    return res.status(200).json({
      data: products,
      currentPage: page,
      totalPages: totalPages,
      totalUsers: totalProducts,
      productPerPage: limit,
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

export const getById = async (req, res) => {
  const productId = req.params.id;
  try {
    const item = await Product.findById(productId);
    return res.status(200).json({
      data: item,
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const item = await Product.findOneAndDelete(productId);
    return res.status(200).json({
      data: item,
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const item = await Product.findByIdAndUpdate(productId, req.body);

    return res.status(200).json({
      data: item,
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
