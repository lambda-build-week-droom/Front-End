import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkAuthentication, submitRegistration } from '../actions/appActions';
import { Redirect } from 'react-router-dom';
import SimpleModal from '../components/SimpleModal';
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';

class Login extends Component {
    state = {
        login: true,
    };

    componentDidMount() {
        if (this.props.history.location.pathname.includes('registration')) {
            this.setState({ login: false });
        }
    }

    handleClose = () => {
        this.setState({ login: !this.state.login });
    };

    getModalContent = props => {
        if (props.login) {
            return <LoginForm {...props} />;
        }
        return <RegistrationForm {...props} />;
    };

    render() {
        if (this.props.authenticated) {
            return <Redirect to={'/main'} />;
        }
        const { classes } = this.props;
        return (
            <SimpleModal
                open={true}
                title={this.state.login ? 'Login' : 'Registration'}
                subtitle={
                    this.state.login
                        ? 'Enter email and password below.'
                        : 'Please fill out the form below.'
                }
                getModalContent={this.getModalContent}
                login={this.state.login}
                error={this.props.error}
                switch={this.handleClose}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.appReducer.authenticated,
        fetching: state.appReducer.fetching,
        error: state.appReducer.error,
        registered: state.appReducer.registered,
    };
};

export default connect(
    mapStateToProps,
    { checkAuthentication, submitRegistration }
)(Login);
