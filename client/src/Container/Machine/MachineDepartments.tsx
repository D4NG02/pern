import { useQuery } from '@tanstack/react-query';
import { FormControl, FormLabel, MenuItem, Select } from '@mui/material';
import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { reducerCases } from '../../Utility/Reducer/Constant';
import { constantStyle } from '../../Utility/CustomStyle';
import { FetchGetOptions } from './MachineConstant';

export default function MachineDepartments() {
    const [{ machineFilterPlant, machineFilterDepartment }, dispatch] = useStateProvider()
    const { options } = FetchGetOptions()

    const { status, fetchStatus, data: departments } = useQuery({
        queryFn: async () => await fetch("/machine/departments/" + machineFilterPlant, options)
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
        queryKey: ["machine_departments", machineFilterPlant],
        enabled: !!machineFilterPlant,
    })

    if(status=='success'){
        // console.log({status, fetchStatus, departments})
    }

    const handleOnChange = (e: any) => {
        dispatch({ type: reducerCases.SET_MACHINE_FILTER_DEPARTMENTS, machineFilterDepartment: e.target.value })
        dispatch({ type: reducerCases.SET_MACHINE_FILTER_WORKCENTERS, machineFilterWorkcenter: 0 })
    }

    return (
        <FormControl size="small" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pr: 2 }}>
            <FormLabel sx={{ pr: 1 }}>Department</FormLabel>
            <Select sx={{
                'div': { padding: '0 14px', paddingRight: '14px' },
                'svg': {
                    position: 'relative', right: 'unset', top: 'unset', color: 'white',
                    bgcolor: constantStyle.color_primary, borderRadius: 1
                }
            }} value={machineFilterDepartment} onChange={handleOnChange}>

                <MenuItem disabled value={0}>
                    <em>Department</em>
                </MenuItem>
                {status=='success' &&
                    departments.map(function (department: any) {
                        return (
                            <MenuItem key={department.department_id} value={department.department_id}>{department.department_name}</MenuItem>
                        );
                    })
                }
            </Select>
        </FormControl>
    );
}

