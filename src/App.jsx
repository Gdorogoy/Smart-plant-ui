import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import Header from './components/Header/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <Dashboard></Dashboard>
    </>
  )
}

export default App

//TODO: 2.Refactor folders 3.Add api calls
//TODO: Backend fixes and refactors
