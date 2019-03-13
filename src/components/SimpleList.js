import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import MatchIcon from '@material-ui/icons/People';
import MessageIcon from '@material-ui/icons/Message';
import SignOutIcon from '@material-ui/icons/ExitToApp';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function SimpleList(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <List component="nav">
                <ListItem button>
                    <ListItemIcon>
                        <MatchIcon />
                    </ListItemIcon>
                    <ListItemText primary="Matches" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <MessageIcon />
                    </ListItemIcon>
                    <ListItemText primary="Messages" />
                </ListItem>
                <Divider />
                <ListItemLink href="#">
                    <ListItemIcon>
                        <SignOutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out" />
                </ListItemLink>
            </List>
        </div>
    );
}

SimpleList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);
