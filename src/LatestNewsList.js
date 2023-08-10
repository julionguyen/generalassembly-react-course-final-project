import NewsHeader from "./NewsHeader"
import { CardHeader, Grid } from "@mui/material"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState, useEffect, useRef } from "react";
import Link from '@mui/material/Link';
import { Link as RouterLink} from 'react-router-dom'
import { Backdrop, CircularProgress } from "@mui/material";
import Button  from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';


export default function LatestNewsList({userCountryCode}) {    

    const [newsList, setNewsList] = useState([])
    const [nextPage, setNextPage] = useState()
    const [progress, setProgress] = useState(0)
    const [newsCategory, setNewsCategory] = useState()    
    
    const maxPage = 50
    const params = useParams()

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      });

    console.log('LatestNewsList Params: ', params)
    
    const fetchLatestNews = async () => {
        try {
            console.log('newsList length: ',newsList.length, 'userCountryCode: ', userCountryCode, 'Catetory: ', newsCategory)
            if (newsList.length < maxPage && userCountryCode !== undefined) {
                const fetchParams = new URLSearchParams({
                    apikey: process.env.REACT_APP_NEWSDATA_API_KEY,
                    //apikey: "pub_2675066e74c2851f5437c672aad0e471b1e91",
                    country: userCountryCode,
                    //country: "au",
                    //qInTitle: "How turtles developed over the past 200 million years: Diversity of body size in turtles studied",                            
                })

                if (nextPage !== undefined) {
                    console.log("Next page!")
                    fetchParams.append("page",nextPage)
                }            
                if (newsCategory !== undefined) {
                    console.log("Category!")
                    fetchParams.append("category",newsCategory)
                }            
            
                console.log('Fetch Params: ',fetchParams.toString(), 'page: ', nextPage, 'category: ', newsCategory)

                userCountryCode && await fetch('https://newsdata.io/api/1/news?'+ fetchParams
                ).then(res => {
                    console.log(res)
                    if (res.ok) {
                        res.json()
                        .then(res => {
                            console.log('News: ',res)                                                
                            setNewsList([...newsList,...res.results])
                            if (res.results.length > 0) {
                                setNextPage(res.nextPage)                            
                            } else {
                                setNextPage(null)                            
                            }
                        })                        
                    } else {
                        console.log('Error while fetching data: ',res.results.message)
                    }
                })
                .then(setProgress(100))
            }
        } catch (error) {
            console.log('Error in fetching news: ', error.message)
        }
    }

    const handleLoadMore = () => {
        setProgress(0)
        fetchLatestNews()
    }
    useEffect(()=> {
        if (params) {
            setNewsCategory(params.category)
            setNewsList([])
            fetchLatestNews(params.category)
        }    
        
    }, [params])
    
    console.log(newsList)
    return (
        <>
            <NewsHeader countryCode={userCountryCode}/>
            <Grid container 
                    spacing={4} 
                    padding={2} 
                    className="news_item"                    
            >
                { newsList.length > 0 && newsList.map((newsItem,index) =>
                    <Grid item xs key={index}>
                        <Card sx={{ minWidth: 375, minHeight: 280}}>
                            <CardActionArea component={RouterLink} to={`/news/${newsItem.title}`}>
                                <CardHeader 
                                    align="justify"
                                    title={newsItem.title}
                                    subheader={newsItem.pubDate}
                                />
                            </CardActionArea>
                                { newsItem.image_url &&
                                <CardMedia
                                    component="img"                            
                                    image={newsItem?.image_url}
                                    alt={newsItem?.title}
                                />}
                                <CardContent>
                                <Typography variant="subtitle2" align="right" color="text.secondary">
                                    Credit: {newsItem.creator} | Source: <Link 
                                                href={newsItem.link} 
                                                underline="none"
                                                target="_blank"
                                                rel="noopenner"
                                            >{newsItem.source_id}</Link>
                                </Typography>
                                </CardContent>                            
                            </Card>                
                    </Grid>
                ) }
            </Grid>
            {nextPage && <Button variant="contained" onClick={handleLoadMore}>Load more...</Button>}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={progress < 100}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>    
    )
}
