import { makeStyles } from "@mui/styles";

import Header from "./components/Header"
import Content from "./components/content/Content"
import CoinsTable from "./components/CoinsTable";


function App() {

  const useStyles = makeStyles(()=>({
    App:{
      backgroundColor: "black",
      color: "white",
      minHeight: "100vh"
    }
  }))
  

  const classes = useStyles() 
  return (
    <div className={classes.App}>
     <Header />
    <Content />
    <CoinsTable />
    </div>
  );
}

export default App;
