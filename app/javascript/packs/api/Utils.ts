import {APIConstants} from "../utils/constants";

export function CSRFToken() : Map<string, string> {
    const csrfTag : Element = document.querySelector(`meta[name="${APIConstants.CSRFElementId}"]`);
    const rVal = new Map()
    rVal[APIConstants.XCRFHeaderKey] = (csrfTag?.content ?? "")
    return rVal
}
export function AuthJWTHeader(): Map<string, string> {
    const rVal = new Map()
    const authHeader = window.localStorage.getItem(APIConstants.AuthorizationHeaderKey)
    if(authHeader){
        rVal[APIConstants.AuthorizationHeaderKey] = authHeader
    }
    return rVal
}
export function DefaultHeaders() : Headers {
    let headers = new Headers()
    headers.append('content-type', 'application/json')
    headers.append('accept', 'application/json')
    headers.append(APIConstants.AuthorizationHeaderKey, AuthJWTHeader().get(APIConstants.AuthorizationHeaderKey))
    headers.append(APIConstants.XCRFHeaderKey,  CSRFToken()[APIConstants.XCRFHeaderKey])
    return headers
}

export function isAuthed(): Boolean {
    return !!window.localStorage.getItem(APIConstants.AuthorizationHeaderKey)
}

export function clearLogin(): void {
    window.localStorage.removeItem(APIConstants.AuthorizationHeaderKey)
}