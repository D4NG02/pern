import cors from "cors";
import express from 'express';

import routerAuth from "./routes/authenticate";
import routerCurrency from './routes/currency';
import routerGraph from './routes/currencyGraph';
import routerEvent from './routes/event';
import "jsonwebtoken";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', routerAuth);
app.use('/table', routerCurrency);
app.use('/graph', routerGraph);
app.use('/event', routerEvent);

app.listen(5000, () => {
    console.log(`[server]: Server is running at http://localhost:5000`)
})