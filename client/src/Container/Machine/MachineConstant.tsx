import dayjs, { Dayjs } from 'dayjs';
import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { reducerCases } from '../../Utility/Reducer/Constant';

export const inputSchema = {
  Name: String,
  Index: Number
};
export type inputSchemaType = typeof inputSchema;


export const FetchGetOptions = () => {
  const [{ token }, dispatch] = useStateProvider()
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'token': token
    },
  };

  return { options }
};



export const Timeline = (asset_id: number) => {
  const [{ machineFilterDate, machineTimeline }, dispatch] = useStateProvider()
  const filteredDate = machineFilterDate.split("-")
  let startTime: Date, endTime: Date;
  let timelineColors: string[] = []
  let timelineData: any[] = []
  let isTimeline = false
  let timelineUtilize

  let assetTransaction = getAssetTransaction(machineTimeline, asset_id, filteredDate)

  assetTransaction.map((assetTimeline: any, index: number, assetTimelineArray: any[]) => {
    if (assetTimeline.asset_id == asset_id) {
      isTimeline = true
      let machineState: any[] = []

      machineState = getMachineState(assetTimelineArray, index)
      timelineColors.push(machineState[1])

      startTime = getMachineStartTime(filteredDate, assetTimeline.timestamp, index, endTime)
      endTime = getMachineEndTime(filteredDate, assetTimelineArray, index, endTime)

      timelineData.push(["Utilize", machineState[0], startTime, endTime])
    }
  })
  timelineUtilize = getMachineUtilize(timelineData)

  // console.log({ assetTransaction, timelineUtilize, timelineColors, timelineData })
  return { isTimeline, timelineUtilize, timelineColors, timelineData }
}
const getAssetTransaction = (machineTimeline: any[], id: number, filteredDate: string[]) => {
  const filterYear = Number(filteredDate[0])
  const filterMonth = Number(filteredDate[1]) - 1
  const filterday = Number(filteredDate[2])
  const filterDate = new Date(filterYear, filterMonth, filterday)
  let empty = {
    asset_id: id,
    timestamp: filterDate,
    value: 4
  }
  let data: any[] = []
  let start: any[] = []
  let end: any[] = []

  machineTimeline.map((timeline: any, index: number, timelineArray: any[]) => {
    if (timeline.asset_id == id) {
      data.push(timeline)
    }
  })

  data.map((data: any, index: number, dataArray: any[]) => {
    if ((filterDate.getTime() != (new Date(data.timestamp)).getTime()) && (index == 0)) {
      // timestamp in 1st array not start time
      start.push(empty)
    }
  })

  data = start.concat(data)
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
    default:
      return ['Offline', 'black']
  }
}
const getMachineStartTime = (filteredDate: String[], timestamp: Date, index: Number, endTime: Date) => {
  let startTime
  const filterYear = Number(filteredDate[0])
  const filterMonth = Number(filteredDate[1]) - 1
  const filterday = Number(filteredDate[2])
  const filterDate = new Date(filterYear, filterMonth, filterday)

  if ((filterDate == timestamp) && (index == 0)) {
    // timestamp in 1st array is start time
    startTime = filterDate
  } else if ((filterDate != timestamp) && (index == 0)) {
    // timestamp in 1st array not start time
    startTime = timestamp
  } else {
    startTime = endTime
  }

  return startTime
}
const getMachineEndTime = (filteredDate: String[], assetTimelineArray: any[], index: number, endTime: Date) => {
  const filterYear = Number(filteredDate[0])
  const filterMonth = Number(filteredDate[1]) - 1
  const filterday = Number(filteredDate[2]) + 1
  const filterDate = new Date(filterYear, filterMonth, filterday)

  let nextKey = index + 1
  let assetLength = assetTimelineArray.length

  if (assetLength > nextKey) {
    endTime = assetTimelineArray[nextKey].timestamp
  } else if (assetLength - 1 == index) {
    endTime = filterDate
  } else {
    endTime = assetTimelineArray[index].timestamp
  }

  return endTime
}
const getMachineUtilize = (timelineData: any[]) => {
  let running: number = 0

  timelineData.map((timeline: any, index: number, timelineArray: any[]) => {
    if (timeline[1] == 'Running') {
      let start = dayjs(timeline[2])
      let end = dayjs(timeline[3])

      running = running + end.diff(start, 'hour', true).valueOf()
    }
  })

  return ((running / 24) * 100).toFixed()
}