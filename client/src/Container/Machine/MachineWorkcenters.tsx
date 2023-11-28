import { useQuery } from '@tanstack/react-query';
import { FormControl, FormLabel, MenuItem, Select } from '@mui/material';
import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { reducerCases } from '../../Utility/Reducer/Constant';
import { constantStyle } from '../../Utility/CustomStyle';
import { FetchGetOptions } from './MachineConstant';

export default function MachineWorkcenters() {
    const [{ machineFilterDepartment, machineFilterWorkcenter }, dispatch] = useStateProvider()
    const { options } = FetchGetOptions()

    const { status, fetchStatus, data: workcenters } = useQuery({
        queryFn: async () => await fetch("/machine/workcenters/" + machineFilterDepartment, options)
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
        queryKey: ["machine_workcenters", machineFilterDepartment],
        enabled: !!machineFilterDepartment,
    })

    const handleOnChange = (e: any) => {
        dispatch({ type: reducerCases.SET_MACHINE_FILTER_WORKCENTERS, machineFilterWorkcenter: e.target.value })
        dispatch({ type: reducerCases.SET_MACHINE_FILTER_WORKSTATIONS, machineFilterWorkstation: 0 })
    }

    return (
        <FormControl size="small" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pr: 2 }}>
            <FormLabel sx={{ pr: 1 }}>Workcenter</FormLabel>
            <Select sx={{
                'div': { padding: '0 14px', paddingRight: '14px' },
                'svg': {
                    position: 'relative', right: 'unset', top: 'unset', color: 'white',
                    bgcolor: constantStyle.color_primary, borderRadius: 1
                }
            }} value={machineFilterWorkcenter} onChange={handleOnChange}>

                <MenuItem disabled value={0}>
                    <em>Workcenter</em>
                </MenuItem>
                {status=='success' &&
                    workcenters.map(function (workcenter: {workcenter_id: number, workcenter_name: string }) {
                        return (
                            <MenuItem key={workcenter.workcenter_id} value={workcenter.workcenter_id}>{workcenter.workcenter_name}</MenuItem>
                        );
                    })
                }
            </Select>
        </FormControl>
    );
}

