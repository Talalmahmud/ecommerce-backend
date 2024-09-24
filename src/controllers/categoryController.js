import Category from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  const { name } = req.body;

  const existCategory = await Category.findOne({ name: name });
  if (existCategory) {
    return res.status(301).json({ message: "Category already registered." });
  }

  try {
    const newCategory = await Category.create(req.body);
    return res
      .status(201)
      .json({ message: "New Category added.", newCategory });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const getAllCategory = async (req, res) => {
  // Parse the 'page' and 'limit' from query parameters, with default values
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 users per page

  // Calculate how many documents to skip
  const skip = (page - 1) * limit;
  try {
    const allItems = await Category.find({}).skip(skip).limit(limit);
    const totalPages = Math.ceil(allItems / limit);
    const totalUsers = await Category.countDocuments({});
    res.status(200).json({
      data: allItems,
      currentPage: page,
      totalPages: totalPages,
      totalUsers: totalUsers,
      usersPerPage: limit,
    });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const getCategoryById = async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await Category.findById(itemId);
    res.status(200).json({ data: item });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const deleteItemById = async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await Category.deleteOne({ _id: itemId });
    res.status(200).json({ data: item });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const updateItemById = async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await Category.findByIdAndUpdate(itemId, req.body);
    res.status(200).json({ data: item });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};
