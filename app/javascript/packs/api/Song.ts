import { Song } from "../resource_types/Song"
import { CSRFToken } from "./Utils";


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