import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ProfileImage from './ProfileImage';
import Chip from './Chip';
import DroomButton from './DroomButton';
import SimpleModal from './SimpleModal';
import InputText from './InputText';
import { updateAccountInfo } from '../actions/accountActions';
import { connect } from 'react-redux';

class UserProfile extends React.Component {
    state = {
        modal: false,
    };

    handleEditClick = () => {
        this.setState(state => {
            return { modal: !state.modal };
        });
    };

    getModalContent = props => {
        return (
            <form onSubmit={props.onSubmit}>
                <InputText
                    label={'First Name'}
                    value={props.profile.firstName}
                />
                <InputText label={'Last Name'} value={props.profile.lastName} />
                <InputText
                    label={'Occupation'}
                    value={props.profile.occupation}
                />
                <InputText
                    label={'Experience'}
                    value={props.profile.experience}
                />
                <InputText
                    label={'Interests'}
                    value={props.profile.interests}
                />
                <DroomButton type={'submit'} text={'Submit'} />
            </form>
        );
    };

    onSubmit = e => {
        e.preventDefault();
        //debugger;
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

        this.props.updateAccountInfo(profile, this.props.token, 'user');
        this.setState({ modal: false });
    };

    render() {
        const { classes } = this.props;
        //debugger;
        return (
            <div className={classes.root}>
                {this.props.profile.userImg ? (
                    <ProfileImage image={this.props.profile.userImg} />
                ) : (
                    ''
                )}

                <h3>{this.props.profile.occupation}</h3>
                {this.props.profile.interests ? (
                    <Chip chips={this.props.profile.interests} />
                ) : (
                    ''
                )}

                <h2>{this.props.profile.lastName}</h2>
                <h2>{this.props.profile.email}</h2>
                {this.props.myProfile ? (
                    <DroomButton
                        onClick={this.handleEditClick}
                        text={'Edit Profile'}
                    />
                ) : (
                    ''
                )}

                <SimpleModal
                    open={this.state.modal}
                    onClose={this.handleEditClick}
                    getModalContent={this.getModalContent}
                    onSubmit={this.onSubmit}
                    title={'Account Information'}
                    subtitle={'Please fill out the form below.'}
                    profile={this.props.profile}
                />
            </div>
        );
    }
}

UserProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    root: {
        height: '100%',
        width: '100%',
    },
};

const mapStateToProps = state => {
    return {
        token: state.appReducer.token,
    };
};

export default connect(
    mapStateToProps,
    { updateAccountInfo }
)(withStyles(styles)(UserProfile));
