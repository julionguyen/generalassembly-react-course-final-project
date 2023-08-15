import "./ErrorPage.css"
import { useNavigate } from "react-router-dom"
import {Box, Paper, Button, Typography} from '@mui/material'

export default function ErrorPage({errorCode, errorMessage}) {
    let navigate = useNavigate()
    
    const handleHomeClick = () => {
        navigate("/")
    }
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
                    {errorCode ? errorCode : "404"}
                </Typography>
                <Typography variant="h6" padding={1}>
                        {errorMessage ? errorMessage : "The page you’re looking for doesn’t exist."}
                </Typography>
                <Button variant="contained" onClick={handleHomeClick}>Back Home</Button>            
            </Paper>
        </Box>
    )
}