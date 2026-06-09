import { ComposableMap, Geographies, Geography, Marker  } from "react-simple-maps"
import { geoCentroid } from "d3-geo"
import React, {useState} from "react";

export type MapChartProps = {
  appStateHandler: (state: string) => void;
  isLoading: boolean
  setAnimationKey: any
};

const geoUrl =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

export default function MapChart({appStateHandler, isLoading, setAnimationKey}: MapChartProps) {
  const [activeHoverState, setActiveHoverState] = useState<string | null>(null);
 async function handleStateClick(geoProp: any) {
    appStateHandler(geoProp.properties.name);
    setAnimationKey((prev: number) => prev + 1);
  }

function getCoordinates(geo: any) {
   const coords = geoCentroid(geo)
   return coords
}

function getStateName(geo: any, currentFontSize: number) { 
      return (
        <text 
          textAnchor="middle" 
          pointerEvents="none" 
          fontSize={currentFontSize} 
          fill="#F53" 
        >
          {geo.properties.name}
        </text>
      );
  }
  return (
  <ComposableMap projection="geoAlbers"> 
      <Geographies geography={geoUrl}>
        {({ geographies }) => geographies.map((geo) => {
          const isThisStateHovered = activeHoverState === geo.properties.name;
          const coords = getCoordinates(geo);
          const safeCoords = [coords[0], coords[1]];
          const dynamicSize = isThisStateHovered ? 9 : 6;

          return (
            <React.Fragment key={geo.rsmKey}>
              <Geography
                geography={geo}
                style={{
                  
                  default: { fill: "#2D3748", stroke: "#ffffff", strokeWidth: 0.5, outline: "none",     pointerEvents: isLoading ? "none" : "auto",
},
                  hover: { fill: "#4A5568", stroke: "#ffffff", strokeWidth: 0.5, outline: "none" ,    pointerEvents: isLoading ? "none" : "auto",
},
                  pressed: { fill: "#1A202C", stroke: "#ffffff", strokeWidth: 0.5, outline: "none",     pointerEvents: isLoading ? "none" : "auto",
}
    }}
                onClick={!isLoading ? () => handleStateClick(geo) : undefined}
                onMouseEnter={() => {
                console.log("triggered hover for:", geo.properties.name);
                setActiveHoverState(geo.properties.name);
              }}
              onMouseLeave={() => setActiveHoverState(null)}
              ></Geography>
              <Marker coordinates={safeCoords as [number, number]}>
               {getStateName(geo, dynamicSize)}
              </Marker>
            </React.Fragment>
          );
        })}
        
      </Geographies>
    </ComposableMap>
  );
}

     
