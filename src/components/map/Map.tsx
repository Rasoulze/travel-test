import { memo, useMemo } from "react"
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useDispatch, useSelector } from "../../context/ContextComponent"
const MapContainPan = memo(() => {
    return (
        <div>
            <MapContainer
                style={{ height: '100vh' }}
                center={[35.668754, 51.2433]}
                zoom={7}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://map.pishgamanasia.ir/tile/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>
        </div>
    )
})

//==============================================================================================================
const LocationMarker = memo(() => {
    const dispatch = useDispatch();
    const { markerPosition } = useSelector();
    const currentLocation = useMemo(() => {
        return L.icon({
            iconUrl: 'current-marker.png',
            iconSize: [50, 50],
            iconAnchor: [28, 60],
        })
    }, [])

    const destLocation = useMemo(() => {
        return L.icon({
            iconUrl: 'dest-marker.png',
            iconSize: [50, 50],
            iconAnchor: [28, 60],
        })
    }, [])
    const map = useMapEvents({
        click(e) {
            if (markerPosition.length <= 1) {
                let arr = [...markerPosition, e.latlng];
                dispatch({ type: "SET_MARKER_POSITION", value: arr })
            } else {
                dispatch({ type: "SET_MARKER_POSITION", value: [] })
                return false;
            }
        },
    })
    return (
        markerPosition.map((itemPosition: L.LatLng, index: number) => (
            <Marker key={index} position={itemPosition} icon={index === 0 ? currentLocation : destLocation}>
            </Marker>
        ))
    )
})

export default MapContainPan