import cors from "cors";
import "jsonwebtoken";
import express, { Router, Request, Response } from 'express';

import authorize from "./middleware/authorization";
import routerAuth from "./routes/authenticate";
import routerCurrency from './routes/currency';
import routerEvent from './routes/event';
import routerMachine from "./routes/machine";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', routerAuth);
app.use('/table', routerCurrency);
app.use('/event', routerEvent);
app.use('/machine', routerMachine);

const routerRoot = Router();
routerRoot.get('/', authorize, async(req: Request, res: Response) => {
    try {
        console.log("Root " +req.user)
        res.json(req.user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
});

app.listen(5000, () => {
    console.log(`[server]: Server is running at http://localhost:5000`)
})