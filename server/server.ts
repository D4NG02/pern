import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
import routerCurrency from './routes/currency';
import routerGraph from './routes/currencyGraph';
import routerEvent from './routes/event';

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/table', routerCurrency);
app.use('/graph', routerGraph);
app.use('/event', routerEvent);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});


// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    res.status(500).send('Something went wrong');
});

app.listen(5000, () => {
    console.log(`[server]: Server is running at http://localhost:5000`)
})