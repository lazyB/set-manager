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
    return <div className="card mb-4">
        <div className="card-header">
            {song?.title ?? "loading"}
        </div>
        <div className="card-body">
            <CLink
                className="font-weight-bold font-xs text-medium-emphasis"
                href={`/songs/edit/${id}`}
            >
                Edit
            </CLink>
        </div>
    </div>
}

export const Edit = (props) => {
    const params = useParams();
    const id = Number(params.id)
    let [song, setSong] = useState(null)
    const [bpm, setBpm] = useState(120)
    const [title, setTitle] = useState("")
    const [lastPlayed, setLastPlayed] = useState(null)
    const handleSubmit = (values) => {
        let {id, status, bpm, title, data_file} = values
        APIPost({id, status, bpm, title,last_played: lastPlayed.toISOString(), data_file})
            .then(response => {
                const {id} = response as any
                if(id) {
                    navigate(AppRoutes.Song.GetForId(id), {state: {id: id}})
                }
            })
            .catch((error) => {
                console.error(error)
                alert(error)
            })
    }
    useEffect(() => {
        APIGet(id).then((_song) => {
            setSong(_song)
            const {title, bpm, last_played} = _song
            setTitle(title)
            setBpm(bpm)
            setLastPlayed(new Date(last_played))
        }).catch((error) => {
            console.error(error)
            alert(error)
        })
    }, [id])
    let navigate = useNavigate()

    if(!song) {
        <p>Loading</p>
    }else {
        return (
            <div className="card mb-4 w-50">
                <div className="card-header">
                    Edit Song
                </div>
                <div className="card-body">
                    <Formik
                        initialValues={
                            {title, bpm}
                        }
                        validationSchema={Yup.object({
                            title: Yup.string()
                                .required('Required'),
                            bpm: Yup.number()
                                .min(40, 'You need a nap?')
                                .max(240, 'Whoa dude.  Hol up.')
                                .required('Required'),
                        })}
                        onSubmit={(values, {setSubmitting}) =>
                            handleSubmit(values)}>
                        {({setFieldValue}) => (
                            <Form className="row g-3">
                                <div className="mb-3">
                                    <label className="form-label">Song</label>
                                    <Field className="form-control"
                                           type={"text"}
                                           name="title"/>
                                    <ErrorMessage name="title"/>
                                </div>
                                <div className="mb-3 w-50 col">
                                    <label className="form-label">BPM</label>
                                    <Field className="form-control"
                                           type={"number"} name={"bpm"}/>
                                    <ErrorMessage name={"bpm"}/>
                                </div>

                                <div className="mb-6 w-50 col">
                                    <label className="form-label">Last Played</label>
                                    <DatePicker className="form-control"
                                                type="date" name={"lastPlayed"} selected={lastPlayed}
                                                onChange={(date: Date) => setLastPlayed(date)}/>
                                </div>

                                <div className="mb-3 w-50 col">
                                    <label className="form-label">Attachment</label>
                                    <input className="form-control"
                                           type={"file"} name={"data_file"}
                                           onChange={(event) => {
                                               setFieldValue('data_file', event.currentTarget.files[0]);
                                           }}

                                    />
                                    <ErrorMessage name={"data_file"}/>
                                </div>
                                <div className="mb-3 col-12">
                                    <Button variant={"primary"} type="submit">Submit</Button>
                                </div>
                            </Form>)
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

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

    const handleSubmit = (values) => {
        let {id, status, bpm, title, lastPlayed} = values
        lastPlayed = lastPlayed || new Date
        APIPost({id, status, bpm, title,last_played: lastPlayed.toISOString()})
            .then(response => {
                const {id} = response as any
                if(id) {
                    navigate(AppRoutes.Song.GetForId(id), {state: {id: id}})
                }
            })
            .catch((error) => {
                console.error(error)
                alert(error)
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
            handleSubmit(values)}>
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