import { createRoot } from 'react-dom/client'
import './index.css'
import MapChart from './usMap.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <MapChart />
  // </StrictMode>,
)
