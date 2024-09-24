import Review from "../models/reviews.js";

export const createReview = async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    return res.status(201).json({ data: newReview });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const getReviewsByProductId = async (req, res) => {
  const productId = req.parmas.id;
  try {
    const reviews = await Review.find({ productId }) // Find reviews with the matching productId
      .populate("userId", "name"); // Populate the user information (optional)

    return res.status(200).json({ data: reviews });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

export const updateReviewByProductId = async (req, res) => {
  const productId = req.parmas.id;
  try {
    const reviews = await Review.findByIdAndUpdate(productId, req.body) // Find reviews with the matching productId
      .populate("userId", "name"); // Populate the user information (optional)

    return res.status(200).json({ data: reviews });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
