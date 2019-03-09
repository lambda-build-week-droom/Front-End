import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Grid, withStyles, Paper, TextField } from '@material-ui/core';
import DroomButton from '../components/DroomButton';
import { checkAuthentication } from '../actions/appActions';
import { Redirect } from 'react-router-dom';

class Login extends Component {
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

    render() {
        if (this.props.authenticated) {
            return <Redirect to={'/'} />;
        }

        const { classes } = this.props;
        return (
            <Grid container>
                <Grid item className={classes.container}>
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
                </Grid>
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
});

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        authenticated: state.appReducer.authenticated,
        fetching: state.appReducer.fetching,
        error: state.appReducer.error,
    };
}

export default connect(
    mapStateToProps,
    { checkAuthentication }
)(withStyles(styles)(Login));
