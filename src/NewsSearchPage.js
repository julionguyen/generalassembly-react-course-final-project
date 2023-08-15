import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Grid, Link, Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import { useParams } from "react-router-dom"
import Paper from "@mui/material/Paper"
import { styled } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/Image';
import { AspectRatio } from "@mui/joy"
import { NavLink as RouterLink} from 'react-router-dom'

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });


export default function NewsSearchPage({userCountryCode}) {

    const [newsResults, setNewsResults] = useState([])
    const [progress, setProgress] = useState(0)
    const [totalPage, setTotalPage] = useState()
    const [nextPage, setNextPage] = useState()
    const [errorMessage, setErrorMessage] = useState()

    const params = useParams()    

    const fetchLatestNewsSearchDetails = async (searchTxt) => {        
        
        try {                        
            const fetchParams = new URLSearchParams({
                apikey: process.env.REACT_APP_NEWSDATA_API_KEY,
                country: userCountryCode?.toString().toLowerCase(),
                q: searchTxt
            })
            
            if (nextPage) {                
                fetchParams.append("page",nextPage)
            }

            if (userCountryCode) {
                await fetch('https://newsdata.io/api/1/news?'+ fetchParams)
                    .then(res => {
                        if (res.ok) {
                            res.json()
                            .then(res => {
                                setNewsResults([...newsResults,...res.results])
                                setTotalPage(res.totalResults)
                                setNextPage(res.nextPage)
                                setProgress(100)
                            })                    
                        } else {                    
                            setErrorMessage(res.results.message)
                        }
                    })
            }
        } catch (error) {
            console.log('Error in fetching news: ', error.message)
            setErrorMessage(error.message)
        }        
    }

    const handleLoadMore = () => {
        setProgress(0)        
        fetchLatestNewsSearchDetails(params?.searchText)                       
    }

    useEffect(()=>{
        if (params) {
            fetchLatestNewsSearchDetails(params?.searchText)                       
        }

    },[params])    

    return(
        <>
        {totalPage && 
            <Box>
                <Typography variant="h5">
                    Total results found: {totalPage}
                </Typography>
            </Box>
        }
        {newsResults.map((newsItem, index) => 
        <Paper
            key={index}
            sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 820,
            flexGrow: 1,
            backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >
            <Grid container spacing={2} direction="column">            
                <Grid item textAlign={"left"}>
                    <RouterLink to={`/news/${newsItem.title}`} style={{textDecoration: "none"}}>
                        <Typography gutterBottom variant="h6" component="div">
                            {errorMessage} {newsItem?.title}
                        </Typography>
                    </RouterLink>
                </Grid>
                <Grid item>
                    { newsItem?.image_url 
                        ?
                        <AspectRatio sx={{width: "10rem", float: "left", mr: 2, mb: 1}}>
                            <Img alt={newsItem?.title} 
                                    src={newsItem?.image_url}                         
                            />
                        </AspectRatio>
                        :
                        <AspectRatio sx={{width: "10rem", float: "left", margin: 1}}>
                            <Box alignItems={"center"}>
                                <ImageIcon sx={{fontSize: '3rem', opacity: 0.2}}/>
                            </Box>                        
                        </AspectRatio>                                            
                    }
                    <Typography variant="body2" gutterBottom align="justify">
                        {newsItem.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign={'right'}>
                        {newsItem.category && <>Category: {newsItem?.category.map((categoryItem) => categoryItem)} | </>}
                        {newsItem?.creator && `Credit: ${newsItem?.creator} |`} {newsItem?.source_id && <>Source:&nbsp;
                            <Link 
                                href={newsItem?.link} 
                                underline="none"
                                target="_blank"
                                rel="noopenner"
                            >{newsItem?.source_id}</Link></>}
                    </Typography>
                </Grid>                                
            </Grid>            
        </Paper>
        )}
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