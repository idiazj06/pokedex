import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../Components/Login'

export const  AuthRouter =()=> {
    return (
        <Switch>
            <Route path='/auth/login' component={Login} />
            <Redirect to="/auth/login"/>
        </Switch>
    )
}
