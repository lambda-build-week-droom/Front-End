import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, withRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import './App.scss';
import Main from './views/Main';
import Login from './views/Login';
import { connect } from 'react-redux';
import { decrypt, encrypt } from './components/Cryptr';
import { authenticateFromLocalStorage } from './actions/appActions';
import { loggedIn } from './actions/accountActions';
import Profile from './views/Profile';

class App extends Component {
    state = {
        view: false,
    };

    componentDidMount() {
        let token = '';
        let account = null;
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let string = '';
            console.log(string);
            try {
                string = decrypt(key);
            } catch {
                console.log('catch');
            }
            if (string === 'token') {
                if (token !== '') {
                    // database is trash because we have more than one key stored.
                    localStorage.clear();
                    break;
                }
                token = localStorage.getItem(key);
                token = decrypt(token);
            } else if (string === 'account') {
                if (account !== null) {
                    localStorage.clear();
                    break;
                }
                account = localStorage.getItem(key);
                account = decrypt(account);
                account = JSON.parse(account);
            }
        }

        if (token !== '' && account !== null) {
            this.props.authenticateFromLocalStorage(token);
            this.props.loggedIn(account);
            this.props.history.push('/main');
        }
    }

    render() {
        return (
            <div className="App">
                <Route exact path={'/login/:type'} component={Login} />
                <PrivateRoute
                    path={'/'}
                    component={Main}
                    authenticated={this.props.authenticated}
                />
                <PrivateRoute
                    exact
                    path={'/profile/:id'}
                    component={Profile}
                    authenticated={this.props.authenticated}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authenticated: state.appReducer.authenticated,
});
export default withRouter(
    connect(
        mapStateToProps,
        { authenticateFromLocalStorage, loggedIn }
    )(App)
);
