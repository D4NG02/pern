import { useState, MouseEvent  } from "react";
import { Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useQuery } from 'react-query';
import { useStateProvider } from "../../Utility/Reducer/StateProvider";
import { reducerCases } from "../../Utility/Reducer/Constant";
import CurrencyGraph from "./CurrencyGraph";

export default function CurrencyTable() {
    const [isPopup, setIsPopup] = useState(false)
    const [{ token, row }, dispatch] = useStateProvider()

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
    };
    const { data, isLoading } = useQuery({
        queryFn: async () => await fetch("/currency/gets", options)
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
        queryKey: "getsTable"
    })
    
    // Table entry
    let userElements: [] = []
    if (isLoading) {
        return <div>Loading...</div>
    } else {
        userElements = data.map(function(obj: any) {
            return (
                <TableRow
                        key={obj.table_id}
                        selected={row===obj.table_id? true:false}
                        onClick={(e) => handleClick(e, obj)}
                        onDoubleClick={(e) => handleDoubleClick(e, obj)}>

                    <TableCell width='25px' align='right'>{obj.table_id}</TableCell>
                    <TableCell>{obj.country}</TableCell>
                    <TableCell>{obj.value}</TableCell>
                </TableRow>
            );
        });
    }

    
    // Pop up UX
    const handleClick = (e: MouseEvent, obj: any) => {
        dispatch({ type: reducerCases.SET_ROW, row: obj.table_id })
        dispatch({ type: reducerCases.SET_COUNTRY, country: obj.country })
    }
    const handleDoubleClick = (e: MouseEvent, obj: any) => {
        setIsPopup(true);
    }
    const handleClose = () => {
        setIsPopup(false);
        dispatch({ type: reducerCases.SET_ROW, row: null })
        dispatch({ type: reducerCases.SET_COUNTRY, country: '' })
    };

    return (
        <>
            {
                userElements.length>0 && <TableContainer sx={{ maxHeight: '260px' }}>
                    <Table stickyHeader size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell width='25px'>No.</TableCell>
                                <TableCell align='center'>Country</TableCell>
                                <TableCell align='center'>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ maxHeight: '200px'}}>
                            { userElements }
                        </TableBody>
                    </Table>
                </TableContainer>
            }

            <Dialog open={isPopup} disableEscapeKeyDown={true} onClose={handleClose}>
                <CurrencyGraph />
            </Dialog>
        </>
    );
}
