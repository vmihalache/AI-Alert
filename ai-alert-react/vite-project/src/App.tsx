import { useState } from "react"
import {httpGateway} from './reactHttpGateway'
import MapChart from "./usMap";
import  WeatherPanel  from "./weatherPanel";
import './App.css'


export const App = () => {
    const [usState, setUsState] = useState("");
    const [apiResponse, setApiResponse] = useState("")
    const [isLoading, setLoadingState]=useState(Boolean)
    const url = "https://ai-alert-production.up.railway.app/api/weather"
    const handleGetUsState = async (usStateParam: string) => {
        setUsState(usStateParam)
        setLoadingState(true)
          try {
        const question = { "question": `What is the weather in ${usStateParam}?`}
        setApiResponse(await httpGateway.fetchData(url, "POST", question))
        setTimeout(() => {
             setLoadingState(false)
        }, 15000);
        console.log(apiResponse)
    }
    catch (error) {
        console.log(error)
        setLoadingState(false)
    }
    

    }
    return(
        <div>
        <div className = "container" >
            <div className="child-one">
            <MapChart appStateHandler={handleGetUsState}
             isLoading = {isLoading}
            />
            </div>
            <div className="child-two">
            <WeatherPanel responseProp={apiResponse} />
            </div>
        </div>
        </div>
    )
}
