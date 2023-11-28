import { useQuery } from '@tanstack/react-query';
import { FormControl, FormLabel, MenuItem, Select } from '@mui/material';
import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { reducerCases } from '../../Utility/Reducer/Constant';
import { constantStyle } from '../../Utility/CustomStyle';
import { FetchGetOptions } from './MachineConstant';

export default function MachineSites() {
    const [{ machineFilterSide }, dispatch] = useStateProvider()
    const { options } = FetchGetOptions()

    const { status, fetchStatus, data: sites } = useQuery({
        queryFn: async () => await fetch("/machine/sites", options)
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
        queryKey: ["machine_sites"]
    })

    const filterSite = (e: any) => {
        dispatch({ type: reducerCases.SET_MACHINE_FILTER_SITES, machineFilterSide: 0 })
        dispatch({ type: reducerCases.SET_MACHINE_FILTER_PLANTS, machineFilterPlant: 0 })
        
        setTimeout(() => {
            dispatch({ type: reducerCases.SET_MACHINE_FILTER_SITES, machineFilterSide: e.target.value })
        }, 2);
    }

    return (
        <FormControl size="small" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pr: 2 }}>
            <FormLabel sx={{ pr: 1 }}>Sites</FormLabel>
            <Select sx={{
                'div': { padding: '0 14px', paddingRight: '14px' },
                'svg': {
                    position: 'relative', right: 'unset', top: 'unset', color: 'white',
                    bgcolor: constantStyle.color_primary, borderRadius: 1
                }
            }} value={machineFilterSide} onChange={filterSite}>

                <MenuItem disabled value={0}>
                    <em>Sites</em>
                </MenuItem>
                {status=='success' &&
                    sites.map(function(site: any) {
                        return (
                            <MenuItem key={site.site_id} value={site.site_id}>{site.site_name}</MenuItem>
                        );
                    })
                }
            </Select>
        </FormControl>
    );
}
