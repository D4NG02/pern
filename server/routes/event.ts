import { Router, Request, Response } from 'express';
import pool from '../db';

const routerEvent = Router();

// Get all currency API
routerEvent.get("/gets", async(req: Request, res: Response) => {
  try {
    console.log("Get all event")
    let {rows} = await pool.query("SELECT * FROM event")
    res.json(rows)
  } catch (error) {
    console.log(error.message)
  }
})


// Add currency API
routerEvent.post("/add", async(req: Request, res: Response) => {
  try {
      const { eventDate, eventPrio, note, title } = req.body
      const newCurrency = await pool.query(
          "INSERT INTO event (date, title, note, priority) VALUES ($1, $2, $3, $4) RETURNING *",
          [eventDate, title, note, eventPrio])

      res.json({command: newCurrency.command, data: newCurrency.rows[0]})
  } catch (error) {
      console.log(error)
  }
})

// Update currency API
routerEvent.post("/update/:id", async(req: Request, res: Response) => {
  try {
    console.log("Update event: " +req)
    console.table(req.body)

    const { eventID, eventDate, eventTitle, eventNote, eventPrio } = req.body

    const updateEvent = await pool.query(
                        "UPDATE event SET date=$2, title=$3, note=$4, priority=$5 WHERE event_id=$1 RETURNING *",
                        [eventID, eventDate, eventTitle, eventNote, eventPrio]
    )
    
    res.json(updateEvent.command)
  } catch (error) {
    console.log(error)
  }
})

// delete currency API
routerEvent.post("/delete/:id", async(req: Request, res: Response) => {
  try {
    console.log("Update event: " +req)
    const { id } = req.params
    console.log(id)
    
    const updateEvent = await pool.query( "DELETE FROM event WHERE event_id=$1", [id] )
    
    res.json(updateEvent.command)
  } catch (error) {
    console.log(error)
  }
})

export default routerEvent;