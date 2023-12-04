import { useQuery } from '@tanstack/react-query';
import { FormControl, FormLabel, MenuItem, Select } from '@mui/material';
import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { reducerCases } from '../../Utility/Reducer/Constant';
import { constantStyle } from '../../Utility/CustomStyle';
import { FetchGetOptions } from './MachineConstant';

export default function MachineWorkstation() {
    const [{ machineFilterWorkcenter, machineFilterWorkstation }, dispatch] = useStateProvider()
    const { options } = FetchGetOptions()

    const { status: workstationStatus, fetchStatus: workstationFetchStatus, data: workstations } = useQuery({
        queryFn: async () => await fetch("/machine/workstations/" + machineFilterWorkcenter, options)
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
        queryKey: ["machine_workstations"],
        enabled: machineFilterWorkcenter!=0,
    })
    
    const filterWorkstation = (e: any) => {
        dispatch({ type: reducerCases.SET_MACHINE_FILTER_WORKSTATIONS, machineFilterWorkstation: 0 })
        dispatch({ type: reducerCases.SET_MACHINE_FILTER_ASSETS, machineFilterAsset: [] })
        
        setTimeout(() => {
            dispatch({ type: reducerCases.SET_MACHINE_FILTER_WORKSTATIONS, machineFilterWorkstation: e.target.value })
        }, 2);
    }

    return (
        <FormControl size="small" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pr: 2 }}>
            <FormLabel sx={{ pr: 1 }}>Workstation</FormLabel>
            <Select sx={{
                'div': { padding: '0 14px', paddingRight: '14px' },
                'svg': {
                    position: 'relative', right: 'unset', top: 'unset', color: 'white',
                    bgcolor: constantStyle.color_primary, borderRadius: 1
                }
            }} value={machineFilterWorkstation} onChange={filterWorkstation}>

                <MenuItem disabled value={0}>
                    <em>Workstation</em>
                </MenuItem>
                {workstationStatus=='success' &&
                    workstations.map(function (workstation: {workstation_id: number, workstation_name: string }) {
                        return (
                            <MenuItem key={workstation.workstation_id} value={workstation.workstation_id}>{workstation.workstation_name}</MenuItem>
                        );
                    })
                }
            </Select>
        </FormControl>
    );
}

