import { useParams } from "react-router-dom";
import NewsHeader from "./NewsHeader"
import "./NewsProcessor.css"
import ShowNewsList from "./ShowNewsList";
import { useEffect, useState } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import { Backdrop, CircularProgress } from "@mui/material";
import { Button } from "@mui/base";


export default function NewsProcessor() {
    
    const [userCountryCode, setUserCountryCode] = useState()
    const [news, setNews] = useState([])
    const [progress, setProgress] = useState(0)    
    const [nextPage, setNextPage] = useState("")

    const params = useParams()
    
    console.log(params)

    const getLatestNews = () => {
        try {                 
            userCountryCode && fetch('https://newsdata.io/api/1/news?'+
                new URLSearchParams({
                    apikey: process.env.REACT_APP_NEWSDATA_API_KEY,
                    //country: userCountryCode,
                    country: "nz",
                    //qInTitle: "Priced Around £25, Fans Readily Splurged £175 To Buy England Team Bucket Hats During Ashes 2023"
                    //page: nextPage
                    page: "16914623257f527005ae4fc9c639baa02dd98216b9"
                    
                }
                )
            ).then(res => {
                console.log(res)
                if (res.ok) {
                    res.json()
                    .then(res => {
                        console.log('News: ',res)
                        setNews(res.results)
                        setNextPage(res.nextPage)
                    })
                    .then(setProgress(100))
                }
            })
        } catch (error) {
            
        }
    }

    const getUserCountryCode = () => {
        try {
            fetch('https://api.techniknews.net/ipgeo/').then(res=>{
              if (res.ok) {
                res.json()
                .then(res => {                  
                  setUserCountryCode(res.countryCode.toLowerCase())                  
                })
                .then(setProgress(50))
              }      
            })  
          } catch(error) {
        
          }        
    }

    useEffect(()=>{
        getUserCountryCode()
    }, [])

    useEffect(()=> {
        getLatestNews();
    }, [userCountryCode])

    console.log(news)
    return(
        <div className="processor">
            <NewsHeader countryCode={userCountryCode}/>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={progress < 100}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <ShowNewsList countryCode={userCountryCode} newsList={news}> {progress ? <Skeleton variant="rectangular"/> : <h1 />}</ShowNewsList>            
        </div>
    )
}