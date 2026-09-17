import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Viewer3D from './Viewer3D'
import DimensionPanel from './panels/DimensionPanel'

function App() {
 


  return (
    <>
    <DimensionPanel/>
     <Viewer3D/>
    </>
  )
}

export default App
