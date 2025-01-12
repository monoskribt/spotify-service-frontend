import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({isAuthenticated, element: Element, ...rest}) => {
    if(isAuthenticated == null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
}