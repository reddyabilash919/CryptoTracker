import React, { createContext, useEffect, useState } from 'react'

export const AppContext = createContext();

const ContextAPI = ({children}) => {

    const [currency,setCurrency] = useState("AUD");
    const [symbol,setSymbol] = useState("A$")

    useEffect(()=>{
         if(currency === "AUD"){
             setSymbol("A$")
         }
         else{
             setSymbol("$")
         }
    },[currency])

  return (
    <AppContext.Provider value={{currency,setCurrency,symbol}}>
        {children}
    </AppContext.Provider>
  )
}

export default ContextAPI