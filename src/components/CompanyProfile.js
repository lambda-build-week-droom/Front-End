import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

class CompanyProfile extends Component {
    state = {};

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <h1>CompanyProfile</h1>
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
    return {};
}

export default connect(
    mapStateToProps,
    {}
)(withStyles(styles)(CompanyProfile));
