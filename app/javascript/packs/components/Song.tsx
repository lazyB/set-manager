import * as React from "react";
import {useEffect, useState} from "react";
import {APIPost, Get as APIGet, Index as APIIndex} from "../api/Song"
import {Link, useNavigate, useParams} from "react-router-dom";
import {Song, SongStatus} from "../resource_types/Song";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {APIConstants} from "../utils/constants";
import {AppRoutes} from "../navigation/AppRouter";
import {Button, Form as BootForm } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {cilArrowRight, cilChartPie} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {CCol, CLink, CRow, CWidgetStatsF} from "@coreui/react";

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
        return <CRow key={song.id}>
            <CCol xs={12}>
                <CWidgetStatsF
                    className="mb-3"
                    color="primary"
                    icon={<CIcon icon={cilChartPie} height={24} />}
                    title={song.last_played || "Never played"}
                    value={song.title}
                    footer={
                        <CLink
                            className="font-weight-bold font-xs text-medium-emphasis"
                            href={`/songs/${song.id}`}
                        >
                            View more
                            <CIcon icon={cilArrowRight} className="float-end" width={16} />
                        </CLink>
                    }
                />
            </CCol>
        </CRow>
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

    return (<Formik
        initialValues={
            {title: '', bpm: 120}
        }
        validationSchema={Yup.object({
            title: Yup.string()
                .required('Required'),
            bpm: Yup.number()
                .min(40, 'You need a nap?')
                .max(240, 'Whoa dude.  Hol up.')
                .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) =>
        {alert(JSON.stringify(values, null, 2))}}>
        <Form>
            <p>Song</p>
            <Field type={"text"}
                   name="title"/>
            <ErrorMessage name="title"/>
            <p>BPM</p>
            <Field type={"number"} name={"bpm"}/>
            <ErrorMessage name={"bpm"}/>
            <Button variant={"primary"} type="submit">Submit</Button>
        </Form>
    </Formik>)

}