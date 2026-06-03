import './WeatherBubble.css'
import './weatherSpinner.css'
import './analyst.css'
import MarkdownTypewriter from 'markdown-typewriter-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React from 'react';



interface WeatherPanelProps {
  responseProp: string | null;
  isLoading: boolean
}

export default function WeatherPanel({ responseProp, isLoading }: WeatherPanelProps) {
  const defaultText = "Select a state on the map to view active weather alerts.";
  const currentText = responseProp ? responseProp : defaultText;
  const dotLottieRef = React.useRef<any>(null);
  
  return (
    <div className="weather-container">
        <div className="analyst">
         <DotLottieReact
      src="../src/lottieAnimation/lottieWeather.json"
      loop
       dotLottieRefCallback={(dotLottie) => {
          dotLottieRef.current = dotLottie;
          dotLottieRef.current?.pause()
       }}
    />
    </div>
    <div className="speech-bubble">
      {isLoading ? (
        <div>
         {dotLottieRef.current?.play()}
        <div className="loading-container">
          <div className="spinner" />
          <p>Gathering weather data...</p>
        </div>
        <div className="thought-bubbles">
            <div className="thought-1"></div>
            <div className="thought-2"></div>
            <div className="thought-3"></div>
            <div className="thought-4"></div>
            <div className="thought-5"></div>
          </div>
        </div>
      ) : (
            <MarkdownTypewriter
              style={{ fontSize: '18px', lineHeight: '1.6' }}
              delay={10}
              markdown={currentText}
              charsPerTick={1}
              onComplete={() => {
    dotLottieRef.current?.stop()
    console.log("ON COMPLETE FIRED");
              }}
    />      
      )}
    </div>
    </div>
  );
}

