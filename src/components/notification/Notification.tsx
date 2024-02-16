import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "../../context/ContextComponent";
import "./style.scss"
const Notification = memo(() => {
    const dispatch = useDispatch();
    const { successMsg, errorMsg } = useSelector()
    const clearMsg = () => {
        Boolean(successMsg) && dispatch({ type: "SUCCESS_RESPONSE_MESSAGE", value: "" });
        Boolean(errorMsg) && dispatch({ type: "ERROR_RESPONSE_MESSAGE", value: "" });
    }
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (Boolean(successMsg) || Boolean(errorMsg)) {
            timer = setTimeout(clearMsg, 5000);
        } else {
            clearInterval(timer)
        }
        return () => timer !== undefined && clearInterval(timer)
    }, [successMsg, errorMsg])
    if (Boolean(successMsg) || Boolean(errorMsg)) return (
        <div id="notification">
            <div id="noti-content">
                <a className="close-btn" onClick={clearMsg}>
                    <img src="close-btn.png" alt="close-btn" />
                </a>
                <div className="noti-icon">
                    {
                        Boolean(errorMsg) ? <img src="error-noti.png" alt="error-noti.png" /> : <img src="success-noti.png" alt="success-noti" />
                    }
                </div>
                <div >
                    <h4 className="noti-message">{Boolean(errorMsg) ? errorMsg : successMsg}</h4>
                </div>
            </div>
        </div>
    )
    return null;
})
export default Notification;