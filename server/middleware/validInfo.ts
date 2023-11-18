import { Request, Response, NextFunction } from 'express';

async function validInfo (req: Request, res: Response, next: NextFunction) {
    const { user_id, username, password, position, country } = req.body;

    if (req.path === "/register") {
        if (![user_id, username, password, position, country].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        }
    } else if (req.path === "/login") {
        if (![user_id, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        }
    }

    next();
}

export default validInfo