import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ checkIsAuthenticated, element: Element, ...rest }) => {
    if (checkIsAuthenticated == null) {
        return <div>Loading...</div>;
    }

    return checkIsAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
};
