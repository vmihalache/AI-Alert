
import  {NWSAlert} from '../types/sharedTypes'; // Adjust the path based on where NWSAlert is defined
import {Repository} from './repository/schema'; // Adjust the path based on where Reposito
export class Ingestion {  
  stateCode: string;
  constructor (stateCode: string) {
    this.stateCode = stateCode;
  }
  async ingestDataFromWeatherAPi () {
  

  const raw = await fetch(`https://api.weather.gov/alerts/${this.stateCode}`);
  console.log(`https://api.weather.gov/alerts/${this.stateCode}`)
  const transformed = await raw.json(); 
  
  // The weather API wraps the list in a "features" array
  const transformedAlerts = transformed.features; 

  const stored: NWSAlert[] = transformedAlerts.map((alert: { properties: NWSAlert }) => ({
    ...alert.properties
}))
  // console.log(stored)
  await Repository.seedDbWithStates()
  await Repository.pushAlerts(stored)
  const allAlerts = await Repository.getAlerts();
  console.log(allAlerts)
}
}
 