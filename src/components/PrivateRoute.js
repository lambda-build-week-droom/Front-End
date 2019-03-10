import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                return loggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                );
            }}
        />
    );
};

PrivateRoute.propTypes = {};
PrivateRoute.defaultProps = {};

export default PrivateRoute;
