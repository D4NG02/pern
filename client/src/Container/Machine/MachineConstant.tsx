import { useStateProvider } from '../../Utility/Reducer/StateProvider';

export const inputSchema = {
  Name: String,
  Index: Number
};
export type inputSchemaType = typeof inputSchema;









export const Timeline = (asset_id: number) => {
  const dataFor = asset_id
  const [{ machineFilterDate, machineTimeline }, dispatch] = useStateProvider()
  const dateArray = machineFilterDate.split("-")
  let isTimeline = false
  let timelineData: any[] = []
  let runTransaction: any[] = []

  let assetTransaction = getAssetTransaction(machineTimeline, asset_id)
  let startTime: Date, endTime: Date;

  assetTransaction.map((assetTimeline: any, index: number, assetTimelineArray: any[]) => {
    if (assetTimeline.asset_id == asset_id) {
      isTimeline=true
      let machineState = ''

      // set machine state
      if (index + 1 < assetTimelineArray.length) {
        machineState = getMachineState(assetTimelineArray[index + 1].value)
      } else {
        machineState = 'Offline'
      }

      // set start time
      if (index == 0) {
        startTime = new Date(Number(dateArray[0]), Number(dateArray[1] - 1), Number(dateArray[2]))
      } else if (index - 1 !== -1) {
        startTime = endTime
      }

      // set end time
      if (index + 1 < assetTimelineArray.length) {
        endTime = assetTimelineArray[index + 1].timestamp
      } else {
        // endTime= new Date( Number(dateArray[0]), Number(dateArray[1]), Number(dateArray[2]+1) )
        endTime = assetTimelineArray[index].timestamp
      }

      timelineData.push(["Utilize", machineState, startTime, endTime])

      if (assetTimeline.value === 1) {
        runTransaction.push(assetTimeline)
      }
    }
  })

  // console.log(dateArray)
  console.log({ isTimeline, assetTransaction, timelineData })

  return { timelineData }
}
const getAssetTransaction = (machineTimeline: any[], id: number) => {
  let data: any[] = []
  machineTimeline.map((timeline: any, index: number, timelineArray: any[]) => {
    if (timeline.asset_id == id) {
      data.push(timeline)
    }
  })

  return data
}
const getMachineState = (state: number) => {
  switch (state) {
    case 1:
      return 'Running';
    case 2:
      return 'Idle';
    case 3:
      return 'Down';
    case 4:
      return 'Offline';
    default:
      return 'machine state?'
  }
}