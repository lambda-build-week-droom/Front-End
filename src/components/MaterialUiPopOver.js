import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, IconButton } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';

const styles = theme => ({
    typography: {
        padding: theme.spacing.unit * 2,
    },
    navLink: {
        color: 'black',
        textDecoration: 'none',
    },
});

class MaterialUiPopOver extends React.Component {
    state = {
        anchorEl: null,
        open: false,
    };

    handleClick = event => {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            open: !state.open,
        }));
    };

    render() {
        const { classes } = this.props;
        const { anchorEl, open } = this.state;
        const id = open ? 'simple-popper' : null;

        return (
            <div>
                <IconButton onClick={this.handleClick} aria-describedby={id}>
                    <MoreVertIcon />
                </IconButton>
                <Popper id={id} open={open} anchorEl={anchorEl} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                                <Typography className={classes.typography}>
                                    <div onClick={this.handleClick}>
                                        <Link
                                            className={classes.navLink}
                                            to={this.props.url}
                                        >
                                            Profile
                                        </Link>
                                    </div>
                                </Typography>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </div>
        );
    }
}

MaterialUiPopOver.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaterialUiPopOver);