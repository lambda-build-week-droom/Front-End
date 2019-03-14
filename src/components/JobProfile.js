import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ProfileImage from './ProfileImage';

const JobProfile = props => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <ProfileImage image={props.job.jobImg} />
            <h3>{props.job.jobTitle}</h3>
        </div>
    );
};

JobProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    root: {
        height: '100%',
        width: '100%',
    },
};

export default withStyles(styles)(JobProfile);
