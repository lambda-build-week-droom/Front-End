import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const MatchesStream = props => {
    const { classes } = props;
    return <div className={classes.root}>Matches Stream</div>;
};

MatchesStream.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    root: {},
};

export default withStyles(styles)(MatchesStream);
