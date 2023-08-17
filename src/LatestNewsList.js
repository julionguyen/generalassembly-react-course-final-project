import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Grid } from "@mui/material"
import { useState, useEffect, useRef } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import Button  from "@mui/material/Button";
import { useParams } from "react-router-dom";
import NewsItemCompact from './NewsItemCompact';
import ErrorPage from './ErrorPage';

export default function LatestNewsList({userCountryCode}) {    

    const [newsList, setNewsList] = useState([])
    const [nextPage, setNextPage] = useState()
    const [progress, setProgress] = useState(0)
    const [newsCategory, setNewsCategory] = useState()    
    const [errorMessage, setErrorMessage] = useState()
        
    const params = useParams()    

    const fetchLatestNews = async (category, loadMore) => {
        try {            
            // if category === undefined The URL on index page            
            setProgress(0)

            // Only fetch the data if userCountryCode provided
            if (userCountryCode !== undefined) {
                const fetchParams = new URLSearchParams({
                    apikey: process.env.REACT_APP_NEWSDATA_API_KEY,                    
                    country: userCountryCode?.toString().toLowerCase(),
                    //country: "au",                    
                })

                if (category !== undefined) {                    
                    fetchParams.append("category",category)
                }
                if (loadMore && nextPage) {                    
                    fetchParams.append("page",nextPage)
                }

                userCountryCode && await fetch('https://newsdata.io/api/1/news?'+ fetchParams
                ).then(res => {
                    console.log('Error: ',res)
                    if (res.ok) {
                        res.json()
                        .then(res => {                            
                            if (loadMore && nextPage) {
                                setNewsList([...newsList, ...res.results])
                            } else {
                                setNewsList(res.results)
                            }                            
                            setNextPage(res.nextPage)
                            setProgress(100)                            
                        })
                    } else {
                        console.log('Error while fetching data: ',res.results.message)
                        setErrorMessage(res.results.message)
                    }
                })
            }
        } catch (error) {
            console.log('Catch Error: ', error.message)
            if (category) { 
                setErrorMessage(`${error.message} ${category}`)
            } else {
                setErrorMessage(error.message)
            }
            setProgress(100)
        }
    }

    const handleLoadMore = () => {
        setProgress(0)        
        fetchLatestNews(newsCategory, true)
    }

    useEffect(()=>{        
        if (params?.category) {
            setProgress(0)
            setNewsCategory(params?.category)            
        }        
        fetchLatestNews(params?.category)
        return () => {
            setErrorMessage("")
        }
    },[params])
    
    return (
        <>               
            <Grid container 
                    spacing={4} 
                    padding={5}
                    gap={5}
                    justifyContent="center"
                    className="news_item"
            >                
                {newsList.length > 0 
                    ? newsList?.map((newsItem,index) =>
                        <NewsItemCompact newsItem={newsItem} key={index}/>                    
                    )
                    : <Grid item justifyContent="center">
                        { errorMessage 
                            ? <ErrorPage errorCode={422} errorMessage={errorMessage} />
                            : newsCategory !== undefined && <ErrorPage errorCode={0} errorMessage={`Ops, the topic ${newsCategory} is empty`} />
                        }
                    </Grid>
                }
            </Grid>
            {nextPage && <Button variant="contained" onClick={handleLoadMore}>Continue...</Button>}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={progress < 100}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>    
    )
}
