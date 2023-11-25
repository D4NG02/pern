import { Router, Request, Response } from 'express';
import pool from '../db';
import authorize from "../middleware/authorization";

const routerCurrency = Router();

class Graph {
    dataInDay: object;
    dataInWeek: object

    constructor() {
        let day = this.generateDataDay()
        this.dataInDay = new Object(day)
        let week = this.generateDataWeek()
        this.dataInWeek = new Object(week)
    }

    generateDataDay() {
        let min: number = 2000
        let max: number = 10000
        let time: string[] = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
            '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
        // let time: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
        let value: number[]=[]
        let difference: number = max - min;
        let random: number

        time.forEach((time: string, key: number) => {
            random = Math.random();
            random = Math.floor(random * difference);
            random = random + min;
            value.push(random)
        })
        return { time, value }
    }


    generateDataWeek(){
        let min: number = 2000
        let max: number = 10000
        let time: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        let value: number[]=[]
        let difference: number = max - min;
        let random: number

        time.forEach((time: string, key: number) => {
            random = Math.random();
            random = Math.floor(random * difference);
            random = random + min;
            value.push(random)
        })
        return { time, value }
    }
}

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

routerCurrency.get("/graph", authorize, (req: Request, res: Response) => {
    console.log("Get all graph")

    var data = new Graph()
    res.json(data);
})

export default routerCurrency;