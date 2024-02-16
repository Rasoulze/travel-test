import { lazy, memo, useState } from "react";
import { useDispatch, useSelector } from "../../context/ContextComponent";
import { getVehicleList, sendRequest } from "../../api/fetchApi";
const Spinner = lazy(() => import("../loading-indicator/Spinner"))

const MapRequest = memo(() => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [showVehicleList, setShowVehicleList] = useState<boolean>(false);
    const [vehicleId, setVehicleId] = useState<number>(0);
    const dispatch = useDispatch();
    const { token, getVehicleListLoadingStatus, markerPosition } = useSelector();
    const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
        setShowVehicleList(true);
        e.target.value.length >= 2 && getVehicleList(dispatch, token, e.target.value);
    }
    const onSendRequest = () => {
        if (!Boolean(vehicleId)) {
            dispatch({ type: "ERROR_RESPONSE_MESSAGE", value: "نوع ماشین آلات انتخاب شود" });
        } else {
            sendRequest(dispatch, token, "0", String(markerPosition[0]), String(markerPosition[1]));
        }
    }
    return (
        <div id="map-send-request-panel">
            <div className='p-4'>
                <div className='marker-request-info'>
                    <img src='current-marker.png' alt="current-marker" />
                    <span className='text-red fw-bold'>مبدا:&nbsp; </span>
                    <span className='text-red fw-bold'>{markerPosition[0] !== undefined ? markerPosition[0].lat + " ، " + markerPosition[0].lng : ""}</span>
                </div>
                <div className='marker-request-info'>
                    <img src='dest-marker.png' alt="dest-marker" />
                    <span className='text-blue fw-bold'>مقصد:&nbsp; </span>
                    <span className='text-blue fw-bold'>{markerPosition[1] !== undefined ? markerPosition[1].lat + " ، " + markerPosition[1].lng : ""}</span>
                </div>
                <div style={{ width: "100%" }}>
                    <div id='request-input'>
                        <input type='text'
                            minLength={2}
                            value={searchInput}
                            onChange={onSearchInputChange}
                            onFocus={(e) => setShowVehicleList(true)}
                            onBlur={() => setShowVehicleList(false)}
                        />
                        <div className="input-icon">
                            {getVehicleListLoadingStatus ?? false ? <Spinner /> : <img src="icons-magnifier.png" alt="icons-magnifier" />}
                        </div>
                        {showVehicleList ? <Resultsearch setVehicleId={setVehicleId} setSearchInput={setSearchInput} /> : null}
                    </div>
                    <button
                        disabled={markerPosition.length !== 2}
                        onClick={onSendRequest}
                    >ثبت درخواست</button>
                </div>
            </div>
        </div>
    )
})
//=========================================================================================================================================================
const Resultsearch = memo(({ setVehicleId, setSearchInput }: { setVehicleId: (value: number) => void, setSearchInput: (value: string) => void }) => {
    // const { state } = useContext(ComponentContext);
    const onSelect = (vehicleName: string) => {
        setVehicleId(1);
        setSearchInput(vehicleName)
    }
    const vehicleList: string[] = [
        "هواپیما",
        "اتوبوس",
        "ون",
        "تاکسی",
        "موتور"
    ]
    return (
        <div id="result-search">
            <ul>
                {(vehicleList ?? []).map((item: string, index: number) => (
                    <li key={index}><a onMouseDown={() => onSelect(item)}>{item}</a></li>
                ))}
            </ul>
            {(vehicleList ?? []).length === 0 ? <div>هیچ موردی یافت نشد.</div> : null}
        </div>
    )
})
export default MapRequest;