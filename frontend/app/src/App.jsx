
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import axios from 'axios'
import StudentDashboardTest from './StudentDashboardTest'
import StudentsTable from './StudentsTable'
//import StatsVisualization from './StatsVisualization'
import Mainframe from "./Mainframe"
import { Container } from "@mui/material"
//import "./App.css"
function App() {
  return (
    <Container sx={{
      maxWidth: 1280,
      padding: "2rem",
      textAlign: "center",
      alignItems: "center"
    }}>
      <Mainframe />
    </Container>
  )
}

export default App
