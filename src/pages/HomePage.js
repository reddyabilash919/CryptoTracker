import React from 'react'
import { makeStyles } from "@mui/styles";

import Content from "../components/content/Content"
import CoinsTable from "../components/CoinsTable";

const HomePage = () => {
    
     const useStyles = makeStyles(()=>({
    App:{
      backgroundColor: "black",
      color: "white",
      minHeight: "100vh"
    }
  }))
  

  const classes = useStyles() 
  return (
    <div >
    <Content />
    <CoinsTable />
    </div>
  )
}

export default HomePage