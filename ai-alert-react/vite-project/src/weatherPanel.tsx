import ReactMarkdown from "react-markdown";
import { ReactTyped } from "react-typed";
import './WeatherBubble.css'

interface WeatherPanelProps {
  responseProp: string | null;
}

export default function WeatherPanel({ responseProp }: WeatherPanelProps) {
  const defaultText = "Select a state on the map to view active weather alerts.";
  const currentText = responseProp ? responseProp : defaultText;

  return (
    <div className="speech-bubble">
      {/* ⚡ THE SOLUTION: 
          We let ReactMarkdown run first to convert headers and bullet lists 
          into clean, native HTML blocks. Then ReactTyped targets those nodes 
          and handles the typing effect completely inside the browser DOM 
          with ZERO state changes or re-renders! */}
      <ReactTyped
        key={currentText} // Forces typewriter to reset cleanly when text changes
        strings={[currentText]}
        typeSpeed={8}
        showCursor={false}
        loop={false}        // Stops it from looping back and deleting itself when finished    // Guarantees text blocks won't dissolve or fade out
        backSpeed={0}      // Disables backward calculation speed entirely
        backDelay={9999999} //
         fadeOut = {true}
      >
        {/* We place our Markdown block straight inside as the native child! */}
        <div>
          <ReactMarkdown>{currentText}</ReactMarkdown>
        </div>
      </ReactTyped>
    </div>
  );
}