import React, {useState} from "react"
import {Login as APILogin} from "../../api/User";
export const Login = (props) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const doLogin = (e) => {
        e.preventDefault()
        APILogin(email, password).then((response) => {
            const jwt = response.headers.get("Authorization")
            localStorage.setItem("Authorization", jwt)
        }).catch((error) => {
            console.error(error)
            localStorage.removeItem("Authorization")
        })
    }
    return <article> <h2>Here's where we log in</h2>
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