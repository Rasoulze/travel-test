import { memo } from "react";
import "./style.scss"
const ErrorComponent = memo(() => {
    return (
        <div id="error-boundray-component">
            <div id="error-content">
                <div>
                    <img id="erorr-image" src={"alret.png"} alt="error-image" />
                </div>
                <h2>متاسفانه مشکلی ایجاد شده است.</h2>
                <button onClick={() => window.location.reload()}>
                    بارگزاری مجدد
                </button>
            </div>
        </div>
    )
})
export default ErrorComponent;