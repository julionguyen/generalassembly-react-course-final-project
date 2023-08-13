import { CardHeader, Grid } from "@mui/material"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink} from 'react-router-dom'

export default function NewsItemCompact({newsItem}) {
    return(
        <>
            <Grid item xs>
            <Card sx={{ minWidth: 375, minHeight: 280}}>
                <CardActionArea component={RouterLink} to={`/news/${newsItem.title}`}>
                    <CardHeader 
                        align="justify"
                        title={newsItem.title}
                        subheader={newsItem.pubDate}
                    />
                </CardActionArea>
                    { newsItem?.image_url &&
                    <CardMedia
                        component="img"                            
                        src={newsItem?.image_url}
                        sx={{ maxWidth: 457}}
                        alt={newsItem?.title}
                    />}
                    <CardContent>
                    <Typography variant="body2" align="justify" color="text.secondary">
                        {newsItem.description}
                    </Typography>    
                    <Typography variant="subtitle2" align="right" color="text.secondary">
                        {newsItem?.creator && `Credit: ${newsItem?.creator} |`} { newsItem?.source_id && <>Source: 
                                <Link 
                                    href={newsItem?.link} 
                                    underline="none"
                                    target="_blank"
                                    rel="noopenner"
                                >{newsItem.source_id}</Link></>}
                    </Typography>
                    </CardContent>                            
                </Card>                
            </Grid>
        </>
    )
}