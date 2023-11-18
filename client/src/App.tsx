import { Fab } from "@mui/material";

import { useStateProvider } from "./Utility/Reducer/StateProvider";

import HomeIcon from '@mui/icons-material/Home';

import { reducerCases } from "./Utility/Reducer/Constant";
import CardCustom from "./Container/CardCustom";
import Currency from "./Container/Currency/Currency";
import CalendarContainer from "./Container/Calender/CalendarContainer";

export default function App() {
  const [{ cardType }, dispatch] = useStateProvider()

  const handleBack = () => {
    dispatch({ type: reducerCases.SET_CARD, cardType: null })
  }

  return (
    <>
      { cardType==null && <>
        <CardCustom />
      </>
      }
      { cardType &&  <Fab sx={{ position: 'absolute', left: '1rem', bottom: '1rem' }} size='small' color="primary" onClick={handleBack} aria-label="Back"><HomeIcon /></Fab> }

      {/* TASK 1 */}
      { cardType==='Currency' && <Currency />}

      {/* TASK 2 */}
      { cardType==='Calendar' && <CalendarContainer /> }
    </>
  );
}
