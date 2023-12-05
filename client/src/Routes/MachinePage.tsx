import $ from "jquery"
import { useState } from 'react';
import { Stack, Box, Chip, TablePagination, Typography, Divider } from '@mui/material'

import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';

import { useStateProvider } from '../Utility/Reducer/StateProvider';
import MachineFilter from '../Container/Machine/MachineFilter';
import MachineTimeline from '../Container/Machine/MachineTimeline';
import { reducerCases } from '../Utility/Reducer/Constant';
import { constantStyle } from '../Utility/CustomStyle';

export default function MachinePage() {
    const [{ machineFilterAsset, machineFilterPage }, dispatch] = useStateProvider()
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [startDisplay, setStartDisplay] = useState(machineFilterPage)
    const [endDisplay, setEndDisplay] = useState(3)

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        dispatch({ type: reducerCases.SET_MACHINE_FILTER_PAGE, machineFilterPage: newPage })
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 4));
        dispatch({ type: reducerCases.SET_MACHINE_FILTER_PAGE, machineFilterPage: 0 })
    };


    const customIcon = () => {
        return (
            <SkipPreviousOutlinedIcon />
        )
    };


    setTimeout(() => {
        $(".paginate .MuiTablePagination-displayedRows").insertAfter("button[aria-label='Go to previous page'")
    }, 200);

    return (
        <>
            <MachineFilter />

            <Box sx={{
                display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto',
                '.MuiTablePagination-actions': { display: 'inline-flex' }
            }}>

                {machineFilterAsset?.filter((asset: any, index: number, array: string[]) => {
                    if (index >= startDisplay && index <= endDisplay) {
                        return asset
                    }
                })
                    .map((asset: any, index: number, array: string[]) => {
                        return (
                            <Box key={index} sx={{ display: 'grid', gridTemplateColumns: '20% auto', gap: 1 }}>
                                <Box sx={{ bgcolor: constantStyle.color_base_400, borderRadius: 1, display: 'grid', gridTemplateColumns: '48% auto', gap: 1 }}>
                                    <Box sx={{ bgcolor: constantStyle.color_primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography>{asset.asset_name}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img src={require('../Asset/' + asset.image_path.split("/").slice(-1))} height={80} alt={asset.asset_name} />
                                    </Box>
                                </Box>
                                <Box sx={{ bgcolor: constantStyle.color_base_400, padding: '8px 20px', borderRadius: 1 }}>
                                    <MachineTimeline asset_id={asset.asset_id} />
                                </Box>
                            </Box>
                        )
                    })
                }
            </Box>

            {machineFilterAsset?.length > 0 &&
                <Stack padding={1} spacing={2} direction='row' sx={{ justifyContent: 'flex-end' }}>
                    <Box display='inline-flex' gap={1} alignItems="center">
                        <span style={{ backgroundColor: 'green', width: '12px', height: '12px', borderRadius: '50%' }}></span>
                        <p style={{ color: 'green', margin: 'unset' }}>Running</p>
                    </Box>
                    <Box display='inline-flex' gap={1} alignItems="center">
                        <span style={{ backgroundColor: 'orange', width: '12px', height: '12px', borderRadius: '50%' }}></span>
                        <p style={{ color: 'orange', margin: 'unset' }}>Idle</p>
                    </Box>
                    <Box display='inline-flex' gap={1} alignItems="center">
                        <span style={{ backgroundColor: 'red', width: '12px', height: '12px', borderRadius: '50%' }}></span>
                        <p style={{ color: 'red', margin: 'unset' }}>Down</p>
                    </Box>
                    <Box display='inline-flex' gap={1} alignItems="center">
                        <span style={{ backgroundColor: 'black', width: '12px', height: '12px', borderRadius: '50%' }}></span>
                        <p style={{ color: 'black', margin: 'unset' }}>Offline</p>
                    </Box>
                </Stack>
            }

            {machineFilterAsset?.length > 0 &&
                <TablePagination className='paginate'
                    sx={{
                        display: 'flex', justifyContent: 'center',
                        '& .MuiTablePagination-actions': { alignItems: 'center' },
                        '& p': { padding: '8px 12px !important' },
                    }}
                    component="div"
                    count={machineFilterAsset?.length}
                    page={machineFilterPage}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelDisplayedRows={function defaultLabelDisplayedRows({ from, to, count }) {
                        setStartDisplay(from - 1)
                        setEndDisplay(to - 1)
                        return `${machineFilterPage + 1} / ${Math.ceil(machineFilterAsset?.length / 4)}`;
                    }}
                    labelRowsPerPage={""}
                    rowsPerPageOptions={[]}
                    showFirstButton={true}
                    showLastButton={true}
                    slotProps={{
                        actions: {
                            firstButton: { size: 'small', },
                            lastButton: { size: 'small', },
                            nextButton: { size: 'small', },
                            previousButton: { size: 'small', },
                        },
                    }}
                />
            }
        </>
    );
}
