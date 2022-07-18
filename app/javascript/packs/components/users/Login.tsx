import * as React from "react";
import { useState} from "react";
import {Login as APILogin} from "../../api/User";
import {APIConstants} from "../../utils/constants";
import {useNavigate} from "react-router-dom";
export const Login = (_) => {
    console.log("login")
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const navigation = useNavigate()
    const doLogin = (e) => {
        e.preventDefault()
        APILogin(email, password).then((response) => {
            const authHeader = response.headers.get(APIConstants.AuthorizationHeaderKey)
            if(authHeader) {
                window.localStorage.setItem(APIConstants.AuthorizationHeaderKey, authHeader)
            }else {
                window.localStorage.removeItem(APIConstants.AuthorizationHeaderKey)
            }
            navigation('/songs/1')
        }).catch((error) => {
            alert("OOps! " + error)
            window.localStorage.removeItem(APIConstants.AuthorizationHeaderKey)
        })
    }
    return <article> <h2>Log in</h2>
        <form onSubmit={doLogin}>
            <p>
                <label>Enter your email</label>
                <input type={"email"} value={email} onChange={(event) => setEmail(event.target.value)}/>
            </p>
            <p>
                <label>Password</label>
                <input type={"password"} value={password} onChange={(event) => setPassword(event.target.value)}/>
            </p>
            <button type={"submit"}>OK</button>
        </form>
    </article>
}