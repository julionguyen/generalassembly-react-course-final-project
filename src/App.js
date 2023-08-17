import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import NewsFooter from './NewsFooter';
import NewsHeader from './NewsHeader';
import ErrorPage from './ErrorPage';
import LatestNewsList from './LatestNewsList';
import LatestNewsDetails from './LatestNewsDetails'
import { useState,useEffect } from 'react';
import NewsSearchPage from './NewsSearchPage';
import { newsCountries } from './PredefinedConst';

/* APIs used:
  https://ipgeolocation.abstractapi.com/v1/
  https://newsdata.io/
  Author: Julio NGUYEN
*/ 

function App() {
  
  const [userCountry, setUserCountry] = useState()

  const getUserCountryCode = async () => {
    try {      
        await fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=" 
                + process.env.REACT_APP_ABSTRACTAPI_API_KEY)
            .then(res=>{
          if (res.ok) {
            res.json()
            .then(res => {              
              let matchContryInfo = newsCountries.find(e=>e.country===res.country)              
              if (matchContryInfo) {
                setUserCountry({...matchContryInfo, flag: res?.flag})
              } else {
                // Set Default country
                setUserCountry({
                  country: "Australia",
                  country_code: "au",
                  flag: {
                    emoji: "🇦🇺",
                    png: "https://static.abstractapi.com/country-flags/AU_flag.png",
                    svg: "https://static.abstractapi.com/country-flags/AU_flag.svg",
                    unicode: "U+1F1E6 U+1F1FA",
                  }
                })                
              }                            
            })                
          }      
        })  
      } catch(error) {
        console.log('Error while fetching country: ', error.message)
      }        
  }
  useEffect(()=>{
    getUserCountryCode()
  }, [userCountry])
  
  return (
    <nav className="App">
      <NewsHeader countryFlag={userCountry?.flag}/>      
      <Routes>
      <Route path='/search/' element={<NewsSearchPage userCountryCode={userCountry?.country_code}/>} >
        <Route index element={<NewsSearchPage userCountryCode={userCountry?.country_code}/>} />
        <Route path=':searchText' element={<NewsSearchPage userCountryCode={userCountry?.country_code}/>} />
      </Route>
      <Route path='/news/:newsTitle' element={<LatestNewsDetails/>} />
        <Route path='/' element={<LatestNewsList userCountryCode={userCountry?.country_code} />}>
          <Route path=':category' element={<LatestNewsList userCountryCode={userCountry?.country_code}/>} />          
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <NewsFooter />
    </nav>
  );
}

export default App;
