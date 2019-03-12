import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Avatar from './AvatarComponent';
import MatchesStream from './MatchesStream';

class MyMatches extends Component {
    state = {};

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Avatar key={'my-avatar'} avatar={{ title: 'My Avatar' }} />
                <MatchesStream />
            </div>
        );
    }
}

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
};

MyMatches.propTypes = {};

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
    {}
)(withStyles(styles)(MyMatches));
