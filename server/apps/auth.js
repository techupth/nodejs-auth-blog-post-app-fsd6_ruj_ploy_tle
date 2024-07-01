import { Router } from "express";
import bcrypt from "bcryptjs";
import { userCollection } from "../utils/db.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import protect from "../middlewares/protect.js";
dotenv.config();

const AYOKEYs = process.env.SECRET_KEY;
const authRouter = Router();

    authRouter.post("/register", async (req, res) => {
        const { username, password, firstName, lastName} = req.body;

        if(!username || !password || !firstName || !lastName) {
            return res.status(400).json({ message: " Please complete all required fields" });
        } 
        try {
            const exitingUser = await userCollection.findOne ({ $or: [{ username }] });
            if (exitingUser) {
                return res.status(400).json({ message: "please change username or email" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await userCollection.insertOne({
                username,
                password: hashedPassword,
                firstName,
                lastName,
                created_at: new Date(),
            });

            const newUser = result.ops[0];
            res.status(201).json({ message: "regiter success", user: newUser});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "server not respones" });
        }
    });


    authRouter.post("/login", async(req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Please fill in all required fields" });
        } 
        try {
            const user = await userCollection.findOne({ username });

            if (!user) {
                return res.status(400).json({ message: "username or password is not collect" })
            }
            const ismatchValidate = await bcrypt.compare(password, user.password);

            if(!ismatchValidate) {
                return res.status(400).json({ message: "username or password is not collect" })
            }
            const token = jwt.sign(
                {
                  id: user._id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                },
                AYOKEYs,
                { expiresIn: "1y" }
              );
            
            res.status(200).json({ message: "Login success", user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "server not respones "});
        }
    });

    authRouter.get('/profile', protect, async (req, res) => {
        try {
            const user = await usersCollection.findOne({ _id: req.user.id });
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            res.status(200).json({ user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    });

export default authRouter;
