import React, { Component } from 'react';
import logo from './logo.svg';
import { Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import './App.scss';
import Main from './views/Main';
import Login from './views/Login';
import { connect } from 'react-redux';

class App extends Component {
    state = {
        view: false,
    };

    render() {
        return (
            <div className="App">
                <Route to={'/login'} component={Login} />
                <PrivateRoute
                    exact
                    to={'/'}
                    component={Main}
                    loggedIn={this.props.loggedIn}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.appReducer.authenticated,
});
export default connect(mapStateToProps)(App);
