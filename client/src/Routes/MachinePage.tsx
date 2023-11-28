import $ from "jquery"
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Stack, Box, Chip, TablePagination, Typography, Divider } from '@mui/material'

import { useStateProvider } from '../Utility/Reducer/StateProvider';
import MachineFilter from '../Container/Machine/MachineFilter';
import MachineTimeline from '../Container/Machine/MachineTimeline';
import { FetchGetOptions } from '../Container/Machine/MachineConstant';
import { reducerCases } from '../Utility/Reducer/Constant';
import { constantStyle } from '../Utility/CustomStyle';

export default function MachinePage() {
    const { options } = FetchGetOptions()
    const [{ machineFilterWorkstation, machineFilterAsset, machineFilterTimeline }, dispatch] = useStateProvider()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [startDisplay, setStartDisplay] = useState(0)
    const [endDisplay, setEndDisplay] = useState(3)

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
        queryKey: ["machine_assets"],
        enabled: machineFilterWorkstation!=0,
    })

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 4));
        setPage(0);
    };

    
    setTimeout(() => {
        $(".paginate .MuiTablePagination-displayedRows").insertAfter("button[aria-label='Go to previous page'")
    }, 200);

    return (
        <>
            <MachineFilter />
            <Divider orientation="vertical" sx={{ span: { color: 'transparent', padding: 0, fontSize: '8px' } }}>Divider</Divider>

            <Box sx={{ display: 'grid', gridTemplateRows: '25% 25% 25% 25%', gap: 1, height: '62vh', overflowY: 'auto',
                        '.MuiTablePagination-actions': { display: 'inline-flex' } }}>
                {status == 'success' &&
                    assets.filter((asset: any, index: number, array: string[]) => {
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
                                            <img src={require('../Asset/Asset1.jpg')} height={80} alt={asset.asset_name} />
                                            {/* <img src={require(asset.image_path)} height={80} alt={asset.asset_name} /> */}
                                        </Box>
                                    </Box>
                                    <Box sx={{ bgcolor: constantStyle.color_base_400, padding: 1, borderRadius: 1 }}>
                                        <MachineTimeline asset_id={asset.asset_id} />
                                    </Box>
                                </Box>
                            )
                        })
                }
            </Box>

            {status == 'success' &&
                <>
                <Divider orientation="vertical" sx={{ span: { color: 'transparent', padding: 0, fontSize: '8px' } }}>Divider</Divider>
                <Stack paddingX={2} spacing={2} direction='row' sx={{ justifyContent: 'flex-end' }}>
                    <Chip label="Running" color="success" variant='filled' />
                    <Chip label="Idle" color="warning" variant='filled' />
                    <Chip label="Down" color="error" variant='filled' />
                    <Chip label="Offline" sx={{ bgcolor: 'black', color: 'white' }} variant='filled' />
                </Stack>
                </>
            }

            {status == 'success' &&
                <TablePagination className='paginate' sx={{ display: 'flex', justifyContent: 'center' }}
                    component="div"
                    count={assets.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelDisplayedRows={function defaultLabelDisplayedRows({ from, to, count }) {
                        setStartDisplay(from - 1)
                        setEndDisplay(to - 1)
                        // return `${from}/${to} of ${count !== -1 ? count : `more than ${to}`}`;
                        return `${page+1} / ${Math.ceil(assets.length/4)}`;
                    }}
                    labelRowsPerPage={""}
                    rowsPerPageOptions={[]}
                    showFirstButton={true}
                    showLastButton={true}
                />
            }
        </>
    );
}
