import { useQuery } from '@tanstack/react-query';
import { FormControl, FormLabel, MenuItem, Select } from '@mui/material';
import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { reducerCases } from '../../Utility/Reducer/Constant';
import { constantStyle } from '../../Utility/CustomStyle';
import { FetchGetOptions } from './MachineConstant';

export default function MachinePlant() {
    const [{ machineFilterSide, machineFilterPlant, machineFilterDepartment }, dispatch] = useStateProvider()
    const { options } = FetchGetOptions()

    const { status, fetchStatus, data: plants } = useQuery({
        queryFn: async () => await fetch("/machine/plants/" + machineFilterSide, options)
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
        queryKey: ["machine_plants", machineFilterSide],
        enabled: !!machineFilterSide,
    })

    const handleOnChange = (e: any) => {
        dispatch({ type: reducerCases.SET_MACHINE_FILTER_PLANTS, machineFilterPlant: e.target.value })
        dispatch({ type: reducerCases.SET_MACHINE_FILTER_DEPARTMENTS, machineFilterDepartment: 0 })
    }

    return (
        <FormControl size="small" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pr: 2 }}>
            <FormLabel sx={{ pr: 1 }}>Plant</FormLabel>
            <Select sx={{
                'div': { padding: '0 14px', paddingRight: '14px' },
                'svg': {
                    position: 'relative', right: 'unset', top: 'unset', color: 'white',
                    bgcolor: constantStyle.color_primary, borderRadius: 1
                }
            }} value={machineFilterPlant} onChange={handleOnChange}>

                <MenuItem disabled value={0}>
                    <em>Plant</em>
                </MenuItem>
                {status=='success' &&
                    plants.map(function (plant: any) {
                        return (
                            <MenuItem key={plant.plant_id} value={plant.plant_id}>{plant.plant_name}</MenuItem>
                        );
                    })
                }
            </Select>
        </FormControl>
    );
}

