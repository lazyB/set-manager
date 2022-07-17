import {APIConstants} from "../utils/constants";

export function CSRFToken() : Map<string, string> {
    const csrfTag : Element = document.querySelector(`meta[name="${APIConstants.CSRFElementId}"]`);
    const rVal = new Map()
    rVal[APIConstants.XCRFHeaderKey] = (csrfTag?.content ?? "")
    return rVal
}
export function AuthJWTHeader(): Map<string, string> {
    const rVal = new Map()
    const authHeader = window.localStorage.get(APIConstants.AuthorizationHeaderKey)
    if(authHeader){
        rVal[APIConstants.AuthorizationHeaderKey] = authHeader
    }
    return rVal
}
export function DefaultHeaders() : Headers {
    let headers = new Headers()
    headers.append(APIConstants.AuthorizationHeaderKey, AuthJWTHeader().get(APIConstants.AuthorizationHeaderKey))
    headers.append(APIConstants.XCRFHeaderKey, CSRFToken().get(APIConstants.XCRFHeaderKey))
    return headers
}