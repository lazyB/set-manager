import * as React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {Get, Index, Create} from "../components/Song";
import {Login} from "../components/users/Login";
import {Signup} from "../components/users/Signup";
import {LayoutWithNavbar} from "../components/nav/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import RequireAuth from "./RequireAuth";
import {isAuthed} from "../api/Utils";

export const AppRoutes ={
    User: {
        Login: '/login',
        SignUp: '/sign_up'
    },
    Song: {
        Index: '/songs',
        Get: `/songs/:id`,
        Create: '/songs/new',
        Update: `/songs/:id/edit`,
    }
}

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={AppRoutes.Song.Index} element={<LayoutWithNavbar/>}>
                    <Route path={AppRoutes.Song.Index} element={<Index/>}/>
                    <Route path={AppRoutes.Song.Get} element={<Get/>}/>
                    <Route path={AppRoutes.Song.Create} element={<Create/>}/>
                </Route>
                <Route path={AppRoutes.User.Login} element={<Login/>}/>
                <Route path={AppRoutes.User.SignUp} element={<Signup/>}/>
                <Route
                    path="*"
                   element={
                       isAuthed() ?
                           <Navigate to={AppRoutes.User.Login}/> :
                           <Navigate to={AppRoutes.Song.Index}/>
                   }
                />
            </Routes>
        </BrowserRouter>
    )
}