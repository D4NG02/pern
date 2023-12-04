import { useQuery } from '@tanstack/react-query';
import { Stack, Box, Typography } from '@mui/material';
import { Chart } from "react-google-charts";
import dayjs from 'dayjs';

import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { reducerCases } from '../../Utility/Reducer/Constant';
import { FetchGetOptions } from './MachineConstant';

export default function MachineTimeline(props: { asset_id: number }) {
    const [{ machineFilterWorkstation, machineFilterDate }, dispatch] = useStateProvider()
    const { from, to } = machineFilterDate
    const dateDiff = dayjs(new Date().toDateString()).diff(from, 'hour', true).valueOf()

    const { options: fetchOption } = FetchGetOptions()
    const { status, fetchStatus, data: transactions } = useQuery({
        queryFn: async () => await fetch("/machine/transactions/" + props.asset_id + '/' + from + '/' + to, fetchOption)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else if (response.status === 403 && response.statusText === "Forbidden") {
                    sessionStorage.removeItem("token");
                    dispatch({ type: reducerCases.SET_TOKEN, token: null })
                    dispatch({ type: reducerCases.SET_CARD, cardType: null })
                } else {
                    console.log(response)
                }
            }),
        queryKey: ["machine_Transactions_" + props.asset_id],
        enabled: !!machineFilterWorkstation,
    })
    if (status == "success") {
        console.log(transactions)
    }

    const options = {
        avoidOverlappingGridLines: false,
        backgroundColor: "#c9cacd",
        colors: (status == "success" && transactions.isTimeline) ? transactions.timelineColors : ['black'],
        timeline: {
            showRowLabels: false,
            groupByRowLabel: true,
            barLabelStyle: { fontSize: 8 },
        },
    };
    const optionToday = {
        avoidOverlappingGridLines: false,
        backgroundColor: "#c9cacd",
        colors: ['black', 'gray'],
        timeline: {
            showRowLabels: false,
            groupByRowLabel: true,
            barLabelStyle: { fontSize: 8 },
        },
    };

    const columns = [
        { type: "string", id: "Utilize" },
        { type: "string", id: "State" },
        { type: "date", id: "Start" },
        { type: "date", id: "End" },
    ];

    let rowToday = [
        ["", "Offline", new Date(new Date().toDateString()),
            new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes())],
        ["", "No data", new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes()),
            new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)],
    ]
    const rows = dateDiff == 0 ? rowToday : [["", "Offline", new Date(new Date(from).toDateString()), new Date(new Date(to).toDateString())]]


    return (
        <Stack direction='row'>
            <Box sx={{ padding: '4px 32px' }}>
                <Box sx={{ padding: 2, bgcolor: 'orange', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="subtitle1" color="White">Utilize</Typography>
                    <Typography variant="subtitle2" color='white'>{transactions? transactions.timelineUtilize:0}%</Typography>
                </Box>
            </Box>
            <Box sx={{ padding: '4px 0', width: '100%' }}>
                {status == 'success' &&
                    <>
                        {transactions.isTimeline && <Chart loader={<div>Loading Chart</div>}
                            chartType="Timeline"
                            options={options}
                            data={[columns, ...transactions.timelineData]} height="90px" />}
                        {!transactions.isTimeline &&
                            <>
                                {dateDiff == 0 ?
                                    <Chart loader={<div>Loading Chart</div>} chartType="Timeline" options={optionToday} data={[columns, ...rows]} height="90px" />
                                    : <Chart loader={<div>Loading Chart</div>} chartType="Timeline" options={options} data={[columns, ...rows]} height="90px" />
                                }
                            </>
                        }
                    </>
                }
            </Box>
        </Stack>
    );
}
