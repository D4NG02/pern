import { useEffect, useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { Chart, } from "react-google-charts";

import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { Timeline } from './MachineConstant';

export default function MachineTimeline(props: { asset_id: number }) {
    const [{ machineTimeline, machineFilterDate }, dispatch] = useStateProvider()
    const { timelineData } = Timeline(props.asset_id)
    const [utilize, setUtilize] = useState(0);

    const options = {
        backgroundColor: "#c9cacd",
        colors: ["green", "orange", "red", "black"],
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
        ["Utilize", "Running", new Date(2023, 2, 1), new Date(2023, 2, 2)],
        ["Utilize", "Idle", new Date(2023, 2, 2), new Date(2023, 2, 3)],
        ["Utilize", "Down", new Date(2023, 2, 3), new Date(2023, 2, 4)],
        ["Utilize", "Offline", new Date(2023, 2, 4), new Date(2023, 2, 5)],
    ];
    const data = [columns, ...timelineData];
    
    return (
        <Stack direction='row'>
            <Box sx={{ padding: '8px 32px' }}>
                <Box sx={{ padding: 2, bgcolor: 'orange', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="subtitle1" color="White">Utilize</Typography>
                    <Typography variant="subtitle2" color='white'>?%</Typography>
                </Box>
            </Box>
            <Box sx={{ padding: '8px 0', width: '100%' }}>
                {timelineData && <Chart loader={<div>Loading Chart</div>} chartType="Timeline" options={options} data={data} width="100%" height="90px" />}
            </Box>
        </Stack>
    );
}
