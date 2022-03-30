import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import {  ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import React, { useContext } from 'react'
import {AppContext} from '../ContextAPI';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';


const useStyles = makeStyles(()=>(
    {
      title:{
          flex:1,
          color: 'rgb(209, 174, 19)',
          fontWeight:'900',
          display:'flex',
          alignItems:'center',
          padding:15
        
      }  
    }
))

const darkTheme = createTheme({
  palette: {
      primary:{
       main: 'rgb(59, 60, 64)',
      },
    mode: 'dark',
  },
});

const Header = () => {
    const classes = useStyles()
    const {currency,setCurrency} = useContext(AppContext);

    const handleCurrencyChange = (e) =>{
        setCurrency(e.target.value)
    }
  return (
      <ThemeProvider theme={darkTheme}>

          <AppBar   color='primary' position='static'>
        <Container>
            <Toolbar>
                <Typography 
                className={classes.title}
                variant='h6'
                style={{fontWeight:'900'}}
                >
                   <CurrencyExchangeIcon /> CRYPTO TRACKER
                </Typography>
                <Select variant='outlined'
                style={{
                    width:100,
                    height: 40,
                    marginRight: 20
                }}
                value={currency}
                onChange={handleCurrencyChange}
                >
                    <MenuItem value={'AUD'}>AUD</MenuItem>
                     <MenuItem value={'USD'}>USD</MenuItem>
                </Select>
            </Toolbar>

        </Container>
    </AppBar>

      </ThemeProvider>
    
  )
}

export default Header