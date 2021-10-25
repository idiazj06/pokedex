import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { PublicRoute } from "./PublicRouter";
import { PrivateRoute } from "./PrivateRouter";
import { AuthRouter } from "./AuthRouter";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { Home } from "../Components/Home";
import Loading from "../Components/Loading";


import { useData } from '../Hooks/useData'
import { Detail } from "../Components/Detail";
import { loginSincrono } from "../Actions/actionLogin";
import Favoritos from "../Components/Favoritos";



export default function AppRouter() {

    const auth = getAuth();
    const [checking, setChecking] = useState(true)
    const [isLooggedIn, setsIsLoogedIn] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state.users)
    
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user?.uid) {
                console.log(user)
                setsIsLoogedIn(true)
                const data = user.providerData[0];
                dispatch(loginSincrono(user.uid, data.displayName, data.photoURL, data.email))

            } else {
                setsIsLoogedIn(false)
            }
            setChecking(false)
        })
    }, [dispatch, setChecking])

    if (checking) {
        return <Loading />;
    }

    return (
        <Router>

            <Switch>

                <PrivateRoute
                    path="/"
                    component={Home}
                    exact
                    isAuthenticated={isLooggedIn}
                />

                <PrivateRoute
                    path="/detail"
                    component={Detail}
                    exact
                    isAuthenticated={isLooggedIn}
                />
                <PrivateRoute
                    path="/favoritos"
                    component={Favoritos}
                    exact
                    isAuthenticated={isLooggedIn}
                />



                <PublicRoute
                    path="/auth"
                    component={AuthRouter}
                    isAuthenticated={isLooggedIn}
                />

                <Redirect to="/" />

            </Switch>
        </Router>
    )
}
