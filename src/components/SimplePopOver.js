import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

const styles = theme => ({
    typography: {
        margin: theme.spacing.unit * 2,
    },
});

const SimplePopover = ({
    anchorEl,
    classes,
    handleClose,
    getContent,
    anchorOrginVert = 'bottom',
    anchorOrginHorz = 'center',
    transformOrginVert = 'top',
    transformOrginHorz = 'center',
    id,
}) => {
    const open = Boolean(anchorEl);
    return (
        <Popover
            id="simple-popper"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: anchorOrginVert,
                horizontal: anchorOrginHorz,
            }}
            transformOrigin={{
                vertical: transformOrginVert,
                horizontal: transformOrginHorz,
            }}
        >
            {getContent(id)}
        </Popover>
    );
};

SimplePopover.propTypes = {
    classes: PropTypes.object.isRequired,
    anchorEl: PropTypes.element,
    handleClose: PropTypes.func.isRequired,
    getContent: PropTypes.func.isRequired,
    anchorOrginVert: PropTypes.string,
    anchorOrginHorz: PropTypes.string,
};

export default withStyles(styles)(SimplePopover);
