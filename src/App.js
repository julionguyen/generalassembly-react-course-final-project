import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import NotFoundPage from './NotFoundPage';
import LatestNewsList from './LatestNewsList';
import LatestNewsDetails from './LatestNewsDetails'
import { useState,useEffect } from 'react';

// https://api.techniknews.net/ipgeo/

function App() {
  
  const [userCountryCode, setUserCountryCode] = useState()

  const getUserCountryCode = () => {
    try {
        fetch('https://api.techniknews.net/ipgeo/').then(res=>{
          if (res.ok) {
            res.json()
            .then(res => {
              console.log('App get countryCode: ',res)
              setUserCountryCode(res.countryCode.toLowerCase())
              console.log(res)
            })                
          }      
        })  
      } catch(error) {
        console.log('Error while fetching country: ', error.message)
      }        
}
useEffect(()=>{
  getUserCountryCode()
}, [userCountryCode])

  return (
    <nav className="App">
      <Routes>
      <Route path='/news/:newsTitle' element={<LatestNewsDetails userCountryCode={userCountryCode}/>} />
        <Route path='/' element={<LatestNewsList userCountryCode={userCountryCode} />}>
          <Route path=':category' element={<LatestNewsList userCountryCode={userCountryCode}/>} />          
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Outlet />
    </nav>
  );
}

export default App;
