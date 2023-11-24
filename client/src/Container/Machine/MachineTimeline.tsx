import { useEffect, useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { Chart, } from "react-google-charts";

import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { Timeline } from './MachineConstant';

export default function MachineTimeline(props: { asset_id: number }) {
    const [{ machineTimeline, machineFilterDate }, dispatch] = useStateProvider()
    const { isTimeline, timelineUtilize, timelineColors, timelineData } = Timeline(props.asset_id)
    const dateArray = machineFilterDate.split("-")

    const options = {
        backgroundColor: "#c9cacd",
        colors: timelineColors,
        timeline: {
            showRowLabels: false,
            groupByRowLabel: true,
            barLabelStyle: { fontSize: 10 },
        },
    };
    const notOptions = {
        backgroundColor: "#c9cacd",
        colors: ['black'],
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
        ["Utilize", "Offline", new Date(machineFilterDate), new Date(Number(dateArray[0]), Number(dateArray[1])-1, Number(dateArray[2])+1)],
    ];
    const data = isTimeline? [columns, ...timelineData]:[columns, ...rows];
    
    return (
        <Stack direction='row'>
            <Box sx={{ padding: '8px 32px' }}>
                <Box sx={{ padding: 2, bgcolor: 'orange', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="subtitle1" color="White">Utilize</Typography>
                    <Typography variant="subtitle2" color='white'>{timelineUtilize}%</Typography>
                </Box>
            </Box>
            <Box sx={{ padding: '8px 0', width: '100%' }}>
                {isTimeline && <Chart loader={<div>Loading Chart</div>} chartType="Timeline" options={options} data={data} height="90px" />}

                {/* xaxis */}
                {/* {!isTimeline && <Chart loader={<div>Loading Chart</div>} chartType="Timeline" options={notOptions} data={data} width="100%" height="90px" />} */}
            </Box>
        </Stack>
    );
}
