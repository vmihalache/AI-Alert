
import { NWSAlert } from './types'; // Adjust the path based on where NWSAlert is defined

export class Ingestion {  
  async ingestDataFromWeatherAPi () {
  const res = await fetch('https://api.weather.gov/alerts/active');
  const data = await res.json(); 

  // The weather API wraps the list in a "features" array
  const alerts = data.features; 

  const cleaned: NWSAlert[] = alerts.map((alert: { properties: NWSAlert }) => ({
    ...alert.properties
}))
  console.log(cleaned)
}
}
 