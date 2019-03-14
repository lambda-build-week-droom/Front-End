import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import AvatarComponent from './AvatarComponent';
import { connect } from 'react-redux';
import { getCurrentMatches } from '../actions/matchActions';
import { requestWithToken } from '../actions/axios';
import JobComponent from './JobComponent';

class MatchesStream extends React.Component {
    state = {};

    componentDidMount() {
        let accountType = 'user';
        if (this.props.account.hasOwnProperty('companyName')) {
            accountType = 'company';
        }
        this.props.getCurrentMatches(this.props.token, accountType);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.matches !== this.props.matches) {
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {this.props.matches.map(match => {
                    if (match.hasOwnProperty('jobTitle')) {
                        return <JobComponent key={match.id} job={match} />;
                    }

                    return <AvatarComponent key={match.id} avatar={match} />;
                })}
            </div>
        );
    }
}

MatchesStream.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    root: {
        overflowY: 'scroll',
        maxHeight: '65vh',
    },
};
const mapStateToProps = state => ({
    matches: state.matchReducer.currentMatches,
    account: state.accountReducer.account,
    token: state.appReducer.token,
});

export default connect(
    mapStateToProps,
    { getCurrentMatches }
)(withStyles(styles)(MatchesStream));
