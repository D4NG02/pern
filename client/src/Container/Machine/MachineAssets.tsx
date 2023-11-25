import { useQuery } from '@tanstack/react-query';
import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { reducerCases } from '../../Utility/Reducer/Constant';
import { FetchGetOptions } from './MachineConstant';

export default function MachineAssets() {
    const [{ machineFilterWorkstation }, dispatch] = useStateProvider()
    const { options } = FetchGetOptions()
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
        console.log(assets)
    }
}

