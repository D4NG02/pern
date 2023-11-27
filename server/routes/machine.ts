import { Router, Request, Response } from 'express';
import dayjs, { Dayjs } from 'dayjs';
import pool from '../db';
import authorize from "../middleware/authorization";

const routerMachine = Router();

// Get all currency API
routerMachine.get("/sites", authorize, async (req: Request, res: Response) => {
  try {
    console.log("-------------------------------------------------------------------")
    console.log("Get all sites")
    let { rows } = await pool.query("SELECT * FROM sites")
    res.json(rows)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error")
  }
})

routerMachine.get("/plants/:site_id", authorize, async (req: Request, res: Response) => {
  try {
    const id: Number = req.params.site_id
    console.log()
    console.log("Get all plants for site: " + id)
    let { rows } = await pool.query("SELECT * FROM plants WHERE site_id=$1", [id])
    res.json(rows)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error")
  }
})

routerMachine.get("/departments/:plant_id", authorize, async (req: Request, res: Response) => {
  try {
    const id: Number = req.params.plant_id
    console.log()
    console.log("Get all departments for plant: " + id)
    let { rows } = await pool.query("SELECT * FROM departments WHERE plant_id=$1", [id])
    res.json(rows)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error")
  }
})

routerMachine.get("/workcenters/:department_id", authorize, async (req: Request, res: Response) => {
  try {
    const id: Number = req.params.department_id
    console.log()
    console.log("Get all workcenters for department: " + id)
    let { rows } = await pool.query("SELECT * FROM workcenters WHERE department_id=$1", [id])
    res.json(rows)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error")
  }
})

routerMachine.get("/workstations/:workcenter_id", authorize, async (req: Request, res: Response) => {
  try {
    const id: Number = req.params.workcenter_id
    console.log()
    console.log("Get all workstations for workcenter: " + id)
    let { rows } = await pool.query("SELECT * FROM workstations WHERE workcenter_id=$1", [id])
    res.json(rows)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error")
  }
})

routerMachine.get("/assets/:workstation_id", authorize, async (req: Request, res: Response) => {
  try {
    const id: Number = req.params.workstation_id
    console.log()
    console.log("Get all assets for workstation: " + id)
    let { rows } = await pool.query("SELECT * FROM assets WHERE workstation_id=$1", [id])
    res.json(rows)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error")
  }
})

routerMachine.get("/transactions/:asset_id/:timestampFrom/:timestampTo", authorize, async (req: Request, res: Response) => {
  try {
    console.log()
    console.log("Get all transactions for asset: ", req.params)
    const asset_id: number = req.params.asset_id
    const timestampFrom = dayjs(req.params.timestampFrom)
    const timestampTo = dayjs(req.params.timestampTo)
    let { rows } = await pool.query("SELECT * FROM transactions WHERE asset_id=$1 AND timestamp>=$2", [asset_id, timestampFrom])

    let data: any[]=[]
    rows = rows.map((transaction: any, index: number, array: string[]) => {
      if (dayjs(transaction.timestamp).isBefore(timestampTo) && dayjs(transaction.timestamp).isAfter(timestampFrom)) {
        transaction = {
          transaction_id: transaction.transaction_id,
          asset_id: transaction.asset_id,
          timestamp: getDateFormated(transaction.timestamp),
          value: transaction.value}
        data.push(transaction)
      }
    })

    
    const dateFrom = req.params.timestampFrom
    const dateTo = req.params.timestampTo
    let isTimeline = false
    let timelineUtilize: number
    let startTime: string | Date
    let endTime: string | Date
    let timelineData: any[] = []
    let timelineColors: string[] = []
    let assetTransaction = getAssetTransaction(data, asset_id, dateFrom, dateTo)
    assetTransaction.map((assetTimeline: any, index: number, assetTimelineArray: any[]) => {
      if (assetTimeline.asset_id == asset_id) {
        isTimeline = true
        let machineState: any[] = []
  
        machineState = getMachineState(assetTimelineArray, index)
        timelineColors.push(machineState[1])

        startTime = getMachineStartTime(dateFrom, assetTimeline.timestamp, index, endTime)
        endTime = getMachineEndTime(dateTo, assetTimelineArray, index, endTime)
        
        timelineData.push(["Utilize", machineState[0], startTime, endTime])
      }
    })
    timelineUtilize = getMachineUtilize(timelineData, dateFrom, dateTo)
    
    res.json({asset_id, isTimeline, timelineUtilize, timelineColors, timelineData, assetTransaction})
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
})

export default routerMachine;


const getAssetTransaction = (machineTimeline: any[], id: number, timestampFrom: string, timestampTo: Date) => {
  let empty = {
    asset_id: id,
    timestamp: getDateFormated(timestampFrom),
    value: 5  // Blank
  }
  let data: any[] = []
  let start: any[] = []
  let end: any[] = []
  
  // timestamp in 1st array not start time
  machineTimeline.map((transaction: any, index: number, dataArray: any[]) => {
    if ((dayjs(transaction.timestamp).isAfter(timestampFrom)) && (index == 0)) {
      start.push(empty)
    }
  })
  
  // timestamp in last array not end time
  // machineTimeline.map((transaction: any, index: number, dataArray: any[]) => {
  //   if ((dayjs(transaction.timestamp).isBefore(timestampTo)) && (index == dataArray.length-1)) {
  //     end.push(empty)
  //   }
  // })

  data = start.concat(machineTimeline)
  // data = data.concat(end)
  return data
}

const getMachineState = (assetTimelineArray: any[], index: number) => {
  let state = assetTimelineArray[index].value

  switch (state) {
    case 1:
      return ['Running', 'green'];
    case 2:
      return ['Idle', 'orange'];
    case 3:
      return ['Down', 'red'];
    case 4:
      return ['Offline', 'black'];
    case 5:
      return ['No data', 'gray'];
    default:
      return ['Offline', 'black']
  }
}

const getMachineStartTime = (filteredDate: string, timestamp: string, index: Number, endTime: string | Date) => {
  let start = dayjs(filteredDate)
  let end = dayjs(timestamp)

  if ((end.diff(start, 'day', true).valueOf()==0) && (index == 0)) {
    // timestamp in 1st array is start time
    console.log('start period')
    return getDateFormated(filteredDate)
  } else if ((end.diff(start, 'day', true).valueOf()!=0) && (index == 0)) {
    // timestamp in 1st array not start time
    console.log('not start')
    return getDateFormated(timestamp)
  } else {
    console.log('else start')
    return getDateFormated(endTime)
  }
}

const getMachineEndTime = (dateTo: string, assetTimelineArray: any[], index: number, endTime: string | Date) => {
  let nextKey = index + 1
  let assetLength = assetTimelineArray.length

  if (assetLength > nextKey) {
    return getDateFormated(assetTimelineArray[nextKey].timestamp)
  } else if (assetLength - 1 == index) {
    return getDateFormated(dateTo)
  } else {
    return getDateFormated(assetTimelineArray[nextKey].timestamp)
  }
}

const getMachineUtilize = (timelineData: any[], dateFrom: string, dateTo: string) => {
  let total: number = dayjs(dateTo).diff(dateFrom, 'hour', true).valueOf()
  let running: number = 0

  timelineData.map((timeline: any, index: number, timelineArray: any[]) => {
    if (timeline[1] == 'Running') {
      let start = dayjs(timeline[2])
      let end = dayjs(timeline[3])

      running = running + end.diff(start, 'hour', true).valueOf()
    }
  })

  return Number(((running / total) * 100).toFixed())
}

const getDateFormated = (timestamp: string | Date) => {
  const year = new Date(timestamp).getUTCFullYear()
  const month = new Date(timestamp).getUTCMonth()
  const date = new Date(timestamp).getUTCDate()
  const hour = new Date(timestamp).getUTCHours()
  const minute = new Date(timestamp).getUTCMinutes()
  return new Date(year, month, date, hour, minute)
}