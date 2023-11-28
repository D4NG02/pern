import { Router, Request, Response } from 'express';
import pool from '../db';
import authorize from "../middleware/authorization";

const routerMachine = Router();

// Get all currency API
routerMachine.get("/sites", authorize, async (req: Request, res: Response) => {
  try {
    console.log("Get all sites")
    let { rows } = await pool.query("SELECT * FROM sites")
    console.log()
    console.log("Get all sites: ", rows)
    res.json(rows)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error")
  }
})

routerMachine.get("/plants/:site_id", authorize, async (req: Request, res: Response) => {
  try {
    const id: Number = req.params.site_id
    let { rows } = await pool.query("SELECT * FROM plants WHERE site_id=$1", [id])
    console.log()
    console.log("Get all plants for site: " + id, rows)
    res.json(rows)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error")
  }
})

routerMachine.get("/departments/:plant_id", authorize, async (req: Request, res: Response) => {
  try {
    const id: Number = req.params.plant_id
    let { rows } = await pool.query("SELECT * FROM departments WHERE department_id=$1", [id])
    console.log()
    console.log("Get all departments for plant: " + id, rows)
    res.json(rows)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error")
  }
})

routerMachine.get("/workcenters/:department_id", authorize, async (req: Request, res: Response) => {
  try {
    const id: Number = req.params.department_id
    let { rows } = await pool.query("SELECT * FROM workcenters WHERE department_id=$1", [id])
    console.log()
    console.log("Get all workcenters for department: " + id, rows)
    res.json(rows)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error")
  }
})

routerMachine.get("/workstations/:workcenter_id", authorize, async (req: Request, res: Response) => {
  try {
    const id: Number = req.params.workcenter_id
    let { rows } = await pool.query("SELECT * FROM workstations WHERE workcenter_id=$1", [id])
    console.log()
    console.log("Get all workstations for workcenter: " + id, rows)
    res.json(rows)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error")
  }
})

routerMachine.get("/assets/:workstation_id", authorize, async (req: Request, res: Response) => {
  try {
    const id: Number = req.params.workstation_id
    let { rows } = await pool.query("SELECT * FROM assets WHERE workstation_id=$1", [id])
    console.log()
    console.log("Get all assets for workstation: " + id, rows)
    console.log(rows)
    res.json(rows)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error")
  }
})

export default routerMachine;