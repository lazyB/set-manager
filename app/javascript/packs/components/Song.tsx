import * as React from "react";
import {useEffect, useState} from "react";
import {APIPost, Get as APIGet, Index as APIIndex} from "../api/Song"
import {Link, useNavigate, useParams} from "react-router-dom";
import {Song, SongStatus} from "../resource_types/Song";
import DatePicker from "react-datepicker";
import {APIConstants} from "../utils/constants";
import {AppRoutes} from "../navigation/AppRouter";

export const Index = () => {
    let navigate = useNavigate()
    let [songs, setSongs] = useState([])
    useEffect(() => {
        APIIndex().then((apiSongs) => {
            setSongs(apiSongs)
        }).catch(({message}) => {
            console.error(message)
            if(message === APIConstants.Unauthorized) {
                navigate(AppRoutes.User.Login)
            }else{
                alert(message)
            }
        })
    }, [])
    let renderSong = ((song) => {
        return <div key={song.id ?? 'new'}>
            <p>{song.title}</p>
            <Link to={`/songs/${song.id}`}>{song.title}</Link>
        </div>
    })
    return <div>
        {songs.map((song) => renderSong(song))}
        <Link to={'/songs/new'}>New Song</Link>
    </div>
}

export const Get = () => {
    const params = useParams();
    const navigation  = useNavigate()
    const id = Number(params.id)
    let [song, setSong] = useState(null)
    useEffect(() => {
        APIGet(id).then((_song) => {
            setSong(_song)
        }).catch((error) => {
            console.error(error)
            alert(error)
        })
    }, [id])
    return <div>
        <p>Song</p>
        <p>Get Song {song?.title ?? "loading"}</p>
    </div>
}
``
export const Create = (song?: Song) => {
    let id = song?.id
    let songLastPlayed = song?.last_played ? new Date(song?.last_played) : null
    let[bpm, setBpm] = useState(song?.bpm ?? 120)
    let[title, setTitle] = useState(song?.title ?? '')
    let[lastPlayed, setLastPlayed] = useState<Date|null>(songLastPlayed)
    let[status, setStatus] = useState(song?.status ?? SongStatus.not_started)
    let navigate = useNavigate()

    const statuses = Object.keys(SongStatus).map(key => {
        return <option value={SongStatus[key]}>{key}</option>
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        APIPost({id, status, bpm, title, last_played: lastPlayed.toISOString()}).then(response => {
            const {id} = response as any
            if(id) {
                navigate(AppRoutes.Song.Get, {state: {id}})
            }
        })
    }

    return <form onSubmit={handleSubmit}>
        <label>Song</label>
        <input type={"text"} name={"title"} value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type={"number"} name={"bpm"} value={bpm} onChange={(e) => setBpm(Number(e.target.value))}/>
        <select value={status} onChange={(e) => setStatus(SongStatus[e.target.value])}>
            {statuses}
        </select>
        <DatePicker selected={lastPlayed} onChange={(date:Date) => setLastPlayed(date)} />
        <input type="submit" value="Submit" />
    </form>
}