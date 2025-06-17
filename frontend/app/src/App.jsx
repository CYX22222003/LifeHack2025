import Mainframe from "./Mainframe"
import { Container } from "@mui/material"
//import "./App.css"
function App() {
  return (
    <Container sx={{
      maxWidth: 1280,
      margin: "0 auto",
      padding: "2rem",
      textAlign: "center",
    }}>
    <Mainframe />
    </Container>
  )
}

export default App
