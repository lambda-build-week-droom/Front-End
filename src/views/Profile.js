import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { requestWithToken } from '../actions/axios';

class Profile extends Component {
    state = {
        myProfile: false,
        account: {},
    };

    componentDidMount() {
        let id = this.props.match.params.id;
        let profileOwner = false;
        if (id === this.props.accountId) {
            profileOwner = true;
        }

        requestWithToken(this.props.token)
            .get(`/users/${id}`)
            .then(res => {
                this.setState({ account: res.data, myProfile: profileOwner });
            });
    }

    render() {
        return (
            <div>
                <h2>{this.state.account.id}</h2>
            </div>
        );
    }
}

const styles = {
    root: {},
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
