import * as React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Get, Index, Create} from "../components/Song";
import {Login} from "../components/users/Login";
import {Signup} from "../components/users/Signup";
import {LayoutWithNavbar} from "../components/nav/NavBar";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutWithNavbar/>}>
                    <Route path="/" element={<Index/>}/>
                    <Route path="/songs/:id" element={<Get/>}/>
                    <Route path="/songs/new" element={<Create/>}/>
                    <Route path="/users/sign_in" element={<Login/>}>
                    </Route>
                </Route>
                <Route path="/login" element={Login}/>
                <Route path="sign_up" element={Signup}/>
            </Routes>
        </BrowserRouter>
    )
}