import { Stack, Box, Chip } from '@mui/material'
import { useStateProvider } from '../Utility/Reducer/StateProvider';
import MachineFilter from '../Container/Machine/MachineFilter';
import MachineTimeline from '../Container/Machine/MachineTimeline';
import { constantStyle } from '../Utility/CustomStyle';

export default function MachinePage() {
    const [{ machineAsset, machineTimeline }, dispatch] = useStateProvider()

    console.clear()
    return (
        <>
            <MachineFilter />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: 2, maxHeight: '642px', overflowY: 'auto' }}>
                {
                    machineAsset.map((asset: any, index: number, array: string[]) => {
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

            {machineTimeline.length > 0 && 
                <Stack paddingTop={2} paddingX={2} spacing={2} direction='row' sx={{ justifyContent: 'flex-end' }}>
                    <Chip label="Running" color="success" variant='filled' />
                    <Chip label="Idle" color="warning" variant='filled' />
                    <Chip label="Down" color="error" variant='filled' />
                    <Chip label="Offline" sx={{ bgcolor: 'black', color: 'white' }} variant='filled' />
                </Stack>
            }
        </>
    );
}
