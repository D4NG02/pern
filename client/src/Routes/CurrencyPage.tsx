import { Box } from '@mui/material';

import CurrencyTable from '../Container/Currency/CurrencyTable';
import CurrencyForm from '../Container/Currency/CurrencyForm';
import { constantStyle } from '../Utility/CustomStyle';

export default function Currency() {
    return (
        <Box sx={{
            gap: '20px',
            padding: '1rem',
            display: "flex",
            flexDirection: 'column' }}>

            <CurrencyTable />
            <CurrencyForm />
        </Box>
    );
}
