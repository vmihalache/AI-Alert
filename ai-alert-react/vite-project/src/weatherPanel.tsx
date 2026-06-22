import './WeatherBubble.css'
import './weatherSpinner.css'
import './analyst.css'
import MarkdownTypewriter from './components/markdown-typewriter-react/dists'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React from 'react';



interface WeatherPanelProps {
  responseProp: string | null;
  isLoading: boolean
  animationKey: number
}

export default function WeatherPanel({ responseProp, isLoading, animationKey }: WeatherPanelProps) {
  const defaultText = "Select a state on the map to view active weather alerts.";
  const currentText = responseProp ? responseProp : defaultText;

  const dotLottieRefAnalyst = React.useRef<any>(null);
  const dotLottieRefCloud = React.useRef<any>(null);
  const dotLottieRefWinLottie = React.useRef<any>(null);
  
  const weatherAnimations = {
  rain: "lottieAnimation/windowRenders/rainLottie.json",
  snow: "lottieAnimation/windowRenders/snowLottie.json",
  sunny: "lottieAnimation/windowRenders/sunLottie.json",
  fire: "lottieAnimation/windowRenders/LottieFire.json",
  wind: "lottieAnimation/windowRenders/windLottie.json"
};
function getWindowAnimation(text: string) {
  const lower = text.toLocaleLowerCase()
const firstMatch = lower.match(/\b(cold water|thunderstorm|thunder|snow|fire|wind|water|rain|flood|rip|beaches|storm|waves|dust|currents|cold|rivers)\b/);
  if (!firstMatch) return weatherAnimations.sunny;

  const word = firstMatch[0].toLowerCase();

  if (["water", "rain", "flood", "rip", "currents", "waves", "beaches", "storm", "thunder", "thunderstorm", "rivers", "cold water"].includes(word)) {
    return weatherAnimations.rain;
  }
  
  if (word === "fire") return weatherAnimations.fire;
  if (word === "wind") return weatherAnimations.wind;
  if (word === "snow") return weatherAnimations.snow;

  return weatherAnimations.sunny;

}
const animationPath = getWindowAnimation(currentText);

  
  return (
    <div className="weather-container">
        <div className="WindSock">
           <DotLottieReact
      src="lottieAnimation/redFlagLottie.json"
      //  style={{ width: 1500}}
       autoplay
       loop
       speed={0.01}
    />
    </div>
    <div className="WindowLottie">
       <div key={animationKey} className={`WindowAnimation ${
      !isLoading && currentText !== defaultText
      ? "visible": "hidden"
  }`}>
    <DotLottieReact
  src={animationPath}
  loop
  autoplay
/>
  </div>
   <div className="WindowFrame">
   <img
        className="Staticframe"
        src="assets/Transparent-Window-Glass.jpg"
        alt=""
    />
    <div className='cloudsLoop'>
           { <DotLottieReact
      src="/lottieAnimation/cloudsLoop.json"
      //  style={{ width: 700}}
      loop
      autoplay
       dotLottieRefCallback={(dotLottie) => {
          dotLottieRefWinLottie.current = dotLottie;
          dotLottieRefWinLottie.current?.play()
       }}
    /> }
    </div>
    </div>
    </div>
    
    <div className="Analyst">
         <DotLottieReact
      src="lottieAnimation/lottieAnalyst.json"
      //  style={{ width: 700}}
      loop
       dotLottieRefCallback={(dotLottie) => {
          dotLottieRefAnalyst.current = dotLottie;
          dotLottieRefAnalyst.current?.pause()
       }}
    />
    </div>
    <div key={animationKey} className={`thought-bubbles ${
      isLoading || currentText !== defaultText 
          ? "visible"
          : "hidden"
  }`}>
    <img
        className="thought-1"
        src="assets/bubble1transparent.png"
        alt=""
    />
    <img
        className="thought-2"
        src="assets/bubble2transparent.png"
        alt=""
    />
    </div>
    <div key={`cloud-${animationKey}`}  className={`thought-cloud-wrapper ${
      isLoading || currentText !== defaultText
          ? "visible"
          : "hidden"
  }`}>
    <img
        className="thought-cloud"
        src="assets/cloudFormatted.png"
        alt=""
    />
     <div className="scroll-arrow-up">▲</div>
     <div className="scroll-arrow-down">▼</div>

     <div className="cloud-content">
       {isLoading ? (
        <div>
       
         {dotLottieRefAnalyst.current?.play()}
        <div className="loading-container">
          
        <DotLottieReact
      src="lottieAnimation/cloudLottie.json"
      autoplay
      loop
      // style={{ width: 300, height: 300 }}
       dotLottieRefCallback={(dotLottie) => {
        dotLottie?.setSpeed(5)
          dotLottieRefCloud.current = dotLottie;
          dotLottieRefCloud.current?.play()
       }}
    />
          <p>Gathering weather data...</p>
        </div>
        </div>
      ) : (
        
            <div>
              {/* <div className="scroll-arrow-up">▲</div> */}
            <MarkdownTypewriter
              // style={{ fontSize: '18px', lineHeight: '1.6' }}
              delay={10}
              markdown={currentText}
              charsPerTick={1}
              onComplete={() => {
                dotLottieRefAnalyst.current?.stop()
              }}
            /> 
              {/* <div className="scroll-arrow-down">▼</div> */}

            </div>     
      )}
    </div>
    </div>
  </div>
  );
}

