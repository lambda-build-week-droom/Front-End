import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import AvatarComponent from './AvatarComponent';
import MatchesStream from './MatchesStream';
import SimpleTabs from './SimpleTabs';
import Messages from './Messages';

class MyMatches extends Component {
    state = {};

    getContentMatches = () => {
        return <MatchesStream />;
    };

    getContentMessages = () => {
        return <Messages />;
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AvatarComponent
                    key={'my-avatar'}
                    avatar={{ title: 'My Avatar' }}
                />
                <SimpleTabs
                    labels={['Matches', 'Messages']}
                    getContentFunctions={[
                        this.getContentMatches,
                        this.getContentMessages,
                    ]}
                />
            </div>
        );
    }
}

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
};

MyMatches.propTypes = {};

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
    {}
)(withStyles(styles)(MyMatches));
