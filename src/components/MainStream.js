import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

class MainStream extends Component {
    render() {
        const { classes } = this.props;
        return <div className={classes.root}>Main Stream</div>;
    }
}

MainStream.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    root: {},
};

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
    {}
)(withStyles(styles)(MainStream));
