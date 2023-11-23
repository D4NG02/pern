import { useEffect, useRef, useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { Chart, } from "react-google-charts";

import { useStateProvider } from '../../Utility/Reducer/StateProvider';

export default function MachineTimeline(props: { asset_id: number }) {
    const [{ machineFilterDate }, dispatch] = useStateProvider()
    const [sheetTransaction, setSheetTransaction] = useState<any[]>([]);

    const columns = [
        { type: "string", id: "Utilize" },
        { type: "string", id: "State" },
        { type: "date", id: "Start" },
        { type: "date", id: "End" },
    ];
    const rows = [
        ["Utilize", "Running", new Date(2023, 2, 1), new Date(2023, 2, 7)],
        ["Utilize", "Idle", new Date(2023, 2, 7), new Date(2023, 2, 14)],
        ["Utilize", "Down", new Date(2023, 2, 14), new Date(2023, 2, 21)],
        ["Utilize", "Offline", new Date(2023, 2, 21), new Date(2023, 2, 30)],
    ];
    const data = [columns, ...rows];

    const options = {
        backgroundColor: "#c9cacd",
        colors: ["green", "orange", "red", "black"],
        timeline: {
            showRowLabels: false,
            groupByRowLabel: true,
            barLabelStyle: { fontSize: 10 },
        },
    };

    return (
        <Stack direction='row'>
            <Box sx={{ padding: '8px 32px' }}>
                <Box sx={{ padding: 2, bgcolor: 'orange', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="subtitle1" color="White">Utilize</Typography>
                    <Typography variant="subtitle2" color='white'>?%</Typography>
                </Box>
            </Box>
            <Box sx={{ padding: '8px 0', width: '100%' }}>
                <Chart chartType="Timeline" options={options} data={data} width="100%" height="90px" />
            </Box>
        </Stack>
    );
}
