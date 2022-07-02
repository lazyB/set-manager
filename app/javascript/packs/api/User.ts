import {CSRFToken} from "./Utils";

export const Login = (email: string, password: string) : Promise<Response> => {
    const body : string = JSON.stringify({user: {email, password}})
    let path
    const options = {
        method: 'POST',
        headers: {...(CSRFToken()), 'Content-Type': 'application/json'},
        body,
    }
    path = `/login.json`
    return fetch(path, options)
}

export const Signup = (email: string, password: string) : Promise<Response> => {
    const body : string = JSON.stringify({user: {email, password}})
    let path
    const options = {
        method: 'POST',
        headers: {...(CSRFToken()), 'Content-Type': 'application/json'},
        body,
    }
    path = `/signup.json`
    return fetch(path, options)
}