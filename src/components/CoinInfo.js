import React, { useContext, useEffect, useState} from 'react'
import { HistoricalChart } from '../config/endpoints';
import { AppContext } from './ContextAPI';
import axios from 'axios';
import { makeStyles } from "@mui/styles";
import { Line } from "react-chartjs-2";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";
import { CircularProgress} from '@mui/material';
import {
 
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend,
} from 'chart.js';

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
);

const CoinInfo = ({coin}) => {
    const [ historicalData, setHistoricalData] = useState();
    const[range, setRange] = useState(1);
    const [flag,setflag] = useState(false);

    const {currency} = useContext(AppContext);
    console.log(currency);

    const fetchData = async () =>{
        const {data} = await axios.get(HistoricalChart(coin.id,range,currency));
        setHistoricalData(data.prices);
    }

    useEffect(()=>{
        fetchData();
    },[currency,range]);

    const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
    },
  }));
  const classes = useStyles();

  return (
    
    <ThemeProvider theme={darkTheme}>
        <div className={classes.container}>
            {
                !historicalData ?(
                    <CircularProgress 
                    style={{color: 'rgb(209, 174, 19)'}}
                    size={250}
                    thickness={1}/>
                ):(
                   <>
                   <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return range === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${range} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setRange(day.value);
                    setflag(false);
                  }}
                  selected={day.value === range}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
                   </>
                )
            }
        </div>

    </ThemeProvider>
  )
}

export default CoinInfo;