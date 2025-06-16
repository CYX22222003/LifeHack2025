import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import StudentDashboardTest from './StudentDashboardTest'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => {
          setCount((count) => count + 1);
          axios.get('http://localhost:5000/api/hello')
            .then(response => {
              console.log(response.data)
            })
            .catch(error => {
              console.error(error)
          });

          axios.post('http://localhost:5000/api/echo', {
            debug: true,
            count: count,
            timestamp: new Date().toISOString()
            })
            .then(response => {
            console.log("Debug response:", response.data);
            })
            .catch(error => {
            console.error("Debug error:", error);
            });
        }}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <StudentDashboardTest />
    </>
  )
}

export default App
