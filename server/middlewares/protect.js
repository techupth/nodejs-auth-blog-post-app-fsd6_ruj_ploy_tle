import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

// โหลด environment variables จากไฟล์ .env
dotenv.config();

const AYOKEYs = process.env.SECRET_KEY;

const protect = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, AYOKEYs);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Token is not valid" });
    }
};
export default protect;







// 🐨 Todo: Exercise #5
// สร้าง Middleware ขึ้นมา 1 อันชื่อ Function ว่า `protect`
// เพื่อเอาไว้ตรวจสอบว่า Client แนบ Token มาใน Header ของ Request หรือไม่
