import Payment from "../models/payment.js";

export const createPayment = async (req, res) => {
  try {
    const newPayment = await Payment.create(req.body);
    return res.status(200).json({ data: newPayment });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

export const allPayment = async (req, res) => {
  const { userId, fromDate, toDate } = req.query;

  // Create a dynamic query object
  const query = {};

  // Add userId filter if provided
  if (userId) {
    query.userId = userId;
  }

  // Add status filter if provided
  

  // Add date range filter if provided
  if (fromDate && toDate) {
    query.createdAt = { $gte: new Date(fromDate), $lte: new Date(toDate) };
  }

  // Add amount range filter if provided
  if (minAmount && maxAmount) {
    query.amount = { $gte: minAmount, $lte: maxAmount };
  }

  try {
    // Fetch payments based on the dynamic query
    const payments = await Payment.find(query);

    if (!payments.length) {
      return res
        .status(404)
        .json({ message: "No payments found with the provided criteria" });
    }

    return res.status(200).json({ data: payments });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
