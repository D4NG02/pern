import { Router, Request, Response } from 'express';
import bcrypt from "bcrypt";

import pool from '../db';
import jwtGenerator from "../utility/jwtGenerator";
import validInfo from "../middleware/validInfo";
import authorize from "../middleware/authorization";

const routerAuth = Router();

// Register
routerAuth.post('/register', validInfo, async (req: Request, res, Response) => {
    try {
        // 1. Destructure the rea.body (user_id, username, password, position, country)
        const { user_id, username, password, position, country } = req.body;

        // 2. Check if user exist (yes, throw error)
        const user = await pool.query('SELECT * FROM users WHERE user_id=$1', [user_id])
        if (user.rows.length !== 0) {
            // Unauthenticated
            return res.status(401).json("User already exist")
        }

        // 3. Bcrypt the password
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(password, salt)

        // 4. Enter new user to db
        const newUser = await pool.query(
            "INSERT INTO users (user_id, username, password, position, country) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [user_id, username, hash, position, country])

        // 5. Generate jwt token
        const token = jwtGenerator(newUser.rows[0].user_id)
        res.json({ token })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})

// Login
routerAuth.post('/login', validInfo, async (req: Request, res, Response) => {
    try {
        // 1. Desctructure req.body
        const { user_id, password } = req.body;

        // 2. Check if user exist (no, throw error)
        const user = await pool.query('SELECT * FROM users WHERE user_id=$1', [user_id])
        if (user.rows.length === 0) {
            // Unauthenticated
            return res.status(401).json("Wrong user id")
        }

        // 3. Check if incoming password same with in db
        const validPassword = await bcrypt.compare(password, user.rows[0].password)
        if (!validPassword) {
            // Unauthenticated
            return res.status(401).json("Wrong password")
        }
        
        // 4. Give jwt token
        const token = jwtGenerator(user.rows[0].user_id)
        res.json({ token })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})

// Verify
routerAuth.get('/verify', authorize, async (req: Request, res, Response) => {
    try {
        res.json(true)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})

export default routerAuth;