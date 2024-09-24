export const roleCheck = (roleName) => async (req, res, next) => {
  try {
    const { role } = req.user; // Assuming req.user contains the user info

    if (role === roleName) {
      return next(); // User role is authorized, proceed to next middleware
    }

    return res.status(401).json({ error: "User role is not authorized." }); // Role is not authorized
  } catch (err) {
    return res.status(500).json({ error: "Internal server error." }); // Handle unexpected errors
  }
};
