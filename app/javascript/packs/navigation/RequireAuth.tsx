import * as React from "react";
import {isAuthed} from "../api/Utils";
import {Navigate} from "react-router-dom";
import {AppRoutes} from "./AppRouter";

export default function RequireAuth({children}) {
    return isAuthed() ? children : <Navigate to={AppRoutes.User.Login} />
}