import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();

const verifyJWT = (req, res, next) => {
    
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    
    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //forbidden code
            req.user = decoded.userId;
            next();
        }
    );
}

export default verifyJWT