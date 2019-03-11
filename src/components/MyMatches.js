import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Avatar from './Avatar';
import MatchesStream from './MatchesStream';

class MyMatches extends Component {
    state = {};

    render() {
        return (
            <div>
                <Avatar />
                <MatchesStream />
            </div>
        );
    }
}

const styles = {
    root: {},
};

MyMatches.propTypes = {};

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
    {}
)(withStyles(styles)(MyMatches));
