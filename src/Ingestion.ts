
import { NWSAlert } from './types'; // Adjust the path based on where NWSAlert is defined
import Repository from './src/repository/repository'; // Adjust the path based on where Repository is defined
export class Ingestion {  

  async ingestDataFromWeatherAPi () {
    
  const raw = await fetch('https://api.weather.gov/alerts/active');
  const transformed = await raw.json(); 
  
  // The weather API wraps the list in a "features" array
  const filtetedTransformed = transformed.features; 

  const stored: NWSAlert[] = filtetedTransformed.map((alert: { properties: NWSAlert }) => ({
    ...alert.properties
}))
  console.log(stored)
  await Repository.pushAlerts(stored)
}
}
 