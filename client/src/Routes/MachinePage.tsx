import React from 'react';
import { Stack, Box, Container } from '@mui/material'
import { useStateProvider } from '../Utility/Reducer/StateProvider';
import MachineFilter from '../Container/Machine/MachineFilter';
import MachineTimeline from '../Container/Machine/MachineTimeline';
import { constantStyle } from '../Utility/CustomStyle';

export default function MachinePage() {
    const [{ machineAsset }, dispatch] = useStateProvider()

    return (
        <>
            <MachineFilter />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, paddingTop: 2 }}>
                {
                    machineAsset.map((asset: any, index: number, array: string[]) => {
                        console.log(asset.id)
                        return (
                            <Stack spacing={1} key={index} direction='row'>
                                <Box sx={{ width: '20%', bgcolor: constantStyle.color_base_400, padding: 1 }}>
                                    {asset.name}
                                </Box>
                                <Box sx={{ width: '80%', bgcolor: constantStyle.color_base_400, padding: 1 }}>
                                    <MachineTimeline asset_id={asset.id} />
                                </Box>
                            </Stack>
                        )
                    })
                }
            </Box>

            
        </>
    );
}
