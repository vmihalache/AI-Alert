import  {NWSAlert} from '../types/sharedTypes'; // Adjust the path based on where NWSAlert is defined
import {Repository} from './repository/schema'; // Adjust the path based on where Reposito
import {httpGateway} from './CentralGateway'; // Adjust the path based on where CentralGateway is defined
export class Ingestion {  
  stateCode: string;
  constructor (stateCode: string) {
    this.stateCode = stateCode;
  }
  async ingestDataFromWeatherAPi () {
  
  const raw = await httpGateway.fetchData(`https://api.weather.gov/alerts/active/area/${this.stateCode}`, "GET");
 
  const transformed = await raw.json(); 
  if (transformed.features.length === 0) {
    return { description: `No active alerts for ${this.stateCode}.` };
  }
  // The weather API wraps the list in a "features" array
  if (!transformed.features || !Array.isArray(transformed.features)) {
    return;
  }
  const transformedAlerts = transformed.features; 
  
  const stored: NWSAlert[] = transformedAlerts.map((alert: { properties: NWSAlert }) => ({
    ...alert.properties, stateCode: this.stateCode
}))
  await Repository.pushAlerts(stored)
  const allAlerts = await Repository.getAlerts(this.stateCode);
  return allAlerts;
}
}