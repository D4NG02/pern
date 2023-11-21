import { Router, Request, Response } from 'express';
import pool from '../db';
import authorize from "../middleware/authorization";

const routerCurrency = Router();

// Add currency API
routerCurrency.post("/add", authorize, async (req: Request, res: Response) => {
    try {
        const { country, value } = req.body
        const newCurrency = await pool.query(
            "INSERT INTO currencytable (country, value) VALUES ($1, $2) RETURNING *",
            [country, value])

        res.json({command: newCurrency.command, data: newCurrency.rows[0]})
    } catch (error) {
        console.log(error)
    }
})

// Update single currency
routerCurrency.put('/update/:id', authorize, async(req: Request, res: Response) => {
    try {
        console.log("Update currency: " +req)
        const { id } = req.params
        const { country } = req.body.country
        const { value } = req.body.value
        const updateCurrency = await pool.query(
                            "UPDATE currencytable SET country=$1, value=$2 WHERE table_id=$3",
                            [country, value, id]
        )
        
        res.json('Updated currency')
    } catch (error) {
        console.log(error)
    }
});

// Get all currency API
routerCurrency.get("/gets", authorize, async(req: Request, res: Response) => {
    try {
        console.log("Get all currency")
    
        let allCurrencytable = await pool.query("SELECT * FROM currencytable")
        res.json(allCurrencytable.rows)
    } catch (error) {
        console.log(error.message)
    }
})

// Get single currency
routerCurrency.get('/get/:id', authorize, async(req: Request, res: Response) => {    
    try {
        console.log("Get selected currency: " +req.params)
        const { id } = req.params.id
        let currencytable = await pool.query(
                                    "SELECT * FROM currencytable WHERE table_id=$1",
                                    [id]
                                    )
        
        res.json({command: currencytable.command, data: currencytable.rows[0]})
    } catch (error) {
        console.log(error)
    }
});

// Delete single currency
routerCurrency.delete('/delete/:id', authorize, async(req: Request, res: Response) => {
    try {
        const { id } = req.params
        console.log(id)
        let deleteTable = await pool.query(
                                    "DELETE FROM currencytable WHERE table_id=$1",
                                    [id]
                                    )
        
        res.json(deleteTable)
    } catch (error) {
        console.log(error)
    }
});

export default routerCurrency;