export const isAdmin = (req, res, next) => {
  try {
    // Check if the user exists in the request (set by auth middleware)
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Check if the user's role is 'admin'
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // If the user is an admin, proceed to the next middleware or controller
    next();
  } catch (error) {
    console.error("isAdmin Middleware Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};