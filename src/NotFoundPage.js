import "./NotFoundPage.css"
import {Box, Paper, Button, Typography} from '@mui/material'

export default function NotFoundPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: "center",
                justifyContent: "center",
                '& > :not(style)': {
                    m: 1,
                    width: "50vw",
                    height: "20rem",
                    minHeight: '20vh',
                    minWidth: '50vh',
                    margin: "1rem",
                    backgroundColor: "primary",
                    color: "primary"
                },
            }}
        >
            <Paper elevation={3} square>
                <Typography variant="h1">
                    404
                </Typography>
                <Typography variant="h6">
                        The page you’re looking for doesn’t exist.
                </Typography>
                <Button variant="contained">Back Home</Button>            
            </Paper>
        </Box>
    )
}