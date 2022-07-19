import { Song } from "../resource_types/Song"
import { DefaultHeaders } from "./Utils";


export const Index = () : Promise<Song[]>  => {
    const options = {
        headers: {...(DefaultHeaders())} ,
    }
    return fetch("/api/songs.json", options).then((result) => result.json())
        .then((json) => {
            return json as Song[]
        })
}

export const Get = (id: number) : Promise<Song> => {
    const options = {
        headers: {...(DefaultHeaders())},
    }
    return fetch(`/api/songs/${id}.json`, options).then((result) => result.json())
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
            headers: {...(DefaultHeaders()), 'Content-Type': 'application/json',
            },
            body,
        }
        path = `/songs/${song.id}`
    }else {
        options = {
            method: 'POST',
            headers: {...(DefaultHeaders()), 'Content-Type': 'application/json',
            },
            body,
        }
        path = `/songs`
    }
    return fetch(path, options)
}