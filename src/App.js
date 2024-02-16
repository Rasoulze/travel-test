import { Suspense, lazy } from 'react';
import { useSelector } from './context/ContextComponent';
import './style/style.scss'
import { getApiRoute } from './api/fetchApi';
const PageLoading = lazy(() => import('./components/loading-indicator/PageLoading'));
const Login = lazy(() => import('./components/login/Login'));
const MapPanel = lazy(() => import('./components/map/MapPanel'));
const Notification = lazy(() => import('./components/notification/Notification'));
const data = getApiRoute()
function App() {
  const { token , pageLoadingStatus} = useSelector();
  return (
    <Suspense fallback={<PageLoading/>}>
        {Boolean(token) ? <MapPanel/> : <Login/>}
        <Notification/>
        {pageLoadingStatus ? <PageLoading /> : null}
    </Suspense>
  );
}

export default App;
