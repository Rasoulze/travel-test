let login_url: string = "";
let get_vehicle_url: string = "";
let send_request_url: string = "";
//==========================================================================
export async function getApiRoute() {
    try {
        return fetch("./apiConfig.json")
            .then((jsonFile) => {
                return jsonFile.json()
            })
            .then((result) => {
                login_url = result.LOGIN;
                get_vehicle_url = result.GET_VEHICLE_USERS;
                send_request_url = result.SEND_REQUEST;
            });
    } catch (error) {
        console.log(error);
    }
}
//==========================================================================
export async function login(dispatch: ({ type, value }) => void, Username: string, Password: string) {
    try {
        const option = {
            method: "Post",
            body: JSON.stringify({ Username, Password }),
            headers: {
                "Content-Type": "application/json",
            },
        }
        dispatch({ type: "CHANGE_LOGIN_LOADING_STATUS", value: true });
        const response = await fetch(login_url, option);
        const data = await response.json();
        if (data?.status === 1) {
            dispatch({ type: "CHANGE_LOGIN_RESPONSE_MSG", value: "" });
            dispatch({ type: "ADD_TOKEN", value: data.data.userToken });
        } else {
            dispatch({ type: "CHANGE_LOGIN_RESPONSE_MSG", value: data.message });
        }
        dispatch({ type: "CHANGE_LOGIN_LOADING_STATUS", value: false });
    } catch (error) {
        dispatch({ type: "CHANGE_LOGIN_LOADING_STATUS", value: false });
        console.log(error);
    }
}
//==========================================================================
export async function getVehicleList(dispatch: ({ type, value }) => void, usertoken: string, SearchTerm: string) {
    try {
        const params = new URLSearchParams({
            usertoken,
            SearchTerm,
        });
        const option = {
            method: "Get",
            headers: {
                "Content-Type": "application/json",
            },
        }
        dispatch({ type: "CHANGE_VEHICLE_LIST_LOADING_STATUS", value: true });
        const response = await fetch(get_vehicle_url + "?" + params, option);
        const data = await response.json();
        if (data?.status === 1) {
            // dispatch({ type: "FILL_VEHICLE_LIST", value: data.data });
        } else {
            dispatch({ type: "CHANGE_LOGIN_RESPONSE_MSG", value: data.message });
        }
        dispatch({ type: "CHANGE_VEHICLE_LIST_LOADING_STATUS", value: false });
    } catch (error) {
        dispatch({ type: "CHANGE_VEHICLE_LIST_LOADING_STATUS", value: false });
        console.log(error);
    }
}
//==========================================================================
export async function sendRequest(dispatch: ({ type, value }) => void, UserToken: string, VehicleUserTypeId: string, Source: string, Destination: string) {
    try {
        const option = {
            method: "Post",
            body: JSON.stringify({ UserToken, VehicleUserTypeId, Source, Destination }),
            headers: {
                "Content-Type": "application/json",
            },
        }
        dispatch({ type: "CHANGE_PAGE_LOADING_STATUS", value: true });
        const response = await fetch(send_request_url, option);
        const data = await response.json();
        if (data?.status === 1) {
            dispatch({ type: "SUCCESS_RESPONSE_MESSAGE", value: data.message });
        } else {
            dispatch({ type: "ERROR_RESPONSE_MESSAGE", value: data.message });
        }
        dispatch({ type: "CHANGE_PAGE_LOADING_STATUS", value: false });
    } catch (error) {
        dispatch({ type: "CHANGE_PAGE_LOADING_STATUS", value: false });
        console.log(error);
    }
}
