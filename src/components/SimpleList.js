import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItemLink from './ListItemLink';
import { connect } from 'react-redux';
import AccountBox from '@material-ui/icons/AccountBox';

function SimpleList(props) {
    const { classes } = props;
    let url = `/profile/user/${props.account.id}`;
    if (props.account.hasOwnProperty('companyName')) {
        url = `/profile/company/${props.account.id}`;
    }
    return (
        <List component="nav">
            <ListItemLink to={url} primary={'Profile'} icon={<AccountBox />} />
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
)(SimpleList);
