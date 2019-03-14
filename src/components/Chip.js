import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import uuid4 from 'uuid4';

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

function Chips(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            {props.chips.map(chip => {
                return <Chip key={uuid4()} label={chip} color={'primary'} />;
            })}
        </div>
    );
}

Chips.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chips);
