import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, FormControlLabel, Switch } from '@material-ui/core';
import InputText from '../components/InputText';
import DroomButton from './DroomButton';
import { checkAuthentication } from '../actions/appActions';

class LoginForm extends Component {
    state = {
        errors: [],
        rememberMe: true,
    };

    handleSubmit = e => {
        e.preventDefault();
        let account = {};
        let errors = [];
        debugger;
        for (let i = 0; i < e.target.length; i++) {
            if (!!e.target[i].name) {
                if (e.target[i].name === 'rememberMe') {
                    account['rememberMe'] = this.state.rememberMe;
                    continue;
                }
                account[e.target[i].name] = e.target[i].value;

                if (e.target[i].value === '') {
                    errors.push(e.target[i].name);
                }
            }
        }

        if (errors.length > 0) {
            errors['text'] = 'Please fill in every input.';
            return;
        }

        this.props.checkAuthentication(account);
    };

    changeRememberMe = () => {
        this.setState(state => {
            return {
                rememberMe: !state.rememberMe,
            };
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <InputText label={'Email'} type={'email'} fullWidth={true} />
                <InputText
                    label={'Password'}
                    type={'password'}
                    fullWidth={true}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.state.rememberMe}
                            onChange={this.changeRememberMe}
                            color="primary"
                            name={'rememberMe'}
                        />
                    }
                    label="Remember Me"
                />
                <DroomButton type={'submit'} text={'Login'} />
                <DroomButton onClick={this.props.switch} text={'Register'} />
            </form>
        );
    }
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    form: {
        maxWidth: '30rem',
        display: 'flex',
        flexDirection: 'column',
    },
    errorMessage: {
        color: 'red',
    },
});

const mapStateToProps = state => {
    let error = [];
    if (state.appReducer.error) {
        error['text'] = state.appReducer.error;
    }

    if (error.length > 0) {
        return {
            errors: [error],
        };
    }
    return { error: null };
};

export default connect(
    mapStateToProps,
    { checkAuthentication }
)(withStyles(styles)(LoginForm));
