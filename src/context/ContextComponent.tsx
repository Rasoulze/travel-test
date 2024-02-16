import React, { createContext, useContext, useReducer } from "react";
import { reduce } from "./reducer";


export const selectorContext = createContext(null);
export const dispatchContext = createContext(null);

interface initialStateInter {
    token: string,
    vehicleList: [],
    loginLoadingStatus: boolean,
    loginResponseMsg: string,
    getVehicleListLoadingStatus: boolean,
    pageLoadingStatus: boolean,
    errorMsg: string,
    successMsg: string,
    markerPosition: L.LatLng[];
}
const initInitial: initialStateInter = {
    token: "",
    vehicleList: [],
    loginLoadingStatus: false,
    loginResponseMsg: "",
    getVehicleListLoadingStatus: false,
    pageLoadingStatus: false,
    errorMsg: "",
    successMsg: "",
    markerPosition: []
};

export function ContextComponent({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reduce, initInitial);
    return (
        <selectorContext.Provider value={state}>
            <dispatchContext.Provider value={dispatch}>
                {children}
            </dispatchContext.Provider>
        </selectorContext.Provider>
    )
}


export function useSelector() {
    return useContext(selectorContext);
}

export function useDispatch() {
    return useContext(dispatchContext);
}