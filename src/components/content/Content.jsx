import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'
import React from 'react'

 const useStyles = makeStyles((() => ({
     content: {
         backgroundImage : 'url(./crypto1.png)',

     },
     contentData:{
         height:400,
         display:'flex',
         flexDirection: 'column',
         paddingTop:25,
         justifyContent: 'space-around'
     },
     contentTitle: {

     }
        
    })))
const Content = () => {

    const classes = useStyles();


   
  return (
    <div className={classes.content}>
        <Container className={classes.contentData}>
            <div className={classes.contentTitle}>
                <Typography variant='h2'
                style={{
                    fontWeight:'bold',
                    marginBottom:15,
                }}
                >
                    Crypto Tracker
                </Typography>

                <Typography variant='h3'
                style={{
                    marginTop:55,
                    fontWeight:700,
                    textAlign:'center',
                    color:'rgb(224, 224, 220)'
                }}>
                    Let's Make <p>Better Life With</p> <p >New <span style={{color:'rgb(209, 174, 19)'}}>Currency</span></p>
                </Typography>
            
            </div>

        </Container>
    </div>
  )
}

export default Content