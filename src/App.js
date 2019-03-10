import React, { Component } from 'react';
import logo from './logo.svg';
import { Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import './App.scss';
import Main from './views/Main';
import Login from './views/Login';
import { connect } from 'react-redux';
import { encrypt } from './components/Cryptr';
import { authenticateFromLocalStorage } from './actions/appActions';
import { loggedIn } from './actions/accountActions';

class App extends Component {
    state = {
        view: false,
    };

    componentDidMount() {
        debugger;
        let key = encrypt('token');
        if (localStorage.hasOwnProperty(key)) {
            let accountKey = encrypt('account');
            let account = localStorage.getItem(accountKey);
            let token = localStorage.getItem(key);
            this.props.authenticateFromLocalStorage(token);
            this.props.loggedIn(account);
        }
    }

    render() {
        return (
            <div className="App">
                <Route to={'/login'} component={Login} />
                <PrivateRoute
                    exact
                    to={'/'}
                    component={Main}
                    authenticated={this.props.authenticated}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authenticated: state.appReducer.authenticated,
});
export default connect(
    mapStateToProps,
    { authenticateFromLocalStorage, loggedIn }
)(App);
