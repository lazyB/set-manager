import React, {useState} from "react"
import {Signup as APISignup} from "../../api/User";
export const Signup = (props) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const doSignup = (e) => {
        e.preventDefault()
        APISignup(email, password).then((response) => {
            alert("logged in!")
        })
    }
    return <article> <h2>Create an account</h2>
        <form onSubmit={doSignup}>
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