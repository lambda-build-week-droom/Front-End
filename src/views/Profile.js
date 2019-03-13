import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { requestWithToken } from '../actions/axios';
import Chip from '../components/MainStreamCard';
import {} from '@material-ui/core';

class Profile extends Component {
    state = {
        myProfile: false,
        profile: {},
    };

    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.history.push(`/profile/${id}`);
        let profileOwner = false;
        if (id === this.props.accountId) {
            profileOwner = true;
        }

        requestWithToken(this.props.token)
            .get(`/users/${id}`)
            .then(res => {
                this.setState({ profile: res.data, myProfile: profileOwner });
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <h1>{this.state.profile.id}</h1>

                <Chip />
            </div>
        );
    }
}

const styles = {
    root: {
        display: 'flex',
        maxWidth: '1000px',
        justifyContent: 'center',
        height: '100vh',
    },
};

Profile.propTypes = {};

function mapStateToProps(state) {
    return {
        token: state.appReducer.token,
        accountId: state.accountReducer.account.id,
    };
}

export default connect(
    mapStateToProps,
    {}
)(withStyles(styles)(Profile));
