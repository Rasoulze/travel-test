import { Suspense, lazy, memo } from 'react'
import PageLoading from '../loading-indicator/PageLoading';
import './style.scss'
const MapRequest = lazy(() => import('./MapRequest'));
const MapContainPan = lazy(() => import('./Map'))
const MapPanel = memo(() => {
  return (
    <div id="map-panel">
      <Suspense fallback={<PageLoading />}>
        <MapRequest />
      </Suspense>
      <MapContainPan />
    </div>
  )
})
export default MapPanel;
