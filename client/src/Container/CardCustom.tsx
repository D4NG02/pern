import { constantStyle } from '../Utility/CustomStyle';
import { Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';

import { useStateProvider } from '../Utility/Reducer/StateProvider';
import { reducerCases } from '../Utility/Reducer/Constant';

export default function CardCustom() {
  const [{ cardType }, dispatch] = useStateProvider()

  const UI = (props: { text: string, comingSoon: boolean }) => {
    const displayCard = () => {
      dispatch({ type: reducerCases.SET_CARD, cardType: props.text })
    }

    return (
      <Card className="outlined" sx={{ ":hover": { bgcolor: constantStyle.color_base_400 } }}>
        { props.comingSoon?
          <CardContent>
            <Typography sx={{ fontSize: { xs: 14, sm: 18, md: 24 } }} align='center' variant="h5" component='h5'>{props.text}</Typography>
          </CardContent>
          :
          <CardActionArea onClick={displayCard}>
            <CardContent>
              <Typography sx={{ fontSize: { xs: 14, sm: 18, md: 24 } }} align='center' variant="h5" component='h5'>{props.text}</Typography>
            </CardContent>
          </CardActionArea>
        }
      </Card>
    )
  }

  return (
    <Grid container padding={{ xs: 6, sm: 12, md: 22 }} rowSpacing={{ xs: 3, sm: 6, md: 12 }} columnSpacing={{ xs: 3, sm: 6, md: 12 }}
        direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={6}><UI text='Currency' comingSoon={false} /></Grid>
      <Grid item xs={6}><UI text='Calendar' comingSoon={false} /></Grid>
      <Grid item xs={6}><UI text='Machine Utilization' comingSoon={false} /></Grid>
      <Grid item xs={6}><UI text='Chat' comingSoon={true} /></Grid>
    </Grid>
  );
}
