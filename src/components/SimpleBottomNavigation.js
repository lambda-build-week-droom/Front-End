import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CallIcon from '@material-ui/icons/Call';
import DeleteIcon from '@material-ui/icons/Delete';
import PreviousIcon from '@material-ui/icons/NavigateBefore';
import NextIcon from '@material-ui/icons/NavigateNext';

const styles = {
    root: {
        width: 500,
    },
};

class SimpleBottomNavigation extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <BottomNavigation
                value={value}
                onChange={this.handleChange}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction
                    label="Previous"
                    icon={<PreviousIcon />}
                />
                <BottomNavigationAction
                    label="Pass Candidate"
                    icon={<DeleteIcon />}
                />
                <BottomNavigationAction
                    label="Match Candidate"
                    icon={<CallIcon />}
                />
                <BottomNavigationAction label="Next" icon={<NextIcon />} />
            </BottomNavigation>
        );
    }
}

SimpleBottomNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);
