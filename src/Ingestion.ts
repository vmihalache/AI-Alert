
import  {NWSAlert} from '../types/sharedTypes'; // Adjust the path based on where NWSAlert is defined
import {Repository} from './repository/schema'; // Adjust the path based on where Reposito
import httpGateway from ./src/CentralGateway; // Adjust the path based on where CentralGateway is defined
export class Ingestion {  
  stateCode: string;
  constructor (stateCode: string) {
    this.stateCode = stateCode;
  }
  async ingestDataFromWeatherAPi () {
  
  const raw = httpGateway.fetchData(`https://api.weather.gov/alerts/active/area/${this.stateCode}`, "GET");
  const transformed = await raw.json(); 
  
  // The weather API wraps the list in a "features" array
  if (!transformed.features || !Array.isArray(transformed.features)) {
    console.error('Unexpected API response format: ', transformed);
    return;
  }
  const transformedAlerts = transformed.features; 

  const stored: NWSAlert[] = transformedAlerts.map((alert: { properties: NWSAlert }) => ({
    ...alert.properties
}))
  // console.log(stored)
  await Repository.pushAlerts(stored)
  const allAlerts = await Repository.getAlerts();
  console.log(allAlerts)
}
}
 