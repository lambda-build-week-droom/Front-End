import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import {} from '@material-ui/core';

const ProfileImage = props => {
    const { classes } = props;
    return (
        <div
            className={classes.root}
            style={{
                width: '100%',
                height: '50vh',
                backgroundImage: `url("${props.image}`,
                marginTop: '10%',
            }}
        />
    );
};

ProfileImage.propTypes = {
    classes: PropTypes.object.isRequired,
    image: PropTypes.string.isRequired,
};

const styles = {
    root: {
        backgroundSize: 'cover',
    },
};

export default withStyles(styles)(ProfileImage);
