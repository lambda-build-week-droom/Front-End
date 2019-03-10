import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import { classNames } from 'classnames';

function DroomButton(props) {
    const { classes } = props;
    return (
        <Button {...props} variant="contained" className={classes.root}>
            {props.text}
        </Button>
    );
}

const styles = theme => ({
    root: {
        color: 'grey',
    },
});

Button.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DroomButton);
