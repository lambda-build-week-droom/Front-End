import React, { Component } from 'react';
import { checkAuthentication } from '../actions/appActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

class Main extends Component {
    render() {
        return <div>Main</div>;
    }
}

const styles = theme => ({
    root: {},
});

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        ...state,
    };
}

export default connect(
    mapStateToProps,
    { checkAuthentication }
)(withStyles(styles)(Main));
