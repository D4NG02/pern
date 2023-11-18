import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

async function authorize (req: Request, res: Response, next: NextFunction)  {
    try {
        const jwtToken = req.header("token")

        if(!jwtToken){
            return res.status(403).json("Not Authorize");
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret)
        req.user = payload.user
        next()
    } catch (error) {
        console.log(error.message);
        return res.status(403).json("Not Authorize");
    }
}

export default authorize