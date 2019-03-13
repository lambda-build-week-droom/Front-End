import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import MiniDrawer from './MiniDrawer';

const Navigation = props => {
    const { classes } = props;
    return <MiniDrawer />
    // return <div></div>
};

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    root: {},
};

export default withStyles(styles)(Navigation);
