import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import DroomButton from './DroomButton';
import SimpleModal from './SimpleModal';
import InputText from './InputText';
import { updateAccountInfo } from '../actions/accountActions';

class CompanyProfile extends Component {
    state = {
        modal: false,
        profile: {
            email: this.props.profile.email,
            address: this.props.profile.address,
            bio: this.props.profile.bio,
            companyName: this.props.profile.companyName,
        },
    };

    editProfile = () => {
        debugger;
        this.setState(state => {
            return { modal: !state.modal };
        });
    };

    getModalContent = props => {
        debugger;
        return (
            <form onSubmit={props.onSubmit}>
                <InputText
                    label={'Company Name'}
                    value={props.profile.companyName}
                    onChange={props.onChange}
                />
                <InputText
                    label={'Email'}
                    value={props.profile.email}
                    onChange={props.onChange}
                />
                <InputText
                    label={'Address'}
                    value={props.profile.address}
                    onChange={props.onChange}
                />
                <InputText
                    label={'Bio'}
                    value={props.profile.bio}
                    onChange={props.onChange}
                />
                <DroomButton type={'submit'} text={'submit'} />
            </form>
        );
    };

    onChange = e => {
        e.persist();
        this.setState(state => {
            return {
                profile: {
                    ...state.profile,
                    [e.target.name]: e.target.value,
                },
            };
        });
    };

    onSubmit = e => {
        e.preventDefault();
        debugger;
        let profile = {};
        let errors = [];
        for (let i = 0; i < e.target.length; i++) {
            if (!!e.target[i].name) {
                profile[e.target[i].name] = e.target[i].value;

                if (e.target[i].value === '') {
                    errors.push(e.target[i].name);
                }
            }
        }

        this.props.updateAccountInfo(profile, this.props.token, 'company');
        this.setState({ modal: false });
    };

    render() {
        debugger;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <h1>{this.state.profile.companyName}</h1>
                <h1>{this.state.profile.email}</h1>
                <h1>{this.state.profile.address}</h1>
                <h1>{this.state.profile.bio}</h1>
                {this.props.myProfile && (
                    <DroomButton
                        onClick={this.editProfile}
                        text={'Edit Profile'}
                    />
                )}

                <SimpleModal
                    open={this.state.modal}
                    onClose={this.editProfile}
                    getModalContent={this.getModalContent}
                    onSubmit={this.onSubmit}
                    title={'Edit Company Profile'}
                    subtitle={'Please fill out the form below.'}
                    profile={this.state.profile}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

const styles = {
    root: {
        marginTop: '3rem',
    },
};

CompanyProfile.propTypes = {};

function mapStateToProps(state) {
    return {
        token: state.appReducer.token,
    };
}

export default connect(
    mapStateToProps,
    { updateAccountInfo }
)(withStyles(styles)(CompanyProfile));
