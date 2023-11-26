import { useQuery } from '@tanstack/react-query';
import { Stack, Box, Typography } from '@mui/material';
import { Chart, } from "react-google-charts";

import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { reducerCases } from '../../Utility/Reducer/Constant';

export default function MachineTimeline(props: { asset_id: number }) {
    const [{ token, machineFilterWorkstation, machineFilterDate }, dispatch] = useStateProvider()
    const { from, to } = machineFilterDate

    const fetchOption = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
    };
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
        console.log({ status, fetchStatus, transactions })
    }

    const options = {
        backgroundColor: "#c9cacd",
        colors: status == "success" ? transactions.timelineColors : 'black',
        timeline: {
            showRowLabels: false,
            groupByRowLabel: true,
            barLabelStyle: { fontSize: 10 },
        },
    };
    const notOptions = {
        backgroundColor: "#c9cacd",
        colors: ['gray'],
        timeline: {
            showRowLabels: false,
            groupByRowLabel: true,
            barLabelStyle: { fontSize: 10 },
        },
    };

    const columns = [
        { type: "string", id: "Utilize" },
        { type: "string", id: "State" },
        { type: "date", id: "Start" },
        { type: "date", id: "End" },
    ];
    const rows = [
        ["No data", "", new Date(from), new Date(to)],
    ];


    return (
        <Stack direction='row'>
            <Box sx={{ padding: '4px 32px' }}>
                <Box sx={{ padding: 2, bgcolor: 'orange', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="subtitle1" color="White">Utilize</Typography>
                    <Typography variant="subtitle2" color='white'>0%</Typography>
                </Box>
            </Box>
            <Box sx={{ padding: '4px 0', width: '100%' }}>
                {status == 'success' && 
                    <>
                        {transactions.isTimeline && <Chart loader={<div>Loading Chart</div>}
                                                            chartType="Timeline"
                                                            options={options}
                                                            data={[columns, ...transactions.timelineData]} height="90px" />}
                        {!transactions.isTimeline && <Chart loader={<div>Loading Chart</div>}
                                                            chartType="Timeline"
                                                            options={notOptions}
                                                            data={[columns, ...rows]} height="90px" />}
                    </>
                }
            </Box>
        </Stack>
    );
}
