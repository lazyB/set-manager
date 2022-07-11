export function CSRFToken() : Map<string, string> {
    const csrfTag : Element = document.querySelector('meta[name="csrf-token"]');
    const rVal = new Map()
    rVal['X-CSRF-TOKEN'] = (csrfTag?.content ?? "")
    return rVal
}

export function AuthToken(): Map<string, string> {
    const rVal = {"Authorization": localStorage.getItem("Authorization")}
    return rVal
}

export function DefaultHeaders() : Map<string, string> {
    return {...CSRFToken(), ...AuthToken()}
}