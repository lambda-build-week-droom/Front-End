import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import {} from '@material-ui/core';
import MyMatches from '../components/MyMatches';
import { Grid, Hidden } from '@material-ui/core';
import MiniDrawer from '../components/MiniDrawer';
import SimpleModal from '../components/SimpleModal';

class Profile extends Component {
    state = {};

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Hidden xsDown>
                        <Grid
                            item
                            sm={6}
                            md={4}
                            className={classes.matchesFirstGrid}
                        >
                            <MyMatches />
                        </Grid>
                    </Hidden>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        className={classes.matchesCenterGrid}
                    >
                        <h1 className={classes.matchesHeading}>Matches</h1>
                    </Grid>
                    <Hidden smDown>
                        <Grid item md={4}>
                            <MiniDrawer />
                        </Grid>
                    </Hidden>
                </Grid>
            </div>
        );
    }
}

const styles = {
    matchesHeading: {
        marginTop: '200px',
    },
    root: {
        display: 'flex',
        maxWidth: '1000px',
        justifyContent: 'center',
        height: '100vh',
    },
    matchesFirstGrid: {
        marginTop: '5%',
    },
};

Profile.propTypes = {};

function mapStateToProps(state) {
    return {
        token: state.appReducer.token,
        accountId: state.accountReducer.account.id,
    };
}

export default connect(
    mapStateToProps,
    {}
)(withStyles(styles)(Profile));
