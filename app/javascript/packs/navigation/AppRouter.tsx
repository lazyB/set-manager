import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Get, Index, Create} from "../components/Song";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index/>}/>
                <Route path="/songs/:id" element={<Get/>}/>
                <Route path="/songs/new" element={<Create/>}/>
            </Routes>
        </BrowserRouter>
    )
}