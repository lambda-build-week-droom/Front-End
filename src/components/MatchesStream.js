import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Avatar from './AvatarComponent';

class MatchesStream extends React.Component {
    state = {
        matches: [
            { title: 'Match2' },
            { title: 'Match2' },
            { title: 'Match3' },
        ],
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {/* Matches Stream */}
                {this.state.matches.map((match, index) => {
                    return <Avatar key={index} avatar={match} />;
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
        marginTop: '82px'
    },
};

export default withStyles(styles)(MatchesStream);
