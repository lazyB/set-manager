import * as React from "react";
import {useEffect, useState} from "react";
import {APIPost, Get as APIGet, Index as APIIndex} from "../api/Song"
import {Link} from "react-router-dom";
import {Song, SongStatus} from "../resource_types/Song";
import DatePicker from "react-datepicker";

export const Index = () => {
    let [songs, setSongs] = useState([])
    useEffect(() => {
        APIIndex().then((apiSongs) => {
            setSongs(apiSongs)
        })
    }, [])
    let renderSong = ((song) => {
        return <div key={song.id}>
            <p>{song.title}</p>
            <Link to={`/songs/${song.id}`}>{song.title}</Link>
        </div>
    })
    return <div>
        <p>Songs will go here</p>
        {songs.map((song) => renderSong(song))}
        <Link to={'/songs/new'}>New Song</Link>
    </div>
}

export const Get = (id: number) => {
    let [song, setSong] = useState(null)
    useEffect(() => {
        APIGet(1).then((_song) => {
            setSong(_song)
        })
    }, [id])
    return <div>
        <p>Get Song {song?.title ?? "loading"}</p>
    </div>
}

export const Create = (song?: Song) => {
    let id = song?.id
    let[bpm, setBpm] = useState(song?.bpm ?? 120)
    let[title, setTitle] = useState(song?.title)
    let[lastPlayed, setLastPlayed] = useState(song?.last_played)
    let[status, setStatus] = useState(song?.status ?? SongStatus.not_started)

    const statuses = Object.keys(SongStatus).map(key => {
        return <option value={SongStatus[key]}>{key}</option>
    })

    const handleSubmit = (event) => {
        alert("POST Song")
        event.preventDefault()
        APIPost({id, status, bpm, title, last_played: lastPlayed}).then(response => {
            debugger
            alert("Got response!")
        })
    }

    return <form onSubmit={handleSubmit}>
        <label>Song</label>
        <input type={"text"} name={"title"} value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type={"number"} name={"bpm"} value={bpm} onChange={(e) => setBpm(e.target.value)}/>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {statuses}
        </select>
        <DatePicker selected={lastPlayed} onChange={(date:Date) => setLastPlayed(date)} />
        <input type="submit" value="Submit" />
    </form>
}