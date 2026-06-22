import {httpGateway} from './reactHttpGateway'
import MapChart from "./usMap";
import  WeatherPanel  from "./weatherPanel";
import './App.css'
import { useState } from 'react';


export const App = () => {
   
    const [apiResponse, setApiResponse] = useState("")
    const [isLoading, setLoadingState]=useState(false)
    const [animationKey, setAnimationKey] = useState(0);
    const [isMobile, setMobile] = useState(false)
    const url = "https://ai-alert-production.up.railway.app/api/weather"
    const handleGetUsState = async (usStateParam: string) => {
        
        setLoadingState(true)        
          try {
        const question = { "question": `What is the weather in ${usStateParam}?`}
        const result = await httpGateway.fetchData(url, "POST", question)
        const formattedResponse = JSON.stringify(result, null, 2).replaceAll('\\n', '\n').replaceAll(/[{()}]/g, '');
        console.log("SETTING RESPONSE:", usStateParam, formattedResponse);
        setApiResponse(formattedResponse);        
        setLoadingState(false)
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
            <MapChart appStateHandler={handleGetUsState} setAnimationKey = {setAnimationKey} isMobile={isMobile} setMobile={setMobile} isLoading={isLoading} 
            />
            </div>
            <div className="child-two">
            <WeatherPanel responseProp={apiResponse} isLoading={isLoading} animationKey={animationKey} />
            </div>
        </div>
        </div>
    )
}
