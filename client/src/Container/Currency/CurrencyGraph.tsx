import { useQuery } from 'react-query';
import { Box, Typography } from '@mui/material';

import Chart from "react-apexcharts";

import { constantStyle } from '../../Utility/CustomStyle';
import { useStateProvider } from '../../Utility/Reducer/StateProvider';

export default function CurrencyGraph() {
  const [{ country }] = useStateProvider()


  const LinePlot = (props: { data: {time: string[], value: number[]}, legend: string, title: string }) => {
    
    let options = {
      title: {
        text: props.legend,
        margin: 0,
        floating: true,
        offsetX: 380,
        offsetY: 6,
      },
      xaxis: {
        categories: props.data.time,
        tickAmount: 7,

        labels: {
          rotate: 0,
          maxHeight: 20,
        },
        title: {
          text: props.title,
          offsetX: 230,
          offsetY: -20,
        },
        axisBorder: {
          show: true,
          color: constantStyle.color_primary,
          height: 2,
          offsetX: 0,
          offsetY: 0,
        },
        axisTicks: {
          show: false,
        },
      },

      yaxis: {
        min: 0,
        max: 12000,
        tickAmount: 6,
        title: {
          text: 'Value',
          rotate: 0,
          offsetX: 26,
          offsetY: -84,
        },
        labels: {
          show: false,
          maxWidth: 10,
        },
        axisBorder: {
          show: true,
          color: constantStyle.color_primary,
          width: 2,
          offsetX: 0,
          offsetY: 0,
        },
      },

      stroke: {
        color: constantStyle.color_primary,
        width: 2,
      },
      
      chart: {
        // offsetX: -2,
        toolbar: {
          show: false,
        },
      },

      grid: {
        show: false,
      },
    }

    let series = [
      {
        name: props.legend,
        data: props.data.value
      }
    ]

    return (
      <Box sx={{ bgcolor: constantStyle.color_on_primary }}>
        <Chart
          options={options}
          series={series}
          type="line"
          width="500"
          height="200"
        />
      </Box>
    )
  }




  const options = { method: 'GET', headers: { 'Content-Type': 'application/json' }, };
  const { data, isLoading } = useQuery({
    queryFn: () => fetch("/graph/gets", options)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      }).catch((err) => {
        return err
      }),
    queryKey: "getsGraph"
  })

  return (
    <Box>
      <Typography sx={{ bgcolor: constantStyle.color_primary, padding: '0.4rem 1rem', textAlign: 'center', marginBottom: '0.2rem' }} variant="h6" component="h6">
        {country} Currency
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', bgcolor: constantStyle.color_primary, padding: '1rem' }}>
        { !isLoading && <LinePlot data={data.dataInDay} legend='Hourly Rate' title='Hrs' /> }
        { !isLoading && <LinePlot data={data.dataInWeek} legend='Daily Rate' title='Day' /> }
      </Box>
    </Box>
  );
}

