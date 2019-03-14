import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                return authenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login/form' }} />
                );
            }}
        />
    );
};

PrivateRoute.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};
PrivateRoute.defaultProps = {};

export default PrivateRoute;
