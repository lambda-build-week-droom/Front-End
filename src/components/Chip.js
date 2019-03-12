import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit,
    },
});

function handleDelete() {
    alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

function handleClick() {
    alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

function Chips(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Chip
                label="HTML"
                className={classes.chip}
                color="primary"
            />
            <Chip
                label="CSS"
                className={classes.chip}
                color="primary"
            />
            <Chip
                label="Javascript"
                className={classes.chip}
                color="primary"
            />
            <Chip
                label="React"
                className={classes.chip}
            />
            <Chip
                label="Redux"
                className={classes.chip}
            />
            <Chip
                label="Git"
                className={classes.chip}
            />
        </div>
    );
}

Chips.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chips);