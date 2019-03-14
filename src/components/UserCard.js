import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const UserCard = props => {
    const { classes } = props;

    return <div className={classes.root}>User Card</div>;
};

UserCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    root: {},
};

export default withStyles(styles)(UserCard);
