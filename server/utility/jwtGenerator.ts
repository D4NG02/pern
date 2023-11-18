import jwt from "jsonwebtoken";
import 'dotenv/config'

function jwtGenerator(user_id: number) {
    const payload = {
        user: user_id        
    }

    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: '1hr'})
}

export default jwtGenerator