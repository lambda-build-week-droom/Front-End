import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import {
    Grid,
    withStyles,
    Modal,
    TextField,
    Typography,
    FormControlLabel,
    Switch,
} from '@material-ui/core';
import DroomButton from '../components/DroomButton';
import { checkAuthentication, submitRegistration } from '../actions/appActions';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    state = {
        open: false,
        registrationCompany: false,
    };

    onSubmit = e => {
        debugger;
        e.preventDefault();
        let length = e.target.length;
        let username,
            password = '';

        for (let i = 0; i < length; i++) {
            if (e.target[i].name === 'userName') {
                username = e.target[i].value;
            } else if (e.target[i].name === 'password') {
                password = e.target[i].value;
            }
            e.target[i].value = '';
        }

        this.props.checkAuthentication(username, password);
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleChange = () => {
        this.setState({ registrationCompany: !this.state.registrationCompany });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    getModalStyles() {
        return {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        };
    }

    submitRegistration = e => {
        e.preventDefault();
        let userName,
            password,
            accountType = '';

        for (let i = 0; i < e.target.length; i++) {
            if (e.target[i].name === 'userName') {
                userName = e.target[i].value;
            } else if (e.target[i].name === 'password') {
                password = e.target[i].value;
            }
            if (e.target[i].name === 'company switch') {
                accountType = e.target[i].checked ? 'company' : 'employee';
            }
        }

        this.props.submitRegistration(userName, password);
        this.handleClose();
    };

    getModalContent() {
        const { classes } = this.props;
        return (
            <form
                noValidate
                autoComplete="off"
                className={classes.form}
                onSubmit={this.submitRegistration}
            >
                <TextField
                    name="userName"
                    label="Username"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    name="password"
                    label="Password"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    type={'password'}
                />

                <FormControlLabel
                    control={
                        <Switch
                            checked={this.state.registrationCompany}
                            onChange={this.handleChange}
                            color="primary"
                            name={'company switch'}
                        />
                    }
                    label="Company"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={!this.state.registrationCompany}
                            onChange={this.handleChange}
                            color="primary"
                            name={'employee switch'}
                        />
                    }
                    label="Employee"
                />
                <DroomButton text={'Submit'} type={'Submit'} />
            </form>
        );
    }

    render() {
        if (this.props.authenticated) {
            return <Redirect to={'/'} />;
        }

        const { classes } = this.props;
        return (
            <Grid container>
                <Grid item className={classes.container}>
                    {this.props.registered && (
                        <p className={classes.registeredText}>
                            You have been registered. Please login to fill out
                            your profile.
                        </p>
                    )}
                    <form
                        noValidate
                        autoComplete="off"
                        className={classes.form}
                        onSubmit={this.onSubmit}
                    >
                        <TextField
                            name="userName"
                            label="Username"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            error={!!this.props.error}
                        />

                        <TextField
                            name="password"
                            label="Password"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            error={!!this.props.error}
                        />
                        {this.props.error && (
                            <p className={classes.errorMessage}>
                                {this.props.error.message}
                            </p>
                        )}
                        <DroomButton text="Submit" type={'submit'} />
                    </form>
                    <DroomButton onClick={this.handleOpen} text="Register" />
                </Grid>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div
                        style={this.getModalStyles()}
                        className={classes.paper}
                    >
                        {this.getModalContent()}
                    </div>
                </Modal>
            </Grid>
        );
    }
}

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
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
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    registeredText: {
        color: 'blue',
    },
});

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        authenticated: state.appReducer.authenticated,
        fetching: state.appReducer.fetching,
        error: state.appReducer.error,
        registered: state.appReducer.registered,
    };
}

export default connect(
    mapStateToProps,
    { checkAuthentication, submitRegistration }
)(withStyles(styles)(Login));
