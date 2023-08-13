import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CircularProgress from "@mui/material/CircularProgress"
import Backdrop from "@mui/material/Backdrop"
import NewsItemDetails from './NewsItemDetails';

export default function LatestNewsDetails() {

    const [newsItem, setNewsItem] = useState()
    const [progress, setProgress] = useState(0)
    const [errorMessage, setErrorMessage] = useState()

    const params = useParams()


    const fetchLatestNewsDetails = async (newsTitle) => {

        
        setProgress(0)
        try {            
            const fetchParams = new URLSearchParams({
                apikey: process.env.REACT_APP_NEWSDATA_API_KEY,
                //qInTitle: "How turtles developed over the past 200 million years: Diversity of body size in turtles studied",                            
                qInTitle: newsTitle
            })                        

            await fetch('https://newsdata.io/api/1/news?'+ fetchParams
            ).then(res => {
                
                if (res.ok) {
                    res.json()
                    .then(res => {
                        setNewsItem(res.results[0])
                        setProgress(100)                        
                    })                    
                } else {                    
                    setErrorMessage(res.results.message)
                }
            })
        } catch (error) {
            console.log('Error in fetching news: ', error.message)
            setErrorMessage(error.message)
        }
    }
    
    useEffect(()=>{
        if (params) {
            { params.newsTitle.split(":").length > 1 
                ?
                    fetchLatestNewsDetails(params.newsTitle.split(":").slice(1))                    
                : 
                    fetchLatestNewsDetails(params.newsTitle)               
            }
        }

    },[])
        
    return (
        <>
        <NewsItemDetails newsItem={newsItem} errorMessage={errorMessage}/>
        <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={progress < 100}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        </>
    )
}
