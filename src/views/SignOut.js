import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Chip from '../components/MainStreamCard';
import { logOut } from '../actions/accountActions';

import {} from '@material-ui/core';
import { decrypt } from '../components/Cryptr';

class Profile extends Component {
    state = {
        myProfile: false,
        profile: {},
    };

    componentDidMount() {
        setTimeout(() => {
            this.props.logOut();
            this.props.history.push('/');
        }, 2000);

        for (let i = 0; i < localStorage.length; i++) {
            let encryptedKey = localStorage.key[i];
            try {
                let key = decrypt(key);
                if (key === 'token') {
                    localStorage.removeItem(encryptedKey);
                }
            } catch {}
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <h1>You will be redirected to login screen. </h1>

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
    { logOut }
)(withStyles(styles)(Profile));
