
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
      margin: "0 auto",
      padding: "2rem",
      textAlign: "center",
    }}>
      <Mainframe />
    </Container>
  )
}

export default App
