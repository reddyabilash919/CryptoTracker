import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { makeStyles } from "@mui/styles";
import {React,useContext,useEffect,useState} from 'react';
import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Pagination from '@mui/material/Pagination';
import {List} from '../config/endpoints';
import { AppContext } from '../ContextAPI';
import { numberWithCommas } from '../config/commonFunctions';

const CoinsTable = () => {
    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState(false);
    const[page,setPage] = useState(1);


    const {currency, symbol } = useContext(AppContext);

    const getCoins = async () =>{
        setLoading(true);
        const {data} = await axios.get(List(currency));
        setCoins(data);
        setLoading(false);
    };

    useEffect(()=>{
         getCoins();
    },[currency])

    const darkTheme = createTheme({
         palette: {
           primary:{
              main: 'rgb(59, 60, 64)',
             },
           mode: 'dark',
         },
    });


    const useStyles = makeStyles(()=>({
        row: {
            backgroundColor: '#16171a',
            cursor: 'pointer',
            '&:hover' : {
                backgroundColor: '#131111',

            }

        },
        pagination:{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            
            '& .MuiPaginationItem-root':{
                color: 'rgb(209, 174, 19)',
                marginTop:10,
                marginBottom: 10,
            }

        }

    }))  
    
    const classes = useStyles();
    
 
  

  return (
   <ThemeProvider theme={darkTheme}>
       <Container style={{textAlign: 'center'}}>

           <Typography 
           variant='h5'
           style={{
               margin: 18,
               fontWeight:'500'
            }}
           >
              Cryptocurrency Prices by Market Cap
           </Typography>

           <TableContainer>
               {
                   loading ?(
                     <LinearProgress style={{backgroundColor:'rgb(209, 174, 19)'}}/>  
                   ) : (
                       <Table>
                           <TableHead style={{backgroundColor:'rgb(209, 174, 19)'}}>
                               <TableRow>
                                   {['#', 'Coin', 'Price', ' 1h', '24h', '7d', 'Mkr Cap'].map((title)=>(
                                       <TableCell 
                                       style={{
                                           color:'black',
                                           fontWeight: '900'
                                       }}
                                       key={title}
                                       align={title === 'Coin' ? '': 'right'} 
                                       >
                                      {title}
                                       </TableCell>
                                   ))

                                   }
                               </TableRow>

                           </TableHead>
                           <TableBody>
                               {
                                   
                                coins.slice((page-1) *10,(page -1) * 10 + 10).map((row) =>{

                                    return (
                                        <TableRow key={row.name} className={classes.row}>
                                            <TableCell align='right'>
                                                {row.market_cap_rank}


                                            </TableCell>

                                            <TableCell component='th'
                                            scope='row'
                                            style={{
                                                display:'flex',
                                                gap:15

                                            }}>
                                                <img 
                                                src={row.image}
                                                alt={row.name}
                                                height='30'
                                                style={{marginBottom:10}}/>
                                                <div style={{display:'flex', flexDirection:'column'}}>
                                                    <span style={{
                                                            textTransform:'uppercase',
                                                            fontSize:15
                                                        }}>
                                                            {row.symbol}
                                                        
                                                    </span>
                                                    <span style={{color:'darkgrey'}}>{row.name}</span>

                                                </div>

                                            </TableCell>
                                            <TableCell align='right'>
                                                {symbol}{' '}
                                                {numberWithCommas(row.current_price.toFixed(2))}

                                            </TableCell>
                                            <TableCell align='right'
                                            style={{color: row.price_change_percentage_1h_in_currency>0 ? 'green' : 'red'}}>

                                                {row.price_change_percentage_1h_in_currency.toFixed(1)}%

                                            </TableCell>
                                             <TableCell align='right'
                                            style={{color: row.price_change_percentage_24h_in_currency>0 ? 'green' : 'red'}}>

                                                {row.price_change_percentage_24h_in_currency.toFixed(1)}%

                                            </TableCell>
                                            <TableCell align='right'
                                            style={{color: row.price_change_percentage_7d_in_currency>0 ? 'green' : 'red'}}>

                                                {row.price_change_percentage_7d_in_currency.toFixed(1)}%

                                            </TableCell>
                                            <TableCell align='right'
                                             >
                                                 {symbol}{' '}
                                                {numberWithCommas(row.market_cap.toFixed(0))}

                                            </TableCell>


                                        </TableRow>
                                    )

                                   })
                               }

                           </TableBody>
                       </Table>
                   )
                                }
           </TableContainer>

           <Pagination 
           className={classes.pagination}
           count={(coins.length/10).toFixed(0)}
           onChange={(_,value) =>{
               setPage(value);
               window.scroll(0,450);
           }}/>
          

       </Container>

   </ThemeProvider>
  )
}

export default CoinsTable