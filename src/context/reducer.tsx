export interface actionIterface {
    type: string,
    value?: any
}
enum actionType {
    addToken = "ADD_TOKEN",
    fillVehicleList = "FILL_VEHICLE_LIST",
    changeLoginLoadingStatus = "CHANGE_LOGIN_LOADING_STATUS",
    changeLoginResponseMsg = "CHANGE_LOGIN_RESPONSE_MSG",
    getVehicleListLoadingStatus = "CHANGE_VEHICLE_LIST_LOADING_STATUS",
    changePageLoadingStatus = "CHANGE_PAGE_LOADING_STATUS",
    errorResponseMSG = "ERROR_RESPONSE_MESSAGE",
    successResponseMSG = "SUCCESS_RESPONSE_MESSAGE",
    markerPosition = "SET_MARKER_POSITION",

}
export function reduce(state: {}, action: actionIterface) {
    switch (action.type) {
        case actionType.addToken:
            return {
                ...state,
                token: action.value
            }
        case actionType.fillVehicleList:
            return {
                ...state,
                vehicleList: action.value
            }
        case actionType.changeLoginLoadingStatus:
            return {
                ...state,
                loginLoadingStatus: action.value
            }
        case actionType.changeLoginResponseMsg:
            return {
                ...state,
                loginResponseMsg: action.value
            }
        case actionType.getVehicleListLoadingStatus:
            return {
                ...state,
                getVehicleListLoadingStatus: action.value
            }
        case actionType.changePageLoadingStatus:
            return {
                ...state,
                pageLoadingStatus: action.value
            }
        case actionType.errorResponseMSG:
            return {
                ...state,
                errorMsg: action.value
            }
        case actionType.successResponseMSG:
            return {
                ...state,
                successMsg: action.value
            }
        case actionType.markerPosition:
            return {
                ...state,
                markerPosition: action.value
            }
        default:
            return { ...state }
    }
}