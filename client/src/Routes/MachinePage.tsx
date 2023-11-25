import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Stack, Box, Chip, IconButton, ButtonGroup, Button } from '@mui/material'

import { useStateProvider } from '../Utility/Reducer/StateProvider';
import MachineFilter from '../Container/Machine/MachineFilter';
import MachineTimeline from '../Container/Machine/MachineTimeline';
import { FetchGetOptions } from '../Container/Machine/MachineConstant';
import { reducerCases } from '../Utility/Reducer/Constant';
import { constantStyle } from '../Utility/CustomStyle';

import SkipPreviousTwoToneIcon from '@mui/icons-material/SkipPreviousTwoTone';
import PlayArrowTwoToneIcon from '@mui/icons-material/PlayArrowTwoTone';
import SkipNextTwoToneIcon from '@mui/icons-material/SkipNextTwoTone';

import Asset1 from "../Asset/Asset1.jpg";

export default function MachinePage() {
    const { options } = FetchGetOptions()
    const [{ machineFilterWorkstation, machineFilterAsset, machineFilterTimeline }, dispatch] = useStateProvider()
    const [currentPage, setCurrentPage] = useState(1)
    let totalPage = 1

    const { status, fetchStatus, data: assets } = useQuery({
        queryFn: async () => await fetch("/machine/assets/" + machineFilterWorkstation, options)
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
        queryKey: ["machine_assets", machineFilterWorkstation],
        enabled: !!machineFilterWorkstation,
    })
    if(status=='success'){
        totalPage = Math.ceil(assets.length /4)
        console.log({status, fetchStatus, assets, machineFilterWorkstation})
    }

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

    return (
        <>
            <MachineFilter />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: 2, maxHeight: '60vh', overflowY: 'auto' }}>
                {status=='success' &&
                    assets.map((asset: any, index: number, array: string[]) => {
                        return (
                            <Stack spacing={1} data-id={index} key={index} direction='row'>
                                <Box sx={{ width: '20%', bgcolor: constantStyle.color_base_400, padding: 1 }}>
                                    {/* <img src={require(Asset1).default} alt={asset.name} /> */}
                                </Box>
                                <Box sx={{ width: '80%', bgcolor: constantStyle.color_base_400, padding: 1 }}>
                                    <MachineTimeline asset_id={asset.id} />
                                </Box>
                            </Stack>
                        )
                    })
                }
            </Box>

            {status=='success' &&
                <Stack paddingTop={2} paddingX={2} spacing={2} direction='row' sx={{ justifyContent: 'flex-end' }}>
                    <Chip label="Running" color="success" variant='filled' />
                    <Chip label="Idle" color="warning" variant='filled' />
                    <Chip label="Down" color="error" variant='filled' />
                    <Chip label="Offline" sx={{ bgcolor: 'black', color: 'white' }} variant='filled' />
                </Stack>
            }

            {status=='success' && totalPage>1 &&
                <Stack paddingTop={2} paddingX={2} spacing={1} direction='row' sx={{ justifyContent: 'center' }}>
                    <IconButton disabled={currentPage==1} size='small'
                                sx={{ borderRadius: 2, border: '1px solid '+constantStyle.color_primary, color: constantStyle.color_primary }}>
                        <SkipPreviousTwoToneIcon />
                    </IconButton>
                    <IconButton disabled={currentPage==1} size='small'
                                sx={{ borderRadius: 2, border: '1px solid '+constantStyle.color_primary, color: constantStyle.color_primary }}
                                onClick={prevPage}>
                        <PlayArrowTwoToneIcon sx={{ transform: 'rotate(180deg)' }} />
                    </IconButton>
                    <Chip label={currentPage +' / '+ totalPage} variant="outlined"
                            sx={{ width: '80px', fontSize: '14px', textAlign: 'center', display: 'inline-flex', color: constantStyle.color_primary,
                                    borderRadius: 2, borderColor: constantStyle.color_primary }} />
                    <IconButton disabled={currentPage==totalPage} size='small'
                                sx={{ borderRadius: 2, border: '1px solid '+constantStyle.color_primary, color: constantStyle.color_primary }}
                                onClick={nextPage}>
                        <PlayArrowTwoToneIcon />
                    </IconButton>
                    <IconButton disabled={currentPage==totalPage} size='small'
                                sx={{ borderRadius: 2, border: '1px solid '+constantStyle.color_primary, color: constantStyle.color_primary }}>
                        <SkipNextTwoToneIcon />
                    </IconButton>
                </Stack>
            }
        </>
    );
}
