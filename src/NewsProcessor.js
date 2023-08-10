import { useParams } from "react-router-dom";
import "./NewsProcessor.css"
import LatestNewsList from "./LatestNewsList";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export default function NewsProcessor() {
    
    const [userCountryCode, setUserCountryCode] = useState()
    const params = useParams()

    console.log(params)



    useEffect(()=>{
        getUserCountryCode()
    }, [])
    console.log(userCountryCode)
    return(
        <div className="processor">
            <NewsHeader countryCode={userCountryCode}/>            
            <LatestNewsList userCountryCode={userCountryCode} />
        </div>
    )
}