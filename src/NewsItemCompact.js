import { CardHeader, Grid, Button, Box, Card, CardContent, CardActions, Divider } from "@mui/material"
import { AspectRatio } from "@mui/joy"
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ImageIcon from '@mui/icons-material/Image'
import { Link as RouterLink} from 'react-router-dom'

export default function NewsItemCompact({newsItem}) {
    return(
        <>
            <Card sx={{ maxWidth: 345 }}>
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                component="img"
                height="200"
                image={ newsItem?.image_url ? newsItem?.image_url : "/no_image.jpg"}
                alt={newsItem?.title}
                />
                <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.54)',
                    color: 'white',
                    padding: '10px',
                }}
                >
                    <Link component={RouterLink} to={`/news/${newsItem.title}`} underline="none" color={"white"}>
                        <Typography variant="subtitle" height={2}>{newsItem?.title}</Typography>                
                    </Link> 
                </Box>
            </Box>
            <CardContent align="justify">
                <Typography variant="body2" color="text.secondary">
                    {newsItem?.description && `${newsItem?.description.slice(0,300)}...`}
                </Typography>
                <Divider />
                <Typography variant="subtitle2" align="right" color="text.secondary">
                        {newsItem?.creator && `Credit: ${newsItem?.creator} |`} { newsItem?.source_id && <>Source: &nbsp;
                                <Link 
                                    href={newsItem?.link} 
                                    underline="none"
                                    target="_blank"
                                    rel="noopenner"
                                >{newsItem.source_id}</Link></>}
                    </Typography>

            </CardContent>            
                
            </Card>
        </>
    )
}