import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const Messages = props => {
    const { classes } = props;
    return <div className={classes.root}>Messages</div>;
};

Messages.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    root: {},
};

export default withStyles(styles)(Messages);
