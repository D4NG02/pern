import { Router, Request, Response } from 'express';
import dayjs, { Dayjs } from 'dayjs';
import pool from '../db';
import authorize from "../middleware/authorization";

const routerMachine = Router();

// Get all currency API
routerMachine.get("/sites", authorize, async (req: Request, res: Response) => {
  try {
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
    let { rows } = await pool.query("SELECT * FROM assets WHERE workstation_id=$1", [id])
    res.json(rows)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error")
  }
})

routerMachine.get("/transactions/:asset_id/:timestampFrom/:timestampTo", authorize, async (req: Request, res: Response) => {
  try {
    const asset_id: number = req.params.asset_id
    const timestampFrom = dayjs(req.params.timestampFrom)
    const timestampTo = dayjs(req.params.timestampTo)
    let { rows } = await pool.query("SELECT * FROM transactions WHERE asset_id=$1 AND timestamp>=$2", [asset_id, timestampFrom])

    let data: any[] = []
    rows = rows.map((transaction: any, index: number, array: string[]) => {
      if (dayjs(transaction.timestamp).isBefore(timestampTo) && dayjs(transaction.timestamp).isAfter(timestampFrom)) {
        transaction = {
          transaction_id: transaction.transaction_id,
          asset_id: transaction.asset_id,
          timestamp: getDateFormated(transaction.timestamp),
          value: transaction.value
        }
        data.push(transaction)
      }
    })


    const dateFrom = req.params.timestampFrom
    const dateTo = req.params.timestampTo
    let isTimeline = false
    let timelineUtilize: number
    let startTime: string
    let endTime: string
    let timelineData: any[] = []
    let timelineColors: string[] = []
    let assetTransaction: object[] = getAssetTransaction(data, asset_id, dateFrom, dateTo)
    assetTransaction.map((assetTimeline: any, index: number, assetTimelineArray: any[]) => {
      if (assetTimeline.asset_id == asset_id) {
        isTimeline = true
        let machineState: string[] = []

        machineState = getMachineState(assetTimelineArray, index)
        if (!timelineColors.includes(machineState[1])) {
          timelineColors.push(machineState[1])
        }

        startTime = getMachineStartTime(dateFrom, assetTimeline.timestamp, index, endTime)
        endTime = getMachineEndTime(dateTo, assetTimelineArray, index, endTime)

        timelineData.push(["Utilize", machineState[0], startTime, endTime])
      }
    })
    timelineUtilize = getMachineUtilize(timelineData, dateFrom, dateTo)

    res.json({ asset_id, isTimeline, timelineUtilize, timelineColors, timelineData, assetTransaction })
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

  data = start.concat(machineTimeline)
  return data
}

const getMachineState = (assetTimelineArray: any[], index: number) => {
  let state = assetTimelineArray[index].value

  switch (state) {
    case 1:
      return ['Running', '#2e7d32'];
    case 2:
      return ['Idle', '#ed6c02'];
    case 3:
      return ['Down', '#d32f2f'];
    case 4:
      return ['Offline', 'black'];
    case 5:
      return ['No data', 'darkgray'];
    default:
      return ['Offline', 'black']
  }
}

const getMachineStartTime = (filteredDate: string, timestamp: string, index: Number, endTime: string) => {
  let start = dayjs(filteredDate)
  let end = dayjs(timestamp)
  let time: string = ''

  if ((end.diff(start, 'day', true).valueOf() == 0) && (index == 0)) {
    time = "Date(" + start.year() + ", " + start.month() + ", " + start.date() + ", " + start.hour() + ", " + start.minute() + ", " + start.second() + ")"
  } else if (end.diff(start, 'day', true).valueOf() != 0) {
    time = "Date(" + end.year() + ", " + end.month() + ", " + end.date() + ", " + end.hour() + ", " + end.minute() + ", " + end.second() + ")"
  }

  return time
}

const getMachineEndTime = (dateTo: string, assetTimelineArray: any[], index: number, endTime: string) => {
  let nextKey = index + 1
  let assetLength = assetTimelineArray.length

  if (assetLength > nextKey) {
    let time = dayjs(assetTimelineArray[nextKey].timestamp)
    return "Date(" + time.year() + ", " + time.month() + ", " + time.date() + ", " + time.hour() + ", " + time.minute() + ", " + time.second() + ")"
  } else if (assetLength - 1 == index) {
    let end = dayjs(dateTo)
    return "Date(" + end.year() + ", " + end.month() + ", " + end.date() + ", " + end.hour() + ", " + end.minute() + ", " + end.second() + ")"
  } else {
    let time = dayjs(assetTimelineArray[nextKey].timestamp)
    return "Date(" + time.year() + ", " + time.month() + ", " + time.date() + ", " + time.hour() + ", " + time.minute() + ", " + time.second() + ")"
  }
}

const getMachineUtilize = (timelineData: any[], dateFrom: string, dateTo: string) => {
  let total: number = dayjs(dateTo).diff(dateFrom, 'hour', true).valueOf()
  let running: number = 0

  timelineData.map((timeline: any, index: number, timelineArray: any[]) => {
    if (timeline[1] == 'Running') {
      let startTime = timeline[2].split('Date(')[1].split(')')[0].split(', ')
      let endTime = timeline[3].split('Date(')[1].split(')')[0].split(', ')

      startTime.map((timeline: any, index: number, timelineArray: any[]) => {
        return timelineArray[index] = Number(timeline)
      })
      endTime.map((timeline: any, index: number, timelineArray: any[]) => {
        return timelineArray[index] = Number(timeline)
      })

      startTime = new Date(startTime[0], startTime[1], startTime[2], startTime[3], startTime[4], startTime[5])
      endTime = new Date(endTime[0], endTime[1], endTime[2], endTime[3], endTime[4], endTime[5])
      startTime = dayjs(startTime)
      endTime = dayjs(endTime)

      running = running + endTime.diff(startTime, 'hour', true).valueOf()
    }
  })

  return Number(((running / total) * 100).toFixed())
}

const getDateFormated = (timestamp: string) => {
  let time: string = new Date(timestamp).toString()
  return time
}