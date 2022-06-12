import { Song } from "../resource_types/Song"

function CSRFToken() : Map<string, string> {
    const csrfTag : Element = document.querySelector('meta[name="csrf-token"]');
    const rVal = new Map()
    rVal['X-CSRF-TOKEN'] = (csrfTag?.content ?? "")
    return rVal
}

export const Index = () : Promise<Song[]>  => {
    return fetch("/songs.json").then((result) => result.json())
        .then((json) => {
            return json as Song[]
        })
}

export const Get = (id: number) : Promise<Song> => {
    return fetch(`/songs/${id}.json`).then((result) => result.json())
        .then((json) => {
            return json as Song
        })
}

export const APIPost = (song: Song) : Promise<Response> => {
    const body : string = JSON.stringify({song})
    let path
    let options
    if(song.id) {
        options = {
            method: 'PUT',
            headers: {...(CSRFToken()), 'Content-Type': 'application/json',
            },
            body,
        }
        path = `/songs/${song.id}`
    }else {
        options = {
            method: 'POST',
            headers: {...(CSRFToken()), 'Content-Type': 'application/json',
            },
            body,
        }
        path = `/songs`
    }
    return fetch(path, options)
}