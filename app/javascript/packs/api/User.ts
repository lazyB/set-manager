import {CSRFToken, DefaultHeaders} from "./Utils";

export const Login = (email: string, password: string) : Promise<Response> => {
    const body : string = JSON.stringify({user: {email, password}})
    let path
    const defaultHeaders = DefaultHeaders()
    const options = {
        method: 'POST',
        headers: defaultHeaders,
        body,
    }
    path = `/api/users/login.json`
    return fetch(path, options)
}

export const Signup = (email: string, password: string) : Promise<Response> => {
    const body : string = JSON.stringify({user: {email, password}})
    let path
    const options = {
        method: 'POST',
        headers: DefaultHeaders(),
        body,
    }
    path = `/api/users/signup.json`
    return fetch(path, options)
}