import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY; // Ensure this is correctly set in your environment

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.id;
        req.role = decoded.role; // This should now correctly set the role
        console.log("Decoded token:", decoded); // Debugging line
        console.log("User role:", req.role); // Debugging line
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};