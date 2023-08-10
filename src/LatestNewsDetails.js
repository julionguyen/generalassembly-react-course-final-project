import NewsHeader from "./NewsHeader"
import { Box, Grid, Link } from "@mui/material"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import { Navigate, useParams } from "react-router-dom"
import Paper from "@mui/material/Paper"
import { styled } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/Image';
import { AspectRatio } from "@mui/joy"


export default function LatestNewsDetails(userCountryCode) {

    const [newsItem, setNewsItem] = useState()
    const [progress, setProgress] = useState(0)
    
    const params = useParams()

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      });

    const fetchLatestNewsDetails = async (newsTitle) => {

        console.log('Fetching News Details: ', newsTitle)

        try {            
            const fetchParams = new URLSearchParams({
                apikey: process.env.REACT_APP_NEWSDATA_API_KEY,
                //apikey: "pub_2675066e74c2851f5437c672aad0e471b1e91",                                
                //qInTitle: "How turtles developed over the past 200 million years: Diversity of body size in turtles studied",                            
                qInTitle: newsTitle
            })
            
            console.log('Fetch Params: ',fetchParams.toString())

            await fetch('https://newsdata.io/api/1/news?'+ fetchParams
            ).then(res => {
                console.log(res)
                if (res.ok) {
                    res.json()
                    .then(res => {
                        console.log('News Details: ',res)                                                
                        setNewsItem(res.results[0])
                        
                    })
                    .then(setProgress(100))
                } else {
                    console.log('Error while fetching data: ',res.results.message)
                }
            }).then(setProgress(100))
        } catch (error) {
            console.log('Error in fetching news: ', error.message)
        }
    }
    console.log(params)
    useEffect(()=>{
        if (params) {
            fetchLatestNewsDetails(params.newsTitle)
        }    
    },[])
    console.log(newsItem)
    return (
        <>
        <NewsHeader countryCode={userCountryCode}/>
        <Paper
            sx={{
            p: 2,
            margin: 'auto',
            maxWidth: '100%',
            flexGrow: 1,
            backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >
      <Grid container spacing={2} xs="auto">
        <Grid item sx={12} container textAlign={"center"}>
            <Typography gutterBottom variant="h6" component="div">
                {newsItem?.title}
            </Typography>
        </Grid>        
        <Grid item>
            { newsItem?.image_url 
                ?
                <AspectRatio sx={{width: "20rem", float: "left", margin: 1}}>
                    <Img alt={newsItem?.title} 
                        src={newsItem?.image_url}                         
                    />
                </AspectRatio>
                :
                    <AspectRatio sx={{width: "20rem", float: "left", margin: 1}}>
                        <Box alignItems={"center"}>
                        <ImageIcon sx={{fontSize: '3rem', opacity: 0.2}}/>
                        </Box>                        
                    </AspectRatio>
                        
                    
            }
            <Typography variant="body2" gutterBottom align="justify">
                {newsItem?.content}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Credit: {newsItem?.creator} | Source: <Link 
                                                    href={newsItem?.link} 
                                                    underline="none"
                                                    target="_blank"
                                                    rel="noopenner"
                                                >{newsItem?.source_id}</Link>
                
              </Typography>
        </Grid>
      </Grid>
    </Paper>        <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={progress < 100}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        </>
    )
}
