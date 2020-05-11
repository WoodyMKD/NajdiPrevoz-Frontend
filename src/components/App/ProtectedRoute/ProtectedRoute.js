import React from 'react';
import {Redirect, Route} from "react-router-dom";

const ProtectedRoute = (props) => {
    console.log(props);
    return (
        <Route {...props.rest} render={(props) => (
            props.isAuthenticated === false
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
        )} />
    );
};
const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        props.isAuthenticated === false
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
);

export default ProtectedRoute;