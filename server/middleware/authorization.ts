import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

module.exports = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwtToken = req.header("token")

        if(!jwtToken){
            return res.status(403).json("Not Authorize");
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret)
        req.user = payload.user
        
    } catch (error) {
        console.log(error.message);
        return res.status(403).json("Not Authorize");
    }
}
