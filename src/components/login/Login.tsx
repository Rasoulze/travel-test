import { memo, useRef, useState } from "react";
import { getApiRoute, login } from "../../api/fetchApi";
import { useDispatch, useSelector } from "../../context/ContextComponent";
import Spinner from "../loading-indicator/Spinner";
import './style.scss'
const Login = memo(() => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useDispatch();
    const { loginLoadingStatus, loginResponseMsg } = useSelector();
    const form = useRef(null);
    const submit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        form.current.classList.add("form-validate");
        if (username !== "" && password !== "") {
            login(dispatch, username, password)
        }
        e.preventDefault();
    }
    return (
        <div id="login-panel">
            <form ref={form}>
                <h3>ورود</h3>
                <div className="form-item">
                    <label htmlFor="username">نام کاربری:</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-item">
                    <label htmlFor="password">کلمه عبور:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button
                    onClick={e => submit(e)}
                    disabled={loginLoadingStatus ?? false}>
                    <span style={{ marginLeft: ".5rem" }}>ورود</span>
                    {loginLoadingStatus ?? false ? <Spinner /> : null}
                </button>
                <div className="res-message">{loginResponseMsg ?? ""}</div>
            </form>
        </div>
    )
})
export default Login;