import { LinearProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { get } from 'enzyme/build/configuration';
import {React,useContext,useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import CoinInfo from '../components/CoinInfo';
import { AppContext } from '../components/ContextAPI';
import { SinglCoin } from '../config/endpoints';
import { numberWithCommas } from '../config/commonFunctions';
const CoinPage = () =>{
    const {id} = useParams();
    const [ coin, setCoin] = useState();
    const { currency,symbol} = useContext(AppContext);

    const getCoin = async () =>{
        const {data} = await axios.get(SinglCoin(id));
        setCoin(data);
        console.log(data);
    }

    useEffect(()=>{
        getCoin();
    },[]);

    const useStyles = makeStyles(()=>({
        sideBar: {
            width:"30%",
            display:"flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop:25,
            borderRight: "2px solid grey"

        },
      heading:{
       fontWeight:"bold",
       marginBottom:20,
       fontFamily: "Monserrat"
      }
    }));
    const classes = useStyles();
    if(!coin){
        return <LinearProgress style={{backgroundColor: "gold"}} />
    }
    
    return (
    <div className={classes.container}> 
    <div className={classes.sideBar}>
     <img 
     src={coin?.image.large}
     alt={coin?.name}
     height="200"
     style={{marginBottom:20}}/> 
     <Typography variant='h3' className={classes.heading}>
         {coin?.name}
     </Typography>
     <div className={classes.marketData}>
         <span style={{display:"flex"}} >
             <Typography variant='h5' className={classes.heading}>
                 Rank: {coin?.market_cap_rank}
             </Typography>
         </span>
          <span style={{display:"flex"}} >
             <Typography variant='h5' className={classes.heading}>
                 Current Price: {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
             </Typography>
         </span>
          <span style={{display:"flex"}} >
             <Typography variant='h5' className={classes.heading}>
                 Market Cap: {symbol}{' '}
                        {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()])}
                
             </Typography>
         </span>
     </div>
    </div>
    <CoinInfo coin ={coin} />
    </div>
    )
   
};

export default CoinPage;