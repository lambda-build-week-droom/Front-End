import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Hidden } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import SimpleList from './SimpleList';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({
    // root: {
    //     display: 'flex',
    // },
    appBar: {
        // marginRight: drawerWidth,
        // width: '100%',
        // [theme.breakpoints.down('lg')]: {
        //     width: `calc(100% - ${drawerWidth}px)`,
        // },
        backgroundColor: '#2e4053',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // toolbar: theme.mixins.toolbar,
    toolBar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    // header: {
    //     marginLeft: '200px',
    // },
    droomLink: {
        color: 'white',
        textDecoration: 'none',
        fontFamily: 'Yellowtail, cursive',
    },
    // menuButton: {
    //     display: 'flex',
    //     alignSelf: 'flex-end',
    // },
});

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
            <div className={classes.root}>
                <CssBaseline />

                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar className={classes.toolBar}>
                        <Typography
                            className={classes.header}
                            variant="h4"
                            color="inherit"
                            noWrap
                        >
                            <Link to={'/main'} className={classes.droomLink}>
                                Droom
                            </Link>
                        </Typography>
                        <Hidden mdUp>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon fontSize="large" />
                            </IconButton>
                        </Hidden>
                    </Toolbar>
                </AppBar>

                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        anchor={'right'}
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <Divider />
                        <SimpleList />
                    </Drawer>
                </Hidden>
                <Hidden smDown>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor="right"
                    >
                        <div className={classes.toolbar} />
                        <Divider />
                        <SimpleList />
                    </Drawer>
                </Hidden>
            </div>
        );
    }
}

PermanentDrawerRight.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawerRight);
