import { Box, Container, Link, Typography } from "@mui/material";

export default function NewsFooter() {
    return(
        <Box
        sx={{
            backgroundColor: (theme) =>
            theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
            p: 3,
        }}
        component="footer"
        >
        <Container maxWidth="sm">
            <Typography variant="body2" color="text.secondary" align="center">
            Developed by 
            <Link color="inherit" underline="none" href="https://www.linkedin.com/in/julionguyen/">
                Julio Nguyen
            </Link>&nbsp;
            2023.            
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
                A Final Project for React Course sponsor by &nbsp; 
                <Link color="inherit" underline="none" href="https://djsir.vic.gov.au/digital-jobs">
                    Victoria Digital Proram
                </Link>            
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
                Course Provider &nbsp;
                <Link color="inherit" underline="none" href="https://generalassemb.ly/">
                    General Assembly
                </Link>            
            </Typography>
        </Container>
        </Box>    
    )
}