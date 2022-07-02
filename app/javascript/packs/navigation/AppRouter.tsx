import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Get, Index, Create} from "../components/Song";
import {Login} from "../components/users/Login";
import {Signup} from "../components/users/Signup";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/songs/:id" element={<Get/>}/>
                <Route path="/songs/new" element={<Create/>}/>
                <Route path="/login" element={Login}/>
                <Route path="sign_up" element={Signup}/>
                <Route path="/users/sign_in" element={<Login/>}>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}