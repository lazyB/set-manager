export function CSRFToken() : Map<string, string> {
    const csrfTag : Element = document.querySelector('meta[name="csrf-token"]');
    const rVal = new Map()
    rVal['X-CSRF-TOKEN'] = (csrfTag?.content ?? "")
    return rVal
}