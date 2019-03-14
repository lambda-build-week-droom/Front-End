import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemLink from './ListItemLink';
import { connect } from 'react-redux';
import AccountBox from '@material-ui/icons/AccountBox';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

function SimpleList(props) {
    const { classes } = props;
    let url = `/profile/user/${props.account.id}`;
    if (props.account.hasOwnProperty('companyName')) {
        url = `/profile/company/${props.account.id}`;
    }
    return (
        <div className={classes.root}>
            <List component="nav">
                <ListItemLink
                    to={url}
                    primary={'Profile'}
                    icon={<AccountBox />}
                />
                <ListItemLink
                    to={`/matches`}
                    primary={'Matches'}
                    icon={<AccountBox />}
                />
                <ListItemLink
                    to={`/messages`}
                    primary="Messages"
                    icon={<AccountBox />}
                />
                <ListItemLink
                    to={`/signOut`}
                    primary="Sign Out"
                    icon={<AccountBox />}
                />
            </List>
        </div>
    );
}

SimpleList.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    account: state.accountReducer.account,
});

export default connect(
    mapStateToProps,
    {}
)(withStyles(styles)(SimpleList));
