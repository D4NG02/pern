import { useState } from 'react';
import { Stack, Box, Chip, IconButton, ButtonGroup, Button } from '@mui/material'

import { useStateProvider } from '../Utility/Reducer/StateProvider';
import MachineFilter from '../Container/Machine/MachineFilter';
import MachineTimeline from '../Container/Machine/MachineTimeline';
import { constantStyle } from '../Utility/CustomStyle';

import SkipPreviousTwoToneIcon from '@mui/icons-material/SkipPreviousTwoTone';
import PlayArrowTwoToneIcon from '@mui/icons-material/PlayArrowTwoTone';
import SkipNextTwoToneIcon from '@mui/icons-material/SkipNextTwoTone';

export default function MachinePage() {
    const [{ machineAsset, machineTimeline }, dispatch] = useStateProvider()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState( Math.ceil(machineTimeline.length /4) )

    const prevPage = () => {
        if(currentPage -1 != 0){
            setCurrentPage(currentPage -1)
        }
    }
    const nextPage = () => {
        if(currentPage +1 <= totalPage){
            setCurrentPage(currentPage +1)
        }
    }

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
                                    <img src={require('../Asset/Asset1.jpg').default} alt={asset.name} />
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

            {machineAsset.length > 0 && 
                <Stack paddingTop={2} paddingX={2} spacing={1} direction='row' sx={{ justifyContent: 'center' }}>
                    <IconButton size='small' sx={{ borderRadius: 2, border: '1px solid '+constantStyle.color_primary, color: constantStyle.color_primary }}>
                        <SkipPreviousTwoToneIcon />
                    </IconButton>
                    <IconButton size='small' sx={{ borderRadius: 2, border: '1px solid '+constantStyle.color_primary, color: constantStyle.color_primary }}
                                onClick={prevPage}>
                        <PlayArrowTwoToneIcon sx={{ transform: 'rotate(180deg)' }} />
                    </IconButton>
                    <Chip label={currentPage +'/'+ totalPage} variant="outlined"
                            sx={{ width: '80px', textAlign: 'center', display: 'inline-flex', color: constantStyle.color_primary, borderColor: constantStyle.color_primary }} />
                    <IconButton size='small' sx={{ borderRadius: 2, border: '1px solid '+constantStyle.color_primary, color: constantStyle.color_primary }}
                                onClick={nextPage}>
                        <PlayArrowTwoToneIcon />
                    </IconButton>
                    <IconButton size='small' sx={{ borderRadius: 2, border: '1px solid '+constantStyle.color_primary, color: constantStyle.color_primary }}>
                        <SkipNextTwoToneIcon />
                    </IconButton>
                </Stack>
            }
        </>
    );
}
