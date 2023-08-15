import { Box, Grid, Link } from "@mui/material"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import ImageIcon from '@mui/icons-material/Image'
import { AspectRatio } from "@mui/joy"
import { styled } from '@mui/material/styles'

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

export default function NewsItemDetails({newsItem, errorMessage}) {
    return(
        <Paper
            sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 820,
            flexGrow: 1,
            backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >
            <Grid container spacing={2}>
                <Grid item textAlign="center">
                    <Typography gutterBottom variant="h6" component="div">
                    {errorMessage} {newsItem?.title}
                    </Typography>
                </Grid>        
                <Grid item>
                    { newsItem?.image_url 
                        ?
                            <AspectRatio sx={{width: "20rem", float: "left", mr: 2, mb: 1}}>
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
    )
}