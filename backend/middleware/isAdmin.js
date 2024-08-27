export const isAdmin = (req, res, next) => {
    console.log("User role in isAdmin middleware:", req.role); // Debugging line
    if (req.role !== 'admin') {
        return res.status(403).json({
            message: "You are not allowed to perform this action. Please try logging in as an admin.",
            success: false
        });
    }
    next();
};