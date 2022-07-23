import { Song } from "../resource_types/Song"
import { DefaultHeaders } from "./Utils";


export const Index = () : Promise<Song[]>  => {
    const options = {
        headers: {...(DefaultHeaders())} ,
    }
    return fetch("/api/songs.json", options).then((result) => {
        const {ok, status, statusText} = result
        if(!ok) {
            throw new Error(statusText ?? status.toString())
        }else {
            return result.json()
        }
    })
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

export const APIPost = (song: Song) : Promise<Song> => {
    const body : string = JSON.stringify({song})
    let path
    let options
    const defaultHeaders = DefaultHeaders()
    if(song.id) {
        options = {
            method: 'PUT',
            headers: defaultHeaders,
            body,
        }
        path = `/songs/${song.id}`
    }else {
        options = {
            method: 'POST',
            headers: defaultHeaders,
            body,
        }
        path = `/api/songs`
    }
    return fetch(path, options).then((result) => result.json())
}