import { CardHeader, Grid } from "@mui/material"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import Link from '@mui/material/Link';

export default function ShowNewsList({countryCode, newsList}) {    

    const [fullArticle, setFullArticle] = useState(false)
    
    const handleNewsItem = title => {
        setFullArticle(!fullArticle)        
        console.log(title)
        //Navigate(`/${title}`)
    }
    return (
        <Grid container spacing={2} padding={2} className="news_item">
            { newsList && newsList.map((newsItem,index) =>
            <Grid item xs key={index}>
                <Card sx={{ minWidth: 375, minHeight: 280}}>
                    <CardActionArea onClick={handleNewsItem}>
                        <CardHeader 
                            align="justify"
                            title={newsItem.title}
                            subheader={newsItem.pubDate}
                        />
                    </CardActionArea>
                        { newsItem.image_url &&
                        <CardMedia
                            component="img"                            
                            image={newsItem.image_url}
                            alt={newsItem.title}
                        />}
                        <CardContent>
                        <Typography variant="body2" align="justify" color="text.secondary">
                            {fullArticle ? newsItem.content : newsItem.description}
                        </Typography>
                        <Typography variant="subtitle2" align="right" color="text.secondary">
                            Credit: {newsItem.creator}                            
                        </Typography>
                        <Typography variant="subtitle2" align="right" color="text.secondary">
                            Source: <Link 
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
    )
}
/*
<ul className="cards">             
{ newsList && newsList.map((newsItem,index) =>
    <li key={index}
        className={newsItem.image_url !== undefined ? "card-item double" : "card-item noImage"}
    >
        <Link to={`/${countryCode}/${encodeURI(newsItem.title)}`}>
            <figure className="card">
                {newsItem.image_url && <img src={newsItem.image_url} alt={newsItem.title} />}
                <figcaption className="caption">
                    <h3 className="caption-title">{newsItem.title}</h3>
                    <p>{newsItem.description}</p>
                </figcaption>
            </figure>
        </Link>
    </li>                
)}
</ul>
*/