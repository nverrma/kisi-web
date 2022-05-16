import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from './logo.svg'
import './App.css';
import Index from './components/index';
import SideVar from "./components/sideTab"
function App() {
  const [count, setCount] = useState(0)
  
  useEffect(()=>{
    
  },[])
 
  return (
    <div className="App">
     <h1>Kisi Web App</h1> 
     <Index />
    </div>
  )
}

export default App
