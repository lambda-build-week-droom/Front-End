import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const Navigation = props => {
    const { classes } = props;
    return <div className={classes.root}>Side Navigation</div>;
};

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    root: {},
};

export default withStyles(styles)(Navigation);
