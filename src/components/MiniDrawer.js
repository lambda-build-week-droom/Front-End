import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import SimpleList from './SimpleList';
import { Link } from 'react-router-dom';

const styles = {
    menuList: {
        minWidth: '15%',
        height: '25%',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    droomLink: {
        color: 'white',
        textDecoration: 'none',
    },
};

class PermanentDrawerRight extends React.Component {
    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <AppBar position="fixed">
                    <Toolbar className={classes.header}>
                        <IconButton
                            color="inherit"
                            onClick={this.handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h4" color="inherit" noWrap>
                            <Link to={'/main'} className={classes.droomLink}>
                                DROOM
                            </Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="temporary"
                    anchor="right"
                    open={this.state.mobileOpen}
                    onClose={this.handleDrawerToggle}
                    classes={{
                        paper: classes.menuList,
                    }}
                >
                    <Divider />
                    <SimpleList />
                </Drawer>
            </div>
        );
    }
}

PermanentDrawerRight.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawerRight);
