import { memo } from "react";
import './style.scss';
const PageLoading = memo(() => {
    return (
        <div className="page-Loading">
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
})
export default PageLoading;