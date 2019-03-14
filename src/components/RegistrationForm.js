import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, FormControlLabel, Switch } from '@material-ui/core';
import InputText from '../components/InputText';
import DroomButton from './DroomButton';
import { submitRegistration } from '../actions/appActions';

class RegistrationForm extends Component {
    state = {
        registrationCompany: false,
        errors: [],
    };

    handleCompanyEmployeeChange = () => {
        this.setState({ registrationCompany: !this.state.registrationCompany });
    };

    handleSubmit = e => {
        e.preventDefault();
        let account = {};
        let errors = [];
        for (let i = 0; i < e.target.length; i++) {
            if (!!e.target[i].name) {
                if (e.target[i].name === 'companySwitch') {
                    account['type'] = e.target[i].checked ? 'company' : 'user';
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

        this.props.submitRegistration(account);
        this.props.switch();
    };

    render() {
        const { classes } = this.props;
        return (
            <form
                noValidate
                onSubmit={this.handleSubmit}
                className={classes.form}
            >
                <p>Employee</p>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.state.registrationCompany}
                            onChange={this.handleCompanyEmployeeChange}
                            color="primary"
                            name={'companySwitch'}
                        />
                    }
                    label="Company"
                />
                {this.state.registrationCompany && (
                    <InputText
                        label={'Company Name'}
                        error={this.props.errors}
                        className={classes.textField}
                    />
                )}
                <InputText
                    label={'Email'}
                    type={'email'}
                    errors={this.props.errors}
                    className={classes.textField}
                />
                <InputText
                    label={'Password'}
                    type={'password'}
                    errors={this.props.errors}
                    className={classes.textField}
                />

                <DroomButton text={'Submit'} type={'submit'} />
                <DroomButton text={'Login'} onClick={this.props.switch} />
                {this.state.errors.includes('text') && (
                    <p>{this.state.errors['text']}</p>
                )}
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

const mapStateToProps = state => ({
    error: state.appReducer.error,
});

export default connect(
    mapStateToProps,
    { submitRegistration }
)(withStyles(styles)(RegistrationForm));
